import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EducationalMaterialsSection() { 
    const router = useRouter()
        const redirect = (path:number) => {
          switch (path) {
            case 1:
              router.navigate('/pages/educational/nuclear')
              break;
            case 2:
              router.navigate('/pages/educational/dissipation')
              break;
            case 3:
              router.navigate('/pages/educational/transportation')
              break;
            case 4:
              router.navigate('/pages/educational/longterm-storage')
              break;
            case 5:
              router.navigate('/pages/educational/innovative-storage')
              break;
            case 6:
              router.navigate('/pages/educational/green-energy')
              break;
          }
        }
    const materials = [
    {
      id: 1,
      title: 'Nuclear Energy',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
    {
      id: 2,
      title: 'Energy Dissipation',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
    {
      id: 3,
      title: 'Energy Transportation',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
    {
      id: 4,
      title: 'Longterm Energy Storage',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
    {
      id: 5,
      title: 'Innovative Energy Storage',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    },
    {
      id: 6,
      title: 'Green Energy',
      icon: 'calendar-today',
      backgroundColor: '#fff',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50"/>
      <LinearGradient
        colors={['#81C784', '#4CAF50', '#2E7D32']}
        style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome to the Educational Section. Here you can learn about different aspects of Energy.</Text>
          </View>
          <View style={styles.materialsContainer}>
            <View style={styles.materialsGrid}>
              {materials.map((materials) => (
                <TouchableOpacity key={materials.id} style={styles.materialCard} onPress={() => redirect(materials.id)}>
                  <View style={styles.materialIconContainer}>
                  </View>
                  <Text style={styles.materialTitle}>{materials.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
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
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  materialsContainer: {
    paddingHorizontal: 30,
    paddingVertical: 0,
    marginBottom: 30,
  },
  materialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  materialCard: {
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
  materialIconContainer: {
    marginBottom: 0,
  },
  materialTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  }
});