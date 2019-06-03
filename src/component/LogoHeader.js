import React, { Component } from 'react';
import {View, Text, Image} from "react-native";

export default class LogoHeader extends Component {

    render() {
        return(
            <View style={{flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00EDD6',
                paddingBottom: 80,
                borderBottomLeftRadius: 2000,
                borderBottomRightRadius: 2000,
                width: 535
            }}>
                <View style={{marginBottom: 30}}>
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