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
import { env } from "../../utils/Constants"
import { AuthContext } from "../../state/AuthContext";
import { useForm, Controller } from "react-hook-form";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Usuario"
                leftIcon={<Icon name="person" size={24} color="black" />}
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.email?.type === "required"
                    ? "Ingrese un usuario"
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
        <Button
          title="Iniciar Sesión"
          onPress={handleSubmit(signIn)}
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
