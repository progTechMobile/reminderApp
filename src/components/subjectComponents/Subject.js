import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, Text, SafeAreaView,ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import SubjectsList from "./components/SubjectsList";
import SubjectAdd from "./components/SubjectAdd";




const Tab = createMaterialTopTabNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } = Tab;

export default function Subject({ navigation }) {
  return (
    <TabNavigator
      initialRouteName="SubjectsList"
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        tabBarIcon: ({ focused, color, size }) => {
          return <Icon name="logout" size={24} color="black" />;
        },
      }}
    >
      <TabScreen
        name="SubjectsList"
        component={SubjectsList}
        options={{
          tabBarLabel:'Lista',
          tabBarIcon: ({ color, size }) => (
            <Icon name="menu-book" size={16} color="black" />
          ),
        }}
      />
      <TabScreen
        name="SubjectsAdd"
        component={SubjectAdd}
        options={{
          tabBarLabel:'agregar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add" size={16} color="black" />
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
