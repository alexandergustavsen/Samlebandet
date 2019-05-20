import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import AuthLoading from './src/screens/AuthLoading'
import LogIn from './src/screens/LogIn'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import CreateGroup from './src/screens/CreateGroup'
import CreateProfile from './src/screens/CreateProfile'
import Profile from './src/screens/Profile'
import Tutorial from './src/screens/Tutorial'
import Interests from './src/screens/Interests'
import Chat from './src/screens/Chat'

/*import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyC472p6bon1WNU-l9uofXoeWp3sTppqJh0',
  authDomain: 'samlebandet.firebaseapp.com',
  databaseURL: 'https://samlebandet.firebaseio.com',
  projectId: 'samlebandet',
  storageBucket: 'samlebandet.appspot.com',
  messagingSenderId: '693041379005'
};*/

firebase.initializeApp(firebaseConfig);

const appStackNavigator = createStackNavigator({
    Chat: Chat,
    Home: Home,
  CreateGroup: CreateGroup,
  Profile: Profile
});

const authStackNavigator = createStackNavigator({
  LogIn: LogIn,
  SignUp: SignUp,
  CreateProfile: CreateProfile,
  Interests: Interests,
  Tutorial: Tutorial,
});

const switchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoading,
  Auth: authStackNavigator,
  App: appStackNavigator,
});

//Skal være slik:
export default createAppContainer(switchNavigator);

//testing:
//export default createAppContainer(appStackNavigator);
