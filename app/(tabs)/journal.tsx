import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function JournalPage() {
  const fileUri = FileSystem.documentDirectory + 'data.json';

  const [transportCounts, setTransportCounts] = useState({
    car: 0,
    bike: 0,
    public: 0,
    walk: 0,
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
        Alert.alert(JSON.stringify(data))
      } catch (error) {
        console.log('Load error:', error);
        setTransportCounts({ car: 0, bike: 0, public: 0, walk: 0 });
      }
    };
    loadData();
  }, []);

  // Save updated counts to file
  const handleSave = async () => {
    if (!selectedOption) {
      Alert.alert('Please select a transportation option before saving.');
      return;
    }
    try {
      // Increment selected option count
      const newCounts = {
        ...transportCounts,
        [selectedOption]: transportCounts[selectedOption] + 1,
      };
      setTransportCounts(newCounts);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newCounts));
      Alert.alert(
        'Saved',
        `${capitalize(selectedOption)} count incremented to ${newCounts[selectedOption]}`
      );
      setSelectedOption(null); // reset selection after save
    } catch (error) {
      console.log('Save error:', error);
      Alert.alert('Error saving data');
    }
  };

  // Helper for display text capitalization
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Journal</Text>
      <Text style={styles.label}>Select your transportation choice:</Text>
      <View style={styles.optionsContainer}>
        {['car', 'bike', 'public', 'walk'].map((option) => (
          <Pressable
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.optionButtonSelected,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.optionTextSelected,
              ]}
            >
              {capitalize(option)} ({transportCounts[option]})
            </Text>
          </Pressable>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#4CAF50',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#E8F5E9',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#2E7D32',
  },
  optionText: {
    color: '#1B5E20',
    fontWeight: '600',
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#E8F5E9',
  },
  saveButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#4CAF50',
    fontWeight: '700',
    fontSize: 18,
  },
});
