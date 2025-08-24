import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { LogBox, StyleSheet, TouchableOpacity, View } from "react-native";

LogBox.ignoreAllLogs(true);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF5733",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#FF5733",
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          borderTopWidth: 0,
        },
      }}
    >
      {/* Left tab: Home */}
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Tracki",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={28} color={color} />
          ),
        }}
      />

      {/* Middle tab: Add Case (Floating Button Style) */}
    <Tabs.Screen
    name="createCase"
    options={{
        headerShown: true,           
        headerTitle: "Add Case",     
        tabBarLabel: "",             
        tabBarIcon: () => null,
        tabBarButton: (props) => (
        <TouchableOpacity {...props} style={styles.fabContainer}>
            <View style={styles.fabButton}>
            <Ionicons name="add" size={28} color="#fff" />
            </View>
        </TouchableOpacity>
        ),
    }}
    />


      {/* Right tab: About */}
      <Tabs.Screen
        name="about"
        options={{
          headerTitle: "About",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "information-circle" : "information-circle-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* Hidden route fallback */}
      <Tabs.Screen
        name="not-found"
        options={{
          headerTitle: "404",
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    top: -25,
    alignSelf: "center",
  },
  fabButton: {
    width: 60,
    height: 60,
    backgroundColor: "#FF5733",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
