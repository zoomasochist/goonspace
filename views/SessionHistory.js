import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Container } from '../Components.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SessionHistory = () => {
  const [sessionHistory, setSessionHistory] = useState({});

  useEffect(() => {
    (async () => setSessionHistory(await AsyncStorage.getItem('@session-history')))();

  }, [sessionHistory]);

  return (
    <Container>
      <Text style={{ position: 'absolute', opacity: 0.75, color: '#fff', }}>
        {JSON.stringify(sessionHistory)}
      </Text>
    </Container>
  );
};
