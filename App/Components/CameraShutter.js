import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

class CameraShutter extends Component {
  render() {
    const { width, height, borderWidth } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, width, height, borderWidth]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#ccc',
    borderWidth: 10
  }
});

export default CameraShutter;
