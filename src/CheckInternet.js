import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
const CheckInternet = ({isConnected, setIsConnected}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);
  const checkConnction = () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isConnected == true ? null : '#fff'},
      ]}>
      {isConnected == true ? null : (
        <View style={styles.container}>
          <Image
            source={require('../src/images/nointernet.png')}
            style={styles.image}
          />
          <Text style={styles.message}>
            {isConnected == true ? '' : 'No Internet Connection'}
          </Text>
          <TouchableOpacity
            style={styles.refresh}
            onPress={() => {
              checkConnction();
            }}>
            <Text style={styles.txt}>Reload</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CheckInternet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 200,
  },
  message: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    alignSelf: 'center',
    marginTop: 20,
  },
  refresh: {
    backgroundColor: 'black',
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginTop: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#fff',
  },
});
