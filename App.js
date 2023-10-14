import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Button } from "react-native-elements";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/state/store";

import SignIn from "./src/components/authComponents/SignIn";
import SingUp from "./src/components/authComponents/SingUp";
import Home from "./src/components/homeComponents/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Stack = createNativeStackNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } = Stack;
const Tab = createBottomTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;

export default function App() {
  
  const getIsSignedIn = () => {
    const token = AsyncStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  };
  
  const logout = () => {
    fetch(
      "https://56e0-2800-e2-980-20d-fd72-7b95-a67f-f122.ngrok-free.app/api/logout",
      {
        method: "POST",
        headers: {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + AsyncStorage.getItem("token"),
          },
        },
      }
      )
      .then((response) => response)
      .then((message) => {
        AsyncStorage.removeItem("token");
        setIsSignedIn(false);
      })
      .catch((error) => {
        console.error(error);
      });
    };
    
    const [isSignedIn, setIsSignedIn] = useState(getIsSignedIn());

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          {isSignedIn ? (
            <StackNavigator initialRouteName="Home">
              <StackScreen
                name="Home"
                component={Home}
                options={{
                  title: "Reminder U",
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="account-circle" size={24} color="black" />
                  ),
                  headerRight: () => (
                    <Button
                      icon={<Icon name="logout" size={24} color="black" />}
                      type="clear"
                      iconRight={true}
                      containerStyle={{ marginRight: 0 }}
                      size="small"
                      raised={true}
                      rounded={true}
                      titleStyle={{ color: "black" }}
                      onPress={logout}
                      color="#fff"
                    />
                  ),
                }}
              />
            </StackNavigator>
          ) : (
            <TabNavigator
              initialRouteName="SignIn"
              screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
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
      </PersistGate>
    </Provider>
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
