import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './Styles/PhotoDetailScreenStyles';

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

        <Text onPress={() => navigation.goBack(null)} style={styles.close}>
          X
        </Text>
      </View>
    );
  }
}

export default PhotoDetailScreen;
