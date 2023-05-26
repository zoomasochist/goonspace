import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Intro, Session, SessionHistory, Settings } from './Views.js';

const OnboardNav = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const onboardComplete = AsyncStorage.getItem('@onboard-complete') != undefined;

  return (
    <NavigationContainer>
      <OnboardNav.Navigator screenOptions={{headerShown: false}}>
        {/* { onboardComplete &&
          <OnboardNav.Screen name="Onboarding" component={Intro} />
        } */}
        <OnboardNav.Screen name="Root">{() =>
          <Drawer.Navigator initialRouteName="Session">
            <Drawer.Screen name="Session" component={Session} />
            <Drawer.Screen name="Session History" component={SessionHistory} />
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        }</OnboardNav.Screen>
      </OnboardNav.Navigator>
    </NavigationContainer>
  );
}