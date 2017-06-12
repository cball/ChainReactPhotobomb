import React, { Component } from 'react';
import Camera from 'react-native-camera';
import { ApplicationStyles } from '../Themes';

class CameraBase extends Component {
  defaultProps = {
    type: 'front'
  };

  capture() {
    return this.camera.capture();
  }

  render() {
    const type = Camera.constants.Type[this.props.type];
    const captureTarget = Camera.constants.CaptureTarget.temp;

    return (
      <Camera
        ref={instance => (this.camera = instance)}
        type={type}
        style={ApplicationStyles.fullScreen}
        captureTarget={captureTarget}
      />
    );
  }
}

export default CameraBase;
