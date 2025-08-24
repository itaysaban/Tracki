import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { db } from "../../firebaseconfig"; // adjust if needed

export default function CreateCase() {
  const [formFields, setFormFields] = useState([
    { key: "name", label: "Name", value: "" },
    { key: "age", label: "Age", value: "" },
    { key: "gender", label: "Gender", value: "" },
    { key: "dateMissing", label: "Date Missing", value: "" },
    { key: "lastSeen", label: "Last Seen Location", value: "" },
    { key: "eyeColor", label: "Eye Color", value: "" },
    { key: "clothing", label: "Clothing", value: "" },
    { key: "hairColor", label: "Hair Color", value: "" },
    { key: "height", label: "Height (cm)", value: "" },
    { key: "weight", label: "Weight (kg)", value: "" },
    { key: "skinColor", label: "Skin Tone", value: "" },
  ]);

  const [temp, setTemp] = useState({ editingIndex: -1, text: "" });
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const required = ["name", "age", "gender", "dateMissing"];
    for (let field of required) {
      const f = formFields.find((item) => item.key === field); 
      if (!f?.value) {
        Alert.alert("Missing Field", `Please fill in ${f?.label}.`);
        return;
      }
    }

    const data: any = { imageUri: image, createdAt: new Date().toISOString(), openCase: true };
    formFields.forEach((item) => {
      data[item.key] = item.key === "age" || item.key === "height" || item.key === "weight"
        ? parseFloat(item.value) || 0
        : item.value;
    });

    try {
      const database = collection(db, "cases");
      await addDoc(database, data);
      Alert.alert("Success", "The case has been successfully added.");
    } catch (error) {
      console.error("Error adding case:", error);
      Alert.alert("Error", "Could not create case.");
    }
  };

  const updateField = (index: number, text: string) => {
    const newFields = [...formFields];
    newFields[index].value = text;
    setFormFields(newFields);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>New Case</Text>
          <Text style={styles.subtitle}>Please fill in the following details:</Text>

          {formFields.map((field, i) => (
            <View key={field.key} style={styles.inputContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                placeholder={field.label}
                keyboardType={field.key === "age" || field.key === "height" || field.key === "weight" ? "numeric" : "default"}
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

          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit <Text style={styles.tracki}>Tracki</Text> Case</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 16,
    color: "#555",
  },
  inputContainer: {
    marginBottom: 12,
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
  image: {
    width: "100%",
    height: 200,
    marginVertical: 16,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#F2F2F2",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
  },
  submitText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  tracki: {
    fontWeight: "bold",
    color: "#FF5733",
  },
});