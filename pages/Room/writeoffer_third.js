import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,TouchableOpacity,KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var option = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var option2 = "ABCDFGHJKMPQRSTUVWZ123456789";
var self;

export default class writeoffer_third extends Component {
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
      wr_floor:'',
      wr_area_p:'',
      wr_rent_deposit:'',
      wr_m_rate:'',
      wr_premium_o:'',
      wr_premium_b:'',
      wr_code: '',

        
    }
    self= this;
    
	}

  
  componentWillMount(){

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
        wr_rec_sectors: params.wr_rec_sectors,
        wr_floor: params.wr_floor,
        wr_area_p: params.wr_area_p,
        wr_rent_deposit: params.wr_rent_deposit,
        wr_m_rate: params.wr_m_rate,
        wr_premium_o: params.wr_premium_o,
        wr_premium_b: params.wr_premium_b,
        wr_code: params.wr_code,
      }      
      , function(){
      this.props.navigation.state.params={};
      // console.log(this.props.navigation.state.params)
    })
  
  }


  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }



  generateSerial(input){

      return this.stringGen(3, option) + this.numGen(input) +'-'+ this.stringGen(4, option2)

  }



  stringGen(length, opt )
  {
      var text = "";
      var charset = opt

      for( var i=0; i <length; i++ )
          text += charset.charAt(Math.floor(Math.random() * charset.length));

      return text;
  }

 numGen(money){


      if (money.toString().length == 6){
         return money.toString().substring(0, 4)
      }
      if(money.toString().length == 5){
        return '0' +  money.toString().substring(0, 3)
      }
      if(money.toString().length == 4){
        return '00' +  money.toString().substring(0, 2)
      }
      if(money.toString().length == 3){
        return '000' +  money.toString().substring(0, 1)
      }

      else {
         return '0000'
      }

  }

  _goNext(){

    this.setState(this.props.navigation.state.params, 
      function(){ 
        // console.log('stateCheck',this.state);
      this.props.navigation.navigate('Others',this.state)}
    )
    
    }
  _goPrevious(){  
    this.props.navigation.navigate('Recommended');
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
        <KeyboardAwareScrollView enableOnAndroid={true}
        keyboardShouldPersistTaps='always'
        innerRef={ref => {this.scroll = ref}}
        style={styles.container}>
            
      
            <View>
    
               <View style={{flexDirection: 'row',}}>

                    <View style = {[styles.row, {marginTop:0, marginRight:10}]}>    
            
                        <Text style={styles.itemName}>층수 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
            
                        <TextInput
                        placeholder="예) 2, -1"
                        placeholderTextColor='#aaa'
                        blurOnSubmit={false}
                        onSubmitEditing={(event) => { 
                          this.refs.SecondInput.focus(); 
                        }}
                        returnKeyType = {"next"}
                        style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                        keyboardType='phone-pad'
                        underlineColorAndroid="transparent"
                        onChangeText= {wr_floor => this.setState({wr_floor})}
                        value={this.state.wr_floor}
                        onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 0)
                        }}
                        />
                        <TouchableOpacity
                          style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                          onPress={()=>{this.setState({wr_floor:''})}}
                          >
                          <Icon 
                          name="md-close-circle"
                          size={20}
                          style={{ marginTop: 27,color: '#ddd', }}
                                                
                          />   
                        </TouchableOpacity>
                        <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>
                    
                    </View>
            
                    

                    <View style = {[styles.row, {marginTop:0}]}>    
            
                            <Text style={styles.itemName}>평수 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
            
                        
                            <TextInput
                            placeholder="예) 20"
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                            ref='SecondInput'
                            onSubmitEditing={(event) => { 
                              this.refs.ThirdInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}                            
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_area_p => this.setState({wr_area_p})}
                            value={this.state.wr_area_p}
                            onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />                      

                          <TouchableOpacity
                            style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                            onPress={()=>{this.setState({wr_area_p:''})}}
                            >
                            <Icon 
                            name="md-close-circle"
                            size={20}
                            style={{ marginTop: 27,color: '#ddd', }}
                                                  
                            />   
                          </TouchableOpacity>

                           <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                    
                    </View>

                   
              </View>

                  
              <View style = {styles.row}>    
    
                <Text style={[styles.itemName,{marginTop:0,}]}>보증금 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
    
                  

                <TextInput
                placeholder=""
                placeholderTextColor='#aaa'
                ref='ThirdInput'
                onSubmitEditing={(event) => { 
                  this.refs.FourthInput.focus(); 
                }}
                blurOnSubmit={false}
                returnKeyType = {"next"} 
                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                keyboardType='phone-pad'
                underlineColorAndroid="transparent"
                onChangeText= {wr_rent_deposit => this.setState({wr_rent_deposit})}
                value={this.state.wr_rent_deposit}
                onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                }}
                />
                {/* <Text style={{flex:0.833}}>만원</Text> */}
                <TouchableOpacity
                  style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                  onPress={()=>{this.setState({wr_rent_deposit:''})}}
                  >
                  <Icon 
                  name="md-close-circle"
                  size={20}
                  style={{ marginTop: 27,color: '#ddd', }}
                                        
                  />   
                  </TouchableOpacity>

                <Text style={{ marginTop: 29, marginLeft: 3, fontSize:12, position: 'absolute', top:5, right:15}}>만</Text>

              </View>
    
              <View style = {styles.row}>    
    
                 <Text style={[styles.itemName,{marginTop:0}]}>임대료 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
    
                  <TextInput
                  placeholder=""
                  placeholderTextColor='#aaa'
                  ref='FourthInput'
                  onSubmitEditing={(event) => { 
                    this.refs.FifthInput.focus(); 
                  }}
                  blurOnSubmit={false}
                  returnKeyType = {"next"} 
                  style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                  keyboardType='phone-pad'
                  underlineColorAndroid="transparent"
                  onChangeText= {wr_m_rate => this.setState({wr_m_rate})}
                  value={this.state.wr_m_rate}
                  onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 70)
                   }}
                  />
                  <TouchableOpacity
                  style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                  onPress={()=>{this.setState({wr_m_rate:''})}}
                  >
                  <Icon 
                  name="md-close-circle"
                  size={20}
                  style={{ marginTop: 27,color: '#ddd', }}
                                        
                  />   
                  </TouchableOpacity>
                <Text style={{ marginTop: 29, marginLeft: 3, fontSize:12, position: 'absolute', top:5, right:15}}>만</Text>
              </View>
    
              <View style = {styles.row}>    
    
                  <Text style={[styles.itemName,{marginTop:0,}]}>권리금 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
    
                  <TextInput
                  placeholder=""
                  placeholderTextColor='#aaa'
                  ref='FifthInput'
                  onSubmitEditing={(event) => { 
                    this.refs.SixthInput.focus(); 
                  }}
                  blurOnSubmit={false}
                  returnKeyType = {"next"} 
                  style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                  keyboardType='phone-pad'
                  underlineColorAndroid="transparent"
                  onChangeText= {wr_premium_o => this.setState({wr_premium_o})}
                  value={this.state.wr_premium_o}
                  onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 140)
                   }}
                  />
                   <TouchableOpacity
                  style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                  onPress={()=>{this.setState({wr_premium_o:''})}}
                  >
                  <Icon 
                  name="md-close-circle"
                  size={20}
                  style={{ marginTop: 27,color: '#ddd', }}
                                        
                  />   
                  </TouchableOpacity>
                    <Text style={{ marginTop: 29, marginLeft: 3, fontSize:12, position: 'absolute', top:5, right:15}}>만</Text>
              </View>

              <View style = {styles.row}>    
    
                  <Text style={[styles.itemName,{marginTop:0,}]}>권리금절충가 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
    
                  <TextInput
                  placeholder=""
                  placeholderTextColor='#aaa'
                  ref='SixthInput'
                  onSubmitEditing={(event) => { 
                    this.setState(this.props.navigation.state.params, 
                      function(){ 
                        // console.log('stateCheck',this.state);
                      this.props.navigation.navigate('Others',this.state)}
                    )
                  }}
                  blurOnSubmit={false}
                  returnKeyType = {"next"} 
                  style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                  keyboardType='phone-pad'
                  underlineColorAndroid="transparent"
                  onChangeText= {wr_premium_b =>{
                    
                    this.setState({wr_premium_b: wr_premium_b, wr_code: this.generateSerial(wr_premium_b)});
                                        
                  } }
                  value={this.state.wr_premium_b}
                  onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 210)
                   }}
                  />
                  <TouchableOpacity
                  style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                  onPress={()=>{this.setState({wr_premium_b:''})}}
                  >
                  <Icon 
                  name="md-close-circle"
                  size={20}
                  style={{ marginTop: 27,color: '#ddd', }}
                                        
                  />   
                  </TouchableOpacity>
                    <Text style={{ marginTop: 29, marginLeft: 3, fontSize:12, position: 'absolute', top:5, right:15}}>만</Text>
              </View>
    
             
    
                </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                onPress={()=>{this._goPrevious();}}
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
               
         {/* </KeyboardAvoidingView>
         </ScrollView> */}
         </KeyboardAwareScrollView >
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
        // paddingBottom:50
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
        marginTop: 23,
        
      },
      row2:{
          flex:1,
          marginTop: 18,
          flexDirection:'row',
      },
      itemName:{
        // marginTop:5,
        marginBottom:5,
        fontSize: 13,
        fontWeight:'bold',
        color: '#666',
        flex:2.75,    
      
      },
      itemInput:{
        flex:7.25,
        height:35,    
        fontSize: 13,
        borderColor:"#e6e6e6",
        backgroundColor: "#fff",
        // borderRadius: 3,
        borderBottomWidth: 1,
        padding:3,
        paddingLeft: 0,
        // borderWidth:1
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

AppRegistry.registerComponent('writeoffer_third', () => writeoffer_third);
