import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
import { auth, db } from "../../firebaseconfig"; // adjust if needed

export default function Signup() {
  const [formFields, setFormFields] = useState([
    { key: "Email", label: "Email", value: "" },
    { key: "Username", label: "Username", value: "" },
    { key: "Password", label: "Password", value: "" },
    { key: "ConfirmPassword", label: "ConfirmPassword", value: "" },
  ]);

  const [temp, setTemp] = useState({ editingIndex: -1, text: "" });

  const handleSubmit = async () => {
    const required = ["Email", "Username", "Password", "ConfirmPassword"];
    for (let field of required) {
      const f = formFields.find((item) => item.key === field);
      if (!f?.value) {
        Alert.alert("Missing Field", `Please fill in ${f?.label}.`);
        return;
      }
    }

    const email = formFields.find((f) => f.key === "Email")?.value || "";
    const password = formFields.find((f) => f.key === "Password")?.value || "";
    const confirmPassword =
      formFields.find((f) => f.key === "ConfirmPassword")?.value || "";

    if (password != confirmPassword) {
      Alert.alert("we cant save that", "Passwords do not match!");
      return;
    }

    const data: any = { createdAt: new Date().toISOString() };
    formFields.forEach((item) => {
      if (item.key !== "Password" && item.key !== "ConfirmPassword") {
        data[item.key.toLowerCase()] = item.value;
      }
    });

    try {
      // 3. Create the user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 4. Save extra info in Firestore, using the uid from Auth
      await setDoc(doc(db, "users", userCred.user.uid), data);

      Alert.alert("Success", "Signed in successfully!");
      router.push("/index");
    } catch (error: any) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message);
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
          <Text style={styles.signupTitle}>
            Sign up to <Text style={styles.appName}>Tracki</Text>
          </Text>

          {formFields.map((field, i) => (
            <View key={field.key} style={styles.inputElements}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                placeholder={field.label}
                keyboardType={
                  field.key === "age" ||
                  field.key === "height" ||
                  field.key === "weight"
                    ? "numeric"
                    : "default"
                }
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

          <TouchableOpacity onPress={handleSubmit} style={styles.signupButton}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign up!</Text>
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
  signupTitle: {
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
  signupButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
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
});
