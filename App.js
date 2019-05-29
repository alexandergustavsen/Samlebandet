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
import SelectedGroup from './src/screens/SelectedGroup'

const appStackNavigator = createStackNavigator({
  Home: Home,
  CreateGroup: CreateGroup,
  Profile: Profile,
  SelectedGroup: SelectedGroup,
  Chat: Chat
});

const authStackNavigator = createStackNavigator({
  Tutorial: Tutorial,
  LogIn: LogIn,
  SignUp: SignUp,
  CreateProfile: CreateProfile,
  Interests: Interests,
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
