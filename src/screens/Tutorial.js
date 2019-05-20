import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity} from 'react-native';
import { View } from 'native-base';

export default class Tutorial extends Component {
    render() {
        return (
            <View>
                <Text>Tutorial-3</Text>
                <Text>Skap nye opplevelser</Text>
                <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('App')}>
                    <Text style={styles.text}>Ferdig</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 50,
        backgroundColor: '#BF3000',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },
    text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    }
});