import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkPurple,
    flex: 1
  },
  imageContainer: {
    flex: 2
  },
  image: {
    height: '100%'
  },
  propContainer: {
    height: 160
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
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 }
  },
  clearPropsLink: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  clearPropsText: {
    color: Colors.white,
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    marginLeft: 5
  }
});
