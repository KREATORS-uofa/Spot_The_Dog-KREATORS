<p align="center">
  <img src="./SpotTheDogApp/assets/logo.png" alt="Spot-the-Dog-logo" width="300" />
</p>

# Spot The Dog App
###### A project written at
#### HackED 2023,
###### a 24-hour hackathon hosted by
#### University of Alberta Computer Engineering Club

## Our goal is to rescue missing dogs by matching images through face recognition techniques. 
#### To do so, we employed _machine learning_ in image processing, _established_ a database and storage of dog images, and _built_ an app on which users could upload the images of either wandering or missing dog.
---
- Countless dog owners have gone through the painful experience of searching for their missing dogs. _Extremely laborious_ it is - to post the pictures of their lost dogs both online and offline. Adding to this challenge, the anxious owners would look for their missing dogs on many social media and platforms, _scrolling through the ocean of information_. A government-run institution for sheltering lost pets does exist somewhere, but they tend to be slow and their service comes with the _possibility of death of beloved pets_ unless the owners hastily pick them up in time. **Spot The Dog** is a platform on which both the anxious owners and the caring witnesses of wandering dogs to upload dog images with location information. The application would then match the images of same dogs. This allows _everyone_ to be involved in the effort of rescue and accelerates the searching process.
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
