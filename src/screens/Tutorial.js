import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'somethun',
        title: 'Meld deg inn i eller\nopprett grupper',
        text: 'Host eller delta på eventer\nsammen med andre studenter',
        image: require('../../assets/images/gruppe_sirkel.png'),
    },
    {
        key: 'somethun-dos',
        title: 'Avtal tid og sted',
        text: 'Snakk ed gruppemedlemmene\ni en felles chat',
        image: require('../../assets/images/chat_sirkel.png'),
    },
    {
        key: 'somethun1',
        title: 'Møt gruppen',
        text: 'Introduser deg online,\nbli kjent offline',
        image: require('../../assets/images/aktiviteter_sirkel.png'),
    }
];

export default class Tutorial extends Component {

    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <Text onPress={() => navigation.navigate('Home')} style={{color: '#fff', fontSize: 20}}>Skip</Text>
        ),
        headerStyle: ({
            backgroundColor: '#00EDD6',
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            borderBottomWidth: 0
        })
    });

    constructor(props) {
        super(props);
    }

    renderItem = props => (
        <View style={{flex: 1}}>
            <View style={styles.mainContent}>
                <View style={{backgroundColor: props.backgroundColor}}>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={props.image} />
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.text}>{props.text}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 1, backgroundColor: '#0EEDD6'}}>
            </View>
        </View>
    );

onDone = () => {
        this.props.navigation.navigate('Home')
    };

    renderNextButton = () => {
        return (
            <View style={{flex: 1}}>
                <View style={styles.buttonCircle}>
                    <Text style={styles.btnText}>Next</Text>
                </View>
            </View>
        );
    };

    renderDoneButton = () => {
        return (
            <View style={{flex: 1}}>
                <View style={styles.buttonCircle}>
                   <Text style={styles.btnText}>Done</Text>
                </View>
            </View>
        );
    };

    render() {
        return(
            <AppIntroSlider 
                renderItem={this.renderItem}
                slides={slides}
                onDone={this.onDone}
                renderDoneButton={this.renderDoneButton}
                renderNextButton={this.renderNextButton}
                bottomButton
            />
        )
    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0EEDD6',
    },
    
    text: {
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 16,
    },

    btnText: {
      fontSize: 15,
      color: 'black'
    },

    buttonCircle: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },

    slide: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        width: 170,
        height: 170,
    }

});