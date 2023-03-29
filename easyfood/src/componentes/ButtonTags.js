import React from 'react';
import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';

export default function ButtonTags(props) {
  const { onPress, title = 'teste' } = props;
  return (
    <Pressable style={styles.button} onPress={() => Alert.alert('Categoria selecionada')}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6B6B6B',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    borderRadius: 50,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginBottom: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
});
