import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Icon, Input } from "react-native-elements";
//import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    fetch(
      "https://56e0-2800-e2-980-20d-fd72-7b95-a67f-f122.ngrok-free.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((jsonToken) => {
        console.log(jsonToken);
        // const user = useSelector( state => state.user);
        //console.log(user);
        AsyncStorage.setItem("token", jsonToken.token)
        setUser("");
        setPassword("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("../../../assets/adaptive-icon.png")}
          style={styles.stretch}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder="Usuario"
            leftIcon={<Icon name="person" size={24} color="black" />}
            style={styles.input}
            errorStyle={{ color: "red" }}
            errorMessage={user == "" ? "" : "Ingrese un usuario valido"}
            onChangeText={setUser}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Contraseña"
            leftIcon={<Icon name="lock" size={24} color="black" />}
            style={styles.input}
            errorStyle={{ color: "red" }}
            errorMessage={password == "" ? "" : "Ingrese un Contraseña valida"}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
        <Button
          title="Iniciar Sesión"
          onPress={login}
          style={styles.buttonLogin}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    paddingLeft: 5,
    paddingEnd: 5,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {
    width: windowWidth * 1,
    height: windowHeight * 0.5,
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    marginLeft: 5,
    marginEnd: 5,
    paddingLeft: 10,
    paddingEnd: 10,
    width: windowWidth * 0.5,
  },
  buttonLogin: {
    marginBottom: 5,
    marginTop: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
