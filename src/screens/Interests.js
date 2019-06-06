import React, { Component } from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button, View} from 'native-base';
import * as firebase from 'firebase'

export default class Interests extends Component {

    constructor(){
        super();

        this.state = {
            utelivSelected: false,
            friluftSelected: false,
            opplevelserSelected: false,
            underholdningSelected: false,
            matSelected: false,
            treningSelected: false,
            hobbySelected: false,
            diverseSelected: false
        };
    }

    static navigationOptions = {
        title: 'Velg interesser',
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

    uploadInterests(){
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId + '/interests').set({
            uteliv: this.state.utelivSelected,
            friluft: this.state.friluftSelected,
            opplevelser: this.state.opplevelserSelected,
            underholdning: this.state.underholdningSelected,
            mat: this.state.matSelected,
            trening: this.state.treningSelected,
            hobby: this.state.hobbySelected,
            diverse: this.state.diverseSelected
        });
        this.props.navigation.navigate('Tutorial')
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>

                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.utelivSelected === false ? ()=>{this.setState({utelivSelected: true})} : ()=>{this.setState({utelivSelected: false})}} style={this.state.utelivSelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/uteliv_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>UTELIV</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.friluftSelected === false ? ()=>{this.setState({friluftSelected: true})} : ()=>{this.setState({friluftSelected: false})}} style={this.state.friluftSelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/friluft_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>FRILUFT</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.opplevelserSelected === false ? ()=>{this.setState({opplevelserSelected: true})} : ()=>{this.setState({opplevelserSelected: false})}} style={this.state.opplevelserSelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/opplevelse_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>OPPLEVELSER</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.underholdningSelected === false ? ()=>{this.setState({underholdningSelected: true})} : ()=>{this.setState({underholdningSelected: false})}} style={this.state.underholdningSelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/underhodning_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>UNDERHOLDNING</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.matSelected === false ? ()=>{this.setState({matSelected: true})} : ()=>{this.setState({matSelected: false})}} style={this.state.matSelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/mat_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>MAT</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.treningSelected === false ? ()=>{this.setState({treningSelected: true})} : ()=>{this.setState({treningSelected: false})}} style={this.state.treningSelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/trening_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>TRENING</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.hobbySelected === false ? ()=>{this.setState({hobbySelected: true})} : ()=>{this.setState({hobbySelected: false})}} style={this.state.hobbySelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/hobby_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>HOBBY</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={this.state.diverseSelected === false ? ()=>{this.setState({diverseSelected: true})} : ()=>{this.setState({diverseSelected: false})}} style={this.state.diverseSelected === true ? styles.highlighted : styles.unHighlighted}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={require('../../assets/images/diverse_sirkel.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.text}>DIVERSE</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Button style={styles.button}  onPress={() => this.uploadInterests()}>
                        <Text style={{fontSize: 20}}>Registrer</Text>
                    </Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15
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
    },
    highlighted: {
        width: 84,
        height: 84,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    unHighlighted: {
        width: 80,
        height: 80,
        borderWidth: 0
    }
});