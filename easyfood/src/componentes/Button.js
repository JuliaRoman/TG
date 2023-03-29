import React from 'react';
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';

export default function Button(props) {
  const { onPress, title = 'teste', style } = props;
  return (
    <Pressable style={styles.button} onPress={() => Alert.alert('Cadastrado!')}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E7320E',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    borderRadius: 50,
    height: 50,
    marginLeft: 50,
    marginBottom: 5,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
  },
});
