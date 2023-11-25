import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import StarRating from "react-native-star-rating-widget";
import ComboBoxWithSearch from "./ComboBoxWithSearch ";
import {
  getSummary,
  createTeacherRaiting,
} from "./../../services/teacherService";

export default function Teacher({ navigation }) {
  const [selectedData, setSelectedData] = useState({
    email: "",
    full_name: "",
    id: null,
    observation: "",
    score: 0,
  });

  const [summary, setSummary] = useState({
    scoresAverage: 0,
    comments: [],
  });

  const handleGetData = ({ email, full_name }) => {
    setSelectedData({ ...selectedData, email, full_name });
    console.log(selectedData);
  };

  useEffect(() => {
    const getSummaryHere = async () => {
      if (selectedData.email) {
        const summaryData = await getSummary(selectedData.email);
        setSummary(summaryData);
      }
    };
    getSummaryHere();
  }, [selectedData]);

  const handleSubmit = async () => {
    if (selectedData.score > 0) {
      await createTeacherRaiting(selectedData);
      Alert.alert("Gracias por calificar!!!");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.comboContainer}>
        <ComboBoxWithSearch onTeacherData={handleGetData} />
      </View>
      {selectedData.email && (
        <View style={styles.infoContainer}>
          <View style={styles.fullInfo}>
            <Text>Nombre: {selectedData.full_name}</Text>
            <Text>Email: {selectedData.email}</Text>
            <Text>Calificación: {summary.scoresAverage}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={summary.scoresAverage}
              onChange={(text) => console.log(text)}
              fullStarColor="#FFD700"
              emptyStarColor="#C0C0C0"
              starSize={20}
            />
            <Text>Observaciones:</Text>
            {summary.comments &&
              summary.comments.map((item, i) => (
                <Text key={item.id}>
                  {i + 1}:{item.observation}
                </Text>
              ))}
          </View>
          <View style={styles.starsContainer}>
            <Text>: {selectedData.full_name}</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={selectedData.score}
              onChange={(raiting) =>
                setSelectedData({ ...selectedData, score: raiting })
              }
              fullStarColor="#FFD700"
              emptyStarColor="#C0C0C0"
              starSize={50}
            />
            <TextInput
              placeholder="Escribe un comentario"
              onChangeText={(text) =>
                setSelectedData({ ...selectedData, observation: text })
              }
            />
            <Button onPress={handleSubmit} title="Postear"/>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  comboContainer: {
    width: "100%",
    marginBottom: 20,
    height: 240,
  },
  infoContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fullInfo: {
    flex: 1,
    marginRight: 10,
    width: "100%",
    flexDirection: "column",
  },
  starsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 100,
    marginRight: 130,
  },
});
