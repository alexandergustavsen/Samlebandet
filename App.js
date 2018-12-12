import React, {Component} from 'react';
import { StyleSheet, StatusBar, Text, View, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import LoginPage from './src/screens/loginPage';

import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: 'AIzaSyC472p6bon1WNU-l9uofXoeWp3sTppqJh0',
  authDomain: 'samlebandet.firebaseapp.com',
  databaseURL: 'https://samlebandet.firebaseio.com',
  projectId: 'samlebandet',
  storageBucket: 'samlebandet.appspot.com',
  messagingSenderId: '693041379005'
};

firebase.initializeApp(firebaseConfig);

var data = []

export default class App extends React.Component {
  
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      groupTitle: ""
    }

  }
  
  componentDidMount(){
    
    var that = this
    
    firebase.database().ref('/groups').on('child_added', function(data){

      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({listViewData : newData})

    })

  }

  addGroup(data){

    var key = firebase.database().ref('/groups').push().key
    firebase.database().ref('/groups').child(key).set({ groupTitle: data })

  }

  async deleteGroup(secId, rowId, rowMap, data){

    await firebase.database().ref('groups/' + data.key).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  showGroup(){


  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{marginTop: StatusBar.currentHeight}}>
          <Content>
            <Item>
              <Input 
                onChangeText={(groupTitle) => this.setState({groupTitle})} 
                placeholder="Title"
              />
              <Button onPress={() => this.addGroup(this.state.groupTitle)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text>{data.val().groupTitle}</Text>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this.addGroup(data)}>
                <Icon name="information-circle"/>
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteGroup(secId, rowId, rowMap, data)}>
                <Icon name="trash"/>
              </Button>
            }
            leftOpenValue={-75}
            rightOpenValue={-75}
          />
        </Content>
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