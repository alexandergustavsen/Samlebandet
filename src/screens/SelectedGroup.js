import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import * as firebase from 'firebase'

export default class SelectedGroup extends Component {
    constructor(props) {
        super(props)
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

    leaveGroup(){
        that = this
        https://samlebandet.firebaseio.com/groups/-Lfd2AAaRyRaVEUzG5HB/members
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
            <View>
                <Text>{this.state.name}</Text>
                <Text>{this.state.time}</Text>
                <Text>{this.state.desc}</Text>
                <Text>{this.state.size}</Text>
                <Text>{this.state.place}</Text>
                <Text>{this.state.cate}</Text>

                <Button
                style={{ marginTop: 10 }}
                full
                rounded
                primary
                onPress={() => this.props.navigation.navigate('Chat')}
                title='Chat'
                ></Button>

                <Button
                style={{ marginTop: 10 }}
                full
                rounded
                primary
                onPress={() => this.leaveGroup()}
                title='Forlat gruppe'
                ></Button>

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
    }
});