import React, { Component } from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import { Button } from 'native-base';
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
        title: 'Gruppe',
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
                console.log(key)
            firebase.database().ref('/groups/' + that.state.id + '/members/' + key).remove()
        });
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1.2, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={{width:420, height: 240}}
                        source={require('../../assets/images/fest.png')}
                    />
                </View>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start', width: '75%'}}>
                    <View style={{flex: 0.3, justifyContent: 'flex-end'}}>
                        <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
                            <View>
                                <Text style={{fontSize: 22, fontWeight: 'bold'}}>{this.state.name}</Text>
                            </View>
                            <View>
                                <Image style={{width: 22, height: 22, marginLeft: 10}}
                                    source={require('../../assets/images/friluft_sirkel.png')}/>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 15}}>{this.state.cate}</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.13, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 15}}>{this.state.desc}</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Tid:</Text>
                        </View>
                        <View>
                            <Text style={{marginLeft: 5, fontSize: 15}}>{this.state.time}</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.13, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Sted:</Text>
                        </View>
                        <View>
                            <Text style={{marginLeft: 5, fontSize: 15}}>{this.state.place}</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.13, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column'}}>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Medlemmer i gruppa:</Text>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                                <View style={{marginRight: 7}}>
                                    <Image
                                        style={{width: 25, height: 25}}
                                        source={require('../../assets/images/person1.png')}
                                    />
                                </View>
                                <View style={{marginRight: 7}}>
                                    <Image
                                        style={{width: 25, height: 25}}
                                        source={require('../../assets/images/person2.png')}
                                    />
                                </View>
                                <View style={{marginRight: 7}}>
                                    <Image
                                        style={{width: 25, height: 25}}
                                        source={require('../../assets/images/person3.png')}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Button style={styles.button}
                                onPress={() => this.props.navigation.navigate('Chat', {id: this.state.id}, {title: this.state.name})}>
                                <Text>Chat</Text>
                        </Button>
                    </View>
                    <View style={{flex:1, justifyContent: 'space-between', alignItems: 'center', marginTop: 15}}>
                        <Text onPress={() => this.leaveGroup()}>Forlat gruppe</Text>
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