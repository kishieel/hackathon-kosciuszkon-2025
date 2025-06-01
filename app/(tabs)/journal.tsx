import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function EcoServicesApp() {
  const fileUri = FileSystem.documentDirectory + 'data.json';

  // State for counts loaded from file
  const [transportCounts, setTransportCounts] = useState({
    car: 0,
    bike: 0,
    public: 0,
    walk: 0,
  });

  // Which options are currently selected by user (multi-select)
  const [selectedOptions, setSelectedOptions] = useState({
    car: false,
    bike: false,
    public: false,
    walk: false,
  });

  // Diet and notes text inputs (for future use)
  const [diet, setDiet] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(true);

  // Load saved counts from file on mount
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
      } catch (error) {
        console.log('Load error:', error);
        setTransportCounts({ car: 0, bike: 0, public: 0, walk: 0 });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Toggle selection for a transport option (multi-select)
  const toggleOption = (key: keyof typeof selectedOptions) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save: increment count for all selected options, save to file, clear selections
  const handleSave = async () => {
    try {
      const newCounts = { ...transportCounts };
      Object.entries(selectedOptions).forEach(([key, selected]) => {
        if (selected) {
          newCounts[key as keyof typeof newCounts] += 1;
        }
      });

      // Save to file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newCounts));
      setTransportCounts(newCounts);

      // Clear selections after save
      setSelectedOptions({
        car: false,
        bike: false,
        public: false,
        walk: false,
      });

      Alert.alert('Data saved', JSON.stringify(newCounts));
    } catch (e) {
      Alert.alert('Error saving data');
      console.log('Save error:', e);
    }
  };

  // Transport options for UI
  const transportOptions = [
    { key: 'car', label: 'Car' },
    { key: 'bike', label: 'Bike' },
    { key: 'public', label: 'Public Transport' },
    { key: 'walk', label: 'Walk' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <LinearGradient
        colors={['#81C784', '#4CAF50', '#2E7D32']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Journal</Text>

            {/* Transport choice multi-select checkboxes */}
            <Text style={styles.label}>Transportation choice:</Text>
            <View style={styles.checkboxGroup}>
              {transportOptions.map(({ key, label }) => (
                <Pressable
                  key={key}
                  style={styles.checkboxRow}
                  onPress={() => toggleOption(key as keyof typeof selectedOptions)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedOptions[key as keyof typeof selectedOptions] && styles.checkedCheckbox,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>{label}</Text>
                </Pressable>
              ))}
            </View>

            {/* Diet input */}
            <Text style={styles.label}>Food choices:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Describe your diet:"
              value={diet}
              onChangeText={setDiet}
              multiline
            />

            {/* Notes input */}
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Write additional thought here"
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            {/* Save button */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4CAF50' },
  gradient: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: '#E8F5E9',
    marginBottom: 8,
  },
  checkboxGroup: { marginBottom: 20 },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  checkedCheckbox: {
    backgroundColor: '#2E7D32',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#F1F8E9',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    textAlignVertical: 'top',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#4CAF50',
  },
  panel: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  statBox: {
    marginBottom: 10,
  },
  statText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
