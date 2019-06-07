import React, {Component} from 'react';
import { StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity, Picker, image } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ActionSheet from 'react-native-actionsheet';
import ActionSheet2 from 'react-native-actionsheet';
import moment from 'moment';
import * as firebase from 'firebase';

let data = [];

export default class CreateGroup extends Component {
  constructor(props){
    super(props);

    this.state = {
        listViewData: data,
        groupTitle: '',
        groupDesc: '',
        groupTime: '',
        groupPlace: '',
        groupSize: '',
        groupCate: '',
        isVisible: false,
        isVisibleAntall: false,
        PickerSize: '',
        PickerSize2: '',
        PickerCate: '',
        CateOptions: ['Mat', 'Uteliv', 'Friluft', 'Trening', 'Opplevelser', 'Hobby', 'Underholdning', 'Diverse', 'Cancel']
    }
  }

    static navigationOptions = {
        title: 'Opprett gruppe',
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

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      groupTime: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  };

  showPicker = () => {
    this.setState({
      isVisible: true
    })
  };

  hidePicker = () => {
    this.setState({
      isVisible: false
    })
  };

  addGroup(title, desc, time, place, size, cate){
    userId = firebase.auth().currentUser.uid;
    key = firebase.database().ref('/groups').push().key;
    firebase.database().ref('/groups').child(key).set({
      _id: key,
      groupTitle: title,
      groupDesc: desc,
      groupTime: time,
      groupPlace: place,
      groupSize: size,
      groupCate: cate,
      adminId: userId,
    });
    lastMessage = {'text': 'Ingen meldinger.',}
    firebase.database().ref('groups/').child(key).update({
      lastMessage: lastMessage
    })
    firebase.database().ref('/groups').child(key + '/members').push({
      _id: userId
    });
    firebase.database().ref('/users/' + userId + '/groups/').push({
      groupId: key
    });
    this.props.navigation.navigate('Home');
  } 

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  showActionSheet2 = () => {
    this.ActionSheet2.show();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.image}>
          <Icon
            name='camera'
            size={50}
          />
          <Text style={{fontSize: 15}}>Legg til bilde</Text>
        </View>
        <View style={{flex: 6, borderTopWidth: 1.5, borderColor: '#bbb', width: '85%', alignItems: 'center', marginTop: 30}}>
          <View style={styles.items}>
            <View style={{flex: 1}}>
              <Text style={{color: '#383838', fontWeight: 'bold'}}>Navn</Text>
            </View>
            <View style={{flex: 2}}>
              <Input
              style={{color: '#747475', fontSize: 15}}
              onChangeText={(groupTitle) => this.setState({groupTitle})}
              placeholder="Gi gruppen et navn"
              />
            </View>
          </View>
          <View style={{
              flex: 0.4,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomWidth: 1,
              borderColor: '#ccc',
              marginTop: 25
          }}>
              <View style={{flex: 1}}>
                  <Text style={{marginTop: 5, color: '#383838', fontWeight: 'bold'}}>Beskrivelse</Text>
              </View>
              <View style={{flex: 2}}>
                  <Input
                      style={{color: '#747475', fontSize: 15}}
                      multiline={true}
                      onChangeText={(groupDesc) => this.setState({groupDesc})}
                      placeholder="Legg til en beskrivelse..."
                  />
              </View>
          </View>
          <View style={styles.items}>
              <View style={{flex: 1}}>
                  <Text style={{color: '#383838', fontWeight: 'bold'}}>Sted</Text>
              </View>
              <View style={{flex: 2}}>
                  <Input
                      style={{color: '#747475', fontSize: 15}}
                      onChangeText={(groupPlace) => this.setState({groupPlace})}
                      placeholder="Hvor skal det være?"
                  />
              </View>
          </View>
          <View style={styles.items}>
              <View style={{flex: 1}}>
                  <Text style={{color: '#383838', fontWeight: 'bold'}}>Tidspunkt</Text>
              </View>
              <View style={{flex: 2}}>
                  <TouchableOpacity style={{marginLeft: 4}} onPress={this.showPicker}>
                      <Text style={{color: '#747475', fontSize: 15}}>
                          {this.state.groupTime === '' ? 'Når begynner det?' : this.state.groupTime}
                      </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                      cancelTextIOS={'Exit'}
                      confirmTextIOS={'OK'}
                      cancelTextStyle={{color: 'red', fontSize: 20}}
                      confirmTextStyle={{color: 'blue', fontSize: 20}}

                      minimumDate={new Date()}
                      //maximumDate setter limiten til 24 timer senere, ikke hele neste dag. Finne bedre løsning
                      maximumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                      isVisible={this.state.isVisible}
                      onConfirm={this.handlePicker}
                      onCancel={this.hidePicker}
                      mode={'datetime'}
                      is24Hour={true}
                      />
              </View>
          </View>
          <View style={styles.items}>
              <View style={{flex: 1}}>
                  <Text style={{color: '#383838', fontWeight: 'bold'}}>Maks Antall</Text>
              </View>
              <View style={{flex: 2}}>
                  <Text onPress={this.showActionSheet} style={{marginLeft: 4, color: '#747475', fontSize: 15}}>
                      {this.state.PickerSize === '' ? 'Velg gruppestørrelse' : this.state.groupSize}
                  </Text>
                  <ActionSheet
                      ref={o => this.ActionSheet = o}
                      title={'Velg gruppestørrelse'}
                      options={['2', '3', '4', '5', '6', '7', '8', 'Cancel']}
                      cancelButtonIndex={7}
                      destructiveButtonIndex={7}
                      onPress={(index) => {this.setState({PickerSize: index, groupSize: index+2})
                  }}/>
              </View>
          </View>
          <View style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderBottomWidth: 1.5,
              borderColor: '#bbb'
          }}>
              <View style={{flex: 1}}>
                  <Text style={{color: '#383838', fontWeight: 'bold'}}>Kategori</Text>
              </View>
              <View style={{flex: 2}}>
                  <Text onPress={this.showActionSheet2} style={{marginLeft: 4, color: '#747475', fontSize: 15}}>
                      {this.state.PickerSize2 === '' ? 'Velg en interesse' : this.state.groupCate}
                  </Text>
                  <ActionSheet
                    ref={o => this.ActionSheet2 = o}
                    title={'Velg en interesse'}
                    options={['Mat', 'Uteliv', 'Friluft', 'Trening', 'Opplevelser', 'Hobby', 'Underholdning', 'Diverse', 'Cancel']}
                    cancelButtonIndex={8}
                    destructiveButtonIndex={8}
                    onPress={(index) => {this.setState({PickerSize2: index, groupCate: this.state.CateOptions[index]})
                }}/>
              </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
            <Button style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 30,
                width: 250,
                height: 50
            }}
              onPress={() => this.addGroup(
              this.state.groupTitle,
              this.state.groupDesc,
              this.state.groupTime,
              this.state.groupPlace,
              this.state.groupSize,
              this.state.groupCate
              )}>
              <Text style={{fontSize: 20}}>Opprett</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
      flex: 1,
      backgroundColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
  },
  text: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center'
  },
  items: {
      flex: 0.3,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ccc'
  }
});