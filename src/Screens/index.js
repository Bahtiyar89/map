import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';

const MainScreen = () => {
  const initialMapState = {
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = useState(initialMapState);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setState(prevState => {
        let region = Object.assign({}, prevState.region); // creating copy of state variable jasper
        region.latitude = info.coords.latitude; // update the name property, assign a new value
        region.longitude = info.coords.longitude;

        return {...prevState, region}; // return new object jasper object
      });
    });
  }, []);
  console.log('state', state);
  return (
    <WebView
      source={{
        uri: `https://www.google.com/maps/@${
          (state.region.latitude, state.region.longitude)
        }`,
      }}
    />
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default MainScreen;
