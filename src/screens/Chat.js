import React from 'react';
import FirebaseChat from '../database/FirebaseChat';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            groupId: this.props.navigation.state.params.id,
            title: this.props.navigation.state.params.title,
        };
        //console.log('Chat.js groupId: ' + id)
    }

    static navigationOptions = {
        //title: this.state.title,
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

    state = {
        messages: [],
    };


    get user() {
        //console.log(id)
        return {
            _id: FirebaseChat.shared.uid,
            name: FirebaseChat.shared.name,
            avatar: FirebaseChat.shared.photo,
        };
    }

    render() {
        FirebaseChat.shared.setLastMessage(this.state.groupId)
        return (
            <GiftedChat
                messages={this.state.messages}
                user={this.user}
                onSend={FirebaseChat.shared.send}
            />
        );
    }

    componentDidMount() {
        FirebaseChat.shared.ref = this.state.groupId;
        FirebaseChat.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        FirebaseChat.shared.off();
    }

}


export default Chat;
