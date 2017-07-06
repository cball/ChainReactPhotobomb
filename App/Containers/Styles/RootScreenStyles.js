import { StyleSheet, Platform } from 'react-native';
import { ApplicationStyles, Colors } from '../../Themes';

const platformStyles = Platform.select({
  ios: {
    // paddingTop: 20
  }
});

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.mainContainer,
    ...platformStyles,
    backgroundColor: Colors.purple
  }
});
