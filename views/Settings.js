import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { darkTheme } from '../Styles.js';

const SettingSection = ({ label }) => (
  // y not work
  <Text style={{...darkTheme.settingSection, alignSelf: 'flex-start'}}>{label}</Text>
);

export function Settings() {
  return (
    <View style={{...darkTheme.container}}>
      <Debug />
    </View>
  );
}

const Debug = () => (
  <View>
    <SettingSection label="Debug" />
    <Button
      title="Clear Session History"
      onPress={async () => await AsyncStorage.setItem('@session-history', '[]')} 
    />
  </View>
);