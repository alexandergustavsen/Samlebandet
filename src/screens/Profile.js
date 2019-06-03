import React, { Component } from 'react';
import {StyleSheet, StatusBar, View, ListView, TouchableOpacity, FlatList, TextInput, Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base';
import * as firebase from 'firebase'

export default class EditProfile extends Component {
    constructor(){
        super();

        this.state = {
            firstName: '',
            lastName: '',
            school: '',
            retning: '',
            date: '',
            beskrivelse: '',
        }
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
            <View style={{flex: 1}}>
                <View>
                    <View>
                        <Image

                        />
                    </View>
                    <View>
                        <Text>{this.state.firstName} {this.state.lastName}</Text>
                    </View>
                    <View>
                        <Text>{this.state.beskrivelse}</Text>
                    </View>
                    <View>
                        <Button style={styles.button}>
                            <Text style={{fontSize: 15, color: '#383838'}}>Rediger Profil</Text>
                        </Button>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View>
                            <Image
                                
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View>
                                <Text>Fødselsdag:</Text>
                            </View>
                            <View>
                                <Text>{this.state.date}</Text>
                            </View>
                        </View>
                    </View>
                    <View>

                    </View>
                    <View>

                    </View>
                </View>
                <View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 30,
        width: 170,
        height: 35
    }
});