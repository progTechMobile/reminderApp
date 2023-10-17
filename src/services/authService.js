import { API_ENDPOINT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async ({ user, password }) => {
  if (!user || user === "" || !password || password === "") {
    throw new Error("Usuario y contraseña son obligatorios");
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: user,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud de inicio de sesión");
    }

    let jsonToken = await response.json();
    await AsyncStorage.setItem("token", jsonToken.token);
    return jsonToken.token || null;
  } catch (error) {
    console.error(error);
    throw new Error("Error en el inicio de sesión");
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
        throw new Error("Error en la solicitud de cierre de sesión");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
