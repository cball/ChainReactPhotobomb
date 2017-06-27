import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Button from '../Components/Button';
import styles from './Styles/CameraScreenStyles';
import { gql, graphql } from 'react-apollo';
import uploadPhoto from '../Services/PhotoUpload';
import PropPicker from '../Components/PropPicker';
import TransformableImage from '../Components/TransformableImage';
import { takeSnapshot } from 'react-native-view-shot';
import { Colors } from '../Themes';
import { allPhotosQuery } from './HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CameraScreen extends Component {
  state = {
    currentPicture: {},
    isShowingPreview: false,
    isUploading: false,
    propImages: []
  };

  /**
   * Composes the picture and props as a single image.
   */
  createCompositePicture = async () => {
    const { currentPicture } = this.state;

    try {
      const path = await takeSnapshot(this.imageComponent, {
        format: 'jpeg',
        quality: 1
      });

      return { path };
    } catch (e) {
      // TODO: show nice message
    }
  };

  /**
   * Uploads the current picture to the API.
   */
  uploadPicture = async () => {
    const { currentPicture } = this.state;
    this.setState({ isUploading: true });

    const compositePicture = await this.createCompositePicture();

    try {
      const image = await uploadPhoto(compositePicture || currentPicture);

      await this.props.createPhoto({
        // refetchQueries: [{ query: allPhotosQuery }],
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

  cancelPhotoUpload = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  /**
   * Adds a single prop image to the top of the stack.
   */
  addPropToPicture = propImage => {
    const propImages = [...this.state.propImages, propImage];

    this.setState({ propImages });
  };

  /**
   * Clears all prop images from the current image.
   */
  clearProps = () => {
    this.setState({ propImages: [] });
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

  renderTopControls = () => {
    return (
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={this.cancelPhotoUpload}>
          <Icon name="arrow-back" style={styles.closeButtonText} />
        </TouchableOpacity>

        {this.renderClearLink()}
      </View>
    );
  };

  renderClearLink = () => {
    const hasPropImages = this.state.propImages.length > 0;
    if (!hasPropImages) return;

    return (
      <TouchableOpacity onPress={this.clearProps} style={styles.clearPropsLink}>
        <Icon name="do-not-disturb" style={styles.closeButtonText} />
        <Text style={styles.clearPropsText}>Clear</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const { uri } = navigation.state.params;

    return (
      <View style={styles.container}>
        <View
          style={styles.imageContainer}
          collapsable={false}
          ref={i => (this.imageComponent = i)}
        >
          <Image style={styles.image} source={{ uri }}>
            {this.renderPropImages()}
          </Image>
        </View>

        <View style={styles.propContainer}>
          <Text style={styles.addPropText}>
            Add props to your image!
          </Text>

          <PropPicker onPickProp={this.addPropToPicture} />
        </View>

        <View style={styles.uploadButtonContainer}>
          <Button
            text={this.state.isUploading ? 'Uploading...' : 'Upload'}
            onPress={this.uploadPicture}
          />
        </View>

        {this.renderTopControls()}
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
