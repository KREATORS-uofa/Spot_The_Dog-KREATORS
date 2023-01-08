import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MyAccount = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require("../assets/images/wood_background.jpeg")}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.text}>MyAccount!</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    color: "red",
    fontSize: 30,
  },
});

export default MyAccount;
