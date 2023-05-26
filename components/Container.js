import { View } from 'react-native';
import { darkTheme } from '../Styles.js';

export const Container = ({ children }) => (
  <View style={darkTheme.container}>
    {children}
  </View>
);