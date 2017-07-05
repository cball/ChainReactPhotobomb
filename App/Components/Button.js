import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../Themes';

class Button extends Component {
  static propTypes = {};

  static defaultProps = {
    text: 'Submit',
    onPress: () => {}
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this.props.onPress}
      >
        <Text style={[styles.button, this.props.style]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.red,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 2
  },
  button: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center'
  }
});

export default Button;
