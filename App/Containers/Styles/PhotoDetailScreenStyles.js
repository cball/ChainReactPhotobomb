import { StyleSheet } from 'react-native';

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
    right: 10,
    color: 'white'
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
