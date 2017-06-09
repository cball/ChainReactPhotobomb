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

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentDidUpdate() {
    console.log('bhaasdf');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.subscriptionParam !== nextProps.subscriptionParam) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (!this.subscription && !nextProps.allPhotosQuery.loading) {
      this.subscription = nextProps.allPhotosQuery.subscribeToMore({
        document: photosSubscription,
        updateQuery: (previousState, { subscriptionData }) => {
          const newPhoto = subscriptionData.data.Photo.node;
          const allPhotos = [newPhoto, ...previousState.allPhotos];

          return {
            allPhotos
          };
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.purple} />

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
    // TODO: move elsewhere so we dont recalc
    const margin = 2;
    const height = Metrics.screenWidth / 4 - margin * 3;
    return (
      <Image
        style={{ width: height, height, margin }}
        key={item.id}
        source={{
          uri: `${item.file.url.replace('files', 'images')}/300x300`
        }}
      />
    );
  }
}

const HomeScreenWithData = graphql(allPhotosQuery, { name: 'allPhotosQuery' })(
  HomeScreen
);
export default HomeScreenWithData;
