import { sendPasswordResetEmail } from "firebase/auth";
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
import { auth } from "../../firebaseconfig"; // adjust if needed

export default function ForgotPassword() {
  const [formFields, setFormFields] = useState([
    { key: "Email", label: "Email", value: "" },
  ]);

  const [temp, setTemp] = useState({ editingIndex: -1, text: "" });

  const handleForgotPassword = async () => {
    const email =
      formFields.find((f) => f.key === "Email")?.value?.trim() || "";
    if (!email) {
      Alert.alert(
        "Enter your email",
        "Type your email above, then tap “Forgot password?” again."
      );
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Reset email sent",
        "Check your inbox for the password reset link."
      );
    } catch (err: any) {
      const code = err?.code || "";
      if (code === "auth/invalid-email") {
        Alert.alert("Invalid email", "Please enter a valid email address.");
      } else if (code === "auth/too-many-requests") {
        Alert.alert(
          "Try again later",
          "Too many attempts. Please wait and try again."
        );
      } else {
        // Include user-not-found in the same generic response
        Alert.alert(
          "If an account exists…",
          "We sent a password reset link to this address."
        );
      }
    }
  };

  const updateField = (index: number, text: string) => {
    const newFields = [...formFields];
    newFields[index].value = text;
    setFormFields(newFields);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.forgotPasswordTitle}>
            Reset <Text style={styles.appName}>Tracki</Text> password
          </Text>

          {formFields.map((field, i) => (
            <View key={field.key} style={styles.inputElements}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                placeholder={field.label}
                style={styles.input}
                value={temp.editingIndex === i ? temp.text : field.value}
                onFocus={() => setTemp({ editingIndex: i, text: field.value })}
                onChangeText={(text) => setTemp({ editingIndex: i, text })}
                onBlur={() => {
                  updateField(i, temp.text);
                  setTemp({ editingIndex: -1, text: "" });
                }}
              />
            </View>
          ))}

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordButton}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Change password
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
  forgotPasswordTitle: {
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
  forgotPasswordButton: {
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
