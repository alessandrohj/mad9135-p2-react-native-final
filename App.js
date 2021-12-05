import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NativeBaseProvider, Box, Container, VStack } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Trending from './components/screens/Trending';
// import AppBar from './components/AppBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Favorites from './components/screens/Favorites';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Trending} options={{
            tabBarIcon: ({ focused, size, color }) => (<Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />)}} />
          <Tab.Screen name="Find" component={Favorites}  options={{
            tabBarIcon: ({ focused, size, color }) => (<Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />)}}/>
          <Tab.Screen name="Favorites" component={Favorites}  options={{
            tabBarIcon: ({ focused, size, color }) => (<Ionicons name={focused ? 'star' : 'star-outline'} size={size} color={color} />) }}/>
          <Tab.Screen name="Profile" component={Favorites}  options={{
            tabBarIcon: ({ focused, size, color }) => (<Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />) }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabs:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  }
});
