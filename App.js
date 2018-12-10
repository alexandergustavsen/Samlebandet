import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import Header from './src/components/header';


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

  render() {
    return (
      <View>
        <Header />
        <Text style={styles.container}>Let's try to show a page, for once, please!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  backgroundColor: '#fff',
  textAlign: 'center',
  top: 250,
  },
});
