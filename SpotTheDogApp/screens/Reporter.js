import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
const Reporter = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require("../assets/images/wood_background.jpeg")}
        style={styles.image}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={{ alignContent: "center", justifyContent: "center" }}
          onPress={() => navigation.navigate("ReporterSubmit")}
        >
          <View style={styles.button}>
            <Octicons
              style={{ position: "absolute", marginLeft: 25 }}
              name="report"
              size={26}
              color="#F7F7F7"
            />
            <Text style={styles.text}>Report</Text>
            <Text style={styles.subText}>Report a missing dog</Text>
          </View>
        </TouchableOpacity>
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

export default Reporter;
