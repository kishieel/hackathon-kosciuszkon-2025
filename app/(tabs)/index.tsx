import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';

export default function EcoServicesApp() { 
  const services = [
    {
      id: 1,
      title: 'Plastic points',
      icon: 'delete-outline',
      backgroundColor: '#fff',
    },
    {
      id: 2,
      title: 'Recycling',
      icon: 'refresh',
      backgroundColor: '#fff',
    },
    {
      id: 3,
      title: 'My Level',
      icon: 'star-outline',
      backgroundColor: '#fff',
    },
    {
      id: 4,
      title: 'Calendar',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
  ];

  const newsItems = [
    {
      id: 1,
      title: 'How important are recycling and collection',
      category: 'Environment',
      image: '🌱',
    },
    {
      id: 2,
      title: 'How important are recycling and collection',
      category: 'Environment',
      image: '🌱',
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
          </View>

          {/* Services Grid */}
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

          {/* News Section */}
          <View style={styles.newsSection}>
            <Text style={styles.sectionTitle}>News</Text>
            <View style={styles.newsContainer}>
              {newsItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.newsCard}>
                  <LinearGradient
                    colors={['#CDDC39', '#8BC34A']}
                    style={styles.newsGradient}
                  >
                    <View style={styles.newsImageContainer}>
                      <Text style={styles.newsEmoji}>{item.image}</Text>
                    </View>
                    <View style={styles.newsContent}>
                      <Text style={styles.newsTitle}>{item.title}</Text>
                      <Text style={styles.newsCategory}>{item.category}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
    paddingVertical: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  servicesContainer: {
    paddingHorizontal: 20,
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
    borderRadius: 16,
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
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  newsSection: {
    paddingHorizontal: 20,
    marginBottom: 100,
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
  newsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsGradient: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  newsImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  newsEmoji: {
    fontSize: 24,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 20,
  },
  newsCategory: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
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
