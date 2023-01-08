import os # for file path
import requests # for downloading image from firebase storage url
import cv2 # for image
import dlib # for predictor and detector
import face_recognition # for face encoding and recognizing
import firebase_admin # firebase database link
from firebase_admin import credentials, initialize_app, storage, firestore

"""Model Load"""
DATA_PATH = './data/'

face_landmark_detector_file = os.path.join(DATA_PATH, 'dogHeadDetector.dat')
face_landmark_predictor_file = os.path.join(DATA_PATH, 'landmarkDetector.dat')

detector = dlib.cnn_face_detection_model_v1(face_landmark_detector_file)
predictor = dlib.shape_predictor(face_landmark_predictor_file)


"""Database Data Manipulation"""
def browse_db(collection_name, documentID, field_name):
    """
        Browse database - 
            parameter: 
                collection_name (str):
                    collection that the function should get the value of it
                field_name (str): 
                        field name that the function should return the value of it
            return: res (list):
                    list that field_name contain from database
    """
    # key_path = os.path.join(DATA_PATH, 'spot-the-dog-e68bd-f5c41104fb22.json')
    # cred = credentials.Certificate(key_path)  
    # firebase_admin.initialize_app(cred)

    db = firestore.client()     # connecting to firestore 

    if collection_name == "mlCollection" and documentID == None:
        ml_collection = db.collection(collection_name)
        res = ml_collection.document('70Ey6ANXgA51mSP7bSe4').get().to_dict()[field_name]
    elif collection_name != "mlCollection":
        collection = db.collection(collection_name).orderBy("timestamp", "desc").limit(1).get()
        res = collection.document(documentID).to_dict()[field_name]
    return res


def update_db(collection_name, documentID, field_name, data):
    """
    update database - 
        parameter: 
            collection_name (str):
                    collection that the function should update the value of it
            field_name (str): 
                    field name that the function should update the value of it
            data (str / list):
                    data to be updated
        return: None
    """
    # key_path = os.path.join(DATA_PATH, 'spot-the-dog-e68bd-f5c41104fb22.json')
    # cred = credentials.Certificate(key_path)  
    # firebase_admin.initialize_app(cred)
    
    db = firestore.client()     # connecting to firestore 

    # if updating 'reporter' database collection
    if collection_name == 'reporter' and documentID != None:
        reporter_collection = db.collection('reporter')

        if field_name == "face_encoding" or field_name == "matched_names":
            res = reporter_collection.document(documentID).get().to_dict()[field_name]
            res.append(data)

        res = reporter_collection.document(documentID).update({field_name:res})
        
    # if updating 'mlCollection' database collection
    elif collection_name == 'mlCollection'and documentID == None:
        ml_collection = db.collection('mlCollection')
        res = ml_collection.document('70Ey6ANXgA51mSP7bSe4').get().to_dict()[field_name]
        res.append(data)
        res = ml_collection.document('70Ey6ANXgA51mSP7bSe4').update({field_name:res})


def read_url_image(url, name):
    """
    This function obtains a image URL from database to read the image data.
    """
    # image url from database
    r = requests.get(url=url)

    # temporary image save format
    TEMPORARY_IMAGE_PATH = "./img_temp/"
    FILE_NAME = name + ".jpg"
    FILE_PATH = os.path.join(TEMPORARY_IMAGE_PATH, FILE_NAME)

    # save temporary image
    if r.status_code == 200:
        print("File Downloaded")
        with open(FILE_PATH, 'wb') as f:
            f.write(r.content)
            print("File Saved")
    else:
        raise Exception("Something went wrong")
    
    # read image using cv2
    image = cv2.imread(FILE_PATH)
    
    # delete image
    os.remove(FILE_PATH)
    print("File Removed")
    
    return image


"""face_recognition Function Modifications"""
def _trim_css_to_bounds(css, image_shape):
    return max(css[0], 0), min(css[1], image_shape[1]), min(css[2], image_shape[0]), max(css[3], 0)


def _rect_to_css(rect):
    return rect.top(), rect.right(), rect.bottom(), rect.left()


def _raw_face_locations(img, number_of_times_to_upsample=1):
    return detector(img, number_of_times_to_upsample)


def face_locations(img, number_of_times_to_upsample=1):
    return [_trim_css_to_bounds(_rect_to_css(face.rect), img.shape) for face in _raw_face_locations(img, number_of_times_to_upsample)]


"""Main Functions"""
def draw_label(input_image, coordinates, label):
    """
    This function draws a green box where a dog face is located.
    """
    labeled_image = input_image.copy()
    
    (top, right, bottom, left) = coordinates
    cv2.rectangle(labeled_image, (left, top), (right, bottom), (0, 255, 0), 5)
    cv2.putText(labeled_image, label, (left - 10, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)
    
    return labeled_image


def detect_dog_face(input_image):
    """
    This function returns coordinates of a box where a dog face is located.
    """
    detected_image = input_image.copy() # generate safe copy
    
    gray_image = cv2.cvtColor(detected_image, cv2.COLOR_BGR2GRAY) # convert color channel from BGR to gray scale
    dets_locations = face_locations(gray_image, 1) # detect faces
    
    return dets_locations


def match_face(face_encoding, registered_face_encodings, registered_face_names, tolerance=0.4):
    """
    This function returns a list of matched DIDs from reported dogs.
    """
    matched_names = [] # initialization
    
    matches = face_recognition.compare_faces(registered_face_encodings, face_encoding, tolerance) # list of true or false
    # face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
    
    index = [i for i, val in enumerate(matches) if val] # find index list where matches are true
    matched_names = [registered_face_names[i] for i in index] # find id numbers from index list
    
    return matched_names
