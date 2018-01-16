import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,WebView } from 'react-native';

export default class home extends Component{
static navigationOptions= ({navigation}) =>({
	
        title:`${navigation.state.params.wr_subject}`,
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
        headerTintColor: 'white',
        
	});
	constructor(props){
		super(props);
		this.state = {};
	
	}
	componentWillMount(){
		const {params} = this.props.navigation.state;
		this.setState(params, function(){
			// console.log(this.state);
		  
		})
	  }
	render(){
		const { navigate } = this.props.navigation;
		return(
	  <View style={styles.container}>

		<WebView
					source={{uri: `http://real-note.co.kr/app/mobile_map.php?posx=${parseFloat(this.state.wr_posx)}&posy=${parseFloat(this.state.wr_posy)}`}}
					style={{flex:1}}
					/>

      </View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1
	},

	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},


});


AppRegistry.registerComponent('profile', () => profile);
