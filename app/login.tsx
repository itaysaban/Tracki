import { TextInput, TouchableOpacity, Text, View , StyleSheet, StatusBar} from "react-native";
import { router } from "expo-router"


export default function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}>Sign in to <Text style={styles.appName}>Tracki</Text></Text>
            <View style={styles.inputElements}>    
                <TextInput placeholder="Username"/>
                <TextInput placeholder="Password"/>
            </View>

            <TouchableOpacity onPress={() => router.replace("/(tabs)/index")}>
            <Text style={styles.loginButton}>Get me in!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 60,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    loginTitle: {
        color: "black",
        textAlign: "center",
        fontFamily: 'SpaceMono-Regular',
        fontSize: 35,
        marginBottom: 20,       
    },
    appName: {
        fontWeight: "bold",
        color: "#FF5733",
    },
    inputElements: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 8
    },
    loginButton: {
        backgroundColor: "#FF5733",
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: "center",
        width: 200,
        textAlign: "center"
    }

})