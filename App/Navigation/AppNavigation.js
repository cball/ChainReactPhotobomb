import { StackNavigator } from 'react-navigation';
import HomeScreen from '../Containers/HomeScreen';
import PhotosScreen from '../Containers/PhotosScreen';

const AppNavigation = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    PhotosScreen: { screen: PhotosScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
    navigationOptions: {
      // header: {
      //   style: styles.header
      // }
    }
  }
);

export default AppNavigation;
