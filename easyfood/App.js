import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './src/telas/Cadastro.js';
import Inicial from './src/telas/Inicial.js';
import BuscaNome from './src/telas/BuscaNome.js';
import Receita from './src/telas/Receita.js';
import BuscaIngrediente from './src/telas/BuscaIngrediente.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial">
          <Stack.Screen name="Inicial" options={{headerShown:false}} component={Inicial} />
          <Stack.Screen name="Cadastro" options={{headerShown:false}} component={Cadastro} />
          <Stack.Screen name="Busca por ingrediente" options={{headerShown:false}} component={BuscaIngrediente} />
          <Stack.Screen name="Busca por nome" component={BuscaNome} />
          <Stack.Screen name="Receita" component={Receita} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayNone: {
    header: null,
  }
});