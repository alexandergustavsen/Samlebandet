import React, {Component} from 'react';
import { StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity } from 'react-native';
//import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';

var data = []

                        //tittel
//kategori/bilde        //sted   //tid
                        //deltagere

export default class ListGroupScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.testingStuff}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MakeGroup')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Make Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Chat</Text>
                    </TouchableOpacity>
                </View>
            </View>
            );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    groupContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
    },

    box1: {
        flex: 1,
        //backgroundColor: 'blue',
    },
    box2: {
        flex: 1,
        flexDirection: 'coloumn',
        //backgroundColor: 'yellow',
    },

    textStyle: {
        textAlign: 'center',
    },

    testingStuff: {

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

/*
<Item>
<Button 
    primary 
    onPress={() => this.props.navigation.navigate('MakeGroup')}>
    <Text> Primary </Text>
</Button>
</Item>
*/