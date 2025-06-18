import { View, StyleSheet } from "react-native"
import { Link, Stack } from "expo-router"

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: "Page can not be Tracked"}}></Stack.Screen>
            <View style={styles.container}> We try to Track everyone, but unfortunatly we couldn't Track this page :(
                <Link href="/" style={styles.button}>Go back</Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    color: "white"
  },
  
  text: {
    color: "white"
  },
  headerTitle: {
    backgroundColor: "orange"
  },
  button: {
    fontSize: 20,
    color: "#fff"
  }
})