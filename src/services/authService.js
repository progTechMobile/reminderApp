import { API_ENDPOINT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export const login = async ({ email, password }) => {
  if (!email || email === "" || !password || password === "") {
    Alert.alert("Usuario y contraseña son obligatorios");
    return;
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/api/login`, {
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
    await AsyncStorage.setItem("token", jsonResponse.token);
    return jsonResponse || null;
  } catch (error) {
    Alert.alert("Error en el inicio de sesión");
  }
};

export const logout = async () => {
  fetch(`${API_ENDPOINT}/api/logout`, {
    method: "POST",
    headers: {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: "Bearer " + AsyncStorage.getItem("token"),
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
