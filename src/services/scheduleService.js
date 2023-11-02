import { env } from "../utils/Constants";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createSchedule = async (schedule) => {
  
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url}/api/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(schedule),
  });

  if (!response.ok) {
    Alert.alert("Error en la solicitud de crear materia");
    return;
  }

  const responseJson = await response.json();
  return responseJson?.id ? true : false;
};

export const getAllSchedulesBySubjectId = async (subjectId) => {
  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url}/api/schedulesBySubjectId/${subjectId}`, {
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

export const deleteScheduleById = async (id) => {

  const token = await AsyncStorage.getItem("token");
  const response = await fetch(`${env.url}/api/schedules/${id}`, {
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
