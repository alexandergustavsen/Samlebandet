import React, { Component } from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet, FlatList} from "react-native";


export default class ChatList extends Component {

    constructor(props) {
        super(props);
        let prop = this.props.navigation.state.params;
        this.state = {
            data: prop.data
        }
    }

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

    showStatus() {
        return (
            <View style={{flex: 1, flexDirection: 'column', marginTop: 150}}>
                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Image
                        style={{flex: 1, width: 130, height: 130, resizeMode: 'contain'}}
                        source={require('../../assets/images/chat.png')}
                    />
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 17, color: '#343435'}}>Opprett eller bli med i en gruppe</Text>
                    <Text style={{fontSize: 17, color: '#343435'}}>for å chatte.</Text>
                </View>
            </View>
        )
    }

    renderItem = (data) => {
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, marginLeft: 25, marginRight: 25, marginTop: 20, paddingBottom: 10}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image
                                style={{width: 60, height: 60, borderRadius: 30}}
                                source={require('../../assets/images/fest.png')}
                            />
                        </View>
                        <View style={{flex: 4, marginLeft: 10}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{data.item.name}</Text>
                        </View>
                </View>
            </View>
        )
    };

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                <FlatList
                    data={this.state.data}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.key}
                    extra={this.state}
                    ListEmptyComponent={this.showStatus()}
                />
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

