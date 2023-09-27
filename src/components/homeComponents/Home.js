import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import Reminder from "../reminderComponents/Reminder";
import Schedule from "../scheduleComponents/Schedule";
import Score from "../scoreComponents/Score";
import Teacher from "../teacherComponents copy/Teacher";

const Tab = createBottomTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;

export default function Home({ navigation }) {
  return (
    <TabNavigator
      initialRouteName="Reminder"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <TabScreen
        name="Reminder"
        component={Reminder}
        options={{
          title: "Recordatorios",
          tabBarLabel: "Recordatorios",
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={24} color="black" />
          ),
        }}
      />
      <TabScreen
        name="Schedule"
        component={Schedule}
        options={{
          title: "Horario",
          tabBarLabel: "Horario",
          tabBarIcon: ({ color, size }) => (
            <Icon name="schedule" size={24} color="black" />
          ),
        }}
      />
      <TabScreen
        name="Score"
        component={Score}
        options={{
          title: "Calificaciones",
          tabBarLabel: "Calificaciones",
          tabBarIcon: ({ color, size }) => (
            <Icon name="calculate" size={24} color="black" />
          ),
        }}
      />
      <TabScreen
        name="Teacher"
        component={Teacher}
        options={{
          title: "Profesores",
          tabBarLabel: "Profesores",
          tabBarIcon: ({ color, size }) => (
            <Icon name="sentiment-very-satisfied" size={24} color="black" />
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
