import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;

export default function Subject({ navigation }) {
  return <Text>Subject</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    paddingEnd: 5,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
