<img align="center" src="./SpotTheDogApp/assets/logo.png" alt="Spot-the-Dog-logo" width="300" />

# SpotTheDog
* HackED 2023
* by University of Alberta Computer Engineering Club

## Our goal was to help searching missing dogs using dog face recognition technique.

<p>
Many of dog owners, perhaps, struggled from searching their missing dogs. It is sadly laborious to post their lost dog  pictures, and to search their dogs without any aid from an institution or anonymous. However, <b>SpotTheDog</b>, now,  helps finding your dogs! It enables the dog owners to track captured images of missing dogs with various locations. It provides the easier access for the reporters to capture stray dogs from their phones. The images of missing dogs are matched with the images of reported dogs using <i>dog face recognition</i>.
</p>

---
# How SpotTheDog Works?
* **SpotTheDog App** for user inputs
* **ML Model** for face detection and face recognition
* **Database** for images with meta data

## SpotTheDog App

### App Preview
[app preview]

<p>
Smartphone App is a gateway of communications between the users and our machine learning model. When the lost dog owner submits their dog's picture, it is stored in our database with meta data. Then, the image is analyzed by the ML model.
</p>

## ML Model, <code>spot_the_dog_model.py</code>

<p>
The major packages of our ML model are <code>opencv</code>, <code>dlib</code>, and <code>face_recognition</code>. These packages are essential to perform the face detection and the face recognition.
</p>

### Detected Face
![image](https://user-images.githubusercontent.com/106040183/211198531-fa972f9e-3440-412e-a2a6-44b48aef62a0.png)

<p>
The image above is the preview image of detected front face. As shown in the image, it detects frontal face only. This restricts the users to upload pictures of their dogs' frontal faces. However, it detects the face surprisingly well with facial landmarks such as eyes, ears, and nose.
</p>

### Registered Face
![image](https://user-images.githubusercontent.com/106040183/211202627-0d77298e-f28c-418c-a623-5b0fbc864f1d.png)

### Unmatched Face
![image](https://user-images.githubusercontent.com/106040183/211202635-382c98a2-b0d2-42be-b042-d43e401bfb7d.png)

<p>
The first image shows the registered dog with its name. Its face encoding is stored in the database. This data is used to recognize the face as shown in the second image. It compares the missing dog's face encoding with a list of reported dogs' face encodings. As the result, the matched faces with certain similarities are tagged to the missing dog. When browsing missing dogs, the similar dogs are matched and tagged. <br><br>

The resources of packages and the data are listed below.
</p>

> <code>dlib</code> Documentation: http://dlib.net/ <br>
> <code>face_recognition</code> Documentation: https://face-recognition.readthedocs.io/en/latest/face_recognition.html <br>
> Data File <br>

---
# About Project and Team
## Our Noteworthy Achievements
* Managed and merged five different fields, including back-end, front-end, full-stack, database, and machine learning
* Maintained exceptional polishness

## Team Members:
* [Min Joh](https://github.com/CavityKingu)
* [Dohyun Kim](https://github.com/kdhminime)
* [Yongbin Kim](https://github.com/yongbin4) 
* [Jamie Lee](https://github.com/jamielee0629)
* [Taekwan Yoon](https://github.com/taekwan-yoon)
