import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.purple,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: Colors.white
  },
  backgroundImage: {
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
  or: {
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: Colors.red,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 2
  },
  button: {
    fontSize: 24,
    color: Colors.white
  }
});
