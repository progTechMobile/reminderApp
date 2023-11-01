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
import { env } from "../../utils/Constants"
import { AuthContext } from "../../state/AuthContext";
import { useForm, Controller } from "react-hook-form";

import { getRolesAvailables } from "../../services/userServices";

export default function SingUp() {
  const { signUp } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      role_id: "",
    },
  });

  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const getRoles = async () => {
      const dataRoles = await getRolesAvailables();
      setRoles(dataRoles);
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
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nombre"
                leftIcon={<Icon name="person" size={24} color="black" />}
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.name?.type === "required" ? "Ingrese un nombre" : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Apellido"
                leftIcon={<Icon name="person" size={24} color="black" />}
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.last_name?.type === "required"
                    ? "Ingrese un nombre"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="last_name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Correo"
                leftIcon={<Icon name="email" size={24} color="black" />}
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.email?.type === "required"
                    ? "Ingrese un correo"
                    : errors.email?.type === "pattern"
                    ? "Ingrese un email valido"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Contraseña"
                leftIcon={<Icon name="lock" size={24} color="black" />}
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.password?.type === "required"
                    ? "Ingrese un Contraseña valida"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                leftIcon={<Icon name="role" size={24} color="black" />}
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.password?.type === "required"
                    ? "Seleccione un rolvalido"
                    : ""
                }
                onBlur={onBlur}
                selectedValue={value}
                onValueChange={onChange}
              >
                {roles.map((role) => (
                  <Picker.Item
                    key={role.id}
                    label={role.name}
                    value={role.id}
                  />
                ))}
              </Picker>
            )}
            name="role_id"
          />
        </View>
        <Button title="Guardar" onPress={handleSubmit(signUp)} />
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
