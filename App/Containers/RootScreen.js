import React, { Component } from 'react';
import { View, StatusBar, NetInfo, Platform } from 'react-native';
import AppNavigation from '../Navigation/AppNavigation';
import styles from './Styles/RootScreenStyles';
import { Colors } from '../Themes';
import StatusBarAlert from 'react-native-statusbar-alert';

class RootScreen extends Component {
  state = {
    isConnected: true
  };

  constructor(props) {
    super(props);

    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });

    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
  }

  handleConnectionChange = isConnected => {
    this.setState({ isConnected });
  };

  render() {
    const { isConnected } = this.state;
    const statusbarHeight = Platform.select({
      ios: 20,
      android: 0
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.purple} />
        <StatusBarAlert
          visible={!isConnected}
          message="No Internet Connection"
          backgroundColor={Colors.red}
          color="white"
          statusbarHeight={statusbarHeight}
        />
        <AppNavigation screenProps={{ isConnected }} />
      </View>
    );
  }
}

export default RootScreen;
