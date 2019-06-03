import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00EDD6',
                    paddingBottom: 80,
                    borderBottomLeftRadius: 5000,
                    borderBottomRightRadius: 5000,
                    width: 790
                }}>
                    <View style={{marginBottom: 50}}>
                        <Image
                            style={{width: 234, height: 100}}
                            source={require('../../assets/images/samlebandet_logo.png')}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>Introduser deg online,</Text>
                        <Text style={{fontSize: 20}}>bli kjent offline</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 100}}>
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
        borderWidth: 1,
        borderRadius: 30,
        width: 250,
        height: 50
    }
});