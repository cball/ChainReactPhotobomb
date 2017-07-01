import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes';

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
    height: 40,
    width: '100%',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: Colors.darkPurple,
    borderTopWidth: 3
  },
  cameraButton: {
    backgroundColor: Colors.purple,
    height: 74,
    width: 74,
    borderRadius: 37,
    position: 'absolute',
    bottom: -9,
    left: Metrics.screenWidth / 2 - 37,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraIcon: {
    color: Colors.white,
    fontSize: 38
  }
});
