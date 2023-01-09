import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { Octicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { db } from "../firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore/lite";

const Matched = ({ route, navigation }) => {
  const [dogs, setDogs] = useState([]);
  const { list } = route.params;

  const GetData = async () => {
    const dogCol = collection(db, "reporter");
    const q = query(dogCol, where("did", "in", list));
    const dogSnapshot = await getDocs(q);
    const dogList = dogSnapshot.docs.map((doc) => doc.data());
    setDogs(dogList);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require("../assets/images/wood_background.jpeg")}
        style={styles.image}
        resizeMode="cover"
      >
        <Text
          style={{
            marginTop: 60,
            alignSelf: "center",
            flex: 0.2,
            fontFamily: "Dongle_400Regular",
            fontSize: 50,
          }}
        >
          Matched List
        </Text>
        <ScrollView style={{ flex: 1, marginTop: -50 }}>
          {list == [] ? (
            <Text style={{ flex: 1 }}>
              Unfortunately there is no matched dogs, come back later!
            </Text>
          ) : (
            dogs.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "white",
                  alignSelf: "center",
                  width: "80%",
                  height: 130,
                  marginBottom: 40,
                  borderRadius: 30,
                }}
              >
                <TouchableOpacity>
                  <Image
                    style={{ width: 120, height: "100%", borderRadius: 20 }}
                    source={{
                      uri: item.image,
                    }}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      fontFamily: "Dongle_400Regular",
                      left: 130,
                      top: 40,
                      fontSize: 30,
                    }}
                  >
                    {item.address.substring(0, 22)}
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      fontFamily: "Dongle_400Regular",
                      left: 130,
                      top: 90,
                      fontSize: 20,
                    }}
                  >
                    {Date(item.timestamp).substring(0, 25)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6D9886",
    width: "60%",
    height: "30%",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  image: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    alignSelf: "center",
    color: "#F7F7F7",
    fontSize: 55,
    top: -5,
    fontFamily: "Dongle_400Regular",
  },
  subText: {
    position: "absolute",
    color: "#F7F7F7",
    fontSize: 20,
    top: 45,
    left: 73,
    fontFamily: "Dongle_400Regular",
  },
});

export default Matched;
