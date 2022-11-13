import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CheckInternet from '../CheckInternet';

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const naviagtion = useNavigation();
  return (
    <View style={styles.container}>
      {isConnected == true ? (
        <View style={styles.container}>
          <Text style={styles.title}>Hello,Welcome</Text>
          <Text
            style={[
              styles.title,
              {
                fontSize: 18,
                color: '#8e8e8e',
                fontFamily: 'SceularOne-Regular',
              },
            ]}>
            Please Select Platform
          </Text>
          <View style={styles.listView}>
            <FlatList
              numColumns={3}
              data={[
                {name: 'Facebook', icon: require('../images/facebook.png')},
                {name: 'Instagram', icon: require('../images/instagram.png')},
                {name: 'Twitter', icon: require('../images/twitter.png')},
                {name: 'Linkedin', icon: require('../images/linkedin.png')},
                {name: 'Snapchat', icon: require('../images/snapchat.png')},
              ]}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => {
                      naviagtion.navigate('EditPost', {
                        name: item.name,
                        icon: item.icon,
                      });
                    }}>
                    <Image source={item.icon} style={styles.itemImage} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      ) : null}

      <CheckInternet
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: '#000',
    marginTop: 50,
    marginLeft: 20,
  },
  listItem: {
    width: '20%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  listView: {
    justifyContent: 'center',
  },
});
