import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,TouchableOpacity,BackHandler } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
// import {AndroidBackButton} from "react-native-android-back-button"
export default class home_emp extends Component{
static navigationOptions= ({navigation}) =>({
      header: null,
      drawerLabel: 'Config',

  });
static isMain = true;

  constructor(props){
		super(props);
		this.state ={
      memberID: '',
      memberName:'',
      email:'',
      level:'',
      boss:'',
     
    };
    // console.log(this);
	}

  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      console.log(this.state);
      // console.log(this);
    })
   
      // BackHandler.addEventListener('hardwareBackPress', function() {
      //   console.log(this);
      //   if(home_emp.isMain){
      //     return BackHandler.exitApp();
      //   }
        
      //  });
    
  }

	render(){
    const {params} = this.props.navigation.state;
		return(
	  <View style={styles.container}>
	     <View style={styles.header}>
       <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'RNote', style: { color: '#fff', fontSize:20, } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        />
       </View>

       <View style={styles.functions}>

          <View style={styles.func_1}>
              <TouchableOpacity
              style={styles.button}
              onPress = { ()=>{
                this.props.navigation.navigate('Myoffering', params);
              } }>
                <Text style={styles.button_text}>나의노트</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.button}
              onPress = { ()=>{
                this.props.navigation.navigate('Officeoffering', params);
              } }
              >
                <Text style={styles.button_text}>오피스노트</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.func_2}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.button_text}>즐겨찾기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.button_text}>거래종료</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.func_3}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.button_text}>기타기능</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_reg}
                 onPress = { ()=>{
                   this.props.navigation.navigate('Writeoffer');
                 } }>
                 
                <Text style={styles.button_text}>매물등록</Text>
              </TouchableOpacity>
          </View>
        </View>

        {/* <AndroidBackButton
          onPress={ ()=>false }
         /> */}
    </View>
    
		);
	}
}
const styles = StyleSheet.create({
	container:{
    flex:1,
    flexDirection: 'column',
		// alignItems:'center',
		// justifyContent:'center',
	},
  header:{
    flex:1,
    flexDirection: 'row',
  },
  functions:{
    flex:6,
    flexDirection: 'column',
    // alignItems:'center',
    // justifyContent: 'center',
    backgroundColor: '#000'
  },
  func_1:{
    flex:1,
    flexDirection: 'row',
  },
  func_2:{
    flex:1,
    flexDirection: 'row',
  },
  func_3:{
    flex:1,
    flexDirection: 'row',
  },
  button:{
    flex:1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_reg:{
    flex:1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text:{
    color: '#555',
    fontSize: 22,
  },

	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},


});


AppRegistry.registerComponent('home_emp', () => home_emp);
