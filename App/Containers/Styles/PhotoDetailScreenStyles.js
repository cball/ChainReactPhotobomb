import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  },
  image: {
    flex: 1
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  closeIcon: {
    color: 'white',
    fontSize: 30
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flag: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  flagIcon: {
    color: Colors.lightPurple,
    fontSize: 20,
    marginRight: 5
  },
  flagText: {
    color: Colors.lightPurple,
    fontSize: 10
  }
});
