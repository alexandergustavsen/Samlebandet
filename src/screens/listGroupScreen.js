import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity, FlatList } from 'react-native';
import { List, ListItem } from "native-base";
import * as firebase from 'firebase'

export default class ListGroupScreen extends Component {
    constructor(){
        super();

        this.state = {
            title: '',
            time: '',
            size: '',
            desc: '',
            cate: '',
            place: '',
        }
        
    }

    componentDidMount() {
        let that = this;

        firebase.database().ref('/groups').on('child_added', function (data){

            that.setState({
                /*title: data.val().groupTitle,
                time: data.val().groupTime,
                size: data.val().groupSize,
                desc: data.val().groupDesc,
                cate: data.val().groupCate,
                place: data.val().groupPlace,*/

                data: data.val()

            })

        })
    }

    render() {

        console.log(this.state.data);

        return (
            <List>
                <Text>{this.state.groupTitle}</Text>
            </List>
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