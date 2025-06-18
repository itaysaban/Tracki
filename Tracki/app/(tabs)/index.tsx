import { Link } from "expo-router"
import { Background, HeaderTitle } from "@react-navigation/elements";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Expo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  
  text: {
    color: "black"
  },
  button: {
    fontSize: 20,
    color: "#fff"
  }
})