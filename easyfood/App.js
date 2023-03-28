import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
/**import { AppRoutes} from '../src/componentes/Cadastro.js'**/

import Inicial from './src/telas/Inicial.js';

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar />
        <Inicial />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}