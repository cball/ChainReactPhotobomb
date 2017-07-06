import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Modal,
  AsyncStorage
} from 'react-native';
import styles from './Styles/HomeScreenStyles';
import { Images, Colors, Metrics } from '../Themes';
import { gql, graphql } from 'react-apollo';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EULA from '../Components/EULA';

export const allPhotosQuery = gql`
  query {
    allPhotos(filter: { flagged: false }, orderBy: createdAt_DESC) {
      id
      flagged
      createdAt
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
        mutation_in: [CREATED, UPDATED]
      }
    ) {
      mutation
      node {
        id
        flagged
        createdAt
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
const EULA_STORAGE_KEY = '@Photobomb:EULA';

class HomeScreen extends Component {
  state = {
    refreshing: false,
    hasSeenEULA: true
  };

  constructor(props) {
    super(props);
    this.subscription = null;
    this.setHasSeenEULA();
  }

  setHasSeenEULA = async () => {
    const value = await AsyncStorage.getItem(EULA_STORAGE_KEY);
    if (!value) {
      this.setState({ hasSeenEULA: false });
    }
  };

  componentWillReceiveProps(nextProps) {
    this._subscribeToNewPhotos(nextProps);
  }

  refreshCollection = async () => {
    const { allPhotosQuery } = this.props;

    this.setState({ refreshing: true });
    await allPhotosQuery.refetch();
    this.setState({ refreshing: false });
  };

  collectPicture = () => {
    const options = {
      title: 'Choose your Photobomb',
      mediaType: 'photo',
      allowsEditing: false,
      storageOptions: {
        skipBackup: true,
        cameraRoll: false,
        noData: true
      }
    };

    ImagePicker.showImagePicker(options, this.handleImagePickerResponse);
  };

  handleImagePickerResponse = response => {
    if (response.didCancel) {
      return;
    } else if (response.error) {
      return;
    }

    this.props.navigation.navigate('CameraScreen', response);
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

    if (error) {
      debugger;
    }

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

  agreeToEULA = () => {
    AsyncStorage.setItem(EULA_STORAGE_KEY, `yep`);
    this.setState({ hasSeenEULA: true });
  };

  renderEULA() {
    return (
      <View style={styles.modalBackground}>
        <Modal
          transparent={true}
          animationType="slide"
          onRequestClose={() => {}}
        >
          <EULA onAgree={this.agreeToEULA} />
        </Modal>
      </View>
    );
  }

  render() {
    const { hasSeenEULA } = this.state;

    return (
      <View style={styles.container}>
        {this.renderPhotos()}
        <View style={styles.cameraBar} />

        <TouchableHighlight
          underlayColor={Colors.darkPurple}
          style={styles.cameraButton}
          onPress={this.collectPicture}
        >
          <Icon name="photo-camera" style={styles.cameraIcon} />
        </TouchableHighlight>

        {!hasSeenEULA && this.renderEULA()}
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
  const isUpdate = subscriptionData.data.Photo.mutation === 'UPDATED';
  const newPhoto = subscriptionData.data.Photo.node;

  // Remove the item from the list if it was flagged
  if (isUpdate && newPhoto.flagged) {
    const index = previousState.allPhotos.findIndex(p => p.id === newPhoto.id);
    if (index >= 0) {
      const allPhotos = [...previousState.allPhotos];
      allPhotos.splice(index, 1);

      return { allPhotos };
    }
    return { allPhotos: previousState.allPhotos };
  }

  // Otherwise, put it at the beginning
  const allPhotos = [newPhoto, ...previousState.allPhotos];

  return {
    allPhotos
  };
};

export default graphql(allPhotosQuery, { name: 'allPhotosQuery' })(HomeScreen);
