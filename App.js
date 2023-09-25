import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/loginComponents/Login";
import Home from "./components/homeComponents/Home";
import Users from "./components/userComponents/Users";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;

export default function App() {

  return !Login.logged ? (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="Users" component={Users} />
      </Navigator>
    </NavigationContainer>
  ) : (
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
