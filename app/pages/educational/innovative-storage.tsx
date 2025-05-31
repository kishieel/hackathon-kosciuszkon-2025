import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";

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
})