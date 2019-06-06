import React, { Component } from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";


export default class ChatList extends Component {
    static navigationOptions = {
        title: 'Chatter',
        headerTitleStyle: ({
            color: '#383838',
            fontWeight: 'normal',
            fontSize: 20
        }),
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
            <View style={{flex: 3, justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{flex: 0.13, flexDirection: 'row',
                    justifyContent: 'flex-start', alignItems: 'center',
                    width: '85%', borderBottomWidth: 0.5}}>
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30
                            }}
                            source={require('../../assets/images/fest.png')}
                        />
                    </View>
                    <View style={{flex: 3.5, justifyContent: 'flex-start', flexDirection: 'column'}}>
                        <View>
                            <Text style={styles.title}>Skogstur</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'space-between', marginTop: 5}}>
                            <View style={{flex: 4, }}>
                                <Text style={styles.chatter}>blablabla</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text style={styles.chatter}>12:00</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    chatter: {
        fontSize: 15,
        color: '#787878'
    },
});

