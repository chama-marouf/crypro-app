import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BiometricScreen from '../screens/BiometricScreen';
import MarketOverviewScreen from '../screens/MarketOverviewScreen';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Biometric">
      <Stack.Screen name="Biometric" component={BiometricScreen} />
      <Stack.Screen name="MarketOverview" component={MarketOverviewScreen} />
      <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
