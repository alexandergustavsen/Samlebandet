import React, {Component} from 'react';
import { Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';


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

    /*
                <Item>
                    <TouchableOpacity style={styles.button} onPress={this.showPicker}>
                        <Text style={styles.text}>yessir</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        cancelTextIOS={'Exit'}
                        confirmTextIOS={'OK'}
                        cancelTextStyle={{color: 'red', fontSize: 20}}
                        confirmTextStyle={{color: 'blue', fontSize: 20}}

                        isVisible={this.state.isVisible}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                        mode={'datetime'}
                        is24Hour={true}
                    />
                </Item>
    */

    /*
        handlePicker = (datetime) => {
            this.setState({
                isVisible: false,
                date: moment(datetime).format('MMMM, Do YYYY HH:mm')
            })
        }


        showPicker = () => {
            this.setState({
            isVisible: true
            })
        }

        hidePicker = () => {
            this.setState({
            isVisible: false
            })
        }
    */
    /*
    writeUserData(userId, name, email, imageUrl) {
        firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
        });
    }
    */

    addProfile(firstName, lastName, school, retning, date){
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).set({
            firstName: firstName,
            lastName: lastName,
            school: school,
            retning: retning,
            date: date,
        });
        this.props.navigation.navigate('Interests')
    }

    /*
    addProfile(firstName, lastName, school, retning, date){
        userId = firebase.auth().currentUser.uid;
        var key = firebase.database().ref('/profiles' + userId).push().key
        firebase.database().ref('/profiles').child(key).set({
            firstName: firstName,
            lastName: lastName,
            school: school,
            retning: retning,
            date: date,
            _id: userId
        })
        this.props.navigation.navigate('Interests')
    }
    */

    render() {
        return (
            <Container style={styles.container}>
                <Form>

                    <Item floatingLabel>
                        <Input
                            placeholder="Fornavn"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(firstName) => this.setState({ firstName })}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Input
                            placeholder="Etternavn"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(lastName) => this.setState({ lastName })}
                        />
                    </Item>



                    <Item floatingLabel>
                        <Input
                            placeholder="Skole"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(school) => this.setState({ school })}

                        />
                    </Item>

                    <Item floatingLabel>
                        <Input
                            placeholder="Studieretning"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(retning) => this.setState({ retning })}

                        />
                    </Item>

                    <Item>
                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date of birth"
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
                    </Item>

                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.addProfile(
                            this.state.firstName,
                            this.state.lastName,
                            this.state.school,
                            this.state.retning,
                            this.state.date,
                        )}
                    >
                        <Text style={{ color: 'white' }}>Registrer profil</Text>
                    </Button>

                </Form>
            </Container>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: '#BF3000',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },
    text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    }
});