import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/HomeScreenStyles';
import { Images } from '../Themes';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.portland} style={styles.backgroundImage} />
        <Image source={Images.logo} style={styles.logo} />
        <Text style={styles.appName}>Photobomb!</Text>

        <View style={styles.buttons}>
          {/*<TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>*/}

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
