import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './src/telas/Cadastro.js';
import Inicial from './src/telas/Inicial.js';
=======
/**import { AppRoutes} from '../src/componentes/Cadastro.js'**/

import BuscaNome from './src/telas/BuscaNome';
>>>>>>> 12f3b77df7a918fe1367169844f2b7d62a8ef3a8

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
<<<<<<< HEAD
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial">
          <Stack.Screen name="Inicial" component={Inicial} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
      </NavigationContainer>
=======
        <BuscaNome />
>>>>>>> 12f3b77df7a918fe1367169844f2b7d62a8ef3a8
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});