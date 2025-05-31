import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';

export default function EcoServicesApp() { 
  const stats = [
    {
      title: 'Days being green: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Ice cubes saved: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'CO2 lowered: ',
      icon: require('../../assets/images/react-logo.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Fuel saved: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Bottles recycled: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Trees planted: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Sun happy happy days: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Happy fishies: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Skibidi toilets: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Sigma males: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Subways surfed: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Cameramans slain: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Items from Ziutek\'s pocket: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Nights at Freddy\'s: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Leroy Jenkins\' incidents: ',
      icon: require('../../assets/images/favicon.png'),
      backgroundColor: '#fff',
    },
    {
      title: 'Flowey flowers happy: ',
      icon: require('../../assets/images/favicon.png'),
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
            <Text style={styles.welcomeText}>Statistics</Text>
          </View>

          {/* Services Grid */}
          <View style={styles.panel}>
            {stats.map((stat) => (
                <View style={styles.statBox}>
                    <Text style={styles.statText}>{stat.title}</Text>
                    <Text style={styles.statText}>0</Text>
                    <Image source={stat.icon} style={styles.backgroundIcon} resizeMode="contain"/>
                </View>
            ))}
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
  panel:{
    width: '96%',
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
    paddingVertical: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  statBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    width: 40,
    height: 40,
    opacity: 0.1,
    transform: [{ translateY: -20 }],
    zIndex: -1,
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
