import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import Camera from 'react-native-camera';
import CameraShutter from '../Components/CameraShutter';
import Button from '../Components/Button';

import styles from './Styles/CameraScreenStyles';

class CameraScreen extends Component {
  state = {
    currentPicture: {},
    isShowingPreview: false,
    camera: {
      type: Camera.constants.Type.back
    }
  };

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

  async takePicture() {
    let currentPicture;

    try {
      currentPicture = await this.camera.capture();
    } catch (e) {
      alert(e);
      return;
    }

    this.setState({ currentPicture, isShowingPreview: true });
  }

  closeImagePreview = () => {
    this.setState({ isShowingPreview: false });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => (this.camera = cam)}
          style={{ flex: 2, justifyContent: 'space-between', padding: 12 }}
          aspect={Camera.constants.Aspect.fill}
          type={this.state.camera.type}
          captureTarget={Camera.constants.CaptureTarget.temp}
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

        <Modal visible={this.state.isShowingPreview} onRequestClose={() => {}}>
          {this.state.currentPicture.path &&
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.closeImagePreview}>
                <Text>X</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 20 }}>Choose a Rockin Frame</Text>
              <View style={{ flex: 1 }}>
                <Image
                  style={{ height: '100%' }}
                  source={{ uri: this.state.currentPicture.path }}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: 'green' }} />
              <View style={{ padding: 10 }}>
                <Button text="Do it" style={{ width: 100 }} />
              </View>
            </View>}
        </Modal>
      </View>
    );
  }
}

export default CameraScreen;
