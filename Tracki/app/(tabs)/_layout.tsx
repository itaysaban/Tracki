import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function TabsLayout() {
  return (
    <Tabs 
        screenOptions={{tabBarActiveTintColor: "#FF5733" ,
        headerStyle: {
            backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTintColor: "#FF5733",
        tabBarStyle: {
            backgroundColor: "#fff"
        }
    }}>
        <Tabs.Screen name="index" options = {{ headerTitle: "Tracki" , tabBarIcon: ({focused, color}) => ( <Ionicons 
        name={focused ? "home" : "home-outline"}
        color={color} 
        size={30}
     />)}}/>
        <Tabs.Screen name="about" options = {{tabBarIcon: ({focused, color}) => ( <Ionicons
            name={focused ? "about" : "about-outline"}
            color={color}
            size={28}/>
        ) }}/>
        <Tabs.Screen name="not-found" options = {{headerTitle: "404", }}/>
    </Tabs>
  );
}
 