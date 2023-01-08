import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Home from "./HomeScreen.js";
import Browse from "./Browse.js";
import MyAccount from "./MyAccount.js";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: {
            backgroundColor: "#393E46",
            padding: 20,
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="home" size={24} color="white" />
            ) : (
              <Feather name="home" size={24} color="grey" />
            ),
        }}
      />

      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarStyle: {
            backgroundColor: "#393E46",
            padding: 20,
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Octicons name="book" size={24} color="white" />
            ) : (
              <Octicons name="book" size={24} color="grey" />
            ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          tabBarStyle: {
            backgroundColor: "#393E46",
            padding: 20,
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="user" size={24} color="white" />
            ) : (
              <Feather name="user" size={24} color="grey" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
