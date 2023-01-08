import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { authentication } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const { width, height } = Dimensions.get("window");

const Circle = () => {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>
        Spot<Text style={{ color: "#6D9886" }}>The</Text>Dog{" "}
      </Text>
    </View>
  );
};

const SignInTab = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter a E-mail and Password");
      return;
    }

    signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        setUser(authentication.currentUser);
        navigation.replace("Tabs");
      })
      .catch((re) => {
        console.log(re);
      });
  };

  return (
    <View style={styles.signInTab}>
      <StatusBar barStyle="dark-content" />
      <TextInput
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardAppearance="dark"
        keyboardType="email-address"
      ></TextInput>

      <TextInput
        value={password}
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        keyboardAppearance="dark"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.submit} onPress={handleLogin}>
        <Text style={styles.signInButton}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpButton}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoginForm = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-130}
      behavior="padding"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground
          source={require("../assets/images/joey.jpg")}
          style={styles.image}
          resizeMode="cover"
        >
          <Circle />
        </ImageBackground>
        <SignInTab navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.6,
    justifyContent: "flex-end",
  },
  text: {
    color: "#F7F7F7",
    fontSize: 60,
    fontFamily: "Dongle_400Regular",
  },
  circle: {
    flex: 0.3,
    width: width,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    backgroundColor: "#393E46",
    justifyContent: "center",
    alignItems: "center",
  },
  signInTab: {
    backgroundColor: "#393E46",
    flex: 0.4,
  },
  input: {
    alignSelf: "center",
    height: "15%",
    width: "55%",
    borderRadius: 180,
    marginBottom: 25,
    backgroundColor: "#F7F7F7",
    paddingLeft: 15,
  },
  submit: {
    justifyContent: "center",
    alignSelf: "center",
    height: "15%",
    width: "35%",
    borderRadius: 180,
    marginTop: 25,
    backgroundColor: "#6D9886",
  },
  signInButton: {
    color: "#F7F7F7",
    fontSize: 38,
    fontFamily: "Dongle_400Regular",
    alignSelf: "center",
  },
  signUpButton: {
    color: "#F7F7F7",
    alignSelf: "center",
    fontFamily: "Dongle_400Regular",
    fontSize: 28,
  },
  error: {
    color: "tomato",
    fontSize: 25,
    marginTop: 10,
    alignSelf: "center",
    fontFamily: "Dongle_700Bold",
  },
});

export default LoginForm;
