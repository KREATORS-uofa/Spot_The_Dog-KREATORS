import os
import cv2
import face_recognition
import spot_the_dog_model


def reporter(document):
    """
    reporter side call function -
        parameters:
            document (dict):
                meta data followed by {
                    'did': id_number,
                    'image': image_uri
                    }
    
    This function takes an image from reporter's submission and stor its face encoding to mlCollection.
    """


    """Initialization"""
    name = document.get('did') # id
    image_url = document.get('image')
    input_image = spot_the_dog_model.read_url_image(image_url, name)


    """Detect Dog Face and Obtain face_encoding"""
    dets_locations = spot_the_dog_model.detect_dog_face(input_image)

    # filter image with only single dog face
    if len(dets_locations) == 0:
        raise Exception("No face has been detected.")
    elif len(dets_locations) > 1:
        raise Exception("More than one face have been detected.")
            
    face_encoding = face_recognition.face_encodings(input_image, dets_locations)[0] # face_enconding array


    """Update mlCollection"""
    # ML Collection 
    spot_the_dog_model.update_db("mlCollection", None, "reported_face_encodings", face_encoding)
    spot_the_dog_model.update_db("mlCollection", None, "reported_face_names", name)


def owner(document):
    """
    owner side call function - 
        parameters:
            document (dict):
                meta data followed by {
                    'did': id_number,
                    'image': image_uri,
                    'face_encoding': np.array,
                    'matched_names': string_list
                    }

    This function takes an image from owner's submission and find similar dogs from mlCollections.
    """


    """Initialization"""
    name = document.get('did') # id
    image_url = document.get('image')
    input_image = spot_the_dog_model.read_url_image(image_url, name)


    """Detect Dog Face and Obtain face_encoding"""
    if len(document.get("face_encoding")) == 0: # check if the document has face_encoding already
        # detect dog faces
        dets_locations = spot_the_dog_model.detect_dog_face(input_image)

        # filter image with only single dog face
        if len(dets_locations) == 0:
            raise Exception("No face has been detected.")
        elif len(dets_locations) > 1:
            raise Exception("More than one face have been detected.")
            
    face_encoding = face_recognition.face_encodings(input_image, dets_locations)[0] # face_enconding array

    """Browse Data From mlCollection"""
    reported_face_encodings = spot_the_dog_model.browse_db("mlCollection", None, "reported_face_encodings")
    reported_face_names = spot_the_dog_model.browse_db("mlCollection", None, "reported_face_names")


    """Match Faces"""

    if len(reported_face_encodings) == 0 or len(reported_face_names) == 0: # check if there is no reported dog
        raise Exception("There is currently no reported image.")
    
    matched_names = spot_the_dog_model.match_face(face_encoding, reported_face_encodings, reported_face_names)


    """Update ownerCollection"""
    spot_the_dog_model.update_db("owner", document.get("did"), "face_encoding", face_encoding)
    spot_the_dog_model.update_db("owner", document.get("did"), "matched_names", matched_names)