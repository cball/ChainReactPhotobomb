import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.purple,
    flex: 1
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.white
  },
  backgroundImage: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  appName: {
    color: Colors.white,
    backgroundColor: 'transparent',
    fontSize: 30,
    fontFamily: Fonts.bold,
    marginTop: 10
  },
  buttons: {
    marginTop: 40,
    flexDirection: 'row'
  },
  cameraBar: {
    backgroundColor: Colors.purple,
    height: 30,
    width: '100%',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraButton: {
    backgroundColor: Colors.purple,
    height: 80,
    width: 80,
    borderRadius: 8,
    position: 'absolute',
    bottom: -10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoList: {
    // justifyContent: 'center'
    // flexDirection: 'row',
    // flexWrap: 'wrap'
  }
});
