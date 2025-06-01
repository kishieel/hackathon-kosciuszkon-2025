import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { news } from '../../data/news.ts';

export default function EcoServicesApp() { 
  const router = useRouter()

  const fileUri = FileSystem.documentDirectory + 'globux.json'
  var [globux, setGlobux] = useState(0);

  useFocusEffect(() => {
  const loadValue = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri);
        const parsed = JSON.parse(content);
        if (typeof parsed.globux === 'number') {
            setGlobux(parsed.globux);
        }
      } 
    } catch (error) {
      
    }
  };

  loadValue();
});

  const services = [
    {
      id: 1,
      title: 'Educational',
      icon: 'delete-outline',
      backgroundColor: '#fff',
    },
    {
      id: 2,
      title: 'Quiz',
      icon: 'refresh',
      backgroundColor: '#fff',
    },
    {
      id: 3,
      title: 'Journal',
      icon: 'star-outline',
      backgroundColor: '#fff',
    },
    {
      id: 4,
      title: 'Statistics',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
    {
      id: 5,
      title: 'Events',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
    {
      id: 6,
      title: 'Cooperation',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
  ];
          
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      
      <LinearGradient
        colors={['#81C784', '#4CAF50', '#2E7D32']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.mainMenuCoinCounter}>You have: {globux} GreenCoins</Text>
          </View>

          <View style={styles.menuFocusButtonsContainer}>
            <View style={styles.menuFocusButtonsGrid}>
              <TouchableOpacity key={20} style={styles.menuBigSquareCard} onPress={() => router.navigate('/(tabs)/quiz')}>
                <Image source={require('../../assets/images/react-logo.png')} style={styles.image} resizeMode="contain"/>
                <Text> Daily Quiz </Text>
              </TouchableOpacity>
              <TouchableOpacity key={21} style={styles.menuBigSquareCard} onPress={() => router.navigate('/(tabs)/shop')}>
                <Image source={require('../../assets/images/react-logo.png')} style={styles.image} resizeMode="contain"/>
                <Text> Shop </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.newsContainer}>
            <Text style={styles.serviceTitle}> Latest News </Text>
            <View style={styles.newsGrid}>
              {news.map((n) => (
                <TouchableOpacity key={n.id} style={styles.newsCard} onPress={() => {
                    router.push(`/pages/news/${n.id}`)
                    console.log(`/pages/news/${n.id}`)
                  } }>
                  <Text style={styles.newsTitle}>{n.title}</Text>
                  <Text style={styles.newsThumbtext}>{n.thumbtext}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/*
          <View style={styles.servicesContainer}>
            <View style={styles.servicesGrid}>
              {services.map((service) => (
                <TouchableOpacity key={service.id} style={styles.serviceCard}>
                  <View style={styles.serviceIconContainer}>
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          */}
        </ScrollView>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100
  },
  greeting: {
    fontSize: 20,
    marginRight: 8,
  },
  time: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
  },
  notificationIcon: {
    padding: 8,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  mainMenuCoinCounter: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center'
  },
  menuFocusButtonsContainer: {
    paddingHorizontal: 30,
    marginBottom: 30
  },
  menuFocusButtonsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuBigSquareCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#cfc',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  newsContainer: {
    paddingHorizontal: 0,
  },
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  newsThumbtext: {
    fontSize: 12,
    color: '#333',
    textAlign: 'left',
  },
  newsCard: {
    width: '90%',
    backgroundColor: '#dfd',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  servicesContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIconContainer: {
    marginBottom: 0,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  newsContainer: {
    gap: 12,
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

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
