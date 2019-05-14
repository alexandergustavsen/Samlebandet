import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity, FlatList } from 'react-native';
import { List, ListItem } from "native-base";
import * as firebase from 'firebase'

export default class ListGroupScreen extends Component {
    constructor(){
        super();

        this.state = {
            data: [],
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
                data: data.val()
            })

        })
    }

    render() {

        console.log(this.state.data);

        return (
            <List>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={<Text>{item.groupTitle}</Text>}
                            time={<Text>{item.groupTime}</Text>}
                        />
                    )}
                />
            </List>
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