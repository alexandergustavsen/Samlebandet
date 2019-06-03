import React, { Component } from 'react';
import {StyleSheet, StatusBar, View, ListView, TouchableOpacity, FlatList, TextInput, Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base';
import * as firebase from 'firebase'

export default class EditProfile extends Component {
    constructor(){
        super();

        this.state = {
            selected: 'viewProfile',
            btnText: 'Rediger Profil',

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

    viewProfile = () => {
        return (
            <View style={styles.container}>
                <View style={styles.items}>
                    <View style={{flex: 1.5, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 50}}>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={require('../../assets/images/profileimg8.png')}
                            />
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 40}}>
                            <Button style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                borderColor: '#000',
                                borderWidth: 1,
                                borderRadius: 8,
                                width: 150,
                                height: 25
                            }}>
                                <Text style={{margin: -5, fontSize: 14, color: '#383838'}}>Rediger bilde</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Navn</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color: '#383838', fontSize: 15}}>{this.state.firstName} {this.state.lastName}</Text>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Biografi</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color: '#383838', fontSize: 15}}>{this.state.beskrivelse}</Text>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Fødselsdato</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color: '#383838', fontSize: 15}}>{this.state.date}</Text>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Studiested</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color: '#383838', fontSize: 15}}>{this.state.school}</Text>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Studieretning</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color: '#383838', fontSize: 15}}>{this.state.retning}</Text>
                    </View>
                </View>
            </View>
        )
    };

    editProfile = () => {
        return (
            <View style={styles.container}>
                <View style={styles.items}>
                    <View style={{flex: 1.5, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 50}}>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={require('../../assets/images/profileimg8.png')}
                            />
                        </View>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 40}}>
                            <Button style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                borderColor: '#000',
                                borderWidth: 1,
                                borderRadius: 8,
                                width: 150,
                                height: 25
                            }}>
                                <Text style={{margin: -5, fontSize: 14, color: '#383838'}}>Rediger bilde</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Navn</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color: '#383838', fontSize: 15}}>{this.state.firstName} {this.state.lastName}</Text>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Biografi</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <TextInput
                            style={{color: '#383838', fontSize: 15}}
                            placeholder="Beskrivelse"
                            onChangeText={(beskrivelse) => this.setState({beskrivelse: beskrivelse})}
                        />
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Fødselsdato</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color: '#383838', fontSize: 15}}>{this.state.date}</Text>
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Studiested</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <TextInput
                            style={{color: '#383838', fontSize: 15}}
                            placeholder="Studiested"
                            onChangeText={(school) => this.setState({school: school})}
                        />
                    </View>
                </View>
                <View style={styles.items}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#383838', fontWeight: 'bold', fontSize: 15}}>Studieretning</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <TextInput
                            style={{color: '#383838', fontSize: 15}}
                            placeholder="Studieretning"
                            onChangeText={(retning) => this.setState({retning: retning})}
                        />
                    </View>
                </View>
            </View>
        )
    };

    changeData = () => {
        if(this.state.selected == 'viewProfile'){
            this.setState({ 
                selected: 'editProfile',
                btnText: 'Ferdig',
            });
        } else {
            this.setState({
                selected: 'viewProfile',
                btnText: 'Rediger Profil',
            });
            userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).update({
                school: this.state.school,
                retning: this.state.retning,
                Beskrivelse: this.state.beskrivelse,
            });
        }
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
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <View style={{flex: 3, width: '100%'}}>
                    {this.state.selected === 'viewProfile' ? this.viewProfile() : this.editProfile()}
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Button style={styles.button} onPress={() => this.changeData()}>
                        <Text style={{fontSize: 20, color: '#383838'}}>{this.state.btnText}</Text>
                    </Button>
                </View>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 30
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 30,
        width: 250,
        height: 50
    },
    items: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginLeft: 25,
        marginRight: 25
    }
});