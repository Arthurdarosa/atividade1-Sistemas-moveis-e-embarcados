import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './home'
import LocationListScreen from './locationList'
import LocationDetailsScreen from './locationDetails'
import FavoritesScreen from './FavLocation'
import PassesScreen from './passes'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AtricoesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="locationList" component={LocationListScreen} />
      <Stack.Screen name="locationDetails" component={LocationDetailsScreen} options={{ title: 'Detalhes' }} />
    </Stack.Navigator>
  );
}

function FavStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavLocation" component={FavoritesScreen} />
      <Stack.Screen name="locationDetails" component={LocationDetailsScreen} options={{ title: 'Detalhes' }} />

    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="locationList" component={AtricoesStack} />
    <Drawer.Screen name="FavLocation" component={FavStack} />
    <Drawer.Screen name="Passes" component={PassesScreen} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}