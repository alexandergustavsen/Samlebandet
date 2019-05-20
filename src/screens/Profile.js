import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity, FlatList } from 'react-native';
import { List, ListItem } from "native-base";
import * as firebase from 'firebase'

export default class Profile extends Component {
    constructor(){
        super();

        this.state = {
            firstName: '',
            lastName: '',
            school: '',
            retning: '',
            date: '',
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
            });
        });
    }

    render() {
        console.log(this.state.firstName);
        return (
            <View>
                <Text>{this.state.firstName}</Text>
                <Text>{this.state.lastName}</Text>
                <Text>{this.state.school}</Text>
                <Text>{this.state.retning}</Text>
                <Text>{this.state.date}</Text>
            </View>
        );
    }
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})


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