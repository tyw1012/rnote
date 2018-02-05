import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Button,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class register_emp extends Component {
	   static navigationOptions= ({navigation}) =>(

      {
        title:'직원 회원가입',
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
        headerTintColor: 'white',
        }

     );

	constructor(props){
		super(props)
		this.state={
			memberID: '',
			memberPassword:'',
			memberName:'',
      cellphone:'',
      email:'',
      passwordMatched: false,
      passwordText:'',

		}
	}

	userRegister = () =>{
		//alert('ok'); // version 0.48

		const {memberID} = this.state;
		const {memberPassword} = this.state;
		const {memberName} = this.state;
    const {cellphone} = this.state;
    const {email} = this.state;



		fetch('http://real-note.co.kr/app3/register_emp.php', {
			method: 'POST',
			headers:{
				'Accept': 'application/json',
        "Accept-Encoding": "gzip, deflate",
				'Content-type': 'application/json',
			},
			body:JSON.stringify({
				memberID: memberID,
				memberPassword: memberPassword,
				memberName: memberName,
        cellphone: cellphone,
        email: email
			})

		})
		.then((response) => {console.log('response',response); return response.json()} )
		.then((responseJson) =>{
      // console.log(responseJson)
			alert(responseJson);
		})
		.catch((error)=>{
			console.error(error);
		});

	}

  _checkPassword = (password) => {
    // console.log(this.state.memberPassword);
    // console.log('input', password);
      if (this.state.memberPassword === password){
        this.setState({passwordMatched: true})
        this.setState({passwordText: '비밀번호가 일치합니다.'})
      }
      else{
        this.setState({passwordMatched: false});
        this.setState({passwordText: ''})
      }
  }

  render() {

    return (
    
   
  <KeyboardAwareScrollView enableOnAndroid={true}
  keyboardShouldPersistTaps='always'
  innerRef={ref => {this.scroll = ref}}
  style={styles.container}>
    
          {/* <Text style={styles.itemName}>아이디</Text> */}
      <View style = {styles.row}>    

          <Icon 
          name="user-circle"
          size={20}
          style={{marginTop: 5, color: '#444' }}
          />
          <TextInput
          placeholder=" 아이디"
          placeholderTextColor='#aaa'
          style={[styles.itemInput, {marginTop:5}]}
          underlineColorAndroid="transparent"
          onChangeText= {memberID => this.setState({memberID})}

          />
    </View>
    
    <View style = {styles.row}>
          
          
          <Icon 
          name="lock"
          size={23}
          style={{marginTop: 20, color: '#444'}}
          />
          <TextInput
          secureTextEntry={true}
          placeholderTextColor='#aaa'
          placeholder=" 비밀번호"
          style={[styles.itemInput,{marginLeft:18}]}
          underlineColorAndroid="transparent"
          onChangeText= {memberPassword => this.setState({memberPassword})}
          />
    </View>

    <View style = {styles.row}>
          
          <Icon 
          name="lock"
          size={23}
          style={{marginTop: 20, color: '#444' }}
          />

          <TextInput
          secureTextEntry={true}
          placeholderTextColor='#aaa'
          placeholder=" 비밀번호 확인"
          style={[styles.itemInput,{marginLeft:18}]}
          underlineColorAndroid="transparent"
          onChangeText= {password => {this._checkPassword(password)}}
          />
    </View>
          <Text style={this.state.passwordMatched?{}:{display:'none'}}>{this.state.passwordText}</Text>

    <View style = {styles.row}>

          <Icon 
          name="tag"
          size={20}
          style={{marginTop: 20, color: '#444' }}
          />
          <TextInput
          placeholder="성명"
          placeholderTextColor='#aaa'
          style={styles.itemInput}
          underlineColorAndroid="transparent"
          onChangeText= {memberName => this.setState({memberName})}
          />
    </View>

    <View style = {styles.row}>
          
          <Icon 
          name="phone"
          size={20}
          style={{marginTop: 20, color: '#444' }}
          />

          <TextInput
          placeholder=" 휴대폰번호:  - 없이 기입해주세요."
          
          placeholderTextColor='#aaa'
          style={styles.itemInput}
          underlineColorAndroid="transparent"
          onChangeText= {cellphone => this.setState({cellphone})}
          />
    </View>

    <View style = {styles.row}>
          
          {/* <Text style={styles.itemName}>이메일</Text> */}
          <Icon 
          name="envelope-o"
          size={20}
          style={{marginTop: 20, color: '#444' }}
          />
          <TextInput
          placeholder="이메일"
          placeholderTextColor='#aaa'
          style={styles.itemInput}
          underlineColorAndroid="transparent"
          onChangeText= {email => this.setState({email})}
          />

    </View>
   
    
    <View style={{alignItems:'center'}}>
    <TouchableOpacity
    onPress={this.userRegister}
    style={{width:305, height: 50, backgroundColor:'#3b4db7', marginTop:50,
    alignItems:'center', justifyContent: 'center',}}>
    <Text style={{color:'#fff', fontSize: 17, fontWeight: 'bold',}}>가입하기</Text>
    </TouchableOpacity>
    </View>
	 

 </KeyboardAwareScrollView>
    
   

   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:20,
    backgroundColor: '#fff',
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
  row:{
    flexDirection: 'row',
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
    // flex:1,    
    marginTop: 20
  },
  itemInput:{
    height:50,
    padding:5,
    marginLeft: 15,
    marginTop: 20,
    fontSize: 14,
    width:270, borderColor:"#c1c1c1",
    // backgroundColor: "#e1e7ef",
    // borderRadius: 3,
    borderBottomWidth: 1,
    // borderWidth:1
  },
  
});

AppRegistry.registerComponent('register_emp', () => register_emp);
