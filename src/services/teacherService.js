import { env } from "../utils/Constants";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createTeacherRaiting = async (score) => {
  
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url2}/teacherRaitings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(score),
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de crear teacherRaitings");
    return;
  }

  const responseJson = await response.json();
  return responseJson?.id ? true : false;
};

export const getAllTeacherRaitings = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url2}/teacherRaitings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de mostrar teacherRaitings");
    return;
  }

  const responseJson = await response.json();

  return responseJson || null;
};

export const getSummary = async (email) => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url2}/summary/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de mostrar resumen");
    return;
  }

  const responseJson = await response.json();

  return responseJson || null;
};