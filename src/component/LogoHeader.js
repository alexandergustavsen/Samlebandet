import React, { Component } from 'react';
import {View, Text, Image} from "react-native";

export default class LogoHeader extends Component {

    render() {
        return(
            <View style={{flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#00EDD6',
                borderBottomLeftRadius: 2000,
                borderBottomRightRadius: 2000,
                width: 500,
            }}>
                <View>
                    <Image
                        style={{width: 90, height: 80}}
                        source={require('../../assets/images/pictogram_logo.png')}
                    />
                </View>
                <View>
                    <Text style={{color: '#383838', fontSize: 30 }}>{this.props.title}</Text>
                </View>
            </View>
        )
    }

}