import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, Modal, View, TouchableOpacity } from 'react-native';
import {Button, List, ListItem} from "native-base";

import * as firebase from 'firebase'

export default class Home extends Component {
    constructor(){
        super();

        this.state = {
            dataArray: null,
            currentItem: null,
            showMe: false
        }
    }

    componentDidMount() {
        const that = this;
        firebase.database().ref('/groups').on('value', function(snapshot) {
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


    joinGroup = (key) => {
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/groups/' + key + '/members').push({
            _id: userId
        });
    }

    modal = () => {
        console.log(currentItem);
        let currentItem = this.state.currentItem;
        console.log(currentItem);
        return(
            <Modal visible={this.state.showMe}
                onRequestClose={() => console.warn("This is a close request.")}>
                <View style={styles.modalView}>
                    <Text>{currentItem.item.groupTitle}</Text>
                    <Text>{currentItem.item.groupTime}</Text>
                    <Text>{currentItem.item.groupDesc}</Text>
                    <Text>{currentItem.item.groupSize}</Text>
                    <Text>{currentItem.item.groupPlace}</Text>
                    <Text>{currentItem.item.groupCate}</Text>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.joinGroup(currentItem.item.key)}
                    >
                        <Text style={{ color: 'white' }}>Bli med</Text>
                    </Button>

                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            showMe:false
                        })
                    }}>
                        <Text>{}</Text>
                        <Text style={styles.closeText}>Close Modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    };

    currentItemFunc = (data) => {
        this.setState({
            currentItem: data,
            showMe: true,
        })
    }

    renderItem = data =>
        <TouchableOpacity
            style={[styles.list, data.item.selectedClass]}
            onPress={() => this.currentItemFunc(data)}
        >
            <Text>{data.item.groupTitle}</Text>
            <Text>{data.item.groupTime}</Text>
            <Text>{data.item.groupDesc}</Text>
            <Text>{data.item.groupSize}</Text>
            <Text>{data.item.groupPlace}</Text>
            <Text>{data.item.groupCate}</Text>
            <Text>{data.item.key}</Text>
        </TouchableOpacity>

    render() {
        return (
            <View>
                <View>
                    <Button onPress={() => this.props.navigation.navigate('Profile')}>
                        <Text>Profil</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate('CreateGroup')}>
                        <Text>Opprett gruppe</Text>
                    </Button>
                </View>
                <List>
                    <FlatList
                        data={this.state.dataArray}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.key}
                        extra={this.state}
                    />
                </List>
                <View>
                {this.state.showMe === true ? this.modal() : null}
                </View>
            </View>
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
    },
    modalView: {
        backgroundColor: "#aaa",
        height: 500,
        width: 350,
        marginTop: 175,
        marginLeft: 32.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeText: {
        backgroundColor: '#333',
        color: '#bbb',
        padding: 5,
        margin: 20
    },
    openText: {
        backgroundColor: '#333',
        color: '#bbb',
        padding: 5,
        margin: 20
    },
    list: {
        paddingVertical: 5,
        margin: 3,
        //flexDirection: "row",
        backgroundColor: "#eeeeee",
        //justifyContent: "flex-start",
        //alignItems: "center",
        zIndex: -1
    },
    selected: {backgroundColor: '#FA7B5F'}
});