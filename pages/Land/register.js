import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,TextInput,TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class register extends Component {
	   static navigationOptions= ({navigation}) =>({
		  title: 'Register',
		  headerRight:
		  <TouchableOpacity
			onPress={() => navigation.navigate('Home')}
			style={{margin:10,backgroundColor:'orange',padding:10}}>
			<Text style={{color:'#ffffff'}}>Home</Text>
		  </TouchableOpacity>

	});

	constructor(props){
		super(props)
		this.state={
			userName:'',
			userID:'',
			userPassword:''
		}
	}

	userRegister = () =>{
		//alert('ok'); // version 0.48

		const {userName} = this.state;
		const {userID} = this.state;
		const {userPassword} = this.state;


		fetch('http://real-note.co.kr/app3/register.php', {
			method: 'POST',
			headers:{
				'Accept': 'application/json',
        "Accept-Encoding": "gzip, deflate",
				'Content-type': 'application/json',
			},
			body:JSON.stringify({
				name: userName,
				userID: userID,
				password: userPassword
			})

		})
		.then((response) => response.json())
		.then((responseJson) =>{
      // console.log(responseJson)
			alert(responseJson);
		})
		.catch((error)=>{
			console.error(error);
		});

	}

  render() {
    return (
	 <View>

	  <TextInput
	  placeholder="Enter Name"
	  style={{width:250,margin:10, borderColor:"#333",
	  borderWidth:1}}
	  underlineColorAndroid="transparent"
    onChangeText= {userName => this.setState({userName})}

	  />

	  <TextInput
	  placeholder="Enter ID"
	  style={{width:250,margin:10, borderColor:"#333",
	  borderWidth:1}}
	  underlineColorAndroid="transparent"
	  onChangeText= {userID => this.setState({userID})}
	  />

	  <TextInput
	  placeholder="Enter Password"
	  style={{width:250,margin:10, borderColor:"#333",
	  borderWidth:1}}
	  underlineColorAndroid="transparent"
	  onChangeText= {userPassword => this.setState({userPassword})}
	  />

	  <TouchableOpacity
		onPress={this.userRegister}
		style={{width:250,padding:10, backgroundColor:'magenta',
		alignItems:'center'}}>
	  <Text style={{color:'#fff'}}>Signup</Text>
	  </TouchableOpacity>


     </View>

   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('register', () => register);
