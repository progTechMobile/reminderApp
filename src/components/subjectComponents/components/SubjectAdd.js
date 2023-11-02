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
import { Button, Icon, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { createSubjet } from "./../../../services/subjectService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";

export default function SubjectAdd({ navigation }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUSer = async () => {
      let storageUser = await AsyncStorage.getItem("user");
      storageUser = JSON.parse(storageUser);
      setUser(storageUser);
    };
    getUSer();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      credits: undefined,
      description: "",
      code: "",
      user_id: undefined,
    },
  });

  const onSubmit = async (formData) => {
    if (!formData.id && user.id) {
      const isCreated = createSubjet({ ...formData, user_id: user.id });

      if (isCreated) {
        reset({
          name: "",
          credits: undefined,
          description: "",
          code: "",
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
          <Text>Agregar Materia</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nombre"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.name?.type === "required" ? "Ingrese un nombre" : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true, pattern: /^\d+$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                keyboardType="numeric"
                placeholder="Creditos"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.credits?.type === "required"
                    ? "Ingrese un número de créditos"
                    : errors.credits?.type === "pattern"
                    ? "Ingrese solo números"
                    : ""
                }
                onBlur={onBlur}
                onChangeText={(text) => {
                  const numericValue = parseInt(text);
                  onChange(numericValue);
                }}
                value={value}
              />
            )}
            name="credits"
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
                    ? "Ingrese una Descripción"
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
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Código"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.code?.type === "required" ? "Ingrese un código" : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="code"
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
