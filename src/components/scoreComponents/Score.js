import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import ScoresList from "./components/ScoresList";
import ScoreAdd from "./components/ScoreAdd";
import ScoresBySubject from "./components/ScoresBySubject";

const Tab = createMaterialTopTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;

export default function Score({ navigation }) {
  return (
    <TabNavigator
      initialRouteName="ScoresList"
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        tabBarIcon: ({ focused, color, size }) => {
          return <Icon name="logout" size={24} color="black" />;
        },
      }}
    >
      <TabScreen
        name="ScoresList"
        component={ScoresList}
        options={{
          tabBarLabel: "Lista",
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={16} color="black" />
          ),
        }}
      />
      <TabScreen
        name="ScoresBySubject"
        component={ScoresBySubject}
        options={{
          tabBarLabel: "Notas por materia",
          tabBarIcon: ({ color, size }) => (
            <Icon name="functions" size={16} color="black" />
          ),
        }}
        initialParams={{ scoreId: 0 }}
      />
      <TabScreen
        name="ScoresAdd"
        component={ScoreAdd}
        options={{
          tabBarLabel: "agregar",
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
