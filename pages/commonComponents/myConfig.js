import React, { Component } from 'react';
import { View,Text,StyleSheet,TouchableOpacity, Image,Switch, StatusBar, AsyncStorage,Alert } from 'react-native';
import { Button, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from 'react-navigation'

const options = [ '원룸','아파트','상가','토지'];
export default class myConfig extends Component{
static navigationOptions= ({navigation}) =>({
     
//   headerLeft:null,
  title:'설정',
  headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
  headerStyle: {
     backgroundColor: '#3b4db7',
     elevation:0,
     height: 52,          
  },
 headerTintColor: 'white',    
      swipeEnabled:false,
  });
  


  constructor(props){
    super(props);
    this.state ={
                 
    };
    
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){

        this._loadInitialState().done();
      
    })
  }
  
  _loadInitialState = async () =>{
    var autoLogin = await AsyncStorage.getItem('autoLoginUserSetting')
    .then(res => {        
        this.setState({autoLogin : res})})
  }
  _autoLoginSwitch(){
      
     if (this.state.autoLogin == undefined || this.state.autoLogin =='yes') {
         AsyncStorage.setItem('autoLoginUserSetting', 'no')
         .then(res => {this.setState({autoLogin: 'no'})})
         
     }
     else{
         AsyncStorage.setItem('autoLoginUserSetting', 'yes')
         .then(res => {this.setState({autoLogin: 'yes'})})
     }

  }

  handleIndexChange = (index) => {
    this.setState(previousState => {
      previous = previousState.selectedOfferingType;
            
      return {
        selectedOfferingType: options[index]
      }
    }, function(){

      if(previous != this.state.selectedOfferingType){

        Alert.alert(
          '변경사항을 저장 하시겠습니까?',
          '확인을 누르면 앱이 재실행됩니다.',
          [
            
            {text: '취소', onPress: () => { this.setState({selectedOfferingType: previous})}, style: 'cancel'},
            {text: '확인', onPress: () => {

              this._saveTypeAndRefresh(index);

            }},
          ],
          { cancelable: false }
        )
       
       
    }

    })
  }

  // setSelectedOption(selectedOfferingType){

    
  //   this.setState(previousState => {
  //     previous = previousState.selectedOfferingType;
            
  //     return {
  //       selectedOfferingType, 
  //     };
  //   }, function(){
  //       if(previous != this.state.selectedOfferingType){

  //           this._saveTypeAndRefresh();

  //       }
       
      
  //   });
  // }

  _saveTypeAndRefresh(type){

    fetch('http://real-note.co.kr/app3/saveSelectedOfferingType.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        memberID: this.state.memberID,
        memberName: this.state.memberName,
        contact: this.state.contact,
        email: this.state.email,
        level: this.state.level=='office'?'gr_admin':'',
        minWrite: this.state.minWrite,
        boss_office: this.state.boss_office,
        boss: this.state.boss,
        selectedOfferingType: (type+1).toString(), //index+1
        
      })
    })
    .then((response) => response.json())
		 .then((responseJson)=>{
      
         AsyncStorage.removeItem('token');
         AsyncStorage.setItem('token', responseJson['token']);
         
         const resetAction = NavigationActions.reset({
          index: 0,
          // stateName: 'test',
          key: null,
          actions: [
            // NavigationActions.navigate({ routeName: 'MainNavigator2'}),
            {
              type: 'Navigation/INIT',
              routeName: `MainNavigator${(type+1)}`, // index+1
              params: {
                memberID: this.state.memberID,
                memberName: this.state.memberName,
                email: this.state.email,
                contact:this.state.contact,
                level:this.state.level,
                boss:this.state.boss,
                boss_office: this.state.boss_office,
                minWrite: this.state.minWrite,
                selectedOfferingType: (type+1).toString(),
              }
            }
          ]
        })
        this.props.navigation.dispatch(resetAction)
     
     })
}


	render(){

    
         
      return(

  	     <View style={styles.container}>

                <View style={{ height:45, flexDirection:'row', padding: 8, backgroundColor: '#fff', borderBottomWidth:1, borderColor:'#e1e1e1'}} 
                 
                >
                    <Text style={{marginLeft:7, color:'#333', marginTop:3, fontWeight:'bold', fontSize: 15,}}>{this.state.memberID}</Text>
                 
                </View>
              
                <TouchableOpacity style={{ height:60, flexDirection:'row', padding: 15,paddingTop:20, backgroundColor: '#fff', justifyContent:'space-between', borderBottomWidth:0.75,  borderColor:'#e1e1e1'}} 
                 onPress={()=>{this.props.navigation.navigate('Employee', this.state)}}
                >

                    <Text style={{}}>개인정보 수정</Text>
                    <Icon
                        name="ios-arrow-forward"
                        size={22}
                        style={{}}
                        onPress={()=>{}}
                        /> 

                </TouchableOpacity>

                <TouchableOpacity style={{ height:60, flexDirection:'row', padding: 15, paddingTop:20, backgroundColor: '#fff', justifyContent:'space-between', borderBottomWidth:1.5,  borderColor:'#e1e1e1'}} 
                 onPress={()=>{this.props.navigation.navigate('Employee', this.state)}}
                >

                    <Text style={{}}>비밀번호 변경</Text>
                    <Icon
                        name="ios-arrow-forward"
                        size={22}
                        style={{}}
                        onPress={()=>{}}
                        /> 

                </TouchableOpacity>

                <View style={{ height:60, flexDirection:'row', padding: 15, paddingTop:20, backgroundColor: '#fff', justifyContent:'space-between', borderBottomWidth:1,  borderColor:'#e1e1e1'}} 
                 >

                    <Text style={{color:'#777'}}>자동로그인 설정</Text>
                    {/* <Icon
                        name="ios-arrow-forward"
                        size={22}
                        style={{}}
                        onPress={()=>{}}
                        />  */}
                        <Switch
                        style={{ marginRight:-3}}
                        onTintColor = '#3b4db7'
                        thumbTintColor = '#fff'
                        value = {this.state.autoLogin == 'yes' || this.state.autoLogin == undefined ? true : false}
                        onValueChange = {this._autoLoginSwitch.bind(this)}
                        />

                </View>
            
        </View>
        

          

       		)
    }

}

const styles = StyleSheet.create({
	container:{
    
    display:'flex',
    flex:1,
    backgroundColor:'#f1f1f1',
    
	},
  buttonWrapper:{
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent:'space-between',
    paddingTop: 10, paddingBottom: 10,
    backgroundColor:'#f9f9f9',
    borderBottomWidth:1,
    borderColor:'#ddd',
    
   
  },
  modalContainer: {
  
    padding:20,
    backgroundColor: '#fbfbfb',
 
  },

  inputContainer:{
    flex:1,
    // alignItems:'center',
    justifyContent:'center',
    // height: 600,
    borderColor: '#e6e6e6',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    padding:20,
    paddingBottom:25,

  },
  row:{    
    flex:1,
    marginTop: 18,
    
  },
  itemName:{
    // marginTop:5,
    marginBottom:5,
    fontSize: 12,
    fontWeight: '100',
    color: '#666',
    flex:2.75,    
    
    
  },
  itemInput:{
    flex:7.25,
    height:40,    
    fontSize: 13,
    borderColor:"#e6e6e6",
    backgroundColor: "#fff",
    // borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 10,
    // borderWidth:1
  },

  formInput:{
    borderWidth: 1, width: 110,borderColor:'#d1d1d1', marginBottom: 15,
  },
  formInput_str:{
    borderWidth:1, borderColor:'#d1d1d1', marginBottom:15,
  },
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},


});
