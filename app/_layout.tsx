import { Stack } from "expo-router";
import { LogBox, StatusBar } from "react-native";

LogBox.ignoreAllLogs(true);

export const unstable_settings = {
  initialRouteName: "menu", // or "auth/login" if you want login first
};

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="menu" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ title: "Log In" }} />
        <Stack.Screen name="auth/signup" options={{ title: "Sign Up" }} />
        <Stack.Screen
          name="auth/resetpassword"
          options={{ title: "Reset Password" }}
        />
        <Stack.Screen name="cases/[caseId]" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
