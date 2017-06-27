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
import ZoomImage from 'react-native-zoom-image';

export const allPhotosQuery = gql`
  query {
    allPhotos(orderBy: createdAt_DESC) {
      id
      file {
        id
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
          id
          url
        }
      }
    }
  }
`;

const PHOTO_MARGIN = 2;
const PHOTO_SIZE = Metrics.screenWidth / 4 - PHOTO_MARGIN * 3;

class HomeScreen extends Component {
  state = {
    refreshing: false
  };

  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    this._subscribeToNewPhotos(nextProps);
  }

  refreshCollection = async () => {
    const { allPhotosQuery } = this.props;

    this.setState({ refreshing: true });
    await allPhotosQuery.refetch();
    this.setState({ refreshing: false });
  };

  renderError() {
    // TODO: move this to a non-intrusive banner
    return <Text>ERR>R</Text>;
  }

  renderLoading() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image source={Images.logo} style={styles.logo} />
        <Text style={styles.appName}>Photobomb!</Text>
      </View>
    );
  }

  renderPhotoList() {
    const { allPhotos } = this.props.allPhotosQuery;
    const { refreshing } = this.state;

    return (
      <FlatList
        numColumns="4"
        contentContainerStyle={styles.photoList}
        data={allPhotos}
        renderItem={this.renderPhoto}
        keyExtractor={item => item.id}
        onRefresh={this.refreshCollection}
        refreshing={refreshing}
      />
    );
  }

  renderPhotos() {
    const { loading, error } = this.props.allPhotosQuery;
    const { refreshing } = this.state;
    const shouldRenderLoading = !error && loading && !refreshing;
    const shouldRenderPhotoList = !error && !shouldRenderLoading;

    return (
      <View style={styles.contentWrapper}>
        <Image source={Images.portland} style={styles.backgroundImage} />
        {error && this.renderError()}
        {shouldRenderLoading && this.renderLoading()}
        {shouldRenderPhotoList && this.renderPhotoList()}
      </View>
    );
  }

  loadPhoto(photo) {
    this.props.navigation.navigate('PhotoDetailScreen', { photo });
  }

  renderPhoto = ({ item }) => {
    const { id, file } = item;
    const imagePath = file.url.replace('files', 'images');
    // get smallest size possible accounting for 2x dpi
    const roundedSize = Math.ceil(PHOTO_SIZE) * 2;
    const uri = `${imagePath}/${roundedSize}x${roundedSize}`;

    return (
      <TouchableOpacity key={id} onPress={() => this.loadPhoto(item)}>
        <Image
          source={{ uri }}
          style={{
            width: PHOTO_SIZE,
            height: PHOTO_SIZE,
            margin: PHOTO_MARGIN
          }}
        />
      </TouchableOpacity>
    );
  };

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
}

const prependNewPhotos = (previousState, { subscriptionData }) => {
  const newPhoto = subscriptionData.data.Photo.node;
  const allPhotos = [newPhoto, ...previousState.allPhotos];

  return {
    allPhotos
  };
};

export default graphql(allPhotosQuery, { name: 'allPhotosQuery' })(HomeScreen);
