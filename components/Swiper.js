import React from 'react';
import Swiper_ from 'react-native-swiper';

export const Swiper = (props) => (
  React.createElement(Swiper_,
    {...props,
      index: 0,
      activeDotStyle: {
        width: 25,
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.75)',
      },
      dotStyle: {
        width: 25,
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
      },
    })
);