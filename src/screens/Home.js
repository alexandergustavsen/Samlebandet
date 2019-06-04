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
import FlashMessage from "react-native-flash-message";
import moment from 'moment';

import * as firebase from 'firebase'

export default class Home extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <TouchableOpacity style={{flex: 2}} onPress={() => navigation.navigate('Profile')}>
                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50, width: 35, height: 35}}>
                    <Image
                        style={{width: 20, height: 26}}
                        source={require('../../assets/images/profil.png')}
                    />
                </View>
            </TouchableOpacity>
        ),
        headerStyle: ({
            backgroundColor: '#00EDD6',
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderBottomWidth: 0
        })
    });

    constructor(){
        super();

        this.state = {
            todaySelected: true,
            showMe: false,
            activeIndex: 0,
            todayGroups: [],
            tomorrowGroups: [],
            carouselItems: [{name: 'Du har ingen grupper'},],
            currentItem: null,
        };
        this.renderSlider = this.renderSlider.bind(this);
    }

    

    componentDidMount() {
        const that = this;
        const userId = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser);
        //console.log(userId);
        firebase.database().ref('/groups').on('value', function(snapshot) {
            //console.log(snapshot)
            let groupArray = [];
            let todayGroups = [];
            let tomorrowGroups = [];
            let date = new Date();
            snapshot.forEach(function(snap) {
                let item = snap.val();
                item.key = snap.key;
                groupArray.push(item);

                let groupDate = item.groupTime.substring(0, item.groupTime.lastIndexOf(" "));
                let todaysDate = moment(date).format('MMMM, Do YYYY HH:mm');
                let tomorrowsDate = moment(date).add(1, 'days').format('MMMM, Do YYYY HH:mm');
                todaysDate = todaysDate.substring(0, todaysDate.lastIndexOf(" "));
                tomorrowsDate = tomorrowsDate.substring(0, tomorrowsDate.lastIndexOf(" "));
                //console.log('todaysDate: ' + todaysDate)
                //console.log('tomorrowsDate: ' + tomorrowsDate)
                //console.log('groupDate: ' + groupDate)

                if(groupDate === todaysDate) todayGroups.push(item)
                if(groupDate === tomorrowsDate) tomorrowGroups.push(item)
            });

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
            if (!groupsWithUser.length == 0) {
                that.setState({
                    carouselItems: groupsWithUser
                })
            }
            that.setState({
                todayGroups: todayGroups,
                tomorrowGroups: tomorrowGroups
            })
        });
    }

    joinGroup = (key) => {
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/groups/' + key).child('members').orderByChild('_id').equalTo(userId).once('value', snapshot => {
            if (snapshot.exists()){
                this.setState({
                    showMe: false
                })
                this.refs.modalFlash.showMessage({
                    message: "Du er allerede medlem av denne gruppen",
                    type: "danger",
                });
            } else {
                firebase.database().ref('/groups/' + key + '/members').push({
                    _id: userId
                });
                this.setState({
                    activeIndex: this.state.activeIndex+1
                })

            }
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

    todayTomorrow(){
        //this.state.todaySelected === true ? return this.state.todayGroups : return this.state.tomorrowGroups
        if(this.state.todaySelected){
            return this.state.todayGroups
        } else {
            return this.state.tomorrowGroups
        }
    }

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
                        height: 90,
                        borderRadius: 5
                    }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onPress={() => this.props.navigation.navigate('CreateGroup')
                            }>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50, width: 60, height: 60}}>
                                    <Image
                                        style={{
                                            width: 37,
                                            height: 30
                                        }}
                                        source={require('../../assets/images/gruppe.png')}
                                    />
                                </View>
                                <Text style={{color: '#383838'}}>Opprett gruppe</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        backgroundColor: '#00EDD6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 150,
                        height: 90,
                        borderRadius: 5
                    }}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}
                            onPress={() => this.props.navigation.navigate('Chat')
                            }>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50, width: 60, height: 60}}>
                                <Image
                                    style={{
                                        width: 42,
                                        height: 28
                                    }}
                                    source={require('../../assets/images/chat.png')}
                                />
                                </View>
                                <Text style={{color: '#383838'}}>Chat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 2,
                    borderColor: '#ccc',
                    paddingBottom: 15,
                    marginLeft: 20,
                    marginRight: 20

                }}>
                    <View style={{marginLeft: 18}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#383838'}}>Finn en gruppe</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginRight: 18}}>
                        {/*HER TRENGER VI ET IKON*/}
                        <Text style={{color: '#383838'}}>Filtrer</Text>
                    </View>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginRight: 10}}>
                        <Button onPress={()=>{this.setState({todaySelected: true})}} style={this.state.todaySelected === true ? styles.highlighted : styles.unHighlighted}>
                            <Text style={{color: '#383838', fontSize: 15}}>I dag</Text>
                        </Button>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Button onPress={()=>{this.setState({todaySelected: false})}} style={this.state.todaySelected === false ? styles.highlighted : styles.unHighlighted}>
                            <Text style={{color: '#383838', fontSize: 15}}>I morgen</Text>
                        </Button>
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
                        data={this.todayTomorrow()}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.key}
                        extra={this.state}
                    />
                </View>
                <View style={styles.container}>
                    {this.state.showMe === true ? this.modal() : null}
                </View>
                <FlashMessage ref="modalFlash" position="bottom"/>
            </View>
        );
    }
}
//onPress={this.setState({todaySelected: true})}

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
    },
    unHighlighted: {
        borderWidth: 2,
        borderColor: '#00EDD6',
        backgroundColor: '#fff',
        width: 170,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    highlighted: {
        backgroundColor: '#00EDD6',
        width: 170,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});