import React, {Component} from 'react';
import { List, StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity, FlatList } from 'react-native';
//import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import * as firebase from 'firebase'


                        //tittel
//kategori/bilde        //sted   //tid
                        //deltagere

export default class ListGroupScreen extends Component {
    constructor(){
        super()

        this.state = {
            //flatListData: []
            title: '',
            time: '',
            size: '',
            desc: '',
            cate: '',
            place: '',
        }
        
    }

    componentDidMount() {
        var that = this
    
        firebase.database().ref('/groups').on('child_added', function (data){
        
        
        that.setState({
            title: data.val().groupTitle,
            time: data.val().groupTime,
            size: data.val().groupSize,
            desc: data.val().groupDesc,
            cate: data.val().groupCate,
            place: data.val().groupPlace,
        })

        /*
        var newData = [...this.state.flatListData]
        newData.push(data)
        that.setState({flatListData : newData})
        */
    
        //console.log(data)
    
        })

        //console.log(that.state.test)

        //console.log(that.state.test)
    }

    render() {
        console.log(this.state.title)
        console.log(this.state.time)
        console.log(this.state.size)
        console.log(this.state.desc)
        console.log(this.state.cate)
        console.log(this.state.place)
        return (
            <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.time}</Text>
                <Text>{this.state.size}</Text>
                <Text>{this.state.desc}</Text>
                <Text>{this.state.cate}</Text>
                <Text>{this.state.place}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    /*
    groupContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    */

    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },

    buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    },
});

/*
<Item>
<Button 
    primary 
    onPress={() => this.props.navigation.navigate('MakeGroup')}>
    <Text> Primary </Text>
</Button>
</Item>



View style={styles.testingStuff}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MakeGroup')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Make Group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Chat</Text>
                    </TouchableOpacity>
                </View>

*/