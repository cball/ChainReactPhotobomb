import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

const ApplicationStyles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  container: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  fullScreen: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  }
};

export default ApplicationStyles;
