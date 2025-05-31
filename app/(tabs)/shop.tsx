import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EcoServicesApp() {
    const productsBillboard = [
        {
            id: 1,
            title: 'Hot-Dog Typu Mały',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 2,
            title: 'Ice cubes saved: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 3,
            title: 'CO2 lowered: ',
            icon: require('../../assets/images/react-logo.png'),
            price: 1500,
        },
        {
            id: 4,
            title: 'Fuel saved: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 5,
            title: 'Bottles recycled: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 6,
            title: 'Trees planted: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 7,
            title: 'Sun happy happy days: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 8,
            title: 'Happy fishies: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 9,
            title: 'Skibidi toilets: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 10,
            title: 'Sigma males: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 11,
            title: 'Subways surfed: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 12,
            title: 'Cameramans slain: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 13,
            title: 'Items from Ziutek\'s pocket: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 14,
            title: 'Nights at Freddy\'s: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 15,
            title: 'Leroy Jenkins\' incidents: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 16,
            title: 'Flowey flowers happyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
    ];

    const productsList = [
        {
            id: 1,
            title: 'Hot-Dog Typu Mały',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 2,
            title: 'Ice cubes saved: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 3,
            title: 'CO2 lowered: ',
            icon: require('../../assets/images/react-logo.png'),
            price: 1500,
        },
        {
            id: 4,
            title: 'Fuel saved: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 5,
            title: 'Bottles recycled: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 6,
            title: 'Trees planted: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 7,
            title: 'Sun happy happy days: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 8,
            title: 'Happy fishies: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 9,
            title: 'Skibidi toilets: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 10,
            title: 'Sigma males: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 11,
            title: 'Subways surfed: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 12,
            title: 'Cameramans slain: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 13,
            title: 'Items from Ziutek\'s pocket: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 14,
            title: 'Nights at Freddy\'s: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 15,
            title: 'Leroy Jenkins\' incidents: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
        {
            id: 16,
            title: 'Flowey flowers happyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa: ',
            icon: require('../../assets/images/favicon.png'),
            price: 1500,
        },
    ];

    var [globux, setGlobux] = useState(2000);

    const insets = useSafeAreaInsets();

    function Transaction(x : number)
    {
        if(globux >= x)
        setGlobux(globux - x);
        else
        Vibration.vibrate([0, 100]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#81C784', '#4CAF50', '#2E7D32']}
                style={styles.gradient}
            >
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>EcoShop</Text>
                    <Text style={styles.globuxCounter}>{globux} GLOBUX</Text>
                </View>

                {/* Services Grid */}
                <View style={styles.panel}>
                    <ScrollView style={{marginBottom: insets.bottom + 54 }} showsVerticalScrollIndicator={false}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {productsBillboard.map((product) => (
                                <TouchableOpacity onPress={ () => Transaction(product.price) } key={product.id} style={styles.productTile}>
                                    <View style={styles.productTop}>{product.title}
                                        <Image source={product.icon} style={styles.productIcon} resizeMode='contain' />
                                    </View>
                                    <View style={styles.productBar}>
                                        <Text style={styles.productName}>{product.title}</Text>
                                        <Text style={styles.productPrice}>{product.price} GLOBUX</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {productsList.map((product) => (
                            <TouchableOpacity onPress={ () => Transaction(product.price) } key={product.id} style={styles.productTileWide}>
                                <Image source={product.icon} style={styles.productIconWide} resizeMode='cover' />
                                <View style={styles.productBarWide}>
                                    <Text numberOfLines={1} style={styles.productNameWide}>{product.title}</Text>
                                    <Text style={styles.productPriceWide}>{product.price} GLOBUX</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </View>

                {/* Bottom Navigation */}
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
    globuxCounter: {
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
