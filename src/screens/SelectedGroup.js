import React, { Component } from 'react';
import {Text, View, StyleSheet, Button, Image} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase from 'firebase'

export default class SelectedGroup extends Component {
    constructor(props) {
        super(props);
        let prop = this.props.navigation.state.params;
        this.state = {
            name: prop.name,
            time: prop.time,
            desc: prop.desc,
            size: prop.size,
            place: prop.place,
            cate: prop.cate,
            id: prop.id,
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


    leaveGroup(){
        that = this;
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/groups/' + this.state.id + '/members')
            .orderByChild("_id")
            .equalTo(userId)
            .once("value", function(snapshot) {
                var key;
                snapshot.forEach(function (childSnapshot) {
                    key = childSnapshot.key;
                    return true; // Cancel further enumeration.
                });
                console.log(key);
            firebase.database().ref('/groups/' + that.state.id + '/members/' + key).remove()
        });
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 3.5, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={{width:420, height: 230}}
                        source={require('../../assets/images/fest.png')}
                    />
                </View>
                <View style={{flex:2, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'red'}}>
                    <View style={{flex:1, justifyContent: 'space-around', alignItems: 'flex-start', backgroundColor: 'red'}}>
                        <Text>{this.state.name}</Text>
                        <Text>{this.state.time}</Text>
                        <Text>{this.state.desc}</Text>
                        <Text>{this.state.size}</Text>
                        <Text>{this.state.place}</Text>
                        <Text>{this.state.cate}</Text>
                    </View>
                </View>
                <View style={{flex:3, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'red'}}>
                    <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'red'}}>
                        <Button style={{marginTop: 10}}
                                full
                                rounded
                                primary
                                onPress={() => this.props.navigation.navigate('Chat', {id: this.state.id})}
                                title='Chat'>
                        </Button>
                    </View>
                    <View style={{flex:1, justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button style={{ marginTop: 10 }}
                                full
                                rounded
                                primary
                                onPress={() => this.leaveGroup()}
                                title='Forlat gruppe'>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 30,
        width: wp('70%'),
        height: hp('5.5%')
    }
});