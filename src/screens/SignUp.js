import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, AsyncStorage } from 'native-base';
import * as firebase from 'firebase';
import LogoHeader from "../component/LogoHeader";

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            email: '',
            password: '',
            rePassword: '',
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

    signUpUser = (email, password) => {
        try {
            if (this.state.password.length < 8) {
                alert('Please enter at least 6 characters');
                return;
            }

            if(this.state.rePassword != this.state.password){
                alert('Passordene må være identiske');
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error.toString())
        }

        //finn bedre løsning
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        const doSomething = async () => {
            await sleep(2000)
            try {
                firebase.auth().signInWithEmailAndPassword(email, password)
                this.props.navigation.navigate('CreateProfile')
            } catch (error) {
                console.log(error.toString())
            }
        }
        doSomething()
    };

    render() {
        return (

            <View style={styles.container}>
                <LogoHeader title='Registrer deg'/>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '85%'}}>
                        <View style={{flex: 0.15, flexDirection: 'row', color: '#353535'}}>
                            <View style={{marginRight: 10, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Image
                                    style={{width: 32, height: 22}}
                                    source={require('../../assets/images/melding.png')}
                                />
                            </View>
                            <View style={{flex: 4, borderBottomWidth: 1, borderColor: '#ccc', justifyContent: 'flex-end'}}>
                                <Input
                                    placeholder='E-post'
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </View>
                        </View>
                        <View style={{flex: 0.15, flexDirection: 'row', color: '#353535'}}>
                            <View style={{marginRight: 10, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Image
                                    style={{width: 33, height: 34}}
                                    source={require('../../assets/images/passord_oblique.png')}
                                />
                            </View>
                            <View style={{flex: 4, borderBottomWidth: 1, borderColor: '#ccc', color: '#353535'}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Input
                                        placeholder='Passord'
                                        secureTextEntry
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onChangeText={(password) => this.setState({ password })}
                                    />
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginTop: 15}}>
                                        <Image
                                            style={{width: 27, height: 16}}
                                            source={require('../../assets/images/show.png')}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 0.15, flexDirection: 'row', color: '#353535'}}>
                            <View style={{marginRight: 10, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Image
                                    style={{width: 33, height: 34}}
                                    source={require('../../assets/images/passord_oblique.png')}
                                />
                            </View>
                            <View style={{flex: 4, borderBottomWidth: 1, borderColor: '#ccc', color: '#353535'}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Input
                                        placeholder='Gjenta passord'
                                        secureTextEntry
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onChangeText={(rePassword) => this.setState({ rePassword })}
                                    />
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginTop: 15}}>
                                        <Image
                                            style={{width: 27, height: 16}}
                                            source={require('../../assets/images/show.png')}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <View>
                            <Button
                                style={styles.button}
                                onPress={() => this.signUpUser(this.state.email, this.state.password)}
                            >
                                <Text style={{fontSize: 20}}>Neste</Text>
                            </Button>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                            <View>
                                <Text>Har du allerede en konto?</Text>
                            </View>
                            <View style={{marginLeft: 5}}>
                                <Text onPress={() => this.props.navigation.navigate('LogIn')} style={{color: '#0000ff', textDecorationLine: 'underline'}}>Logg inn her</Text>
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
        flex: 1
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 30,
        width: 250,
        height: 50
    }
});