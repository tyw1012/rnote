import React, { Component } from 'react';
import {
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView,Modal
} from 'react-native';
import { StackNavigator } from 'react-navigation';
// import { FormLabel, FormInput, Button, CheckBox } from 'react-native-elements'

export default class writetest extends Component {
	   static navigationOptions= ({navigation}) =>({
        // header:null,
		  title: '매물등록',

	});

	constructor(props){
		super(props)
		this.state={
            wr_subject: '',
            wr_address: '',
            wr_area: '',
            wr_rec:[],
            wr_rec_full:['음식점','고깃집','횟집','퓨전주점','소주방','휴게음식점','카페','테이크아웃','분식','미용','네일','뷰티','판매','휴대폰','화장품','의류','잡화','편의점','마트','오락스포츠','헬스','골프','당구장','노래연습장','단란유흥','BAR','스포츠마사지','자동차','학원','병원','사무실','다용도','숙박','양도양수','프렌차이즈','대형매장'],
            wr_rec_full_bool:[],
            keyword:'',
            wr_addressList:[],
            modalVisible: false,
            checkTest:false,
   
    }
    
    
	}

	// userRegister = () =>{
		

	// 	fetch('http://real-note.co.kr/app/register_emp.php', {
	// 		method: 'POST',
	// 		headers:{
	// 			'Accept': 'application/json',
    //     "Accept-Encoding": "gzip, deflate",
	// 			'Content-type': 'application/json',
	// 		},
	// 		body:JSON.stringify({
	// 			memberID: memberID,
	// 			memberPassword: memberPassword,
	// 			memberName: memberName,
    //     cellphone: cellphone,
    //     email: email
	// 		})

	// 	})
	// 	.then((response) => response.json())
	// 	.then((responseJson) =>{
    //   console.log(responseJson)
	// 		alert(responseJson);
	// 	})
	// 	.catch((error)=>{
	// 		console.error(error);
	// 	});

  // }
  
  componentWillMount(){
    var clone = this.state.wr_rec_full_bool.slice(0);
    for(var i=0; i<=this.state.wr_rec_full.length-1; i++){
        clone.push(false)
       }
    this.setState({wr_rec_full_bool: clone})

  }

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }

  render() {
   
    return (
    
    <ScrollView keyboardShouldPersistTaps="always">
      <KeyboardAvoidingView behavior='position'
      style={styles.container}
      >

            <TextInput/>

     </KeyboardAvoidingView>
     </ScrollView>
     

   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:10,
    backgroundColor: '#fff',
  },
  formLabel:{
    fontSize: 16,
  },
  formInput:{
    borderBottomWidth: 1,
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

AppRegistry.registerComponent('writetest', () => writetest);
