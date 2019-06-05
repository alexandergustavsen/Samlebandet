import React, { Component } from 'react';
import {View, Text, Image, ImageBackground} from "react-native";

export default class LogoHeader extends Component {

    render() {
        return(
            <View style={{flex: 2.2}}>
                <View>
                    <ImageBackground
                        source={require('../../assets/images/header_picto.png')}
                        style={{width: '100%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#383838', fontSize: 30 }}>{this.props.title}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        )
    }

}