import React, { Component } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/HomeScreenStyles';
import { Images, Colors } from '../Themes';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.purple} />
        <View style={styles.contentWrapper}>
          <Image source={Images.portland} style={styles.backgroundImage} />
          <Image source={Images.logo} style={styles.logo} />
          <Text style={styles.appName}>Photobomb!</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('PhotosScreen')}
            >
              <Text style={styles.button}>Photos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cameraBar}>
          <Text
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CameraScreen')}
          >
            [O]
          </Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
