/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import 'react-native-gesture-handler';



export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}