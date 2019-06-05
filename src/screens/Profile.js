import React, { Component } from 'react';
import {StyleSheet, StatusBar, View, ListView, TouchableOpacity, FlatList, TextInput, Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input } from 'native-base';
import * as firebase from 'firebase'
import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;
export default class EditProfile extends Component {
    constructor(){
        super();

        this.state = {
            selected: 'viewProfile',

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
        userId = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
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
        //that.setState({avatar: firebase.auth().currentUser.photoUrl})
    }

    changeData = () => {
        /*if(this.state.beskrivelse == '' || this.state.retning == '' || this.state.school == ''){
            this.refs.modalFlash.showMessage({
                message: "Ett eller flere felter er ikke fylt ut",
                type: "danger",
            });
            console.log('cucked')
        } else {*/

            if(this.state.selected == 'viewProfile'){
                this.setState({ 
                    selected: 'editProfile',
                });
            } else {
                this.setState({
                    selected: 'viewProfile',
                });
                userId = firebase.auth().currentUser.uid;
                firebase.database().ref('users/' + userId).update({
                    school: this.state.school,
                    retning: this.state.retning,
                    beskrivelse: this.state.beskrivelse,
                });
            }
        //}
    };

    viewProfile = () => {
        //console.log(firebase.auth().currentUser)
        //console.log('photoUrl: ' + firebase.auth().currentUser.photoURL)
        return (
            <View style={styles.viewProfileContainer}>
                <View style={{flex: 1, width: '85%'}}>
                    <View style={{flex: 1.2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1}}>
                        <View style={{flex: 2, justifyContent: 'center'}}>
                            <Image
                                style={{width: 130, height: 130, borderRadius: 65}}
                                source={{uri: firebase.auth().currentUser.photoURL}}
                            />
                        </View>
                        <View style={{flex: 0.4, justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', color: '#383838', fontSize: 20}}>{this.state.firstName} {this.state.lastName}</Text>
                        </View>
                        <View style={{flex: 0.6, justifyContent: 'flex-start'}}>
                            <Text style={styles.regularText}>{this.state.beskrivelse}</Text>
                        </View>
                        <View style={{flex: 0.8, justifyContent: 'center'}}>
                            <Button onPress={() => this.changeData()} style={styles.button}>
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
    };

    editProfile = () => {
        return (
            <View style={styles.editProfileContainer}>
                <View style={styles.items}>
                    <View style={{flex: 1.5, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 50}}>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <Image
                                style={{width: 100, height: 100, borderRadius: 50}}
                                source={{uri: firebase.auth().currentUser.photoURL}}
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
                            placeholder={this.state.beskrivelse}
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
                            placeholder={this.state.school}
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
                            placeholder={this.state.retning}
                            onChangeText={(retning) => this.setState({retning: retning})}
                        />
                    </View>
                </View>
                <View>
                    <Button style={styles.button} onPress={() => this.changeData()}>
                            <Text style={{fontSize: 20, color: '#383838'}}>Ferdig</Text>
                    </Button>
                </View>
            </View>
        )
    };

    

    /*
    <Button style={styles.button} onPress={() => this.changeData()}>
                        <Text style={{fontSize: 20, color: '#383838'}}>{this.state.btnText}</Text>
                    </Button>
    */

    render() {
        return (
            <View style={this.state.selected === 'viewProfile' ? styles.viewProfileContainer : styles.editProfileContainer}>
                {this.state.selected === 'viewProfile' ? this.viewProfile() : this.editProfile()}
                <FlashMessage ref="modalFlash" position="bottom"/>
            </View>
        );
    }
}
/*
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
*/


const styles = StyleSheet.create({
    viewProfileContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    editProfileContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 30
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
    },
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