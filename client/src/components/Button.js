import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

export const Button = ({ label, onPress }) => (
  <TouchableRipple style={styles.buttonContainer} onPress={onPress} centered>
    <Text style={styles.label}>{label}</Text>
  </TouchableRipple>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#2f363d',
    padding: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#0366d6',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
