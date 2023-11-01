import { env } from "../utils/Constants";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createSubjet = async (subject) => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url}/api/subjects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(subject),
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de crear materia");
    return;
  }

  const responseJson = await response.json();

  return responseJson?.id ? true : false;
};

export const getAllSubjects = async () => {
  const token = await AsyncStorage.getItem("token");
  let user = await AsyncStorage.getItem("user");
  user = JSON.parse(user);
  const response = await fetch(`${env.url}/api/subjectsByUserId/${user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de mostrar materias");
    return;
  }

  const responseJson = await response.json();

  return responseJson || null;
};

export const deleteSubjectById = async (id) => {

  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url}/api/subjects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de eliminar la materia");
    return;
  }

  const responseJson = await response.json();

  return responseJson ? true : false;
};
