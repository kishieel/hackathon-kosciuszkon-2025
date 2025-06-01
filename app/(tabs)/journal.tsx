import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import dataJson from '../data/data.json';

export default function JournalPage() {
  const [transportData, setTransportData] = useState({
    car: dataJson.car,
    bike: dataJson.bike,
    public: dataJson.public,
    walk: dataJson.walk,
  });
  const [transportOptions, setTransportOptions] = useState({
    car: false,
    bike: false,
    public: false,
    walk: false,
  });

  const [diet, setDiet] = useState('');
  const [notes, setNotes] = useState('');

  const toggleTransportOption = (option: string) => {
  setTransportOptions((prevOptions) => {
    const wasSelected = prevOptions[option];
    const newSelection = !wasSelected;

    if (newSelection) {
      // Increment count when newly selected
      setTransportData((prevData) => ({
        ...prevData,
        [option]: prevData[option] + 1,
      }));
    }

    return {
      ...prevOptions,
      [option]: newSelection,
    };
  });
};

  const handleSave = () => {
    const selectedTransport = Object.entries(transportOptions)
      .filter(([_, isSelected]) => isSelected)
      .map(([option]) => option)
      .join(', ');
    
    const jsonify = JSON.stringify(transportData)
    FileSystem.writeAsStringAsync('../data/data.json', jsonify)
    Alert.alert(JSON.stringify(FileSystem.documentDirectory))
    Alert.alert(jsonify, "1")
    Alert.alert(JSON.stringify(dataJson), "2")

    const summary = `
      Transport: ${selectedTransport || null}
      Diet: ${diet || null}
      Notes: ${notes || null}
    `;

    Alert.alert("Entry saved.", summary.trim());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Journal</Text>
        <View style={styles.checkboxGroup}>
          <Text style={styles.label}>Transportation choice:</Text>
          {Object.entries(transportOptions).map(([key, value]) => (
            <Pressable
              key={key}
              style={styles.checkboxRow}
              onPress={() => toggleTransportOption(key)}>
              <View style={[styles.checkbox, value && styles.checkedCheckbox]} />
              <Text style={styles.checkboxLabel}>
                {{
                  car: 'Car',
                  bike: 'Bike',
                  public: 'Public Transport',
                  walk: 'Walk',
                }[key]}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.label}>Food choices:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Describe your diet:"
          value={diet}
          onChangeText={setDiet}
          multiline
        />
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write additional thought here"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 30,
  },
  gradient: {
    flex: 1,
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
  checkboxLabel: {
    fontSize: 16,
    color: '#F1F8E9',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#4CAF50',
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
  checkboxGroup: {
    marginTop: 12,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#2E7D32',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  }
});