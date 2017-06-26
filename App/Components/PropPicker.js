import React, { Component } from 'react';
import { Colors, Images } from '../Themes';
import { TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';

class PropPicker extends Component {
  static defaultProps = {
    onPickProp: () => {},
    style: {},
    propImageContainerStyle: {},
    propImageStyle: {}
  };

  state = {
    selectedProp: null
  };

  selectProp = selectedProp => {
    this.props.onPickProp(selectedProp);
  };

  renderPropImage = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.propContainer, this.props.propImageContainerStyle]}
        onPress={() => this.selectProp(item)}
      >
        <Image
          source={item}
          style={[styles.prop, this.props.propImageStyle]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={[styles.container, this.props.style]}
        data={Images.props}
        renderItem={this.renderPropImage}
        horizontal={true}
        keyExtractor={item => item}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  prop: {
    width: 80,
    height: 80
  },
  propContainer: {
    backgroundColor: 'white',
    padding: 4,
    margin: 4
  }
});

export default PropPicker;
