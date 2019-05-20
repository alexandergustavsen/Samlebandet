import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, Modal, View, TouchableOpacity } from 'react-native';
import {Button, List, ListItem} from "native-base";

import * as firebase from 'firebase'

export default class Home extends Component {
    constructor(){
        super();

        this.state = {
            dataArray: null,
            showMe:false
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
                        renderItem={({ item, index }) => (
                            <ListItem>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        showMe:true
                                    });
                                }}>
                                    <Text>{item.groupTitle}</Text>
                                    <Text>{item.groupTime}</Text>
                                    <Text>{item.groupDesc}</Text>
                                    <Text>{item.groupSize}</Text>
                                    <Text>{item.groupPlace}</Text>
                                    <Text>{item.groupCate}</Text>
                                    <Text>{item.key}</Text>
                                </TouchableOpacity>
                            </ListItem>
                        )}
                        keyExtractor={item => item.key}
                    />
                </List>

                <Modal visible={this.state.showMe}
                    onRequestClose={() => console.warn("This is a close request.")}>
                    <View style={styles.modalView}>
                        <Text>Hey, modal is open!</Text>
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
    }
});