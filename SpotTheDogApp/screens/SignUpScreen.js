import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const SignUpForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = () => {
    if (!email || !password || !passwordConfirm) {
      setError("Please fill in all fields");
      return;
    }
    if (password != passwordConfirm) {
      setError("These passwords don't match");
      return;
    }

    createUserWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        navigation.navigate("Login");
      })
      .catch((re) => {
        if (re.code === "auth/email-already-in-use") {
          setError("Email is already in use");
        } else if (re.code === "auth/invalid-email") {
          setError("Email is invalid");
        } else {
          setError("Password must be at least 6 letters");
        }
        return;
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      backgroundColor={"#393E46"}
      keyboardVerticalOffset={-280}
    >
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        ></TextInput>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>Password Confirm</Text>
        <TextInput
          style={styles.input}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry={true}
        ></TextInput>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        ></TextInput>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.submit} onPress={handleSignUp}>
        <Text style={styles.signInButton}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#393E46",
    behavior: "padding",
  },
  subContainer: {
    marginTop: -40,
    flex: 0.2,
    backgroundColor: "#393E46",
  },
  title: {
    margin: 60,
    color: "#F7F7F7",
    fontSize: 50,
    fontFamily: "Dongle_400Regular",
  },
  subTitle: {
    marginLeft: 60,
    color: "#F7F7F7",
    fontSize: 25,
    fontFamily: "Dongle_400Regular",
  },
  input: {
    height: "35%",
    alignSelf: "center",
    width: "80%",
    borderRadius: 180,
    marginTop: -10,
    backgroundColor: "#F7F7F7",
    fontFamily: "Dongle_400Regular",
    paddingLeft: 20,
    fontSize: 30,
  },
  submit: {
    justifyContent: "center",
    alignSelf: "flex-end",
    height: "6%",
    width: "40%",
    borderRadius: 180,
    marginTop: 25,
    marginRight: 60,
    backgroundColor: "#6D9886",
  },
  signInButton: {
    color: "#F7F7F7",
    fontSize: 30,
    fontFamily: "Dongle_400Regular",
    alignSelf: "center",
  },
  error: {
    color: "tomato",
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "Dongle_700Bold",
  },
});

export default SignUpForm;
