import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import CameraBase from './CameraBase';
import { ApplicationStyles } from '../Themes';

class Camera extends Component {
  state = {
    type: 'front'
  };

  defaultProps = {
    onPicture: () => {},
    onClose: () => {}
  };

  /**
   * Switches between front <-> back cameras when taking a picture.
   */
  switchCameraType = () => {
    let newType;

    if (this.state.type === 'back') {
      newType = 'front';
    } else if (this.state.type === 'front') {
      newType = 'back';
    }

    this.setState({
      type: newType
    });
  };

  /**
   * Takes a picture, sets currentPicture to the captured image, and shows 
   * a preview of it.
   */
  async takePicture() {
    let currentPicture;

    try {
      currentPicture = await this.camera.capture();
    } catch (e) {
      alert(e);
      return;
    }

    this.props.onPicture(currentPicture);
  }

  render() {
    return (
      <View style={styles.cameraContainer}>
        <CameraBase
          ref={instance => (this.camera = instance)}
          type={this.state.type}
        />
        <View style={styles.cameraControls}>
          <TouchableOpacity onPress={this.props.onClose}>
            <Text style={styles.cameraControl}>[BACK]</Text>
          </TouchableOpacity>

          <View style={styles.cameraControlBottom}>
            <Text style={styles.cameraControl} onPress={this.switchCameraType}>
              [SWITCH]
            </Text>
            <Text style={styles.cameraControl} onPress={() => {}}>
              [FLASH]
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    backgroundColor: 'black',
    flex: 2
  },
  cameraControls: {
    ...ApplicationStyles.fullScreen,
    justifyContent: 'space-between',
    padding: 12
  },
  cameraControl: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  cameraControlBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Camera;
