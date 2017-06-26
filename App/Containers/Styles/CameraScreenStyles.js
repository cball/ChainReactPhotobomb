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
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addPropText: {
    fontSize: 18,
    color: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 0
  },
  uploadButtonContainer: {
    padding: 10
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: Colors.transparent
  },
  closeButtonText: {
    color: Colors.white
  }
});
