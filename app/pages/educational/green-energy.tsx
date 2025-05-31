import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

export default function NuclearEnergySection() {

    return (
        <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" backgroundColor="#4CAF50"/>
              <LinearGradient
                colors={['#81C784', '#4CAF50', '#2E7D32']}
                style={styles.gradient}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.textContainer}>
                    <Text style={styles.textContent}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                  </View>
                </ScrollView>
              </LinearGradient>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    },
    gradient: {
        flex: 1,
    },
    textContainer: {
        paddingHorizontal: 30,
        marginBottom: 30,
    },
    textContent: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    }
})