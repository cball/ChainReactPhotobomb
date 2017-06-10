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
import { gql, graphql } from 'react-apollo';

// TODO: react-native-config
const FILE_UPLOAD_API =
  'https://api.graph.cool/file/v1/cj3g3v2hp18ag01621354vr2y';

const createPhoto = gql`
 mutation createPhoto($fileId: ID!) {
    createPhoto(fileId: $fileId) {
      id
      file {
        id
        url
      }
    }
  }
 `;

class CameraScreen extends Component {
  state = {
    currentPicture: {},
    isShowingPreview: false,
    isUploading: false,
    camera: {
      type: Camera.constants.Type.back
    }
  };

  defaultProps = {
    camera: null
  };

  /**
   * Switches between front <-> back cameras when taking a picture.
   */
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

    this.setState({ currentPicture, isShowingPreview: true });
  }

  /**
   * Closes the preview modal.
   */
  closePreview = () => {
    this.setState({ isShowingPreview: false });
  };

  /**
   * Uploads the current picture to the API.
   */
  uploadPicture = async () => {
    const { currentPicture } = this.state;
    const pictureData = {
      uri: currentPicture.path,
      name: 'photo.jpg',
      filename: 'photo.jpg',
      type: 'image/jpg'
    };

    let formData = new FormData();

    formData.append('data', pictureData);

    /**
     * NOTE: for upload to work right on Android platform, we MUST provide a
     * boundry in the Content-Type header.
     */
    const fetchOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; boundary=asdf'
      },
      body: formData
    };
    try {
      this.setState({ isUploading: true });
      const result = await fetch(FILE_UPLOAD_API, fetchOptions);
      const image = await result.json();

      await this.props.createPhoto({
        variables: {
          fileId: image.id
        }
      });

      this.props.navigation.goBack();
    } catch (e) {
      alert(e);
    } finally {
      this.setState({ isUploading: false });
    }
  };

  componentWillUnmount() {
    this.camera = null;
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
          captureTarget={Camera.constants.CaptureTarget.temp}
          mirrorImage={false}
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
              <TouchableOpacity onPress={this.closePreview}>
                <Text>X</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 24 }}>Choose a Rockin Frame</Text>
              <View style={{ flex: 1 }}>
                <Image
                  style={{ height: '100%' }}
                  source={{ uri: this.state.currentPicture.path }}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: 'green' }} />
              <View style={{ padding: 10 }}>
                <Button
                  text={
                    this.state.isUploading ? 'Uploading...' : "Let's Do This."
                  }
                  style={{ width: 100 }}
                  onPress={this.uploadPicture}
                />
              </View>
            </View>}
        </Modal>
      </View>
    );
  }
}

export default graphql(createPhoto, { name: 'createPhoto' })(CameraScreen);
