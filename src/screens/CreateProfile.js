import React, {Component} from 'react';
import { StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity, Picker, image } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import LogoHeader from "../component/LogoHeader";


export default class CreateProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            school: '',
            retning: '',
            date: '',
            userId: '',
        }
    }

    static navigationOptions = {
        headerStyle: ({
            backgroundColor: '#00EDD6',
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderBottomWidth: 0
        })
    };

    addProfile(firstName, lastName, school, retning, date){
        user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).set({
            firstName: firstName,
            lastName: lastName,
            school: school,
            retning: retning,
            date: date,
            beskrivelse: 'Ingen beskrivelse',
        });
        
        const ref = firebase.storage().ref('path/to/image.jpg');
        user.updateProfile({
            displayName: this.firstname + ' ' + this.lastname,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/samlebandet.appspot.com/o/ProfilePictures%2Favatar.jpg?alt=media&token=fe5b3c06-e5c0-4d2e-9cd9-1ce2fc9ca904'
        }).then(function() {
            console.log('success')
          }).catch(function(error) {
             console.log('failed')
          });
        this.props.navigation.navigate('Interests')
    }

    render() {
        return (
            <View style={styles.container}>
                <LogoHeader title='Opprett profil'/>
                <View style={{flex: 1, width: '85%'}}>
                    <View style={{flex: 1}}>
                        <View style={styles.items}>
                            <View style={{flex: 1}}>
                                <Text style={{color: '#383838', fontWeight: 'bold'}}>Fornavn</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <Input
                                    style={{fontSize: 15}}
                                    placeholder="Skriv inn fornavn"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={(firstName) => this.setState({ firstName })}
                                />
                            </View>
                        </View>
                        <View style={styles.items}>
                            <View style={{flex: 1}}>
                                <Text style={{color: '#383838', fontWeight: 'bold'}}>Etternavn</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <Input
                                    style={{fontSize: 15}}
                                    placeholder="Skriv inn etternavn"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={(lastName) => this.setState({ lastName })}
                                />
                            </View>
                        </View>
                        <View style={styles.items}>
                            <View style={{flex: 1}}>
                                <Text style={{color: '#383838', fontWeight: 'bold'}}>Fødselsdato</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <DatePicker
                                    style={styles.datePicker}
                                    date={this.state.date} //initial date from state
                                    mode="date" //The enum of date, datetime and time
                                    placeholder="Velg dato"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-1950"
                                    maxDate="01-01-2019"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                            </View>
                        </View>
                        <View style={styles.items}>
                            <View style={{flex: 1}}>
                                <Text style={{color: '#383838', fontWeight: 'bold'}}>Studiested</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <Input
                                    style={{fontSize: 15}}
                                    placeholder="Velg studiested"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={(school) => this.setState({ school })}
                                />
                            </View>
                        </View>
                        <View style={styles.items}>
                            <View style={{flex: 1}}>
                                <Text style={{color: '#383838', fontWeight: 'bold'}}>Studieretning</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <Input
                                    style={{fontSize: 15}}
                                    placeholder="Velg studieretning"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={(retning) => this.setState({ retning })}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
                    <Button style={styles.button} onPress={() => this.addProfile(
                            this.state.firstName,
                            this.state.lastName,
                            this.state.school,
                            this.state.retning,
                            this.state.date,
                        )}
                    >
                        <Text style={{fontSize: 20, color: '#383838'}}>Neste</Text>
                    </Button>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    datePicker: {
        width: 200,
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    items: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#787878'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1.5,
        borderRadius: 30,
        width: 250,
        height: 50
    }
});