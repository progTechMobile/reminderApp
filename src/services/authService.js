import { env } from "../utils/Constants"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export const login = async ({ email, password }) => {
  if (!email || email === "" || !password || password === "") {
    Alert.alert("Usuario y contraseña son obligatorios"); 
    return;
  }

  try {
    const response = await fetch(`${env.url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    });

    if (!response.ok) {
      Alert.alert("Error en la solicitud de inicio de sesión");
      return;
    }

    let jsonResponse = await response.json();
    console.log(jsonResponse)
    await AsyncStorage.setItem("token", jsonResponse.token);
    await AsyncStorage.setItem("user", JSON.stringify(jsonResponse.user));
    return jsonResponse || null;
  } catch (error) {
    Alert.alert("Error en el inicio de sesión");
  }
};

export const logout = async () => {
  const token = await AsyncStorage.getItem("token");
  fetch(`${env.url}/api/logout`, {
    method: "POST",
    headers: {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    },
  })
    .then((response) => {
      if (response.ok) {  
        AsyncStorage.removeItem("token");
      } else {
        Alert.alert("Error en la solicitud de cierre de sesión");
      }
    })
    .catch((error) => {
      
    });
};
