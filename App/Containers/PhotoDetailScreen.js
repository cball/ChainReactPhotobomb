import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import styles from './Styles/PhotoDetailScreenStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { gql, graphql } from 'react-apollo';

class PhotoDetailScreen extends Component {
  state = {
    isLoading: false,
    isFlagging: false
  };

  renderLoading() {
    return <View style={styles.loadingContainer}><ActivityIndicator /></View>;
  }

  flagPhoto = async () => {
    const { navigation } = this.props;
    const { photo } = navigation.state.params;

    try {
      this.setState({ isFlagging: true });
      await this.props.mutate({
        variables: {
          photoId: photo.id
        }
      });

      this.props.navigation.goBack(null);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { navigation } = this.props;
    const { photo } = navigation.state.params;
    const { isLoading, isFlagging } = this.state;

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

        <TouchableOpacity onPress={this.flagPhoto} style={styles.flag}>
          <Icon name="flag" style={styles.flagIcon} />
          <Text style={styles.flagText}>
            {isFlagging ? 'Flagging...' : 'Flag as inappropriate'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const flagPhotoMutation = gql`
  mutation updatePhoto($photoId: ID!) {
    updatePhoto(id: $photoId, flagged: true) {
      id
      flagged
    }
  }
`;

export default graphql(flagPhotoMutation)(PhotoDetailScreen);
