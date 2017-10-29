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
	ListView
} from 'react-native';

const data = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
});

let screenWidth = Dimensions.get('window').width;

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
			])
		};

		this.interval = null;


	}

	componentDidMount(){
		this._sliderAnim();
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	_sliderAnim(){
		let curtPage = 0;
		this.interval = setInterval(()=>{
			let nextPage = (curtPage + 1)%3;

			let offsetX = screenWidth*nextPage;

			this.refs.scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated: true});

			curtPage = nextPage;

		}, 2000)
	}

	_renderRow = (rowData, sectionID, rowID)=> (
		<View style={[S.dataRow]}>
			<Text>{rowData}</Text>
		</View>
	)

    render() {

		let {_renderRow} = this

		let {dataSource} = this.state;


        return (
            <View style={[S.container]}>
                <View style={[S.searchBar]}>
					<TextInput
						style={[S.searchInput]}
						placeholder="搜索"
					/>
					<Button
						style={[S.searchButton]}
						title="搜索"
					/>
                </View>
                <View style={[S.ad]}>
					<ScrollView
						ref="scrollView"
						// 横向滚动
						horizontal={true}
						// 显示横向关东糖
						showsHorizontalScrollIndicator={false}
						// 分页
						pagingEnabled={true}
					>
						<Text
							style={{width:Dimensions.get('window').width, height: 180, backgroundColor: 'gray'}}
						>AD1</Text>
						<Text
							style={{width:Dimensions.get('window').width, height: 180, backgroundColor: 'orange'}}
						>AD2</Text>
						<Text
							style={{width:Dimensions.get('window').width, height: 180, backgroundColor: 'yellow'}}
						>AD3</Text>
					</ScrollView>
                </View>
                <View style={[S.products]}>
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

const S = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        height: 40,
		flexDirection: 'row'
    },

	searchInput: {
		flex:1,
		backgroundColor: 'gray',
		borderWidth: 2
	},

	searchButton: {
		flex: 1
	},

    ad: {
        height: 180
    },
    products: {
        flex: 1,
    },

	dataRow:{
		height: 60,
		...centerAlign
	},


});
