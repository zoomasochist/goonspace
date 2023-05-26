import { Pressable, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Container, Swiper } from '../Components.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackgroundTitle = (props) => (
  <Container>
    <Text style={{ fontSize: 150, position: 'absolute', opacity: 0.75, }}>
      {props.background}
    </Text>
    <Text style={{ color: '#fff', fontSize: 128, }}>{props.children}</Text>
  </Container>
);

const Time = ({ interval, value }) => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    <Text style={{
      color: '#aaa', fontStyle: 'italic', fontWeight: 'bold', marginVertical: 5,
      }}>
      {interval}
    </Text>

    <Text style={{ color: '#fff', fontSize: 80, }}>{value}</Text>
  </View>
);

const PillButton = ({ size, label, ...other }) => (
  React.createElement(Pressable,
    {...other,
     width: size, height: size/3, alignItems: 'center', justifyContent: 'center',
     backgroundColor: '#ccc', borderRadius: size / 3, }, <Text>{label}</Text>)
);

const Timer = ({ endFunc, start }) => {
  const [[hours, minutes, seconds], setTime] = useState(['00', '00', '00']);
  var now = new Date().getTime();
  var msDiff = 0;

  useEffect(() => {
    const i = setInterval(() => {
      now = new Date().getTime();
      msDiff  = now - start;
      const hours   = Math.floor(msDiff / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((msDiff / 3600000 - hours) * 60).toString().padStart(2, '0');
      const seconds = Math.floor(((msDiff / 3600000 - hours) * 60 - minutes) * 60).
        toString().padStart(2, '0');
    
      setTime([hours, minutes, seconds]);
    }, 1000);

    return () => clearInterval(i);
  }, []);

  return (
    <Container>
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', }}>
        <Time interval="Hours"   value={hours} />
        <Time interval="Minutes" value={minutes} />
        <Time interval="Seconds" value={seconds} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', }}>
        <PillButton size={150} label="Cum"
          onPress={async () => {
            const newSession = { 'from': start, 'to': now, 'duration': msDiff, };
            const history = await AsyncStorage.getItem('@session-history').then(JSON.parse);
            history.push(newSession);
            const newHistory = JSON.stringify(history);
            await AsyncStorage.setItem('@session-history', newHistory);

            await AsyncStorage.removeItem('@timer-start');
            endFunc(false);
          }}
        />
      </View>
    </Container>
  );
};

export function Session() {
  const [lastTimerValue, setTimerValue] = useState(null);
  const [timerRunning, setTimerRunning] = useState(lastTimerValue != null);
  AsyncStorage.getItem('@timer-start').then(setTimerValue);

  return (
    <View style={{ backgroundColor: '#070707', flex: 1, flexDirection: 'column', }}>
      {!timerRunning &&
        <View style={{ flex: 1, alignItems: 'center', }}>
          <Swiper>
            <BackgroundTitle background="🍆">Goon</BackgroundTitle>
            <BackgroundTitle background="😩">Deny</BackgroundTitle>
            <BackgroundTitle background="💦">Prejac</BackgroundTitle>
          </Swiper>

          <PillButton size={150} label="Start Stroking"
            onPress={async () => {
                  const time = '' + new Date().getTime();
                  await AsyncStorage.setItem('@timer-start', time);
                  setTimerValue(time);
                  setTimerRunning(true);
                }}/>
        </View>
      }
    
      {timerRunning && <Timer endFunc={setTimerRunning} start={lastTimerValue} />}
    </View>
  );
}