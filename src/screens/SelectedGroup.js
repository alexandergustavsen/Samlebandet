import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from "react-native";

export default class SelectedGroup extends Component {
    constructor(props) {
        super(props)
        let prop = this.props.navigation.state.params
        this.state = {
            name: prop.name,
            time: prop.time,
            desc: prop.desc,
            size: prop.size,
            place: prop.place,
            cate: prop.cate,
        }
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
                onPress={() => this.props.navigation.navigate('Home')}
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