import React, {Component} from 'react';
import { StyleSheet, StatusBar, Text, View, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import * as firebase from 'firebase';

var data = []

export default class MakeGroup extends Component {
  constructor(props){
    super(props);

    this.state = {
      listViewData: data,
      groupTitle: "",
      groupDesc: "",
      groupTime: "",
      groupPlace: "",
      groupSize: "",
      groupCate: ""
    }
}

    addGroup(title, desc, time, place, size, cate){

    var key = firebase.database().ref('/groups').push().key
    firebase.database().ref('/groups').child(key).set({ 
      groupTitle: title,
      groupDesc: desc,
      groupTime: time,
      groupPlace: place,
      groupSize: size,
      groupCate: cate
    })

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Content>
            <Item>
              <Input 
                onChangeText={(groupTitle) => this.setState({groupTitle})} 
                placeholder="Tittel"
              />
            </Item>
          </Content>
        </Header>

        <Header>
          <Content>
            <Item>
              <Input 
                onChangeText={(groupDesc) => this.setState({groupDesc})} 
                placeholder="Beskrivelse"
              />
            </Item>
          </Content>
        </Header>

        <Header>
          <Content>
            <Item>
              <Input 
                onChangeText={(groupTime) => this.setState({groupTime})} 
                placeholder="Tidspunkt"
              />
            </Item>
          </Content>
        </Header>

        <Header>
          <Content>
            <Item>
              <Input 
                onChangeText={(groupPlace) => this.setState({groupPlace})} 
                placeholder="Sted"
              />
            </Item>
          </Content>
        </Header>

        <Header>
          <Content>
            <Item>
              <Input 
                onChangeText={(groupSize) => this.setState({groupSize})} 
                placeholder="Størrelse"
              />
            </Item>
          </Content>
        </Header>

        <Header>
          <Content>
            <Item>
              <Input 
                onChangeText={(groupCate) => this.setState({groupCate})} 
                placeholder="Kategori"
              />
            </Item>
          </Content>
        </Header>

        <Header>
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
        </Header>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
});