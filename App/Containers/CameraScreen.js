import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import ReactNativeCamera from 'react-native-camera';
import Camera from '../Components/Camera';
import Button from '../Components/Button';
import styles from './Styles/CameraScreenStyles';
import { gql, graphql } from 'react-apollo';
import uploadPhoto from '../Services/PhotoUpload';

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
    isUploading: false
  };

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

    try {
      const image = await uploadPhoto(currentPicture);
      this.setState({ isUploading: true });

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

  setCurrentPicture = currentPicture => {
    this.setState({ currentPicture, isShowingPreview: true });
  };

  takePicture = () => {
    this.camera.takePicture();
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => (this.camera = cam)}
          onPicture={this.setCurrentPicture}
          onClose={() => this.props.navigation.goBack()}
        />
        <View style={styles.shutterControls}>
          <TouchableOpacity
            style={styles.cameraShutter}
            onPress={this.takePicture}
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
