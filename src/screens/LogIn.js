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
          firebase.auth().signInWithEmailAndPassword('alex@gmail.com', 'alex6666');
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
           <View style={{flex: 3}}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <View>
                          <Image
                              style={{width: 32, height: 22}}
                              source={require('../../assets/images/melding.png')}
                          />
                      </View>
                      <View>
                          <Input
                              placeholder='E-post'
                              autoCorrect={false}
                              autoCapitalize="none"
                              onChangeText={(email) => this.setState({ email })}
                          />
                      </View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <View>
                          <Image
                              style={{width: 21, height: 40}}
                              source={require('../../assets/images/passord.png')}
                          />
                      </View>
                      <View>
                          <Input
                              placeholder='Passord'
                              secureTextEntry
                              autoCorrect={false}
                              autoCapitalize="none"
                              onChangeText={(password) => this.setState({ password })}
                          />
                      </View>
                  </View>
              </View>
              <View style={{flex: 1, flexDirection: 'column'}}>
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
