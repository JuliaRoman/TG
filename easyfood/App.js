import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
/**import { AppRoutes} from '../src/componentes/Cadastro.js'**/

import BuscaNome from './src/telas/BuscaNome';

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar />
        <BuscaNome />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}