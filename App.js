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
	TextInput,
	Button,
	View,
	ScrollView,
	PixelRatio,
	Dimensions,
	ListView,
    Alert,
    TouchableHighlight,
    StatusBar,
    Image
} from 'react-native';

const data = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
});

const circleSize = 8,
    circleMargin = 5;

let screenWidth = Dimensions.get('window').width;

console.log(require('./src/common/img/1.jpg'), 'i');

export default class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			dataSource: data.cloneWithRows([
				'products1',
				'products2',
				'products3',
				'products4',
				'products5',
				'products6',
				'products7',
			]),

            searchInputText: '',

            curtPage: 0
		};

		this.interval = null;

        this.adData = [
            {title: 'ad1', img: require('./src/common/img/1.jpg')},
            {title: 'ad2', img: require('./src/common/img/2.jpg')},
            {title: 'ad3', img: require('./src/common/img/3.jpg')},
        ];

	}

	componentDidMount(){
		this._sliderAnim();
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

    searchInputOnChange = text => {
        this.setState( {
            searchInputText: text
        } )
    }

	_sliderAnim(){

		this.interval = setInterval(()=>{
            let {curtPage} = this.state;
			let nextPage = (curtPage + 1)%3;

			let offsetX = screenWidth*nextPage;

			this.refs.scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated: true});

            this.setState({curtPage: nextPage})

		}, 2000)
	}

	_renderRow = (rowData, sectionID, rowID)=> (
        <TouchableHighlight
            onPress={f=>Alert.alert('list')}
        >
            <View style={[S.dataRow]}>
                <Text>{rowData}</Text>
            </View>
        </TouchableHighlight>

	)

	render() {

		let {
            _renderRow,
            searchInputOnChange,
            adData,
        } = this

		let {dataSource, curtPage} = this.state;

        // 轮播指示器
        let circleCount = adData.length;
        let indicatorWidth =  circleCount* (circleMargin*2 + circleSize);
        let indicatorLeftPos = (screenWidth-indicatorWidth)/2;

		return (
			<View style={[S.container]}>
                <StatusBar
                    backgroundColor={'blue'}
                    barStyle='default'
                    networkActivityIndicatoryVisible={true}
                />
				<View style={[S.searchBar]}>
                    <TextInput style={[S.searchInput]}
						placeholder="搜索"
                        onChangeText={searchInputOnChange}
                    />
                    <Button
						style={[S.searchButton]}
						title="搜索"
                        onPress={()=>{Alert.alert(this.state.searchInputText)}}
                    />
				</View>
				<View style={[S.ad]}>
                    <ScrollView
						ref="scrollView"
						// 横向滚动
						horizontal={true}
						//显示横向关东糖
						showsHorizontalScrollIndicator={false}
						//分页
						pagingEnabled={true}
                    >
                        {
                            this.adData.map(({title, img}, i)=> (
                                <TouchableHighlight
                                    key={i}
                                    onPress={ar=>Alert.alert('轮播')}
                                >
                                    <Image
            							style={[S.adContent]}
                                        source={img}
                                    />
                                </TouchableHighlight>
                            ) )
                        }
					</ScrollView>
                    <View style={[S.indicator, {left: indicatorLeftPos}]}>
                        {
                            this.adData.map( (elt, i)=> (
                                <View
                                    key={i}
                                    style={[ i===curtPage? S.activeCircle : S.circle]}
                                />
                            ) )
                        }
                    </View>
				</View>
				<View style={[S.products,]}>
					<ListView
						{...{
							dataSource,
							renderRow: _renderRow
						}}
					></ListView>
				</View>
			</View>
		);
	}
}

let centerAlign = {
	alignItems: 'center',
	justifyContent: 'center'
}

let circle = {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize/2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin
}

const S = StyleSheet.create({
	container: {
		flex: 1
	},
	searchBar: {
		marginTop: Platform.OS === 'ios' ? 20 : 0,
		height: 40,
		flexDirection: 'row',
	},

	searchInput: {
		flex:1,
		backgroundColor: '#e4e4e4',
		borderWidth: 2,
        borderRadius: 10
	},

	searchButton: {
		flex: 1
	},

	ad: {
		height: 180
	},
    adContent: {
        width:Dimensions.get('window').width,
        height: 180,
    },

    circle
    ,
    activeCircle: {
        ...circle,
        backgroundColor: 'red'
    },


	products: {
		flex: 1,
	},

    indicator: {
        position: 'absolute',
        top: 160,
        flexDirection: 'row'
    },

	dataRow:{
		height: 60,
		...centerAlign
	},


});
