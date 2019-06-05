import * as firebase from 'firebase'; // 4.8.1


class FirebaseChat {
    constructor() {
        this.init();
        this.observeAuth();
    }
    
    init = () =>
        firebase.initializeApp({
            apiKey: 'AIzaSyC472p6bon1WNU-l9uofXoeWp3sTppqJh0',
            authDomain: 'samlebandet.firebaseapp.com',
            databaseURL: 'https://samlebandet.firebaseio.com',
            projectId: 'samlebandet',
            storageBucket: 'samlebandet.appspot.com',
            messagingSenderId: '693041379005'
        });

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('messages/');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }
    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => this.ref.push(message);

    // close the connection to the Backend
    off() {
        this.ref.off();
    }
}

FirebaseChat.shared = new FirebaseChat();
export default FirebaseChat;