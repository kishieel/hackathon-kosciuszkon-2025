import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EcoServicesApp() {
  const fileUri = FileSystem.documentDirectory + 'data.json';

  const [transportCounts, setTransportCounts] = useState({
    car: 0,
    bike: 0,
    public: 0,
    walk: 0,
  });

  const [loading, setLoading] = useState(true);

  // Load data from file on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
          setTransportCounts({ car: 0, bike: 0, public: 0, walk: 0 });
          return;
        }
        const content = await FileSystem.readAsStringAsync(fileUri);
        if (!content) throw new Error('Empty file');
        const data = JSON.parse(content);
        setTransportCounts(data);
        Alert.alert('Loaded data', JSON.stringify(data));
      } catch (error) {
        console.log('Load error:', error);
        setTransportCounts({ car: 0, bike: 0, public: 0, walk: 0 });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = [
    {
      id: 1,
      title: 'Times traveled by car: ',
      icon: require('../../assets/images/favicon.png'),
      data: transportCounts.car,
    },
    {
      id: 2,
      title: 'Times traveled by bike: ',
      icon: require('../../assets/images/favicon.png'),
      data: transportCounts.bike,
    },
    {
      id: 3,
      title: 'Times used public transport: ',
      icon: require('../../assets/images/favicon.png'),
      data: transportCounts.public,
    },
    {
      id: 4,
      title: 'Times traveled by foot: ',
      icon: require('../../assets/images/favicon.png'),
      data: transportCounts.walk,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <LinearGradient
        colors={['#81C784', '#4CAF50', '#2E7D32']}
        style={styles.gradient}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Statistics</Text>
        </View>

        {/* Services Grid */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.panel}>
            {loading ? (
              <Text style={styles.statText}>Loading...</Text>
            ) : (
              stats.map((stat) => (
                <View key={stat.id} style={styles.statBox}>
                  <Text style={styles.statText}>{stat.title}</Text>
                  <Text style={styles.statText}>{stat.data}</Text>
                  <Image
                    source={stat.icon}
                    style={styles.backgroundIcon}
                    resizeMode="contain"
                  />
                </View>
              ))
            )}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} />
          <TouchableOpacity style={styles.navItem} />
          <TouchableOpacity style={styles.navItem} />
          <TouchableOpacity style={styles.navItem} />
          <TouchableOpacity style={styles.navItem} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  gradient: {
    flex: 1,
  },
  panel: {
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
