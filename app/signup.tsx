import { TextInput, TouchableOpacity, Text, View , StyleSheet, StatusBar} from "react-native";
import { router, useRouter } from "expo-router";

export default function Signup() {
    return (
        <View style={styles.container}>
            <Text style={styles.signupTitle}>Sign up to <Text style={styles.appName}>Tracki</Text></Text>
            <View style={styles.inputElements}>    
                <TextInput placeholder="Email"/>
                <TextInput placeholder="Username"/>
                <TextInput placeholder="Password"/>
            </View>

            <TouchableOpacity>
                <Text style={styles.signupButton} onPress={() => router.push("./menu")}>Sign up!</Text>
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
    signupTitle: {
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
    signupButton: {
        color: "#FF5733",
        textAlign: "center",
        fontWeight: "bold"
    }

})