import React, { Component } from 'react';
import { Image, PanResponder, Animated, StyleSheet } from 'react-native';
import { createResponder } from 'react-native-gesture-responder';

class TransformableImage extends Component {
  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1.05)
  };

  componentWillMount() {
    this._panResponder = createResponder({
      onStartShouldSetResponder: () => true,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onResponderTerminationRequest: () => false,

      onResponderGrant: () => {
        this._setInitialPosition();
        this._animateIn();
      },

      onResponderMove: (evt, gestureState) => {
        if (gestureState.pinch) {
          return this._processPinch.call(this, evt, gestureState);
        }

        this._processTouch.call(this, evt, gestureState);
      },

      onResponderRelease: (evt, gestureState) => {
        this.state.pan.flattenOffset();
        if (!gestureState.pinch) this._animateBack();
      },
      onResponderTerminate: (evt, gestureState) => {},

      debug: false
    });

    this._animateBack();
  }

  _processTouch = Animated.event([
    null,
    {
      dx: this.state.pan.x,
      dy: this.state.pan.y
    }
  ]);

  _processPinch = (event, gestureState) => {
    const { pinch, previousPinch } = gestureState;
    const currentScale = this.state.scale._value;
    const scaleAmount = pinch / previousPinch;
    this.state.scale.setValue(currentScale * scaleAmount);
  };

  _animateBack() {
    const options = {
      toValue: this.state.scale._value - 0.05,
      friction: 3
    };

    Animated.spring(this.state.scale, options).start();
  }

  _animateIn() {
    const options = {
      toValue: this.state.scale._value + 0.05,
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
        style={[styles.container, this.props.style, { transform }]}
        {...this._panResponder}
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
