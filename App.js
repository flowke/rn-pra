/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{
    render() {
        return (
            <View
                style={S.marginBox}
            >
                <Text>fdlk</Text>
            </View>
        );
    }
}



const S = StyleSheet.create({
    marginBox: {
        position: 'absolute',
        top: 100,
        paddingLeft: 7,
        paddingRight: 8,
        backgroundColor: '#5858c6'
    },

});

// console.log(styles, 'my');
// console.log(styles.welcome, 'my');
