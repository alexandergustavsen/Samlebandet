import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, AsyncStorage } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase from 'firebase';
import LogoHeader from "../component/LogoHeader";
import FlashMessage from "react-native-flash-message";

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
          firebase.auth().signInWithEmailAndPassword('trumpet@trumpet.no', '123123123');
          this.props.navigation.navigate('App')
        } else {

            try {
                firebase.auth().signInWithEmailAndPassword(email, password);
                this.props.navigation.navigate('App')
            } catch (error) {
                this.refs.modalFlash.showMessage({
                    message: error,
                    type: "danger",
                });
                console.log('caught error')
            }
        }
    };

    render() {
      return (
        <View style={styles.container}>
            <LogoHeader title='Logg inn'/>
           <View style={{flex: 3, justifyContent: 'space-around', alignItems: 'center'}}>
              <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'flex-start', width: wp('85%')}}>
                  <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: '#353535', paddingTop: 30}}>
                      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                          <Image
                              style={{width: 25, height: 18}}
                              source={require('../../assets/images/melding.png')}
                          />
                      </View>
                      <View style={{flex: 4, borderBottomWidth: 1, borderColor: '#ccc'}}>
                          <Input
                              placeholder='E-post'
                              autoCorrect={false}
                              autoCapitalize="none"
                              onChangeText={(email) => this.setState({ email })}
                          />
                      </View>
                  </View>
                  <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                          <Image
                              style={{width: 25, height: 25}}
                              source={require('../../assets/images/passord_oblique.png')}
                          />
                      </View>
                      <View style={{flex: 4, justifyContent: 'space-between', alignItems: 'flex-start',
                          borderBottomWidth: 1, borderColor: '#ccc', color: '#353535'}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                              <View style={{flex: 4, borderColor: '#ccc'}}>
                              <Input
                                  placeholder='Passord'
                                  secureTextEntry
                                  autoCorrect={false}
                                  autoCapitalize="none"
                                  onChangeText={(password) => this.setState({ password })}
                              />
                              </View>
                              <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                  <Image
                                      style={{width: 25, height: 15}}
                                      source={require('../../assets/images/show.png')}
                                  />
                              </View>
                          </View>
                      </View>
                  </View>
                  <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'top'}}>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                          <Text style={{color: '#0000ff', textDecorationLine: 'underline'}}>Glemt passord?</Text>
                      </View>
                  </View>
              </View>
              <View style={{flex: 0.6, alignItems: 'center', flexDirection: 'column'}}>
                 <View>
                    <Button
                      style={styles.button}
                      onPress={() => this.loginUser(this.state.email, this.state.password)}>
                      <Text style={{fontSize: 20}}>Logg inn</Text>
                    </Button>
                 </View>
                 <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                    <View>
                        <Text>Ingen konto? </Text>
                    </View>
                    <View>
                        <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{color: '#0000ff', textDecorationLine: 'underline'}}>Registrer deg</Text>
                    </View>
                 </View>
              </View>
           </View>
           <FlashMessage ref="modalFlash" position="bottom"/>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
 container: {
      flex: 1
  },
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 30,
      width: 250,
      height: 50
  }
});
