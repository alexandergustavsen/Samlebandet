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
    Image, TouchableWithoutFeedback, ScrollView,
    Alert,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
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
        };
        this.renderSlider = this.renderSlider.bind(this);
    }

    static navigationOptions = {
        headerLeft: (
            <TouchableOpacity style={{flex: 2}} onPress={() => this.props.navigation.navigate('Profile')}>
                <Icon name='person' size={35}/>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity>
                <Icon name='settings' size={30}/>
            </TouchableOpacity>
        ),
        headerStyle: ({
            backgroundColor: '#00EDD6',
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderBottomWidth: 0
        })
    };

    componentDidMount() {
        const that = this;
        const userId = firebase.auth().currentUser.uid;
        //console.log(userId);
        firebase.database().ref('/groups').on('value', function(snapshot) {
            //console.log(snapshot)
            let groupArray = [];

            snapshot.forEach(function(snap) {
                let item = snap.val();
                item.key = snap.key;

                groupArray.push(item);
            });
            //console.log(groupArray)
            let groupsWithUser = groupArray.filter(group => {
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
                dataArray: groupArray
            })
        });
    }

    joinGroup = (key) => {
        //that = this;
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/groups/' + key).child('members').orderByChild('_id').equalTo(userId).once('value', snapshot => {
            if (snapshot.exists()){
                Alert.alert('Du er allerede medlem av denne gruppen')
            } else {
                firebase.database().ref('/groups/' + key + '/members').push({
                    _id: userId
                });
            }
        })
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
            <View style={{
                flex: 1,
                flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'left', marginLeft: 20}}>
                    <Image
                        style={{
                            width: 120,
                            height: 100,
                            borderRadius: 5
                        }}
                        source={require('../../assets/images/fest.png')}
                    />
                </View>
                <View style={{flex: 2, justifyContent: 'left', alignItems: 'left', marginLeft: 20, marginRight: 10}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{data.item.groupTitle}</Text>
                    <Text style={{fontSize: 15}}>{data.item.groupPlace}</Text>
                    <Text style={{fontSize: 15}}>{data.item.groupTime}</Text>
                    {/*<Text>{data.item.groupSize}</Text>*/}
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 7}}>
                        <View style={{marginRight: 7}}>
                            <Image
                                style={{width: 25, height: 25}}
                                source={require('../../assets/images/person1.png')}
                            />
                        </View>
                        <View style={{marginRight: 7}}>
                            <Image
                                style={{width: 25, height: 25}}
                                source={require('../../assets/images/person2.png')}
                            />
                        </View>
                        <View style={{marginRight: 7}}>
                            <Image
                                style={{width: 25, height: 25}}
                                source={require('../../assets/images/person3.png')}
                            />
                        </View>
                    </View>
                </View>
            </View>
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
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                            source={require('../../assets/images/friluft.png')}
                        />
                    </View>
                    <View style={{flex: 1.25, justifyContent: 'center', alignItems:'left', marginLeft: 10}}>
                        <Text style={{fontWeight: 'bold', color: '#000'}}>{item.name}</Text>
                        <Text style={{color: '#000'}}>{item.time}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.carouselContainer}>
                    <TouchableOpacity onPress={() => this.carousel._snapToItem(this.state.activeIndex-1)}>
                        <Icon name='chevron-left' color={'#00000033'}/>
                    </TouchableOpacity>

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

                    <TouchableOpacity onPress={() => this.carousel._snapToItem(this.state.activeIndex+1)}>
                        <Icon name='chevron-right' color={'#00000033'}/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: 20
                    }}>
                    <View style={{
                        backgroundColor: '#00EDD6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 150,
                        height: 90
                    }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => this.props.navigation.navigate('CreateGroup')
                            }>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50
                                    }}
                                    source={require('../../assets/images/group_white.png')}
                                />
                                <Text style={{color: '#383838'}}>Opprett gruppe</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: '#00EDD6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 150,
                        height: 90
                    }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}
                            onPress={() => this.props.navigation.navigate('Chat')
                            }>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50
                                    }}
                                    source={require('../../assets/images/chat_white.png')}
                                />
                                <Text style={{color: '#383838'}}>Chat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{marginLeft: 20}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#383838'}}>Finn en gruppe</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginRight: 20}}>
                        {/*HER TRENGER VI ET IKON*/}
                        <Text style={{color: '#383838'}}>Filtrer</Text>
                    </View>
                </View>
                <View style={{
                    flex: 4,
                    shadowColor: "#000",
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,
                    elevation: 5
                }}>
                    <FlatList
                        data={this.state.dataArray}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.key}
                        extra={this.state}
                    />
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
        paddingVertical: 20,
        margin: 15,
        backgroundColor: "#fff",
        zIndex: -1,
        overflow: 'hidden',
        borderRadius: 5
    },
    carouselContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 100,
        borderBottomWidth: 1
    }
});