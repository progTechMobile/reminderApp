import { StatusBar } from "expo-status-bar";
import { useState, useContext } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINT } from "@env";
import { AuthContext } from "../../state/AuthContext";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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
            onChangeText={(text) => setUser(text)}
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
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button
          title="Iniciar Sesión"
          onPress={() => signIn({ user, password })}
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
