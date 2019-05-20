import React from 'react';
import FirebaseChat from '../database/FirebaseChat';
import { GiftedChat } from 'react-native-gifted-chat';

/*type; Props = {
    name?: string,
};*/

class Chat extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat',
    });

    state = {
        messages: [],
    };

    get user() {
        return {
            // name: this.props.navigation.state.params.name,
            _id: FirebaseChat.shared.uid,
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
