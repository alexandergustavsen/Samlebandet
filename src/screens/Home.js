import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    Modal,
    View,
    TouchableOpacity,
    SafeAreaView,
    TouchableHighlight,
    Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Button, Header, List, ListItem} from "native-base";

import * as firebase from 'firebase'

export default class Home extends Component {
    constructor(){
        super();

        this.state = {
            dataArray: [],
            currentItem: null,
            showMe: false,
            activeIndex: 0,
            carouselItems: [{name: 'Du har ingen grupper'},],
        }
    }

    componentDidMount() {
        const that = this;
        const userId = firebase.auth().currentUser.uid;
        //console.log(userId);
        firebase.database().ref('/groups').on('value', function(snapshot) {
            //console.log(snapshot)
            let returnArray = [];

            snapshot.forEach(function(snap) {
                let item = snap.val();
                item.key = snap.key;

                returnArray.push(item);
            });
            //console.log(returnArray)
            let groupsWithUser = returnArray.filter(group => {
                const members = group.members //const { members } = group;  <- deconstruct
                for (const key in members) {
                    if  (!members.hasOwnProperty(key)) continue;
                    const id = members[key]._id; // const { _id } = members[key] <- deconstruct
                    if (id === userId) return true;
                }
                return false;
            }) ;
            //console.log(groupsWithUser);
            
            groupsWithUser = groupsWithUser.map(group => {
                return {
                    name: group.groupTitle,
                    time: group.groupTime
                }
            })
            console.log(groupsWithUser);
            if (!groupsWithUser.length == 0) {
                that.setState({
                    carouselItems: groupsWithUser
                })
            }
            that.setState({
                dataArray: returnArray
            })
        });
    }

    joinGroup = (key) => {
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/groups/' + key + '/members').push({
            _id: userId
        });
        this.setState({
            showMe: false,
        })
    }

    modal = () => {
        let currentItem = this.state.currentItem;
        return(
            <Modal visible={this.state.showMe}
                onRequestClose={() => console.warn("This is a close request.")}
                transparent={true}
            >
                <View style={styles.modalView}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 40
                    }}>Gruppe</Text>
                    <Text>{currentItem.item.groupTitle}</Text>
                    <Text>{currentItem.item.groupTime}</Text>
                    <Text>{currentItem.item.groupDesc}</Text>
                    <Text>{currentItem.item.groupSize}</Text>
                    <Text>{currentItem.item.groupPlace}</Text>
                    <Text>{currentItem.item.groupCate}</Text>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.joinGroup(currentItem.item.key)}
                    >
                        <Text style={{ color: 'white' }}>Bli med</Text>
                    </Button>

                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            showMe:false
                        })
                    }}>
                        <Text style={styles.closeText}>Close Modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    };

    currentItemFunc = (data) => {
        this.setState({
            currentItem: data,
            showMe: true,
        })
    };

    renderItem = data =>
        <TouchableOpacity
            style={[styles.list, data.item.selectedClass]}
            onPress={() => this.currentItemFunc(data)}
        >
            <Text>{data.item.groupTitle}</Text>
            <Text>{data.item.groupTime}</Text>
            <Text>{data.item.groupDesc}</Text>
            <Text>{data.item.groupSize}</Text>
            <Text>{data.item.groupPlace}</Text>
            <Text>{data.item.groupCate}</Text>
            <Text>{data.item.key}</Text>
        </TouchableOpacity>

    renderSlider({item, index}) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Text style={{color: '#fff'}}>{item.name}</Text>
                <Text style={{color: '#fff'}}>{item.time}</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View>
                    <Header style={{ justifyContent: 'space-between' }}>
                        <Button onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text>Profil</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('CreateGroup')}>
                            <Text>Opprett gruppe</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('Chat')}>
                            <Text>Chat</Text>
                        </Button>
                        <Button>
                            <Text>Innstillinger</Text>
                        </Button>
                    </Header>
                </View>

                <SafeAreaView style={{flexDirection: 'row', backgroundColor: '#000000', height: 100}}>

                    <TouchableHighlight onPress={() => this.carousel._snapToItem(this.state.activeIndex-1)}>
                        <Text style={{color: '#fff'}}>Previous</Text>
                    </TouchableHighlight>

                    <View>
                        <Carousel
                            ref = { ref => this.carousel = ref }
                            data={ this.state.carouselItems }
                            sliderWidth={250}
                            itemWidth={250}
                            renderItem={ this.renderSlider }
                            onSnapToItem={index => this.setState({activeIndex:index})}
                        />
                    </View>

                    <TouchableHighlight onPress={() => this.carousel._snapToItem(this.state.activeIndex+1)}>
                        <Text style={{color: '#fff'}}>Next</Text>
                    </TouchableHighlight>

                </SafeAreaView>

                <View>
                    <List>
                        <FlatList
                            data={this.state.dataArray}
                            renderItem={item => this.renderItem(item)}
                            keyExtractor={item => item.key}
                            extra={this.state}
                        />
                    </List>
                </View>
                <View style={styles.container}>
                    {this.state.showMe === true ? this.modal() : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    h2text: {
        marginTop: 10,
        fontFamily: 'Helvetica',
        fontSize: 36,
        fontWeight: 'bold',
    },
    flatView: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
    },
    closeText: {
        backgroundColor: '#333',
        color: '#bbb',
        padding: 5,
        margin: 20
    },
    openText: {
        backgroundColor: '#333',
        color: '#bbb',
        padding: 5,
        margin: 20
    },
    modalView: {
        backgroundColor: "#aaa",
        height: 500,
        width: 350,
        //marginTop: 175,
        //marginLeft: 32.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        paddingVertical: 5,
        margin: 3,
        //flexDirection: "row",
        backgroundColor: "#eeeeee",
        //justifyContent: "flex-start",
        //alignItems: "center",
        zIndex: -1
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selected: {backgroundColor: '#FA7B5F'}
});