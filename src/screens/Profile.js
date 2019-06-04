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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1, width: '85%'}}>
                    <View style={{flex: 1.2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1}}>
                        <View style={{flex: 2, justifyContent: 'center'}}>
                            <Image
                                style={{width: 130, height: 130}}
                                source={require('../../assets/images/profileimg8.png')}
                            />
                        </View>
                        <View style={{flex: 0.4, justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', color: '#383838', fontSize: 20}}>{this.state.firstName} {this.state.lastName}</Text>
                        </View>
                        <View style={{flex: 0.6, justifyContent: 'flex-start'}}>
                            <Text style={styles.regularText}>{this.state.beskrivelse}</Text>
                        </View>
                        <View style={{flex: 0.8, justifyContent: 'center'}}>
                            <Button onPress={() => this.props.navigation.navigate('EditProfile')} style={styles.button}>
                                <Text style={{fontSize: 15, color: '#383838'}}>Rediger Profil</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 0.15}}>
                                <Image
                                    style={{width: 35, height: 35}}
                                    source={require('../../assets/images/celebrate.png')}
                                />
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View>
                                    <Text style={styles.boldText}>Fødselsdag:</Text>
                                </View>
                                <View>
                                    <Text style={styles.regularText}>{this.state.date}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 0.15}}>
                                <Image
                                    style={{width: 42, height: 25}}
                                    source={require('../../assets/images/universitet.png')}
                                />
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View>
                                    <Text style={styles.boldText}>Universitet/høyskole:</Text>
                                </View>
                                <View>
                                    <Text style={styles.regularText}>{this.state.school}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 0.25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 0.15}}>
                                <Image
                                    style={{width: 40, height: 30}}
                                    source={require('../../assets/images/skole.png')}
                                />
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View>
                                    <Text style={styles.boldText}>Studieretning:</Text>
                                </View>
                                <View>
                                    <Text style={styles.regularText}>{this.state.retning}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 0.65, flexDirection: 'column'}}>

                        <View style={{flex: 0.2, flexDirection: 'row'}}>
                            <View style={{flex: 0.3}}>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Interesser</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View>
                                    <Image
                                        style={{width: 15, height: 15}}
                                        source={require('../../assets/images/edit.png')}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 13, textDecorationLine: 'underline'}}>Rediger</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                <Image
                                    style={{width: 100, height: 100}}
                                    source={require('../../assets/images/friluft_sirkel.png')}
                                />
                            </View>
                            <View>
                                <Image
                                    style={{width: 100, height: 100}}
                                    source={require('../../assets/images/mat_sirkel.png')}
                                />
                            </View>
                            <View>
                                <Image
                                    style={{width: 100, height: 100}}
                                    source={require('../../assets/images/uteliv_sirkel.png')}
                                />
                            </View>
                        </View>

                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold',
        color: '#383838',
        fontSize: 15
    },
    regularText: {
        color: '#383838',
        fontSize: 14
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 30,
        width: 175,
        height: 33,
        marginBottom: 30
    }
});