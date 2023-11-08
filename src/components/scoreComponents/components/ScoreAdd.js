import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Icon, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { createScore } from "./../../../services/scoreService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { getAllSubjects } from "../../../services/subjectService";
import { Picker } from "@react-native-picker/picker";

export default function ScoreAdd({ navigation }) {
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [showDate, setShowDate] = useState({
    date: false,
    time: false,
  });

  useEffect(() => {
    const getUSer = async () => {
      let storageUser = await AsyncStorage.getItem("user");
      storageUser = JSON.parse(storageUser);
      setUser(storageUser);
    };

    const getSubjects = async () => {
      let subjectsAvailables = await getAllSubjects();
      setSubjects(subjectsAvailables);
    };
    getUSer();
    getSubjects();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subject_id: undefined,
      score: "",
      percent: "",
      date: new Date(),
      description: "",
      status: "pending",
      user_id: undefined,
    },
  });

  const onSubmit = async (formData) => {
    if (formData.subject_id && user.id) {
      const isCreated = createScore({
        ...formData,
        user_id: user.id,
        score: parseFloat(formData.score),
        percent: parseFloat(formData.percent),
      });
      
      if (isCreated) {
        reset({
          subject_id: undefined,
          score: "",
          percent: "",
          date: new Date(),
          description: "",
          status: "pending",
          user_id: undefined,
        });
      }
    } else {
      Alert.alert("Campos vacios en el formulario");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text>Agregar Nota</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                leftIcon={<Icon name="role" size={24} color="black" />}
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.subject_id?.type === "required"
                    ? "Seleccione un rolvalido"
                    : ""
                }
                onBlur={onBlur}
                selectedValue={value}
                onValueChange={onChange}
              >
                {subjects.map((subject) => (
                  <Picker.Item
                    key={subject.id}
                    label={subject.name}
                    value={subject.id}
                  />
                ))}
              </Picker>
            )}
            name="subject_id"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true, pattern: /^[0-9.]+$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nota"
                keyboardType="number-pad"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.score?.type === "required"
                    ? "Ingrese un nombre"
                    : errors.pattern?.type === "required"
                    ? "Ingrese un número de créditos"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="score"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true, pattern: /^[0-9.]+$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Porcentaje"
                keyboardType="number-pad"
                mi
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.percent?.type === "required"
                    ? "Ingrese el porcentaje"
                    : errors.pattern?.type === "required"
                    ? "Ingrese el porcentaje"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={(text) => {
                  if (parseFloat(text) <= 100 && parseFloat(text) > 0) {
                    onChange(text);
                  } else {
                    onChange(value);
                  }
                }}
                value={value}
              />
            )}
            name="percent"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Button
                  title={
                    "Fecha: " +
                    value.toLocaleDateString() +
                    " " +
                    value.toLocaleTimeString()
                  }
                  icon={<Icon name="today" size={24} color="black" />}
                  onPress={() => setShowDate({ ...showDate, time: true })}
                />
                {showDate.date && (
                  <>
                    <DateTimePicker
                      testID="dateTimePickerDate"
                      value={value}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setShowDate({ ...showDate, date: false });
                          onChange(selectedDate);
                        }
                      }}
                    />
                  </>
                )}
                {showDate.time && (
                  <>
                    <DateTimePicker
                      testID="dateTimePickerTime"
                      value={value}
                      mode="time"
                      is24Hour={true}
                      display="clock"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setShowDate({ ...showDate, time: false, date: true });
                          onChange(selectedDate);
                        }
                      }}
                    />
                  </>
                )}
              </>
            )}
            name="date"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Descripción"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.description?.type === "required"
                    ? "Ingrese una descripcion"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
        </View>
        <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
});
