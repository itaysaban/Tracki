import { Stack } from "expo-router";
import { LogBox, StatusBar } from "react-native";

LogBox.ignoreAllLogs(true);

export const unstable_settings = {
  initialRouteName: "menu", // ensures initial screen is `menu`
  navigation: {
    persistNavigationState: false,
  }
};

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="menu" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Log In" }} />
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cases/[caseId]" options={{ headerShown: false }}/>
        {/* <Stack.Screen name="not-found" options={{ headerTitle: "404" }} /> */}
      </Stack>
    </>
  );
}
