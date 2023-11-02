import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import {
  getAllReminders,
  deleteReminderById,
} from "../../../services/reminderService";
import { getAllSubjects } from "../../../services/subjectService";
import { useFocusEffect } from "@react-navigation/native";

export default function RemindersList({ navigation }) {
  const [reminders, setReminders] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [refreshReminders, setRefreshReminders] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (refreshReminders) {
        const getReminders = async () => {
          const currentReminders = await getAllReminders();
          setReminders(currentReminders);
        };
        const getSubjects = async () => {
          let subjectsAvailables = await getAllSubjects();
          setSubjects(subjectsAvailables);
        };

        getReminders();
        getSubjects();
        setRefreshReminders(false);
      }
    }, [refreshReminders])
  );

  const handleRefresh = () => {
    setRefreshReminders(true);
  };

  const handleDelete = async (id) => {
    await deleteReminderById(id);
    handleRefresh();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text>Lista de Recordatorios</Text>
          <Button
            icon={<Icon name="refresh" size={24} color="black" />}
            type="clear"
            iconRight={true}
            containerStyle={{ marginRight: 0 }}
            size="small"
            raised={true}
            rounded={true}
            titleStyle={{ color: "black" }}
            onPress={() => handleRefresh()}
            color="#000"
          />
        </View>
        <View style={styles.inputContainer}>
          {reminders?.map((reminder) => (
            <View style={styles.itemContainer} key={reminder.id}>
              <View style={styles.infoContainer}>
                <Text>Nombre: {reminder.name}</Text>
                <Text>Descripción: {reminder.description}</Text>
                <Text>Fecha Creación: {reminder.creation_date}</Text>
                <Text>Fecha Notificación: {reminder.notification_date}</Text>
                <Text>Tipo: {reminder.type}</Text>
                <Text>Estado: {reminder.status}</Text>
                <Text>Materia: {subjects.find(subject => subject.id == reminder.subject_id)?.name}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  icon={<Icon name="delete" size={24} color="black" />}
                  type="clear"
                  iconRight={true}
                  containerStyle={{ marginRight: 0 }}
                  size="small"
                  raised={true}
                  rounded={true}
                  titleStyle={{ color: "black" }}
                  onPress={() => handleDelete(subject.id)}
                  color="#000"
                />
              </View>
            </View>
          ))}
        </View>
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
    marginBottom: 10,
    width: windowWidth * 1,
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
  itemContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
  },
  infoContainer: {
    flex: 4,
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
});
