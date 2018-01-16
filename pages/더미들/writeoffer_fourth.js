import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,TouchableOpacity,KeyboardAvoidingView,AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import myoffering from './myoffering';
import detail from './detail';
var self;

export default class writeoffer_fourth extends Component {
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
      segment: '임대',
      wr_memo:'',
      wr_content:'',
             
    }
    
    self=this;
	}

  
  componentWillMount(){
    
    const {params} = this.props.navigation.state;
    this.setState({

      wr_memo: params.wr_memo,
      wr_content: params.wr_content,

    }, function(){

      this.props.navigation.state.params={}
      

      // console.log(this.state);
      
    })
  
  }
 
  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }


  _goPrevious(){  
    this.props.navigation.navigate('Prices')
  }

 
  onSwipeRight(gestureState) {
    
    this._goPrevious();
    
  }

  render() {
    
     return (
     
      <GestureRecognizer
      onSwipeRight={(state) => this.onSwipeRight(state)}
      >
         <KeyboardAwareScrollView enableOnAndroid={true}
         keyboardShouldPersistTaps='always'
         innerRef={ref => {this.scroll = ref}}
         style={styles.container}>
             
             <View>
     
               
 
                     <View style = {[styles.row, {marginTop:0}]}>    
             
                         <Text style={styles.itemName}>기타사항</Text>
             
                         <TextInput
                         placeholder=" 기타내용"
                         placeholderTextColor='#aaa'
                         multiline = {true}
                         numberOfLines = {5}
                         style={[styles.itemInput, {height:75, textAlignVertical:'top'}]}
                         underlineColorAndroid="transparent"
                         onChangeText= {wr_memo => this.setState({wr_memo})}
                         value={this.state.wr_memo}
                         onFocus={(event: Event) => {
                             // `bind` the function if you're using ES6 classes
                             this.scroll.props.scrollToPosition(0, 0)
                         }}
                         />
                         
                     
                     </View>
             
                     
 
                     <View style = {[styles.row, {marginTop:20}]}>    
             
                             <Text style={styles.itemName}>광고사항</Text>
             
                         
                             <TextInput
                             placeholder=" 광고내용"
                             placeholderTextColor='#aaa'
                             multiline = {true}
                             numberOfLines = {5}
                             style={[styles.itemInput, {height:150, textAlignVertical:'top'}]}
                             underlineColorAndroid="transparent"
                             onChangeText= {wr_content => this.setState({wr_content})}
                             value={this.state.wr_content}
                             onFocus={(event: Event) => {
                             // `bind` the function if you're using ES6 classes
                             this.scroll.props.scrollToPosition(0, 80)
                             }}
                             />                      
                      
                     </View>
 
                 </View>
     
                 <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                onPress={()=>{this._goPrevious();}}
                style={{flex:1,marginBottom:40,marginTop: 40, marginRight:10,backgroundColor:'#3b4db7', height: 45, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize: 13,}}>이전</Text>
              </TouchableOpacity>
              <TouchableOpacity
                   onPress={
                     ()=>{
                  this.setState(this.props.navigation.state.params, 
                  function(){ 
                    console.log('check',this.state)
                    //등록 모드
                    if (this.state.mode=='write'){
                    fetch('http://real-note.co.kr/app3/writeOffer.php',{
                      method:'post',
                      header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                      },
                      body:JSON.stringify({
                        memberID : this.state.memberID,
                        memberName: this.state.memberName,
                        contact: this.state.contact,
                        wr_code: this.state.wr_code,
                        wr_subject : this.state.wr_subject,
                        wr_address : this.state.wr_address,
                        wr_sale_area : this.state.wr_sale_area,
                        wr_renter_contact : this.state.wr_renter_contact,
                        wr_lessor_contact : this.state.wr_lessor_contact,
                        wr_rec_sectors : this.state.wr_rec_sectors.toString().replace(/,/g, ' '),
                        wr_floor : this.state.wr_floor,
                        wr_area_p : this.state.wr_area_p,
                        wr_rent_deposit : this.state.wr_rent_deposit,
                        wr_m_rate : this.state.wr_m_rate,
                        wr_premium_o : this.state.wr_premium_o,
                        wr_premium_b : this.state.wr_premium_b,
                        wr_memo : this.state.wr_memo,
                        wr_content : this.state.wr_content,
                        wr_posx : this.state.wr_posx,
                        wr_posy : this.state.wr_posy,
                      })
                    })
                    .then((res)=>res.json())
                    .then((json) =>{
                      if (json.error){
                        
                        alert("'"+json.item +"'" +' 정보를 입력해주세요.' )

                      }
                      else{
                        
                        alert("매물 등록이 완료되었습니다.")
                        this.props.navigation.goBack(null);      
                        myoffering.refreshFromOutside();                  
                        myoffering.setSelectedSaleTypeFromOutside(this.state.segment) ; 
                        
                       }
                   
                     })
                   }
                   //수정 모드
                   else{

                    fetch('http://real-note.co.kr/app3/editOffer.php',{
                      method:'post',
                      header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                      },
                      body:JSON.stringify({
                        memberID : this.state.memberID,
                        memberName: this.state.memberName,
                        contact: this.state.contact,
                        wr_id: this.state.wr_id,
                        wr_code: this.state.wr_code,
                        wr_subject : this.state.wr_subject,
                        wr_address : this.state.wr_address,
                        wr_sale_area : this.state.wr_sale_area,
                        wr_renter_contact : this.state.wr_renter_contact,
                        wr_lessor_contact : this.state.wr_lessor_contact,
                        wr_rec_sectors : this.state.wr_rec_sectors.toString().replace(/,/g, ' '),
                        wr_floor : this.state.wr_floor,
                        wr_area_p : this.state.wr_area_p,
                        wr_rent_deposit : this.state.wr_rent_deposit,
                        wr_m_rate : this.state.wr_m_rate,
                        wr_premium_o : this.state.wr_premium_o,
                        wr_premium_b : this.state.wr_premium_b,
                        wr_memo : this.state.wr_memo,
                        wr_content : this.state.wr_content,
                        wr_posx : this.state.wr_posx,
                        wr_posy : this.state.wr_posy,
                      })
                    })
                    .then((res)=>{
                      // console.log(res)
                      return res.json()
                    })
                    .then((json) =>{
                      
                      if (json.error){
                        // console.log(json)
                        alert("'"+json.item +"'" +' 정보를 입력해주세요.' )

                      }
                      else{
                        // console.log(json)
                        // console.log('final',this.state)
                        alert("매물 정보가 수정되었습니다.")
                        this.props.navigation.goBack(null);   
                        // this.props.navigation.goBack(null);     
                        myoffering.refreshFromOutside();
                        detail.updateInformationFromOutside({...this.state, wr_rec_sectors: this.state.wr_rec_sectors.toString().replace(/,/g, ' ')})
                        // myoffering.setSelectedSaleTypeFromOutside(this.state.segment) ; 
                        
                       }
                   
                     })
                     


                   }
                  }
                )}
              }
                style={{flex:1,marginBottom:40,marginTop: 40,backgroundColor:'#fff', height: 45, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#3b4db7'}}>
                <Text style={{color:'#3b4db7', fontSize: 14, fontWeight:'bold'}}>완료</Text>
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
         marginTop: 18,
         
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
         flex:6.75,
         height:40,    
         fontSize: 13,
         borderColor:"#e6e6e6",
         backgroundColor: "#fff",
         // borderRadius: 3,
         borderWidth: 1,
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
 

AppRegistry.registerComponent('writeoffer_fourth', () => writeoffer_fourth);
