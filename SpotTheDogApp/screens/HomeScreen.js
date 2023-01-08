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
import OwnerReporter from "./OwnerReporter";
import { NavigationContainer } from "@react-navigation/native";
import Owner from "./Owner";
import OwnerSubmit from "./OwnerSubmit";
import Reporter from "./Reporter";
import ReporterSubmit from "./ReporterSubmit";
import Matched from "./Matched";

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OwnerReporter"
        component={OwnerReporter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Owner"
        component={Owner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OwnerSubmit"
        component={OwnerSubmit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reporter"
        component={Reporter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReporterSubmit"
        component={ReporterSubmit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Matched"
        component={Matched}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
