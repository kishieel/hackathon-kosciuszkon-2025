import { useCoins } from '@/app/contexts/useCoins';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EcoServicesApp() {
    const { coins, addCoins } = useCoins();

    const productsBillboard = [
        {
            id: 1,
            title: 'Small Vegan Hot-Dog',
            icon: require('../../assets/images/hotdog.png'),
            price: 1500,
        },
        {
            id: 2,
            title: 'Vegeterian Smoothie',
            icon: require('../../assets/images/smoothie.png'),
            price: 2000,
        },
        {
            id: 3,
            title: 'Plant a Tree',
            icon: require('../../assets/images/tree.png'),
            price: 3000,
        },
        {
            id: 4,
            title: 'Gym Discount',
            icon: require('../../assets/images/gym.png'),
            price: 2500,
        },
        {
            id: 5,
            title: 'Fund Carbon Filters',
            icon: require('../../assets/images/filter.png'),
            price: 5000,
        }
    ];

    const productsList = [
        {
            id: 1,
            title: 'Small Vegan Hot-Dog',
            icon: require('../../assets/images/hotdog.png'),
            price: 1500,
        },
        {
            id: 2,
            title: 'Vegeterian Smoothie',
            icon: require('../../assets/images/smoothie.png'),
            price: 2000,
        },
        {
            id: 3,
            title: 'Plant a Tree',
            icon: require('../../assets/images/tree.png'),
            price: 3000,
        },
        {
            id: 4,
            title: 'Gym Discount',
            icon: require('../../assets/images/gym.png'),
            price: 2500,
        },
        {
            id: 5,
            title: 'Fund Carbon Filters',
            icon: require('../../assets/images/filter.png'),
            price: 5000,
        }
    ];


    const insets = useSafeAreaInsets();

    function Transaction(x: number) {
        if (coins >= x) {
            addCoins({ name: `Transaction of ${x} GreenCoins`, value: -x });
        }
        else {
            Shake()
            Vibration.vibrate([0, 100]);
        }
    };

    const shakeAnim = useRef(new Animated.Value(0)).current;

    const Shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#81C784', '#4CAF50', '#2E7D32']}
                style={styles.gradient}
            >
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>EcoShop</Text>
                    <Text style={styles.coinsCounter}>{coins} GreenCoin{coins === 1 ? '' : 's'}</Text>
                </View>

                <View style={styles.panel}>
                    <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                        <ScrollView style={{ marginBottom: insets.bottom + 54 }} showsVerticalScrollIndicator={false}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {productsBillboard.map((product) => (
                                    <TouchableOpacity onPress={() => Transaction(product.price)} key={product.id} style={styles.productTile}>
                                        <View style={styles.productTop}>
                                            <Image source={product.icon} style={styles.productIcon} resizeMode='contain' />
                                        </View>
                                        <View style={styles.productBar}>
                                            <Text style={styles.productName}>{product.title}</Text>
                                            <Text style={styles.productPrice}>{product.price} GreenCoin{product.price === 1 ? '' : 's'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {productsList.map((product) => (
                                <TouchableOpacity onPress={() => Transaction(product.price)} key={product.id} style={styles.productTileWide}>
                                    <Image source={product.icon} style={styles.productIconWide} resizeMode='cover' />
                                    <View style={styles.productBarWide}>
                                        <Text numberOfLines={1} style={styles.productNameWide}>{product.title}</Text>
                                        <Text style={styles.productPriceWide}>{product.price} GreenCoin{product.price === 1 ? '' : 's'}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>
                </View>
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
    },
    gradient: {
        flex: 1,
    },
    panel: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    welcomeSection: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 100,
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 28,
        flex: 1,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    coinsCounter: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'right',
        textAlignVertical: 'center',
    },
    productTileWide: {
        width: '100%',
        height: 100,
        backgroundColor: '#4CAF50',
        borderRadius: 16,
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 2,
        flexDirection: 'row',
    },
    productBarWide: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    productNameWide: {
        fontSize: 12,
        flex: 2,
        fontWeight: 'bold',
        margin: 4,
        color: '#0',
        textAlign: 'left',
    },
    productPriceWide: {
        fontSize: 12,
        flex: 1,
        fontWeight: 'bold',
        color: '#fff',
        margin: 4,
        textAlign: 'right',
    },
    productIconWide: {
        height: 50,
        width: 50,
        marginLeft: 4,
    },
    productTile: {
        flex: 1,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 2,
    },
    productTop: {
        height: '80%',
        width: '100%',
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    productBar: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    productName: {
        fontSize: 12,
        flex: 8,
        fontWeight: 'bold',
        margin: 4,
        color: '#0',
        textAlign: 'left',
    },
    productPrice: {
        fontSize: 12,
        flex: 1,
        fontWeight: 'bold',
        color: '#4CAF50',
        margin: 4,
        textAlign: 'right',
    },
    productIcon: {
        width: '90%',
        height: '90%',
        borderRadius: 16,
    },
    bottomNav: {
        position: 'absolute',
        bottom: -90,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        paddingBottom: 30,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    navItem: {
        padding: 8,
    },
});
