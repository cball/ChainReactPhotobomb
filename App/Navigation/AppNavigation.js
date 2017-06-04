import { StackNavigator } from 'react-navigation';
import HomeScreen from '../Containers/HomeScreen';

const AppNavigation = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen }
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
