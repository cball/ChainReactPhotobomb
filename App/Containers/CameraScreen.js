import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  PanResponder,
  Dimensions
} from 'react-native';
import ReactNativeCamera from 'react-native-camera';
import Camera from '../Components/Camera';
import Button from '../Components/Button';
import styles from './Styles/CameraScreenStyles';
import { gql, graphql } from 'react-apollo';
import uploadPhoto from '../Services/PhotoUpload';
import PropPicker from '../Components/PropPicker';
import TransformableImage from '../Components/TransformableImage';

class CameraScreen extends Component {
  state = {
    currentPicture: {},
    isShowingPreview: false,
    isUploading: false,
    propImages: []
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

  addPropToPicture = propImage => {
    const propImages = [...this.state.propImages, propImage];

    this.setState({ propImages });
  };

  renderPropImages = () => {
    return this.state.propImages.map((propImage, index) => {
      const key = `${propImage}-${index}`;

      return (
        <TransformableImage key={key}>
          <Image source={propImage} resizeMode="cover" />
        </TransformableImage>
      );
    });
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
                >
                  {this.renderPropImages()}
                </Image>
              </View>

              <PropPicker onPickProp={this.addPropToPicture} />

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

export default graphql(createPhoto, { name: 'createPhoto' })(CameraScreen);
