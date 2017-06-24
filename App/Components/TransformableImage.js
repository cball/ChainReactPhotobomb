import React, { Component } from 'react';
import { Image, PanResponder, Animated, StyleSheet } from 'react-native';
import { createResponder } from 'react-native-gesture-responder';

class TransformableImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      scale: 1
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({
          x: 0,
          y: 0
        });
        // this.state.pan.setOffset({
        //   x: this.state.pan.x._value,
        //   y: this.state.pan.y._value
        // });
        // this.state.pan.setValue({ x: 0, y: 0 });
        // Animated.spring(this.state.scale, {
        //   toValue: 1.1,
        //   friction: 3
        // }).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x, // x,y are Animated.Value
          dy: this.state.pan.y
        }
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        // Flatten the offset to avoid erratic behavior
        // this.state.pan.flattenOffset();
        // Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
      }
    });
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, this.state.pan.getLayout()]}
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
