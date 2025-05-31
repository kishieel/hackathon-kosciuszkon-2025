import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function JournalPage() {
  const [transportOptions, setTransportOptions] = useState({
    car: false,
    bike: false,
    public: false,
    walk: false,
  });

  const [diet, setDiet] = useState('');
  const [notes, setNotes] = useState('');

  const toggleTransportOption = (option: string) => {
    setTransportOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSave = () => {
    const selectedTransport = Object.entries(transportOptions)
      .filter(([_, isSelected]) => isSelected)
      .map(([option]) => option)
      .join(', ');

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
          placeholder="Placeholder"
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
    paddingHorizontal: 30,
    paddingVertical: 0,
    marginBottom: 30,
  },
  gradient: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  checkboxGroup: {
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
    borderRadius: 4,
  },
  checkedCheckbox: {
    backgroundColor: '#333',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F1F8E9',
    borderRadius: 15,
    padding: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
    textAlign: 'center',
  },
});
