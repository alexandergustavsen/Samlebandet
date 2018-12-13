import React, {Component} from 'react';
import { StyleSheet, StatusBar, Text, View, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import MakeGroup from './src/screens/makeGroup';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC472p6bon1WNU-l9uofXoeWp3sTppqJh0',
  authDomain: 'samlebandet.firebaseapp.com',
  databaseURL: 'https://samlebandet.firebaseio.com',
  projectId: 'samlebandet',
  storageBucket: 'samlebandet.appspot.com',
  messagingSenderId: '693041379005'
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return  (
      <MakeGroup />
    )
  }
}
