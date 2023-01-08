import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, set } from "firebase/database";
import axios from "axios";

const ReporterSubmit = ({ navigation }) => {
  const [image, setImage] = useState();
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUser(authentication.currentUser);
  }, []);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const storage = getStorage();
        const storageRef = ref(storage, image.substring(image.length - 35));
        uploadBytes(storageRef, blob).then(() => {
          const storage = getStorage();
          getDownloadURL(ref(storage, image.substring(image.length - 35)))
            .then((res) => {
              const uuid = require("uuid").v4();
              setDoc(doc(db, "reporter", uuid), {
                address: address,
                comment: comment,
                uid: user.uid,
                timestamp: Date.now(),
                image: res,
                did: uuid,
              });
            })
            .then((response) => {
              console.log(response);
              navigation.goBack();
            });
        });
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/wood_background.jpeg")}
      style={styles.image}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Text style={styles.imgTitle}>Picture</Text>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imgView}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "90%",
                  height: "90%",
                  alignSelf: "center",
                  borderRadius: 20,
                }}
              />
            ) : (
              <FontAwesome
                style={{ alignSelf: "center" }}
                name="file-photo-o"
                size={35}
                color="black"
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>Location</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          ></TextInput>

          <Text style={styles.subTitle}>Comment</Text>
          <TextInput
            blurOnSubmit={true}
            style={styles.commentInput}
            multiline={true}
            value={comment}
            onChangeText={setComment}
          ></TextInput>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.signInButton} autoCorrect={true}>
          Submit
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginTop: -180,
  },
  imgView: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
    width: "70%",
    height: "55%",
    borderRadius: 40,
    marginTop: 40,
  },
  subTitle: {
    top: 7,
    left: 10,
    marginLeft: 60,
    color: "black",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
  },
  imgTitle: {
    top: 50,
    left: 10,
    marginLeft: 60,
    color: "black",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
  },
  input: {
    alignSelf: "center",

    width: "70%",
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    fontFamily: "Dongle_400Regular",
    paddingLeft: 20,
    fontSize: 30,
  },
  commentInput: {
    alignSelf: "center",
    height: "60%",
    width: "70%",
    borderRadius: 30,
    backgroundColor: "#F7F7F7",
    fontFamily: "Dongle_400Regular",
    paddingLeft: 20,
    paddingRight: 20,

    fontSize: 30,
  },
  submit: {
    justifyContent: "center",
    alignSelf: "center",
    height: "6%",
    width: "40%",
    borderRadius: 180,
    backgroundColor: "#6D9886",
    bottom: 15,
  },
  signInButton: {
    color: "#F7F7F7",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
    alignSelf: "center",
  },

  image: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default ReporterSubmit;
