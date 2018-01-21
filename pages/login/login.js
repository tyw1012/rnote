import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,TextInput,Button,Keyboard,
	AsyncStorage,
	Image,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class login extends Component {
	static navigationOptions= ({navigation}) =>({
		  header: null
		  // headerRight:
		  // <TouchableOpacity
			// onPress={() => navigation.navigate('Home')}
			// style={{margin:10,backgroundColor:'orange',padding:10}}>
			// <Text style={{color:'#ffffff'}}>Home</Text>
		  // </TouchableOpacity>

	});
  constructor(props){
		super(props)
		this.state={
			memberID:'',
			memberPassword:''
		}
	}

  componentDidMount(){
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    this._checkToken();
  }

  _checkToken = async () => {

      var myToken = await AsyncStorage.getItem('token');
      var myID = await AsyncStorage.getItem('user');
      

			if (myToken){

				fetch(`http://real-note.co.kr/app3/checkToken.php?token=${JSON.parse(myToken).token}`)
				.then((res) => res.json())
				.catch((err) => {console.log(err)})
				.then((resJson) =>{
					
					if (resJson.id == myID){
						if(resJson.level == 'gr_admin'){
							
							if(resJson.selectedOfferingType == '3'){
								
								console.log(resJson);
								this.props.navigation.navigate('MainNavigator3',
							{memberID: myID, memberName: resJson.name, email:resJson.email,contact:resJson.contact, level:'office', boss:resJson.boss, minWrite: resJson.min_write, selectedOfferingType: resJson.selectedOfferingType  });

							}
							
							else if(resJson.selectedOfferingType == '1'){
								console.log(resJson);
								this.props.navigation.navigate('MainNavigator1',
							{memberID: myID, memberName: resJson.name, email:resJson.email,contact:resJson.contact, level:'office', boss:resJson.boss, minWrite: resJson.min_write, selectedOfferingType: resJson.selectedOfferingType  });
							}

							else{
								this.props.navigation.navigate('MainNavigator4',
								{memberID: myID, memberName: resJson.name, email:resJson.email,contact:resJson.contact, level:'office', boss:resJson.boss, minWrite: resJson.min_write, selectedOfferingType: resJson.selectedOfferingType  });
							}
							
						}
						else{
							console.log(resJson);
							if(resJson.selectedOfferingType == '3'){
								this.props.navigation.navigate('MainNavigator3',
							{memberID: myID, memberName: resJson.name, email:resJson.email,contact:resJson.contact, level:'emp', boss:resJson.boss, minWrite: resJson.min_write, selectedOfferingType: resJson.selectedOfferingType });

							}
							else if(resJson.selectedOfferingType == '1'){
								console.log(resJson);
								this.props.navigation.navigate('MainNavigator1',
							{memberID: myID, memberName: resJson.name, email:resJson.email,contact:resJson.contact, level:'emp', boss:resJson.boss, minWrite: resJson.min_write, selectedOfferingType: resJson.selectedOfferingType });
							}
							else{
								this.props.navigation.navigate('MainNavigator4',
							{memberID: myID, memberName: resJson.name, email:resJson.email,contact:resJson.contact, level:'emp', boss:resJson.boss, minWrite: resJson.min_write, selectedOfferingType: resJson.selectedOfferingType });
							}
							
						}
					}
				})
			}
      

  }

	login = () =>{
		const {memberID,memberPassword} = this.state;
		//here we will send our data to server with fetch

		fetch('http://real-note.co.kr/app3/login.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
				memberID: memberID,
				memberPassword: memberPassword
			})

		})
		.then((response) => response.json())
		 .then((responseJson)=>{
			 if(responseJson['message'] == "ok"){
				 // redirect to profile page
				//  alert("Successfully Login");
        // alert(responseJson['token']);
         AsyncStorage.setItem('user', responseJson['memberID']);
         AsyncStorage.setItem('token', responseJson['token']);

         this._checkToken();

  		 }
       else{
         alert(responseJson['message']);
  			 alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
  		 }
		 })
		 .catch((error)=>{
		 console.error(error);
		 });


		Keyboard.dismiss();
	}

  render() {
    const { navigate } = this.props.navigation;
    return (
	<ScrollView style={styles.container} keyboardShouldPersistTaps="always">

		<View style={styles.logo}>
			
				<Image
					source={require('./rnote.png')}
					resizeMode="contain"
					style={{width: 220}}
        />

		</View>

		<View style={styles.login}>

			<View style={styles.form}>
				<TextInput
				underlineColorAndroid ='transparent'
				placeholder="아이디"
				placeholderTextColor='white'
				style={styles.input}
				onChangeText={memberID => this.setState({memberID})}
				/>
						
				<TextInput
				underlineColorAndroid ='transparent'
				placeholder="비밀번호"
				placeholderTextColor='white'
				secureTextEntry={true}
				style={styles.input}
				onChangeText={memberPassword => this.setState({memberPassword})}
				/>
			</View>

			<View style={styles.submit}>

				<TouchableOpacity
				onPress={this.login}
				style={styles.btn}>
				<Text style={styles.btnText}>로그인</Text>
				</TouchableOpacity>

				<TouchableOpacity
				onPress={()=> navigate('Agreement')}
				style={styles.btn}>
				<Text style={styles.btnText}>회원가입</Text>
				</TouchableOpacity>

			</View>
		</View>

	</ScrollView>

   );
  }
}

const styles = StyleSheet.create({
  container: {
		paddingTop:10,
		flex: 1,
		flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
		backgroundColor: '#3b4db7',
		
	},
	logo: {
		flex:2,
		marginTop: 30,
		justifyContent:'center',
		alignItems:'center',

	},
	login:{
		flex:3.5,
		// justifyContent: 'center',
    // alignItems: 'center',
		
	},
	
	form:{
		flex:1,
		// justifyContent: 'center',
    alignItems: 'center',
	},
	input:{
		width:'65%', height: 60, margin:5, backgroundColor: 'transparent',
		paddingLeft:25,
		borderRadius: 30, borderWidth:2, borderColor: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		color:'white',

	},
	submit:{
		flex:1.5,
		marginTop: 20,
		// justifyContent: 'center',
    alignItems: 'center',
	},
	btn:{
		backgroundColor:'#fff',
		padding:10,margin:5,width:'65%',
				
	},
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
	btnText:{
		color:'#3b4db7',fontWeight:'bold',justifyContent: 'center',fontSize: 18,
		textAlign: 'center',
		
	},

});


AppRegistry.registerComponent('login', () => login);
