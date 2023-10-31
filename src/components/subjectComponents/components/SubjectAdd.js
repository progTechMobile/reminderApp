import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Dimensions } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";

export default function SubjectAdd({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      credits: "",
      description: "",
      code: "",
      user_id: "",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Creditos"
                style={styles.input}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.credits?.type === "required" ? "Ingrese un nombre" : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
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
                  errors.description?.type === "required" ? "Ingrese un nombre" : ""
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
                  errors.code?.type === "required" ? "Ingrese un nombre" : ""
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="code"
          />
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
