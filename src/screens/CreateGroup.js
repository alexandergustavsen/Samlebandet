import React, {Component} from 'react';
import { StyleSheet, StatusBar, Text, View, ListView, TouchableOpacity, Picker } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';

import DateTimePicker from 'react-native-modal-datetime-picker';
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
      PickerCate: ''
    }
  }

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
    firebase.database().ref('/groups').child(key + '/members').push({
      _id: userId
    });
    firebase.database().ref('/users/' + userId + '/groups/').push({
      groupId: key
    })
    this.props.navigation.navigate('Home');
  } 

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Item>
            <Input 
              onChangeText={(groupTitle) => this.setState({groupTitle})} 
              placeholder="Tittel"
            />
          </Item>
        </Content>
        <Content>
          <Item>
            <Input 
              onChangeText={(groupDesc) => this.setState({groupDesc})} 
              placeholder="Beskrivelse"
            />
          </Item>
        </Content>
        <Content>
          <Item>
            <TouchableOpacity style={styles.button} onPress={this.showPicker}>
              <Text style={styles.text}>Show DatePicker</Text>
            </TouchableOpacity>
            <DateTimePicker 
              cancelTextIOS={'Exit'}
              confirmTextIOS={'OK'}
              cancelTextStyle={{color: 'red', fontSize: 20}}
              confirmTextStyle={{color: 'blue', fontSize: 20}}
  
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={'datetime'}
              is24Hour={true}
            />
          </Item>
        </Content>
        <Content>
          <Item>
            <Input 
              onChangeText={(groupPlace) => this.setState({groupPlace})} 
              placeholder="Sted"
            />
          </Item>
        </Content>
        <Content>
          <Item>
            <Picker style={{width:'80%'}}
            selectedValue={this.state.PickerSize}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerSize:itemValue, groupSize: itemValue})}
            >
              <Picker.Item label="Antall" value=""/>
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            </Picker>
          </Item>
        </Content>
        <Content>
          <Item>
            <Picker style={{width:'80%'}}
            selectedValue={this.state.PickerCate}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerCate:itemValue, groupCate: itemValue})}
            >
              <Picker.Item label="Kategori" value=""/>
              <Picker.Item label="Mat" value="Mat" />
              <Picker.Item label="Uteliv" value="Uteliv" />
              <Picker.Item label="Friluft" value="Friluft" />
              <Picker.Item label="Trening" value="Trening" />
              <Picker.Item label="Opplevelser" value="Opplevelser" />
              <Picker.Item label="Hobby" value="Hobby" />
              <Picker.Item label="Underholdning" value="Underholdning" />
              <Picker.Item label="Diverse" value="Diverse" />
            </Picker>
          </Item>
        </Content>
        <Content>
          <Item>
            <Button onPress={() => this.addGroup(
              this.state.groupTitle, 
              this.state.groupDesc, 
              this.state.groupTime,
              this.state.groupPlace,
              this.state.groupSize,
              this.state.groupCate
              )}>
              <Icon name="add" />
            </Button>
          </Item>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
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