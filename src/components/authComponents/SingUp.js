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

export default function SingUp() {
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    role_id: 7,
    status: "active",
  });

  const saveUser = () => {
    fetch(
      "https://56e0-2800-e2-980-20d-fd72-7b95-a67f-f122.ngrok-free.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
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
            placeholder="Nombre"
            style={styles.input}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Apellido"
            style={styles.input}
            onChangeText={(text) => setUser({ ...user, last_name: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Correo"
            style={styles.input}
            errorStyle={{ color: "red" }}
            errorMessage={user.email_u == "" ? "" : "Ingrese un Correo valido"}
            onChangeText={(text) => setUser({ ...user, email_u: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Contraseña"
            style={styles.input}
            errorStyle={{ color: "red" }}
            errorMessage={
              user.password == "" ? "" : "Ingrese una Contraseña valida"
            }
            secureTextEntry={true}
            onChangeText={(text) => setUser({ ...user, password: text })}
          />
        </View>
        <Button title="Guardar" onPress={saveUser} />
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
    width: 100,
  },
  stretch: {
    width: windowWidth * 1,
    height: windowHeight * 0.3,
    resizeMode: "contain",
  },
});
