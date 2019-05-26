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
    Image, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import {Button, Header, List, ListItem} from "native-base";

import * as firebase from 'firebase'

export default class Home extends Component {
    constructor(){
        super();

        let tempKey

        this.state = {
            dataArray: [],
            currentItem: null,
            showMe: false,
            activeIndex: 0,
            carouselItems: [{name: 'Du har ingen grupper'},],
        }
        this.renderSlider = this.renderSlider.bind(this);
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
                    if (id === userId){
                        return true;
                    }
                }
                return false;
            }) ;
            //console.log(groupsWithUser);
            
            groupsWithUser = groupsWithUser.map(group => {
                return {
                    name: group.groupTitle,
                    time: group.groupTime,
                    desc: group.groupDesc,
                    size: group.groupSize,
                    place: group.groupPlace,
                    cate: group.groupCate,
                    id: group._id,
                }
            });
            //console.log(groupsWithUser)
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
        firebase.database().ref('/groups/' + key + '/members').set({
            _id: userId
        });
        this.setState({
            showMe: false,
        })
    };

    modal = () => {
        let currentItem = this.state.currentItem;
        return(
            <Modal visible={this.state.showMe}
                onRequestClose={() => console.warn("This is a close request.")}
                transparent={true}
            >
                <View style={styles.modalContainer}>
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
            style={styles.list}
            onPress={() => this.currentItemFunc(data)}
        >
            <Text>Tittel: {data.item.groupTitle}</Text>
            <Text>Tidspunkt: {data.item.groupTime}</Text>
            <Text>Beskrivelse: {data.item.groupDesc}</Text>
            <Text>Størrelse: {data.item.groupSize}</Text>
            <Text>Sted: {data.item.groupPlace}</Text>
            <Text>Kategori: {data.item.groupCate}</Text>
        </TouchableOpacity>

    renderSlider({item, index}) {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SelectedGroup', {
                    name: item.name,
                    time: item.time,
                    desc: item.desc,
                    size: item.size,
                    place: item.place,
                    cate: item.cate,
                    id: item.id,
                })
            }
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{color: '#000'}}>{item.name}</Text>
                    <Text style={{color: '#000'}}>{item.time}</Text>
                </View>
            </TouchableWithoutFeedback>
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
                <View style={styles.carouselContainer}>
                    <TouchableHighlight onPress={() => this.carousel._snapToItem(this.state.activeIndex-1)}>
                        <Icon name='chevron-left'/>
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
                        <Icon name='chevron-right'/>
                    </TouchableHighlight>
                </View>
                <FlatList
                    data={this.state.dataArray}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.key}
                    extra={this.state}
                    contentContainerStyle={styles.contentContainer}
                />
                <View style={styles.container}>
                    {this.state.showMe === true ? this.modal() : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    closeText: {
        backgroundColor: '#333',
        color: '#bbb',
        padding: 5,
        margin: 20
    },
    modalView: {
        backgroundColor: "#fff",
        height: 500,
        width: 350,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080'
    },
    contentContainer: {
        margin: 5
    },
    list: {
        paddingVertical: 5,
        margin: 3,
        backgroundColor: "#eeeeee",
        zIndex: -1,
        overflow: 'hidden',
        borderRadius: 10
    },
    carouselContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        height: 100,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5
    }
});