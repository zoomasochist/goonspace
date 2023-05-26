import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import { Swiper, Container } from '../Components.js';

import { introStyle } from '../Styles.js';

export function Intro() {
  const navigation = useNavigation();

  return (
    <Swiper showsButtons={false}>
      <Container>
        <Text style={{ color: '#fff', }}>1</Text>
      </Container>
  
      <Container>
        <Text style={{ color: '#fff', }}>2</Text>
      </Container>

      <Container>
        <Button onPress={() => navigation.navigate('Root')} title="Let's Go"></Button>
      </Container>
    </Swiper>
  );
}