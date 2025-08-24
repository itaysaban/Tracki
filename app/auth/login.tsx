import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { auth } from "../../firebaseconfig";

export default function Login() {
  const [formFields, setFormFields] = useState([
    { key: "Email", label: "Email", value: "" },
    { key: "Password", label: "Password", value: "" },
  ]);
  const [temp, setTemp] = useState({ editingIndex: -1, text: "" });

  const handleLogin = async () => {
    const email = formFields.find((f) => f.key === "Email")?.value || "";
    const password = formFields.find((f) => f.key === "Password")?.value || "";

    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill in both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const updateField = (index: number, text: string) => {
    const newFields = [...formFields];
    newFields[index].value = text;
    setFormFields(newFields);
  };

  const forgotPassword = () => {
    try {
      router.push("/auth/resetpassword");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.loginTitle}>
            Log in to <Text style={styles.appName}>Tracki</Text>
          </Text>

          {formFields.map((field, i) => (
            <View key={field.key} style={styles.inputElements}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                placeholder={field.label}
                secureTextEntry={field.key === "Password"}
                style={styles.input}
                value={field.value}
                onChangeText={(text) => updateField(i, text)}
              />
            </View>
          ))}

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Log in!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={forgotPassword}
            style={styles.forgotPasswordBtn}
          >
            <Text style={{ color: "#FF5733", fontSize: 16 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  loginTitle: {
    color: "black",
    textAlign: "center",
    fontFamily: "SpaceMono-Regular",
    fontSize: 35,
    marginBottom: 20,
  },
  appName: {
    fontWeight: "bold",
    color: "#FF5733",
  },
  inputElements: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  forgotPasswordBtn: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 16,
    alignItems: "center",
  },
});
