import React, {Component} from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';

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
        title: 'Profil',
        headerTitleStyle: ({
            color: '#383838',
            fontWeight: 'normal',
            fontSize: 20
        }),
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
            <Container style={styles.container}>
                <Form>

                    <Item floatingLabel>
                        <Label>Epost</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Passord</Label>
                        <Input
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label>Gjenta passord</Label>
                        <Input
                            secureTextEntry
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(rePassword) => this.setState({ rePassword })}
                        />
                    </Item>

                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.signUpUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'white' }}>Registrer deg</Text>
                    </Button>

                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
});