import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, SafeAreaView,ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import RemindersList from "./components/RemindersList";
import ReminderAdd from "./components/ReminderAdd";


const Tab = createMaterialTopTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;

export default function Reminder({ navigation }) {
  return (
    <TabNavigator
      initialRouteName="RemindersList"
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        tabBarIcon: ({ focused, color, size }) => {
          return <Icon name="logout" size={24} color="black" />;
        },
      }}
    >
      <TabScreen
        name="RemindersList"
        component={RemindersList}
        options={{
          tabBarLabel:'Lista',
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={16} color="black" />
          ),
        }}
      />
      <TabScreen
        name="RemindersAdd"
        component={ReminderAdd}
        options={{
          tabBarLabel:'agregar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="note-add" size={16} color="black" />
          ),
        }}
      />
    </TabNavigator>
  );
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
