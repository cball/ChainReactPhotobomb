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
  switchCameraType() {
    let newType;

    if (this.state.type === 'back') {
      newType = 'front';
    } else if (this.state.type === 'front') {
      newType = 'back';
    }

    this.setState({
      type: newType
    });
  }

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

  renderPlatformCamera() {
    return Platform.select({
      ios: this.renderCamera(),
      android: this.renderAndroidCamera()
    });
  }

  renderCamera() {
    const type = ReactNativeCamera.constants.Type[this.state.type];
    const captureTarget = ReactNativeCamera.constants.CaptureTarget.temp;

    return (
      <ReactNativeCamera
        ref={instance => (this.camera = instance)}
        style={ApplicationStyles.fullScreen}
        type={type}
        captureTarget={captureTarget}
      />
    );
  }

  renderAndroidCamera() {
    return (
      <AndroidCamera
        ref={instance => (this.camera = instance)}
        style={ApplicationStyles.fullScreen}
        type={this.state.type}
      />
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: 'black', flex: 2 }}>
        <CameraBase
          ref={instance => (this.camera = instance)}
          type={this.state.type}
        />
        <View
          style={[
            ...ApplicationStyles.fullScreen,
            {
              justifyContent: 'space-between',
              padding: 12
            }
          ]}
        >
          <TouchableOpacity
            style={{ backgroundColor: 'transparent' }}
            onPress={this.props.onClose}
          >
            <Text style={{ color: 'white' }}>[BACK]</Text>
          </TouchableOpacity>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{ color: 'white', backgroundColor: 'transparent' }}
              onPress={this.switchCameraType.bind(this)}
            >
              [SWITCH]
            </Text>
            <Text
              style={{ color: 'white', backgroundColor: 'transparent' }}
              onPress={() => {}}
            >
              [FLASH]
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Camera;
