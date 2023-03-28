import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createNativeStackNavigator } from 'native-stack';

import Cadastro from '../telas/Cadastro';
import Inicial from '../telas/Inicial';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export function AppRoutes(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen name="Inicial" component={Inicial}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}