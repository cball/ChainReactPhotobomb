import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList
} from 'react-native';
import styles from './Styles/HomeScreenStyles';
import { Images, Colors, Metrics } from '../Themes';
import Button from '../Components/Button';
import { gql, graphql } from 'react-apollo';

const allPhotosQuery = gql`
  query {
    allPhotos(orderBy: createdAt_DESC) {
      id
      file {
        url
      }
    }
  }
`;

const photosSubscription = gql`
  subscription createPhoto {
    Photo(
      filter: {
        mutation_in: [CREATED]
      }
    ) {
      mutation
      node {
        id
        file {
          url
        }
      }
    }
  }
`;

const PHOTO_MARGIN = 2;
const PHOTO_SIZE = Metrics.screenWidth / 4 - PHOTO_MARGIN * 3;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    this._subscribeToNewPhotos(nextProps);
  }

  _subscribeToNewPhotos(nextProps) {
    this._unsubscribeIfPropsChanged(nextProps);

    if (!this.subscription && !nextProps.allPhotosQuery.loading) {
      this.subscription = nextProps.allPhotosQuery.subscribeToMore({
        document: photosSubscription,
        updateQuery: prependNewPhotos
      });
    }
  }

  _unsubscribeIfPropsChanged(nextProps) {
    if (!this.subscription) return;

    if (this.props.subscriptionParam !== nextProps.subscriptionParam) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.renderPhotos()}

        <View style={styles.cameraBar} />

        <TouchableHighlight
          underlayColor={Colors.darkPurple}
          style={styles.cameraButton}
          onPress={() => this.props.navigation.navigate('CameraScreen')}
        >
          <Text style={{ color: '#fff', fontSize: 24 }}>
            [O]
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderPhotos() {
    let { loading, error, allPhotos } = this.props.allPhotosQuery;

    if (error) {
      return (
        <View style={styles.contentWrapper}>
          <Image source={Images.portland} style={styles.backgroundImage} />
          <Text>ERR>R</Text>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.contentWrapper}>
          <Image source={Images.portland} style={styles.backgroundImage} />
          <Image source={Images.logo} style={styles.logo} />
          <Text style={styles.appName}>Photobomb!</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentWrapper}>
        <Image source={Images.portland} style={styles.backgroundImage} />
        <FlatList
          numColumns="4"
          contentContainerStyle={styles.photoList}
          data={allPhotos}
          renderItem={this.renderPhoto}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

  renderPhoto({ item }) {
    const uri = `${item.file.url.replace('files', 'images')}/300x300`;

    return (
      <Image
        key={item.id}
        source={{ uri }}
        style={{ width: PHOTO_SIZE, height: PHOTO_SIZE, margin: PHOTO_MARGIN }}
      />
    );
  }
}

const prependNewPhotos = (previousState, { subscriptionData }) => {
  const newPhoto = subscriptionData.data.Photo.node;
  const allPhotos = [newPhoto, ...previousState.allPhotos];

  return {
    allPhotos
  };
};

export default graphql(allPhotosQuery, { name: 'allPhotosQuery' })(HomeScreen);
