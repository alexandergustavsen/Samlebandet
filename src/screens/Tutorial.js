import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';

const slides = [
    {
        key: 'somethun',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('../../assets/images/group.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../../assets/images/chat.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../../assets/images/activities.png'),
        backgroundColor: '#22bcb5',
    }
];

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
    }
    
    renderItem = (item) => {
        return (
            <View style={{backgroundColor: item.backgroundColor}}>
                <View style={styles.slide}>
                    <Image style={styles.image} source={item.image} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        );
    }
    onDone = () => {
        this.props.navigation.navigate('Home')
    }

    renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ionicons
                    name='md-arrow-round-forward'
                    color='rgba(255, 255, 255, .9)'
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }
    renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ionicons
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }

    render() {
        return(
            <AppIntroSlider 
            renderItem={this.renderItem} 
            slides={slides} 
            onDone={this.onDone}
            renderDoneButton={this.renderDoneButton}
            renderNextButton={this.renderNextButton}
            showSkipButton={true}
            />
        )

    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: 160,
        height: 160,
    },
    text: {
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});