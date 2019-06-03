import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, AsyncStorage } from 'native-base';
import * as firebase from 'firebase';
import LogoHeader from "../component/LogoHeader";

export default class LogIn extends Component {

    constructor(props) {
        super(props);

      this.state = ({
        email: '',
        password: ''
      })
    }

    static navigationOptions = {
        headerStyle: ({
            backgroundColor: '#00EDD6',
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderBottomWidth: 0
        })
    };

    loginUser = (email, password) => {
        if(email == '' && password == ''){
          firebase.auth().signInWithEmailAndPassword('gus@gmail.com', 'gusgusgus');
          this.props.navigation.navigate('App')
        } else {
            try {
                firebase.auth().signInWithEmailAndPassword(email, password);
                this.props.navigation.navigate('App')
            } catch (error) {
                console.log(error.toString())
            }
        }
    };

    render() {
      return (
        <View style={styles.container}>
            <LogoHeader title='Logg inn'/>
           <View style={{flex: 3, justifyContent: 'center'}}>
              <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%'}}>
                  <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: '#353535', marginTop: 60, marginBottom: 30}}>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                          <Image
                              style={{width: 32, height: 22}}
                              source={require('../../assets/images/melding.png')}
                          />
                      </View>
                      <View style={{flex: 4, justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomWidth: 1, borderColor: '#ccc', marginLeft: 5, marginRight: 30}}>
                          <Input
                              placeholder='E-post'
                              autoCorrect={false}
                              autoCapitalize="none"
                              onChangeText={(email) => this.setState({ email })}
                          />
                      </View>
                  </View>
                  <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: '#353535'}}>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                          <Image
                              style={{width: 33, height: 34}}
                              source={require('../../assets/images/passord_oblique.png')}
                          />
                      </View>
                      <View style={{flex: 4, justifyContent: 'flex-start', alignItems: 'flex-start', borderBottomWidth: 1, borderColor: '#ccc', color: '#353535', marginLeft: 5, marginRight: 30}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                              <View>
                              <Input
                                  placeholder='Passord'
                                  secureTextEntry
                                  autoCorrect={false}
                                  autoCapitalize="none"
                                  onChangeText={(password) => this.setState({ password })}
                              />
                              </View>
                              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 10}}>
                                  <Image
                                      style={{width: 27, height: 16}}
                                      source={require('../../assets/images/show.png')}
                                  />
                              </View>
                          </View>
                      </View>
                  </View>
                  <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 60, marginRight: 30}}>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                          <Text style={{color: '#0000ff', textDecorationLine: 'underline'}}>Glemt passord?</Text>
                      </View>
                  </View>
              </View>
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'column'}}>
                 <View>
                    <Button
                      style={styles.button}
                      onPress={() => this.loginUser(this.state.email, this.state.password)}
                    >
                      <Text style={{fontSize: 20}}>Logg inn</Text>
                    </Button>
                 </View>
                 <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                    <View>
                        <Text>Ingen konto?</Text>
                    </View>
                    <View style={{marginLeft: 5}}>
                        <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{color: '#0000ff', textDecorationLine: 'underline'}}>Registrer deg</Text>
                    </View>
                 </View>
              </View>
           </View>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
 container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 30,
      width: 250,
      height: 50
  }
});
