import { API_ENDPOINT } from "@env";
import { Alert } from "react-native";
export const saveUser = async (user) => {
  const response = await fetch(`${API_ENDPOINT}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...user, email: user.email.toLowerCase() }),
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de usuario");
    return;
  }

  const newUser = await response.json();
  return newUser;
};

export const getRolesAvailables = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    Alert.alert("Error en la solicitud de roles");
    return;
  }
  const roles = await response.json();
  return roles;
};
