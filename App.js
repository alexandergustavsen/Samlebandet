import React from 'react';
import { /*StyleSheet, Text, View*/ } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
//import Header from './src/components/header';
import Home from './src/screens/home';
import AddGroup from './src/screens/addGroup';

const App = createStackNavigator({
  Home: { screen: Home },
  Profile: { screen: AddGroup },
});

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC472p6bon1WNU-l9uofXoeWp3sTppqJh0',
      authDomain: 'samlebandet.firebaseapp.com',
      databaseURL: 'https://samlebandet.firebaseio.com',
      projectId: 'samlebandet',
      storageBucket: 'samlebandet.appspot.com',
      messagingSenderId: '693041379005'
    });
  }
}
