import * as firebase from 'firebase';


class FirebaseChat {
    constructor() {
        this.init();
    }
    
    init = () =>
        firebase.initializeApp({
            apiKey: "YOUR-UNIQUE-CREDENTIALS",
            authDomain: "YOUR-PROJECT-NAME.firebaseapp.com",
            databaseURL: "https://YOUR-PROJECT-NAME.firebaseio.com",
            projectId: "YOUR-UNIQUE-PROJECT-NAME",
            storageBucket: "YOUR-UNIQUE-URL",
            messagingSenderId: "YOUR-UNIQUE-CREDENTIALS"
        });

    groupId = '';
    
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get photo() {
        return (firebase.auth().currentUser || {}).photoURL;
    }

    get name() {
        return (firebase.auth().currentUser || {}).displayName;
    }

    get ref() {
        return firebase.database().ref('messages/' + groupId);
    }



    setLastMessage(groupId){

        lastMessage = '';
        firebase.database().ref('messages/').child(groupId).orderByKey().limitToLast(1).on('child_added', function(snapshot) {
            let item = snapshot.val();
            lastMessage = item.text
        })

        firebase.database().ref('groups/' + groupId).update({
            lastMessage: lastMessage
        })
        console.log(lastMessage)
    }


    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    set ref(id) {
        groupId = id;
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

    off() {
        this.ref.off();
    }
}

FirebaseChat.shared = new FirebaseChat();
export default FirebaseChat;
