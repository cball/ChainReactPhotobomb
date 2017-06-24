import React, { Component } from 'react';
import { Colors, Images } from '../Themes';
import { TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

class PropPicker extends Component {
  static defaultProps = {
    onPickProp: () => {}
  };

  state = {
    selectedProp: null
  };

  selectProp = selectedProp => {
    this.props.onPickProp(selectedProp);
  };

  renderPropImages() {
    return Images.props.map((image, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => this.selectProp(image)}>
          <Image source={image} style={styles.prop} resizeMode="contain" />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.container, this.props.style]}>
        {this.renderPropImages()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  prop: {
    width: 80,
    height: 80,
    margin: 4
  }
});

export default PropPicker;
