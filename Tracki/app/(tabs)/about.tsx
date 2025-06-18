import { Background } from "@react-navigation/elements";
import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen() {
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
  headerTitle: {
    backgroundColor: "orange"
  },
  button: {
    fontSize: 20,
    color: "#fff"
  }
})