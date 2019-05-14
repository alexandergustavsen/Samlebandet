import React, {Component} from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props);

        this.state = ({
        email: '',
        password: ''
        })
    }

    signUpUser = (email, password) => {
        try {
        if (this.state.password.length < 6) {
            alert('Please enter at least 6 characters');
        return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (error) {
        console.log(error.toString())
        }
    };

    render() {
        return (
        <Container style={styles.container}>
        <Form>

            <Item floatingLabel>
                <Label>Email</Label>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
                />
            </Item>

            <Item floatingLabel>
            <Label>Password</Label>
            <Input
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
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