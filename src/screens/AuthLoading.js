import React, { Component } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

export default class AuthLoading extends Component {

    constructor(){
        super();
        this.loadApp()
    }

    loadApp = async () => {
        const userToken = await AsyncStorage.getItem('usertoken');

        this.props.navigation.navigate(userToken ? 'App' : 'Auth')
        //this.props.navigation.navigate('Auth')
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
