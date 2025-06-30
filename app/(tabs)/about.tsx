import { Background } from "@react-navigation/elements";
import { Text, View, StyleSheet, StatusBar, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>About <Text style={styles.appName}>Tracki</Text></Text>

        <Text style={styles.paragraph}>
          <Text style={styles.appName}>Tracki</Text> is a community-powered platform dedicated to helping reunite missing persons with their loved ones. We believe that every second counts, and by making real-time information accessible and actionable, we empower citizens, families, and authorities to act fast and collaboratively.
        </Text>

        <Text style={styles.paragraph}>
          Our app allows users to report missing individuals, share sightings, and stay updated on active and resolved cases — all in one place. Whether it's a child who wandered off or an elderly person who lost their way, <Text style={styles.appName}>Tracki</Text> is built to bring hope, clarity, and connection when it’s needed most.
        </Text>

        <Text style={styles.quote}>
          “Every missing person deserves to be found”
        </Text>

        <Text style={styles.paragraph}>Together, we can make a difference.</Text>
      </ScrollView>
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
  
  text: {
    color: "black",
    textAlign: "center",
    fontFamily: 'SpaceMono-Regular',
    fontSize: 35,
    marginBottom: 20,
  },
  headerTitle: {
    backgroundColor: "orange"
  },
  button: {
    fontSize: 20,
    color: "#fff"
  },

    title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 50,
    fontFamily: 'SpaceMono-Regular',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 15,
    fontFamily: 'SpaceMono-Regular',
  },
  appName: {
    fontWeight: "bold",
    color: "#FF5733",
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#555",
    marginVertical: 25,
    fontFamily: 'SpaceMono-Regular',
    fontWeight: "bold"}
})