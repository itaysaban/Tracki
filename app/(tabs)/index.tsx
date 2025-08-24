import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { Link } from "expo-router";
import { Case } from "../types/Case";

export default function Index() {
  const [openCases, setOpenCases] = useState<Case[]>([]);
  const [closedCases, setClosedCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchCases = async () => {
        try {
          const openQuery = query(
            collection(db, "cases"),
            where("openCase", "==", true)
          );
          const closedQuery = query(
            collection(db, "cases"),
            where("openCase", "==", false)
          );

          const [openSnapshot, closedSnapshot] = await Promise.all([
            getDocs(openQuery),
            getDocs(closedQuery),
          ]);

          setOpenCases(
            openSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Case, "id">),
            }))
          );

          setClosedCases(
            closedSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Case, "id">),
            }))
          );

          setLoading(false);
        } catch (error) {
          console.error("Error fetching cases:", error);
        }
      };

      fetchCases();
    }, [])
  );

  const Sections = [
    { title: "Open cases", data: openCases },
    { title: "Closed cases", data: closedCases },
  ];

  if (loading)
    return (
      <Text style={{ marginTop: 50, textAlign: "center" }}>Loading...</Text>
    );

  return (
    <View style={styles.container}>
      <View style={styles.usernamecontainer}>
        <Text style={styles.usernametext}>Hello, Expo</Text>
      </View>

      <SectionList
        sections={Sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.casestext}>{title}:</Text>
        )}
        renderItem={({ item, section }) => {
          console.log("Rendering item:", item.name, "section:", section.title);
          console.log("Applied styles:", [
            styles.caseCard,
            section.title === "Closed cases" ? styles.closedCaseCard : null,
          ]);

          return (
           <Link href={`/cases/${item.id}`}
           style={[
      styles.caseCard,
      section.title === "Closed cases" ? styles.closedCaseCard : null,
    ]}>
  <TouchableOpacity
    activeOpacity={0.8}
  >
    <Image
      source={{
        uri: item.imageUri || "https://via.placeholder.com/60",
      }}
      style={styles.caseImage}
    />

    <View style={styles.caseInfo}>
      <Text
        style={[
          styles.caseName,
          section.title === "Closed cases"
            ? styles.closedCaseText
            : styles.openCaseText,
        ]}
      >
        {item.name}
      </Text>

      <Text
        style={[
          styles.caseLocation,
          section.title === "Closed cases"
            ? styles.closedCaseSubText
            : styles.openCaseText,
        ]}
      >
        Last seen: {item.lastSeen}
      </Text>
      <Text
        style={[
          styles.linkTextAbsolute,
          section.title === "Closed cases"
            ? styles.closedCaseLinkText
            : styles.openCaseLinkText,
        ]}
      >
        View case details >>>
      </Text>
    </View>
  </TouchableOpacity>
</Link>

          );
        }}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  usernamecontainer: { alignItems: "center", marginBottom: 50 },
  usernametext: { fontSize: 20, fontWeight: "bold" },
  casestext: { fontSize: 18, fontWeight: "bold", marginVertical: 8 },

  caseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5733",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 80,
    width: "100%", // make sure it spans full width
  },

  closedCaseCard: {
    backgroundColor: "#ccc",
  },

  caseImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: "cover",
    backgroundColor: "#000",
    flexShrink: 0,
  },

  caseInfo: {
    flex: 1,
    justifyContent: "center",
    position: "relative", // enable absolute children
  },


  caseName: {
  fontWeight: "bold",
  fontSize: 16,
  },

  caseLocation: {
  fontSize: 14,
  marginTop: 2,
  },  

  linkTextAbsolute: {
    right: -250,
    fontSize: 12,
    fontWeight: "600",
  },

  listContainer: {
    paddingBottom: 40,
  },

  linkWrapper: {
    position: "absolute",
    right: 12,
    bottom: 8,
  },

  openCaseText: {
    color: "white",
  },
  closedCaseText: {
    color: "#000",
  },
  closedCaseSubText: {
    color: "#333",
  },
  closedCaseLinkText: {
    color: "#0066cc",
  },
  openCaseLinkText: {
    color: "#d4f0ff",
  },

});
