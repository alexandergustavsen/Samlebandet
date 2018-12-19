import { createSwitchNavigator, createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import AuthLoadingScreen from './src/screens/authLoadingScreen'
import WelcomeScreen from './src/screens/welcomeScreen'
import SignUpScreen from './src/screens/signUpScreen'
import ListGroupScreen from './src/screens/listGroupScreen'
import MakeGroup from './src/screens/makeGroup'
import ChatScreen from './src/screens/chatScreen'

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyC472p6bon1WNU-l9uofXoeWp3sTppqJh0',
  authDomain: 'samlebandet.firebaseapp.com',
  databaseURL: 'https://samlebandet.firebaseio.com',
  projectId: 'samlebandet',
  storageBucket: 'samlebandet.appspot.com',
  messagingSenderId: '693041379005'
};

firebase.initializeApp(firebaseConfig);

const appStackNavigator = createStackNavigator({
  ListGroup: ListGroupScreen,
  MakeGroup: MakeGroup,
  Chat: ChatScreen,
})

const authStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  SignUp: SignUpScreen,
})

const switchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: authStackNavigator,
  App: appStackNavigator,
})

//Skal være slik:
//export default createAppContainer(switchNavigator);

//testing:
export default createAppContainer(appStackNavigator);
