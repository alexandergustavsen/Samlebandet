import React from 'react';
import FirebaseChat from '../database/FirebaseChat';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            groupId: this.props.navigation.state.params.id
        };
        //console.log('Chat.js groupId: ' + id)
    }

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat',
    });

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
