import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';


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
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
