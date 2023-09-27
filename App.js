import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import SignIn from "./src/components/authComponents/SignIn";
import SingUp from "./src/components/authComponents/SingUp";
import Home from "./src/components/homeComponents/Home";

const Stack = createNativeStackNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } = Stack;
const Tab = createBottomTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;
const getIsSignedIn = () => {
  // custom logic
  return false;
};

export default function App() {
  const isSignedIn = getIsSignedIn();
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <StackNavigator
          initialRouteName="Home"
        >
          <StackScreen
            name="Home"
            component={Home}
            options={{
              title: "Reminder U",
              tabBarIcon: ({ color, size }) => (
                <Icon name="account-circle" size={24} color="black" />
              ),
            }}
          />
        </StackNavigator>
      ) : (
        <TabNavigator
          initialRouteName="SignIn"
          screenOptions={{
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray"
          }}
        >
          <TabScreen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Iniciar Sesión",
              tabBarLabel: "Iniciar Sesión",
              tabBarIcon: ({ color, size }) => (
                <Icon name="login" size={24} color="black" />
              ),
            }}
          />
          <TabScreen
            name="SingUp"
            component={SingUp}
            options={{
              title: "Crear Cuenta",
              tabBarLabel: "Crear Cuenta",
              tabBarIcon: ({ color, size }) => (
                <Icon name="account-circle" size={24} color="black" />
              ),
            }}
          />
        </TabNavigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  authTabs: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
