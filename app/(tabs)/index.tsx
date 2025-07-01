import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, SectionList } from "react-native";
import { Link } from "expo-router";
import DummyData from "@/dummy_data/dummy_data";

const { openCases, closedCases } = DummyData;

const Sections = [
  { title: "Open cases", data: openCases },
  { title: "Closed cases", data: closedCases },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.usernametext}>Hello, Expo</Text>

      <SectionList
        sections={Sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.casestext}>{title}:</Text>
        )}
        renderItem={({ item, section }) => (
        <Link href={`/cases/${item.id}`} asChild
            style={[
              styles.caseItem,
              section.title === "Closed cases" && styles.closedCaseItem,
            ]}>
            <TouchableOpacity>
            <Image source={item.image} style={styles.caseProfileImage} />

            <View style={styles.caseDetails}>
              <Text style={styles.caseName}>{item.name}</Text>
              <Text style={styles.caseLocation}>Last seen: {item.lastSeen}</Text>
            </View>
              <Text style={styles.caseButtonText}>View case details >>></Text>
          </TouchableOpacity>
        </Link>
        )}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  usernametext: {
    color: "black",
    textAlign: "center",
    fontFamily: "SpaceMono-Regular",
    fontSize: 35,
    marginBottom: 20,
  },
  casestext: {
    color: "black",
    fontFamily: "SpaceMono-Regular",
    fontSize: 25,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  caseItem: {
  backgroundColor: "#FF5733",
  padding: 12,
  borderRadius: 12,
  marginBottom: 12,
  flexDirection: "row",
  alignItems: "center",
  },
  closedCaseItem: {
    backgroundColor: "gray",
  },
  caseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    // marginBottom: 10
  },
  caseLocation: {
    fontSize: 14,
    color: "#fff",
  },
  caseProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginBottom: 10,
  },
  caseButtonText: {
    color: "#fff",
    textAlign: "right",
    marginTop: 80,
    // textDecorationLine: "underline",
  },
  caseDetails: {
    flex: 1,
    paddingLeft: 12,
    marginBottom: 50
  }
});
