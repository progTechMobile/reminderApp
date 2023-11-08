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
import { createSchedule } from "./../../../services/scheduleService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { getAllSubjects } from "../../../services/subjectService";
import { Picker } from "@react-native-picker/picker";

export default function ScheduleAdd({ navigation }) {
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
      semester: "",
      day: "",
      timestart: new Date(),
      timeend: new Date(),
      subject_id: undefined,
      block: "",
      classroom: "",
    },
  });

  const onSubmit = async (formData) => {
    if (formData.subject_id && user.id) {
      const isCreated = createSchedule({
        ...formData,
        day: parseInt(formData.day),
        timestart: formData.timestart.toISOString(),
        timeend: formData.timeend.toISOString(),
      });
      
      if (isCreated) {
        reset({
          semester: "",
          day: "",
          timestart: new Date(),
          timeend: new Date(),
          subject_id: undefined,
          block: "",
          classroom: "",
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
          <Text>Agregar Horario</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Semestre"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.semester?.type === "required"
                    ? "Ingrese el semestre"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="semester"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.type?.type === "required"
                    ? "Seleccione un rolvalido"
                    : ""
                }
                onBlur={onBlur}
                selectedValue={value}
                onValueChange={onChange}
              >
                <Picker.Item key="1" label="Lunes" value="1" />
                <Picker.Item key="2" label="Martes" value="2" />
                <Picker.Item key="3" label="Miercoles" value="3" />
                <Picker.Item key="4" label="Jueves" value="4" />
                <Picker.Item key="5" label="Viernes" value="5" />
                <Picker.Item key="6" label="Sabado" value="6" />
                <Picker.Item key="7" label="Domingo" value="7" />
              </Picker>
            )}
            name="day"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Button
                  title={"Hora inicio: " + value.toLocaleTimeString()}
                  icon={<Icon name="today" size={24} color="black" />}
                  onPress={() => setShowDate({ ...showDate, timestart: true })}
                />
                {showDate.timestart && (
                  <>
                    <DateTimePicker
                      testID="dateTimePickerDate"
                      value={value}
                      mode="time"
                      is24Hour={true}
                      display="clock"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setShowDate({ ...showDate, timestart: false });
                          onChange(selectedDate);
                        }
                      }}
                    />
                  </>
                )}
              </>
            )}
            name="timestart"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Button
                  title={"Hora fin: " + value.toLocaleTimeString()}
                  icon={<Icon name="today" size={24} color="black" />}
                  onPress={() => setShowDate({ ...showDate, timeend: true })}
                />
                {showDate.timeend && (
                  <>
                    <DateTimePicker
                      testID="dateTimePickerDate"
                      value={value}
                      mode="time"
                      is24Hour={true}
                      display="clock"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setShowDate({ ...showDate, timeend: false });
                          onChange(selectedDate);
                        }
                      }}
                    />
                  </>
                )}
              </>
            )}
            name="timeend"
          />
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
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Edificio Bloque"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.block?.type === "required" ? "Ingrese el bloque" : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="block"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Aula"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.classroom?.type === "required"
                    ? "Ingrese el numero del aula"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="classroom"
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
