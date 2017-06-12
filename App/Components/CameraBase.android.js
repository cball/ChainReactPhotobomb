import React, { Component } from 'react';
import Camera from 'react-native-camera-android-simple';
import { ApplicationStyles } from '../Themes';

class CameraBase extends Component {
  defaultProps = {
    type: 'front'
  };

  capture() {
    return this.camera.capture();
  }

  render() {
    return (
      <Camera
        ref={instance => (this.camera = instance)}
        type={this.props.type}
        style={ApplicationStyles.fullScreen}
      />
    );
  }
}

export default CameraBase;
