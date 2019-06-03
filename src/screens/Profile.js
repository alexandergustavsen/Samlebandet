import React, { Component } from 'react';
import { StyleSheet, Text, Button, StatusBar, View, ListView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import * as firebase from 'firebase'

export default class Profile extends Component {
    constructor(){
        super();

        this.state = {
            selected: 'viewProfile',
            btnText: 'editProfile',

            firstName: '',
            lastName: '',
            school: '',
            retning: '',
            date: '',
            beskrivelse: '',
        }
    }

    viewProfile = () => {
        return (
            <View>
                <Text>{this.state.firstName}</Text>
                <Text>{this.state.lastName}</Text>
                <Text>{this.state.school}</Text>
                <Text>{this.state.retning}</Text>
                <Text>{this.state.date}</Text>
                <Text>{this.state.beskrivelse}</Text>
            </View>
        )
    }

    editProfile = () => {
        return (
            <View>
                <Text>Now editing profile my man</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Skole"
                    onChangeText={(school) => this.setState({school: school})}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Studieretning"
                    onChangeText={(retning) => this.setState({retning: retning})}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Beskrivelse"
                    onChangeText={(beskrivelse) => this.setState({beskrivelse: beskrivelse})}
                />
            </View>
        )
    }

    changeData = () => {
        if(this.state.selected == 'viewProfile'){
            this.setState({ 
                selected: 'editProfile',
                btnText: 'Ferdig',
            });
        } else {
            this.setState({
                selected: 'viewProfile',
                btnText: 'Edit profile',
            });
            userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).update({
                school: this.state.school,
                retning: this.state.retning,
                beskrivelse: this.state.beskrivelse,
            });
        }
    }

    componentDidMount() {
        const that = this;
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value', function(snapshot) {
            data = snapshot.val();
            that.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                school: data.school,
                retning: data.retning,
                date: data.date,
                beskrivelse: data.beskrivelse,
            });
        });
    }

    render() {
        return (
            <View>
                {this.state.selected === 'viewProfile' ? this.viewProfile() : this.editProfile()}
                <Button
                    style={{ marginTop: 10 }}
                    full
                    rounded
                    primary
                    onPress={() => this.changeData()}
                    title={this.state.btnText}
                    >
                </Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
});