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
    View,
    PixelRatio
} from 'react-native';


export default class App extends Component<{}> {
    render() {
        return (
            <View style={[S.container]}>
                <View style={[S.searchBar]}>
                    <Text>搜索栏</Text>
                </View>
                <View style={[S.ad]}>
                    <Text>轮播广告</Text>
                </View>
                <View style={[S.products]}>
                    <Text> 商品列表</Text>
                </View>
            </View>
        );
    }
}

const S = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBar: {
        marginTop: 20,
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ad: {
        height: 180,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    products: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    }

});
