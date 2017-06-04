import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import AppNavigation from '../Navigation/AppNavigation';
import styles from './Styles/AppStyles';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AppNavigation />
      </View>
    );
  }
}

export default App;
