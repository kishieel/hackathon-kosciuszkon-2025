import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { news } from '../../../data/news.ts';

export default function NewsSection() {
    const headerHeight = useHeaderHeight();
    console.error(useLocalSearchParams())
    const { newsId } = useLocalSearchParams<{ newsId: string }>();
    var newsInstance = news.find(n => n.id == parseInt(newsId));

    if (newsInstance) {
        return (
            <>
                <Stack.Screen options={{ title: "News", headerTransparent: true }} />
                <SafeAreaView style={styles.container}>
                    <LinearGradient
                    colors={['#81C784', '#4CAF50', '#2E7D32']}
                    style={styles.gradient}>

                        <Text style={styles.title}>{newsInstance.title}</Text>
                        <Text style={styles.body}>{newsInstance.body}</Text>
                    </LinearGradient>
                </SafeAreaView>
            </>
        )
    }
    else {
        console.error("News page not found")
    }

}

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
    },
    title: {
        paddingTop: 70,
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    }, 
    body: {
        marginVertical: 10,
        marginHorizontal: 20,
        fontSize: 22,
        color: '#fff',
        textAlign: 'left',
    }
})