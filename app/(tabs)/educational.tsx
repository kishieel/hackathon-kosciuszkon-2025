import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
export default function EducationalMaterialsSection() { 
    const router = useRouter()
        const redirect = (path:number) => {
            if (path == 1) {
                router.navigate('/pages/educational/nuclear')
            }
            else if (path == 2) {
                router.navigate('/pages/educational/dissipation')
            }
            else if (path == 3) {
                router.navigate('/pages/educational/transportation')
            }
            else if (path == 4) {
                router.navigate('/pages/educational/longterm-storage')
            }
            else if (path == 5) {
                router.navigate('/pages/educational/innovative-storage')
            }
        }
    const materials = [
    {
      id: 1,
      title: 'Nuclear Energy',
      icon: 'delete-outline',
      backgroundColor: '#fff',
    },
    {
      id: 2,
      title: 'Energy Dissipation',
      icon: 'refresh',
      backgroundColor: '#fff',
    },
    {
      id: 3,
      title: 'Energy Transportation',
      icon: 'star-outline',
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
      title: 'Innovative Ideas for Storing Energy',
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
          {/* Materials Grid */}
          <View style={styles.servicesContainer}>
            <View style={styles.servicesGrid}>
              {materials.map((materials) => (
                <TouchableOpacity key={materials.id} style={styles.serviceCard} onPress={() => redirect(materials.id)}>
                  <View style={styles.serviceIconContainer}>
                  </View>
                  <Text style={styles.serviceTitle}>{materials.title}</Text>
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