import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, ListView} from 'react-native';
import * as firebase from 'firebase'
import {List, ListItem} from "native-base";

export default class GroupList extends Component {
    constructor(){
        super();

        this.state = {
            dataArray: null
        }

    }

    componentDidMount() {
        const that = this;
        firebase.database().ref('/groups').once('value', function(snapshot) {
            let returnArray = [];

            snapshot.forEach(function(snap) {
                let item = snap.val();
                item.key = snap.key;

                returnArray.push(item);
            });

            that.setState({
                dataArray: returnArray
            })
        });
    }

    render() {

        console.log(this.state.dataArray);

        return (
            <List>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={({ item }) => (
                        <ListItem>
                            <Text>{item.groupTitle}</Text>
                            <Text>{item.groupTime}</Text>
                            <Text>{item.groupDesc}</Text>
                            <Text>{item.groupSize}</Text>
                            <Text>{item.groupPlace}</Text>
                            <Text>{item.groupCate}</Text>
                        </ListItem>
                    )}
                    keyExtractor={item => item.key}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ebebeb'
    },
    h2text: {
        marginTop: 10,
        fontFamily: 'Helvetica',
        fontSize: 36,
        fontWeight: 'bold',
    },
    flatView: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
    }
});