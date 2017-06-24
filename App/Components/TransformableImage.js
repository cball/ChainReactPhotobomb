import React, { Component } from 'react';
import { Image, PanResponder, Animated, StyleSheet } from 'react-native';
import { createResponder } from 'react-native-gesture-responder';

class TransformableImage extends Component {
  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1.05)
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        this._setInitialPosition();
        this._animateIn();
      },

      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),

      onPanResponderRelease: () => {
        // prevent jumpiness the next time we drag
        this.state.pan.flattenOffset();
        this._animateBack();
      }
    });

    this._animateBack();
  }

  _animateBack() {
    const options = {
      toValue: 1,
      friction: 3
    };

    Animated.spring(this.state.scale, options).start();
  }

  _animateIn() {
    const options = {
      toValue: 1.05,
      friction: 3
    };

    Animated.spring(this.state.scale, options).start();
  }

  _setInitialPosition() {
    this.state.pan.setOffset({
      x: this.state.pan.x._value,
      y: this.state.pan.y._value
    });

    this.state.pan.setValue({
      x: 0,
      y: 0
    });
  }

  render() {
    const transform = this.state.pan.getTranslateTransform();
    transform.push({ scale: this.state.scale });

    return (
      <Animated.View
        style={[styles.container, { transform }]}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  }
});

export default TransformableImage;
