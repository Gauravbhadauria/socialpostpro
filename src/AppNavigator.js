import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './Screens/Splash';
import Home from './Screens/Home';
import EditPost from './Screens/EditPost';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name={'Splash'}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Home}
          name={'Home'}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={EditPost}
          name={'EditPost'}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
