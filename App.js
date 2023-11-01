import {
  useContext,
  useMemo,
  useEffect,
  useState,
  createContext,
  useReducer,
} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Button } from "react-native-elements";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import SignIn from "./src/components/authComponents/SignIn";
import SingUp from "./src/components/authComponents/SingUp";
import Home from "./src/components/homeComponents/Home";
import SplashScreen from "./src/components/utils/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { AuthContext } from "./src/state/AuthContext";
import { logout, login } from "./src/services/authService";
import { saveUser } from "./src/services/userServices";

const Stack = createNativeStackNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } = Stack;
const Tab = createBottomTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        const jsonResponse = await login(data);
        dispatch({ type: "SIGN_IN", token: jsonResponse?.token});
      },
      signOut: () => {
        logout();
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        const newUser = await saveUser(data);
        const { email, password } = data;
        const jsonResponse =
          newUser && newUser.id
            ? await login({ email: email, password: password })
            : null;
        dispatch({ type: "SIGN_IN", token: jsonResponse?.token});
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
          <SplashScreen />
        ) : state.userToken == null ? (
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
        ) : (
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
                    onPress={authContext.signOut}
                    color="#fff"
                  />
                ),
              }}
            />
          </StackNavigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
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
