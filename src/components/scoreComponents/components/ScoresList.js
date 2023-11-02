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
  getAllScoresBySubjectId,
  deleteScoreById,
} from "../../../services/scoreService";
import { getAllSubjects } from "../../../services/subjectService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function ScoresList() {
  const navigation = useNavigation();
  const [scores, setScores] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [refreshScores, setRefreshScores] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (refreshScores) {
        const getScoresBySubjectId = async () => {
          let scores = [];
          subjects?.map(async (subject) => {
            const currentScores = await getAllScoresBySubjectId(subject.id);
            scores.push({
              id: subject.id,
              name: subject.name,
              subjectScores: currentScores,
            });
          });
          setScores(scores);
        };
        const getSubjects = async () => {
          let subjectsAvailables = await getAllSubjects();
          setSubjects(subjectsAvailables);
        };

        getSubjects();
        getScoresBySubjectId();
        setRefreshScores(false);
      }
    }, [refreshScores])
  );

  const handleRefresh = () => {
    setRefreshScores(true);
  };

  const handleDeleteScore = async (id) => {
    await deleteScoreById(id);
    handleRefresh();
  };

  const handleRouteIndividualScores = (subjectId, subjectName) => {
    navigation.navigate("ScoresBySubject", { subjectId, subjectName});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text>Lista de Notas por Materia</Text>
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
        <View style={styles.mainContainer}>
          {scores?.map((score, i) => (
            <View style={styles.scoreContainer} key={i}>
              <Text style={styles.scoreName}>{score.name}</Text>
              <View style={styles.scoreInfoContainer}>
                {score.subjectScores?.map((item, j) => (
                  <View style={styles.subInfoContainer} key={j}>
                    <Text>Nota: {item.score}</Text>
                    <Text>Porcentaje: {item.percent}%</Text>
                    <Text>Fecha: {item.date}</Text>
                    <Text>Descripción: {item.description}</Text>
                    <Text>Estado: {item.status}</Text>
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
                        onPress={() => handleDeleteScore(item.id)}
                        color="#000"
                      />
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.buttonContainer}>
                <Text>
                  Ponderado:{" "}
                  {score?.subjectScores?.reduce((total, item) => {
                    const nota = parseFloat(item.score);
                    const percent = parseFloat(item.percent);
                    const ponderado = (nota * percent) / 100;
                    return total + ponderado;
                  }, 0)}
                </Text>
                <Button
                  title={"Ver Notas de " + score.name}
                  icon={<Icon name="score" size={24} color="black" />}
                  type="clear"
                  iconRight={true}
                  containerStyle={{ marginRight: 0 }}
                  size="small"
                  raised={true}
                  rounded={true}
                  titleStyle={{ color: "black" }}
                  onPress={() => handleRouteIndividualScores(score.id, score.name)}
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
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  scoreContainer: {
    width: windowWidth * 0.9,
    alignItems: "center",
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
  },
  scoreInfoContainer: {
    flex: 1,
    width: windowWidth * 0.9,
  },
  subInfoContainer: {
    width: windowWidth * 1,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    marginBottom: 2,
  },
  buttonContainer: {
    width: windowWidth * 1,
    alignItems: "center",
  },
  scoreName: {
    fontWeight: "bold",
  },
});
