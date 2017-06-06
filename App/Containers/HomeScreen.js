import React, { Component } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Styles/HomeScreenStyles';
import { Images, Colors } from '../Themes';
import Button from '../Components/Button';
import { gql, graphql } from 'react-apollo';

const allPhotosQuery = gql`
  query {
    allFiles(orderBy: createdAt_DESC) {
      id
      url
    }
  }
`;

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.purple} />

        {this.renderPhotos()}

        <View style={styles.cameraBar}>
          <Text
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CameraScreen')}
          >
            [O]
          </Text>
        </View>
      </View>
    );
  }

  renderPhotos() {
    let { loading, error, allFiles } = this.props.allPhotosQuery;

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
      <View
        style={[
          styles.contentWrapper,
          { flexDirection: 'row', flexWrap: 'wrap' }
        ]}
      >
        <Image source={Images.portland} style={styles.backgroundImage} />
        {allFiles.map(p => {
          return (
            <Image
              style={{ width: 100, height: 100 }}
              key={p.id}
              source={{ uri: p.url }}
            />
          );
        })}
      </View>
    );
  }
}

const HomeScreenWithData = graphql(allPhotosQuery, { name: 'allPhotosQuery' })(
  HomeScreen
);
export default HomeScreenWithData;
