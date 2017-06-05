import React, { Component } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import Camera from 'react-native-camera';
import CameraShutter from '../Components/CameraShutter';

import styles from './Styles/CameraScreenStyles';

class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      camera: {
        type: Camera.constants.Type.back
      }
    };
  }

  switchCameraType() {
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType
      }
    });
  }

  takePicture() {
    this.camera
      .capture()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => (this.camera = cam)}
          style={{ flex: 2, justifyContent: 'space-between', padding: 12 }}
          aspect={Camera.constants.Aspect.fill}
          type={this.state.camera.type}
          captureTarget={Camera.constants.CaptureTarget.disk}
        >
          <TouchableOpacity
            style={{ backgroundColor: 'transparent' }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: 'white' }}>[BACK]</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
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
        </Camera>

        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            style={styles.cameraShutter}
            onPress={this.takePicture.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default CameraScreen;
