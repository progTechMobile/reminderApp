import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import { useFocusEffect } from "@react-navigation/native";
import {
  getAllSchedulesBySubjectId,
  deleteScheduleById,
} from "../../../services/scheduleService";
import { getAllSubjects } from "../../../services/subjectService";

export default function SchedulesList({ navigation }) {
  const rows = 18;
  const columns = 8;
  const hourNumber = 6;

  const [schedules, setSchedules] = useState(generateEmptyArray());
  const [state, setState] = useState({
    tableHead: [
      "Hora",
      "    L",
      "    M",
      "    M",
      "    J",
      "    V",
      "    S",
      "    D",
    ],
    tableData: schedules,
  });
  const [subjects, setSubjects] = useState([]);
  const [refreshSchedules, setRefreshSchedules] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (refreshSchedules) {
        const fetchData = async () => {
          const subjectsAvailables = await getAllSubjects();
          setSubjects(subjectsAvailables);

          const newSchedules = generateEmptyArray();
          for (const subject of subjectsAvailables) {
            const currentSchedules = await getAllSchedulesBySubjectId(
              subject.id
            );

            currentSchedules.forEach((schedule) => {
              const startHour = parseInt(schedule.timestart.split(":")[0]);
              const endHour = parseInt(schedule.timeend.split(":")[0]);
              const day = parseInt(schedule.day);

              for (let hour = startHour; hour < endHour; hour++) {
                if (hour >= 0 && hour < rows && day >= 0 && day < columns) {
                  newSchedules[hour][day] = subject.name;
                }
              }
            });
          }

          setSchedules(newSchedules);
          setState({ ...state, tableData: newSchedules });
        };

        fetchData();
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
        <View style={styles.header}>
          <Text style={styles.headerText}>Horario Semestre</Text>
          <Button
            icon={<Icon name="refresh" size={24} color="black" />}
            type="clear"
            onPress={() => handleRefresh()}
            color="#000"
          />
        </View>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.headText}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const generateEmptyArray = () =>
  Array(18)
    .fill()
    .map((_, colIndex) =>
      Array(8)
        .fill("")
        .map((_, rowIndex) =>
          rowIndex === 0
            ? `${(colIndex + 6).toString().padStart(2, "0")}:00`
            : ""
        )
    );

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tableContainer: {
    marginBottom: 20,
  },
  head: { height: 40, backgroundColor: "#2196F3" },
  headText: { margin: 6, fontWeight: "bold", color: "white" },
  text: { margin: 6, color: "#333" },
});