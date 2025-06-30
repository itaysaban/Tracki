import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, SectionList } from "react-native";
import DummyData from "@/dummy_data/dummy_data";

const {openCases, closedCases} = DummyData

const Sections = [
  {title: 'Open cases', data: openCases},
  {title: 'Closed cases', data: closedCases}
]

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.usernametext}>Hello, Expo</Text>

      <SectionList
        sections = {Sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({section: {title} }) => (
          <Text style={styles.casestext}>{title}:</Text>
        )}
        renderItem={({ item, section }) => (
            <View
              style={[
                styles.caseItem, section.title === 'Closed cases' && styles.closedCaseItem, // apply extra style if closed
              ]}
            >
            <Image source={item.image} style={styles.caseProfileImage} />
            <Text style={styles.caseName}>{item.name}</Text>
            <Text style={styles.caseLocation}>Last seen: {item.lastSeen}</Text>

            <TouchableOpacity
              style={styles.caseButton}
              onPress={() => alert(`Opening case for ${item.name}`)}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
            >
              <Text style={styles.caseButtonText}>View case details >>></Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={false} // You can toggle this
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
    fontFamily: 'SpaceMono-Regular',
    fontSize: 35,
    marginBottom: 20,
  },
  casestext: {
    color: "black",
    fontFamily: 'SpaceMono-Regular',
    fontSize: 25,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  caseItem: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  caseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  caseLocation: {
    fontSize: 14,
    color: '#fff',
  },
caseProfileImage: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginBottom: 10,
  alignItems: "center"
},
caseButton: {
},
caseButtonText: {
  color: "#555",
  textAlign: "right"
},
closedCaseItem: {
  backgroundColor: "gray"
}
});
