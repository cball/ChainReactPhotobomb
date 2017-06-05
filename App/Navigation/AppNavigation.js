import { StackNavigator } from 'react-navigation';
import HomeScreen from '../Containers/HomeScreen';
import PhotosScreen from '../Containers/PhotosScreen';
import CameraScreen from '../Containers/CameraScreen';

const AppNavigation = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    PhotosScreen: { screen: PhotosScreen },
    CameraScreen: { screen: CameraScreen, path: 'camera' }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
    mode: 'modal', // slide in from the bottom on iOS
    navigationOptions: {
      // header: {
      //   style: styles.header
      // }
    }
  }
);

export default AppNavigation;
