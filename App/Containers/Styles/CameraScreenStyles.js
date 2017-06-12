import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  cameraShutter: {
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#ccc',
    borderWidth: 10
  },
  shutterControls: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
