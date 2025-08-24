import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from "react-native";
// Remove this since we no longer use dummy data
// import { getCaseById } from "../../dummy_data/cases";
import { doc, getDoc } from "firebase/firestore";
// Use a relative import path, not absolute Windows path
import { db } from "../../firebaseconfig";
 // adjust the relative path to your firebaseConfig file

export default function CaseDetailsScreen() {
  const { caseId } = useLocalSearchParams();
  const [caseData, setCaseData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!caseId) return;
      try {
        const docRef = doc(db, "cases", caseId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Loaded case data from Firestore:", data);
          setCaseData(data);
        } else {
          console.warn("No such case!");
          setCaseData(null);
        }
      } catch (error) {
        console.error("Error loading case data:", error);
      }
    };
    loadData();
  }, [caseId]);

  if (!caseData) return <Text style={{ marginTop: 50, textAlign: "center" }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <StatusBar barStyle="dark-content" />

      {/* Profile Image + Name */}
      {/* Update to use the imageUrl field and pass as {uri} */}
      <Image source={{ uri: caseData.imageUrl }} style={styles.caseProfileImage} />
      <Text style={styles.caseName}>{caseData.name}</Text>
      <Text style={styles.caseLocation}>Last seen: {caseData.lastSeen}</Text>

      {/* --- SECTION 1: Dry Details --- */}
      <Text style={styles.sectionTitle}>Case Details</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Age:</Text>
        <Text>{caseData.age}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Gender:</Text>
        <Text>{caseData.gender}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Skin Color:</Text>
        <Text>{caseData.skinColor}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Eye Color:</Text>
        <Text>{caseData.eyeColor}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Hair Color:</Text>
        <Text>{caseData.hairColor}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Height:</Text>
        <Text>{caseData.height}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Weight:</Text>
        <Text>{caseData.weight}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Clothing:</Text>
        <Text>{caseData.clothing}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Date Missing:</Text>
        <Text>{caseData.dateMissing}</Text>
      </View>

      {/* --- SECTION 2: Questioning Tab --- */}
      <Text style={styles.sectionTitle}>Questioning</Text>
      <TouchableOpacity style={styles.caseButton} onPress={() => alert("Opening family & neighbor questioning...")}>
        <Text style={styles.caseButtonText}>Go to questioning >></Text>
      </TouchableOpacity>

      {/* --- SECTION 3: Timeline --- */}
      <Text style={styles.sectionTitle}>Sightings Timeline</Text>
      <TouchableOpacity style={styles.caseButton} onPress={() => alert("Open timeline submission and sightings")}>
        <Text style={styles.caseButtonText}>View/Add Sightings >></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  caseProfileImage: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    borderRadius: 12,
    marginTop: 16,
  },
  caseName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },
  caseLocation: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 12,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 6,
  },
  caseButton: {
    backgroundColor: "#0066cc",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  caseButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
