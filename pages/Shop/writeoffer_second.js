import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView
} from 'react-native';
var self;
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class writeoffer_second extends Component {
  static navigationOptions= ({navigation}) =>{ 
    if(navigation.state.params.mode=='edit'){
      return (
        {
          headerLeft: <TouchableOpacity 
          onPress={()=>{self.props.navigation.goBack(null);  }}
          style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15}}>
            <Icon
            name="md-close"
            size={30}
            style={{color:'#fff'}}
            />
          </TouchableOpacity>,
        title:'매물정보 수정',
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
        headerTintColor: 'white',
        }
      )
    }
    else{
        return (
          {
            headerLeft: <TouchableOpacity 
            onPress={()=>{self.props.navigation.goBack(null);  }}
            style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15}}>
              <Icon
              name="md-close"
              size={30}
              style={{color:'#fff'}}
              />
            </TouchableOpacity>,
          title: '매물등록 - 임대',
          headerTitleStyle: {color:'white',fontSize:16, fontWeight:'100'},
          headerStyle: {
            backgroundColor: '#3b4db7',
            elevation:0,
            height: 52,
            
          },
          headerTintColor: 'white',
          }
        )
    }

};

	constructor(props){
		super(props)
		this.state={
           
            wr_rec_sectors:[],
            wr_rec_full:['음식점','고깃집','횟집','퓨전주점','소주방','휴게음식점','카페','테이크아웃','분식','미용','네일','뷰티','판매','휴대폰','화장품','의류','잡화','편의점','마트','오락스포츠','헬스','골프','당구장','노래연습장','단란유흥','BAR','스포츠마사지','자동차','학원','병원','사무실','다용도','숙박','양도양수','프렌차이즈','대형매장'],
            wr_rec_full_bool:[],
           
                       
   
    }
    self=this;
    
	}
 
  componentWillMount(){
    var clone = this.state.wr_rec_full_bool.slice(0);
    for(var i=0; i<=this.state.wr_rec_full.length-1; i++){
        clone.push(false)
       }
    this.setState({wr_rec_full_bool: clone})

    const {params} = this.props.navigation.state;

    this.setState(
     {
      mode: params.mode,
      memberID: params.memberID,
      memberName: params.memberName,
      contact:params.contact,
      wr_subject: params.wr_subject,
      wr_address: params.wr_address,
      wr_sale_area: params.wr_sale_area,
      wr_renter_contact: params.wr_renter_contact,
      wr_lessor_contact: params.wr_lessor_contact,
      wr_posx: params.wr_posx,
      wr_posy: params.wr_posy,
     }
      , function(){

      if(this.state.mode=='edit'){
        this.setState({wr_rec_sectors: params.wr_rec_sectors},

          function(){
            var temp = this.state.wr_rec_full_bool.slice(0);
            
              for(var i =0; i<=this.state.wr_rec_sectors.length-1; i++){
                var index = this.state.wr_rec_full.indexOf(this.state.wr_rec_sectors[i])
                temp[index] = !temp[index]
              }
      
            this.setState({wr_rec_full_bool : temp})
            this.props.navigation.state.params={};
            // console.log(this.props.navigation.state.params)
          }
        
        
        )
      }

      
    })
   
  }
  

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }

  _checkBoxStyle(item){
      if(item){
          return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0, backgroundColor:'#3b4db7',borderWidth:0.7}

      }
      else{
          return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0,backgroundColor:'#fff',borderWidth:0.7}
      }

  }
  _checkBoxTextStyle(item){
    if(item){
        return {fontSize:12, color:'white'}

    }
    else{
        return {fontSize:12, color:'#888'}
    }

}

_goNext(){

  this.setState(this.props.navigation.state.params, 
    function(){ 
      
    this.props.navigation.navigate('Prices',this.state)})

}
_goPrevious(){  

  this.state.mode=='edit'?
  this.props.navigation.navigate('Basic',{mode:'edit'})
  : this.props.navigation.navigate('Basic');
}

onSwipeLeft(gestureState) {
  
  this._goNext();
  
}
onSwipeRight(gestureState) {
  
  this._goPrevious();
  
}
  render() {
   
    return (
    
    <GestureRecognizer
    onSwipeLeft={(state) => this.onSwipeLeft(state)}
    onSwipeRight={(state) => this.onSwipeRight(state)}
    
    >
    <ScrollView 
    keyboardShouldPersistTaps="always"
    >
      <KeyboardAvoidingView 
      // behavior='position'
      style={styles.container}
      >
       {/* <Text style={{marginBottom:10, fontSize:12}}>선택해주세요</Text> */}
           <View style={styles.inputContainer}>
               
                      <FlatList data ={this.state.wr_rec_full}
                      style={{margin: 0, padding:0,}}
                      extraData={this.state}
                      keyExtractor ={(x,i)=>i}
                      numColumns={3}
                      renderItem ={
                      ({item}) =><CheckBox
                        uncheckedIcon={null}
                        checkedIcon={null}
                        
                        title={item}
                        containerStyle={this._checkBoxStyle(this.state.wr_rec_full_bool[this.state.wr_rec_full.indexOf(item)])}
                        textStyle={this._checkBoxTextStyle(this.state.wr_rec_full_bool[this.state.wr_rec_full.indexOf(item)])}
                        checked={this.state.wr_rec_full_bool[this.state.wr_rec_full.indexOf(item)]}
                        onPress={()=>{
                          this.setState({checkTest: !this.state.checkTest})
                          
                        if(!this.include(this.state.wr_rec_sectors,item)){
                          this.setState({wr_rec_sectors : [...this.state.wr_rec_sectors,item]})
                        }else{ 
                          var index = this.state.wr_rec_sectors.indexOf(item);
                          var temp = this.state.wr_rec_sectors.slice(0);
                          temp.splice(index,1);                       
                          this.setState({wr_rec_sectors : temp})
                        }
                        var temp2 = this.state.wr_rec_full_bool.slice(0);
                        var index_full = this.state.wr_rec_full.indexOf(item);
                        temp2[index_full] = !temp2[index_full];
                        this.setState({wr_rec_full_bool : temp2})
                        
                   
                        }}/>}
                        />

        
        </View>
        <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                onPress={()=>{
                  this._goPrevious();
                }}
                style={{flex:1,marginBottom:40,marginTop: 40, marginRight:10,backgroundColor:'#3b4db7', height: 45, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize: 13,}}>이전</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{
                  this._goNext();
                }}
                style={{flex:1,marginBottom:40,marginTop: 40,backgroundColor:'#3b4db7', height: 45, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize: 13,}}>다음</Text>
              </TouchableOpacity>
        </View>
     </KeyboardAvoidingView>
     </ScrollView>
     </GestureRecognizer>

   );
  }
}

const styles = StyleSheet.create({
    container: {
        
        // justifyContent: 'center',
        // alignItems: 'center',
        padding:20,
        backgroundColor: '#fff',
      },
      inputContainer:{
        flex:1,
        // alignItems:'center',
        justifyContent:'center',
        // height: 600,
        borderColor: '#e6e6e6',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding:0,
        
    
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

AppRegistry.registerComponent('writeoffer_second', () => writeoffer_second);
