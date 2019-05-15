import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import GroupList from './src/screens/GroupList'
import MakeGroup from './src/screens/MakeGroup'
import ChatScreen from './src/screens/ChatScreen'

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
  GroupList: GroupList,
  MakeGroup: MakeGroup,
  Chat: ChatScreen,
});

const authStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  SignUp: SignUpScreen,
});

const switchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: authStackNavigator,
  App: appStackNavigator,
});

//Skal være slik:
//export default createAppContainer(switchNavigator);

//testing:
export default createAppContainer(appStackNavigator);
