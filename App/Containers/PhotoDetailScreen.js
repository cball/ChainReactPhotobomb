import React, { Component } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './Styles/PhotoDetailScreenStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

class PhotoDetailScreen extends Component {
  state = {
    isLoading: false
  };

  renderLoading() {
    return <View style={styles.loadingContainer}><ActivityIndicator /></View>;
  }

  render() {
    const { navigation } = this.props;
    const { photo } = navigation.state.params;
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: photo.file.url }}
          resizeMode="contain"
          onLoadStart={() => this.setState({ isLoading: true })}
          onLoadEnd={() => this.setState({ isLoading: false })}
          style={styles.image}
        />

        {isLoading && this.renderLoading()}

        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={styles.close}
        >
          <Icon name="close" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default PhotoDetailScreen;
