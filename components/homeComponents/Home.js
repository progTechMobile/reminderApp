import { StyleSheet, Text, SafeAreaView } from "react-native";
import { Button, Icon } from "react-native-elements";

export default function Home({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Screen</Text>
      <Button
        icon={<Icon name="arrow-right" size={24} color="white" />}
        title="Usuarios"
        onPress={() => navigation.navigate("Users")}
      />
    </SafeAreaView>
  );
}
