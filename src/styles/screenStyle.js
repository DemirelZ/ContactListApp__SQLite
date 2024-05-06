import {StyleSheet} from 'react-native';
import Colors from '../theme/colors';

// define your styles
const screenStyle = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
});

export {screenStyle};
