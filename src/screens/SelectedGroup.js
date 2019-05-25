import React, { Component } from 'react';
import {Text, View} from "react-native";

export default class Profile extends Component {
    constructor(props) {
        super(props)



    }

    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Text>{this.props.time}</Text>
                <Text>{this.props.desc}</Text>
                <Text>{this.props.size}</Text>
                <Text>{this.props.place}</Text>
                <Text>{this.props.cate}</Text>
            </View>
        );
    }
}