import { auth } from "@/firebaseconfig";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Menu() {
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      router.replace("(tabs)");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to <Text style={styles.appName}>Tracki</Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF5733",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  link: { marginTop: 10 },
  linkText: { color: "#007bff", textAlign: "center" },

  appName: {
    color: "#FF5733",
    fontWeight: "bold",
  },
});
