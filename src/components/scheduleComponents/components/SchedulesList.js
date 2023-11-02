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
  getAllSchedulesBySubjectId,
  deleteScheduleById,
} from "../../../services/scheduleService";
import { getAllSubjects } from "../../../services/subjectService";
import { useFocusEffect } from "@react-navigation/native";
import { Table, Row, Rows } from "react-native-table-component";

export default function SchedulesList({ navigation }) {
  const rows = 18;
  const columns = 8;
  const hourNumber = 6;
  let emptyArray = Array(rows)
    .fill()
    .map((_, colIndex) => {
      return Array(columns)
        .fill("")
        .map((_, rowIndex) => {
          if (rowIndex === 0) {
            const hour = (colIndex + hourNumber).toString().padStart(2, "0");
            const time = `${hour}:00`;
            return time;
          } else {
            return "";
          }
        });
    });
  const [schedules, setSchedules] = useState(emptyArray);
  const [state, setState] = useState({
    tableHead: [
      "Hora",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ],
    tableData: schedules,
  });
  const [subjects, setSubjects] = useState([]);
  const [refreshSchedules, setRefreshSchedules] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (refreshSchedules) {
        const getSchedules = async () => {
          subjects?.map(async (subject) => {
            const currentSchedules = await getAllSchedulesBySubjectId(
              subject.id
            );

            currentSchedules.forEach((schedule) => {
              const startHour = parseInt(schedule.timestart.split(":")[0]);
              const endHour = parseInt(schedule.timeend.split(":")[0]);
              const day = parseInt(schedule.day);

              for (let hour = startHour; hour < endHour; hour++) {
                if (hour >= 0 && hour < rows && day >= 0 && day < columns) {
                  setSchedules((prevSchedules) => {
                    const newSchedules = [...prevSchedules];
                    newSchedules[hour][day] = subject.name;
                    return newSchedules;
                  });
                }
              }
            });
          });
          setState({ ...state, tableData: schedules });
        };
        const getSubjects = async () => {
          let subjectsAvailables = await getAllSubjects();
          setSubjects(subjectsAvailables);
        };

        getSubjects();
        getSchedules();
        setRefreshSchedules(false);
      }
    }, [refreshSchedules])
  );

  const handleRefresh = () => {
    setRefreshSchedules(true);
  };

  const handleDelete = async (id) => {
    await deleteScheduleById(id);
    handleRefresh();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text>Horario Semestre {}</Text>
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
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
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
  head: { height: 100, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});
