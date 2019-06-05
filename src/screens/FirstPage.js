import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {Button} from "native-base";

export default class FirstPage extends Component {

    static navigationOptions = {
        headerStyle: ({
            backgroundColor: '#00EDD6',
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderBottomWidth: 0
        })
    };

    render() {
        return(
            <View style={{flex: 1}}>
                    <View style={{flex: 3}}>
                        <ImageBackground source={require('../../assets/images/header_logo.png')} style={{width: '100%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 20}}>Introduser deg online,</Text>
                                <Text style={{fontSize: 20}}>bli kjent offline</Text>
                            </View>
                        </View>
                        </ImageBackground>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 30}}>
                        <View style={{marginBottom: 20}}>
                            <Button style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={{fontSize: 20}}>Registrer deg</Text>
                            </Button>
                        </View>
                        <View style={{}}>
                            <Button style={styles.button} onPress={() => this.props.navigation.navigate('LogIn')}>
                                <Text style={{fontSize: 20}}>Logg inn</Text>
                            </Button>
                        </View>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 30,
        width: 250,
        height: 50
    }
});