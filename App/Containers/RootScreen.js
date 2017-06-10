import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigation from '../Navigation/AppNavigation';
import styles from './Styles/RootScreenStyles';
import { Colors } from '../Themes';

class RootScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.purple} />
        <AppNavigation />
      </View>
    );
  }
}

export default RootScreen;
