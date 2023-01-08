import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const OwnerReporter = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar barStyle="dark-content" />

      <ImageBackground
        source={require("../assets/images/wood_background.jpeg")}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.text}>
          Spot<Text style={{ color: "#6D9886" }}>The</Text>Dog{" "}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Owner")}
        >
          <Image
            style={styles.ownerImg}
            source={require("../assets/images/ownerButton.jpg")}
          />
          <Text style={styles.ownerText}>Owner</Text>
          <Text style={styles.ownerFirstSub}>Did you lose</Text>
          <Text style={styles.ownerSecondSub}>your dog?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Reporter")}
        >
          <Image
            style={styles.reporterImg}
            source={require("../assets/images/reporterButton.jpeg")}
          />
          <Text style={styles.reporterText}>Reporter</Text>
          <Text style={styles.reporterFirstSub}>Did you see</Text>
          <Text style={styles.reporterSecondSub}>a wandering</Text>
          <Text style={styles.reporterThirdSub}>dog?</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  text: {
    alignSelf: "center",
    color: "red",
    fontSize: 30,
  },

  ownerImg: {
    width: "80%",
    height: "65%",
    alignSelf: "center",
    borderRadius: 70,
  },
  reporterImg: {
    width: "80%",
    height: "65%",
    marginTop: -70,
    alignSelf: "center",
    borderRadius: 70,
  },
  button: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    flex: 0.2,
    color: "black",
    fontSize: 60,
    fontFamily: "Dongle_400Regular",
    alignSelf: "center",
    marginTop: 60,
  },
  ownerText: {
    position: "absolute",
    top: 120,
    left: 240,
    zIndex: 1,
    color: "white",
    fontSize: 50,
    fontFamily: "Dongle_400Regular",
  },
  ownerFirstSub: {
    position: "absolute",
    top: 180,
    left: 240,
    zIndex: 0,
    color: "white",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
  },
  ownerSecondSub: {
    position: "absolute",
    top: 200,
    left: 240,
    zIndex: 0,
    color: "white",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
  },
  reporterText: {
    position: "absolute",
    top: 60,
    left: 80,
    zIndex: 1,
    color: "white",
    fontSize: 50,
    fontFamily: "Dongle_400Regular",
  },
  reporterFirstSub: {
    position: "absolute",
    top: 120,
    left: 80,
    zIndex: 0,
    color: "white",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
  },
  reporterSecondSub: {
    position: "absolute",
    top: 140,
    left: 80,
    zIndex: 0,
    color: "white",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
  },
  reporterThirdSub: {
    position: "absolute",
    top: 160,
    left: 80,
    zIndex: 0,
    color: "white",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
  },
});

export default OwnerReporter;
