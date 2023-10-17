import { StatusBar } from "expo-status-bar";
import { useState, useContext, useEffect } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { API_ENDPOINT } from "@env";
import { AuthContext } from "../../state/AuthContext";

import { getRolesAvailables } from "../../services/userServices";

export default function SingUp() {
  const { signUp } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: null,
    last_name: null,
    email: null,
    password: null,
    role_id: null,
  });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const getRoles = async () => {
      const dataRoles = await getRolesAvailables();
      setRoles(dataRoles);
      console.log(dataRoles);
    };
    getRoles();
  }, []);

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
            onChangeText={(text) => setUser({ ...user, email: text })}
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
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={user.role_id}
            onValueChange={(itemValue, itemIndex) =>
              setUser({ ...user, role_id: itemValue })
            }
            style={styles.input}
          >
            {roles.map((role) => (
              <Picker.Item key={role.id} label={role.name} value={role.id} />
            ))}
          </Picker>
        </View>
        <Button title="Guardar" onPress={() => signUp(user)} />
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
    width: windowWidth * 1,
  },
  stretch: {
    width: windowWidth * 1,
    height: windowHeight * 0.3,
    resizeMode: "contain",
  },
});
