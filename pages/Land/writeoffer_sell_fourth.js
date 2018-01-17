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

export default class writeoffer_sell_fourth extends Component {
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
        title: '매물정보 수정',
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
          title: '매물등록 - 매매',
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
    
      segment: '매매',
      wr_rand_type:'',
      wr_zoning_district:'',
      wr_floor:'',
      wr_gross_area:'',
      wr_memo:'',
      wr_content:'',
             
    }
    self = this;
	}

  componentWillMount(){
    
    const {params} = this.props.navigation.state;
    this.setState(
      { 
        wr_rand_type: params.wr_rand_type,
        wr_zoning_district: params.wr_zoning_district,
        wr_floor: params.wr_floor,
        wr_gross_area: params.wr_gross_area,
        wr_memo: params.wr_memo,
        wr_content: params.wr_content,
       
      }, function(){
        this.props.navigation.state.params={};
     })
  
  }
 
  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }

   _goPrevious(){  

    this.props.navigation.navigate('Third');
    
  }

 
  onSwipeRight(gestureState) {
    
    this._goPrevious();
    
  }

  _parseAreaP(){
    var areaP = [this.state.wr_area_p, this.state.wr_area_p_added1, this.state.wr_area_p_added2, this.state.wr_area_p_added3, this.state.wr_area_p_added4].filter(function(value){return value != undefined})
    var areaP_string = '';
    areaP.forEach(function(el,i){ //i적용할거남음, 쉼표구분자 바꾸기
       if(el==''){
         if(i == 0){
           areaP_string = el;
         }
         else{
           areaP_string = areaP_string + ',' 
         }
         
       }
       else{
         if(i==0){
           areaP_string = el;
         }
         else{
           areaP_string = areaP_string + ',' + el
          
         }
       }
    })
 
    return areaP_string
 
  }
  _parseAreaM(){
 
   var areaM = [this.state.wr_area_m, this.state.wr_area_m_added1, this.state.wr_area_m_added2, this.state.wr_area_m_added3, this.state.wr_area_m_added4].filter(function(value){return value != undefined})
   var areaM_string = '';
   areaM.forEach(function(el,i){
    if(el==''){
      if(i == 0){
        areaM_string = el;
      }
      else{
        areaM_string = areaM_string + ','
      }
      
    }
    else{
      if(i==0){
        areaM_string = el;
      }
      else{
        areaM_string = areaM_string + ',' + el
       
      }
    }
   })
 
   return areaM_string
 
  }
  _parseAddressSale(){
 
   var address = [this.state.wr_address_sale, this.state.wr_address_sale_added1, this.state.wr_address_sale_added2, this.state.wr_address_sale_added3, this.state.wr_address_sale_added4].filter(function(value){return value != undefined})
   var address_string = '';
   address.forEach(function(el,i){
    if(el==''){
      if(i == 0){
        address_string = el;
      }
      else{
        address_string = address_string + ','
      }
      
    }
    else{
      if(i==0){
        address_string = el;
      }
      else{
        address_string = address_string + ',' + el
       
      }
    }
   })
 
   return address_string
 
  }
  render() {
    
     return (

      <GestureRecognizer     
      onSwipeRight={(state) => this.onSwipeRight(state)}>
     
         <KeyboardAwareScrollView enableOnAndroid={true}
         keyboardShouldPersistTaps='always'
         innerRef={ref => {this.scroll = ref}}
         style={styles.container}>
             
     
            <View>
     
             <View style={{flexDirection: 'row',}}>

                    <View style = {[styles.row, {marginTop:0, marginRight:20}]}>    
            
                        <Text style={styles.itemName}>지목</Text>
            
                        <TextInput
                        placeholder=""
                        placeholderTextColor='#aaa'
                        onSubmitEditing={(event) => { 
                          this.refs.SecondInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"}
                        style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                        underlineColorAndroid="transparent"
                        onChangeText= {wr_rand_type => this.setState({wr_rand_type})}
                        value={this.state.wr_rand_type}
                        onFocus={(event: Event) => {                           
                            this.scroll.props.scrollToPosition(0, 0)
                        }}
                        />
                        <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_rand_type:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                        </TouchableOpacity>
                        {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                    
                    </View>
            
                    

                    <View style = {[styles.row, {marginTop:0}]}>    
            
                            <Text style={styles.itemName}>지역지구</Text>
            
                        
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            ref='SecondInput'
                            onSubmitEditing={(event) => { 
                              this.refs.ThirdInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                            // keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_zoning_district => this.setState({wr_zoning_district})}
                            value={this.state.wr_zoning_district}
                            onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />                  
                            <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_zoning_district:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                           </TouchableOpacity>    
                        
                           {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text> */}
                    
                    </View>

                   
              </View>

              <View style={{flexDirection: 'row',}}>

                    <View style = {[styles.row, { marginRight:20}]}>    
            
                        <Text style={styles.itemName}>건물층수</Text>
            
                        <TextInput
                        placeholder=" 예) 2, -1"
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
                        onChangeText= {wr_floor => this.setState({wr_floor})}
                        value={this.state.wr_floor}
                        onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 0)
                        }}
                        />
                        <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>
                        <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_floor:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                        </TouchableOpacity>  
                    </View>
            
                    

                    <View style = {styles.row}>    
            
                            <Text style={styles.itemName}>연면적</Text>
            
                        
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
                            onChangeText= {wr_gross_area => this.setState({wr_gross_area})}
                            value={this.state.wr_gross_area}
                            onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />                      
                        
                           <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                           <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_gross_area:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                           </TouchableOpacity>  
                    </View>

                   
              </View>
               
 
                     <View style = {styles.row}>    
             
                         <Text style={[styles.itemName,{marginBottom:10,}]}>기타사항</Text>
             
                         <TextInput
                         placeholder=" 기타내용"
                         placeholderTextColor='#aaa'
                         ref='FifthInput'
                         onSubmitEditing={(event) => { 
                           this.refs.SixthInput.focus(); 
                         }}
                         blurOnSubmit={false}
                         returnKeyType = {"next"}
                         multiline = {true}
                         numberOfLines = {5}
                         style={[styles.itemInput, {borderWidth:1,height:75, padding:10,paddingLeft:5, textAlignVertical:'top'}]}
                         underlineColorAndroid="transparent"
                         onChangeText= {wr_memo => this.setState({wr_memo})}
                         value={this.state.wr_memo}
                         onFocus={(event: Event) => {
                             // `bind` the function if you're using ES6 classes
                             this.scroll.props.scrollToPosition(0, 100)
                         }}
                         />
                         
                     
                     </View>
             
                     
 
                     <View style = {styles.row}>    
             
                     <Text style={[styles.itemName,{marginBottom:10,}]}>광고사항</Text>
             
                         
                             <TextInput
                             placeholder=" 광고내용"
                             placeholderTextColor='#aaa'
                             ref='SixthInput'
                             onSubmitEditing={(event) => { 
                               Keyboard.dismiss();
                             }}
                             blurOnSubmit={false}                             
                             multiline = {true}
                             numberOfLines = {5}
                             style={[styles.itemInput, {borderWidth:1,height:120, padding:10,paddingLeft:5, textAlignVertical:'top'}]}
                             underlineColorAndroid="transparent"
                             onChangeText= {wr_content => this.setState({wr_content})}
                             value={this.state.wr_content}
                             onFocus={(event: Event) => {
                             // `bind` the function if you're using ES6 classes
                             this.scroll.props.scrollToPosition(0, 180)
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
                    console.log(this.state, this._parseAddressSale());
                  if (this.state.mode=='write'){
                    fetch('http://real-note.co.kr/app3/writeOffer_sell_land.php',{
                      method:'post',
                      header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                      },
                      body:JSON.stringify({
                        memberID : this.state.memberID,
                        memberName: this.state.memberName,
                        contact: this.state.contact,
                      
                        wr_subject : this.state.wr_subject,
                        wr_address : this.state.wr_address,
                        wr_seller_contact : this.state.wr_seller_contact,

                        
                        wr_address_sale :this._parseAddressSale(),                          
                        wr_area_p_all :this.state.wr_area_p_all,
                        wr_area_m_all :this.state.wr_area_m_all,
                        wr_area_p: this._parseAreaP(),
                        wr_area_m: this._parseAreaM(),
                        wr_sale_price :this.state.wr_sale_price,
                        wr_p_sale_price :this.state.wr_p_sale_price,
                        wr_sale_price_b :this.state.wr_sale_price_b,
                        wr_code: this.state.wr_code,

                        wr_sale_deposit :this.state.wr_sale_deposit,
                        wr_total_rfee :this.state.wr_total_rfee,
                        wr_year_rate :this.state.wr_year_rate,
                        wr_m_rate_guess :this.state.wr_m_rate_guess,
                        wr_loan :this.state.wr_loan,
                        wr_int_rate :this.state.wr_int_rate,
                        wr_mon_int :this.state.wr_mon_int,
                        wr_year_int :this.state.wr_year_int,
                        wr_mon_income :this.state.wr_mon_income,
                        wr_year_income :this.state.wr_year_income,
                        wr_silinsu :this.state.wr_silinsu,
                        wr_profit_rate :this.state.wr_profit_rate,

                        wr_rand_type:this.state.wr_rand_type,
                        wr_zoning_district:this.state.wr_zoning_district,
                        wr_floor:this.state.wr_floor,
                        wr_gross_area:this.state.wr_gross_area,
                        wr_memo:this.state.wr_memo,
                        wr_content:this.state.wr_content,

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
                        myoffering.setSelectedSaleTypeFromOutside(this.state.segment)                     
                        
                      }
                      
                    })
                     
                  }
                  else{

                    fetch('http://real-note.co.kr/app3/editOffer_sell_land.php',{
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
                      
                        wr_subject : this.state.wr_subject,
                        wr_address : this.state.wr_address,
                        wr_seller_contact : this.state.wr_seller_contact,
                        
                        wr_address_sale :this._parseAddressSale(),                          
                        wr_area_p_all :this.state.wr_area_p_all,
                        wr_area_m_all :this.state.wr_area_m_all,
                        wr_area_p: this._parseAreaP(),
                        wr_area_m: this._parseAreaM(),
                        wr_sale_price :this.state.wr_sale_price,
                        wr_p_sale_price :this.state.wr_p_sale_price,
                        wr_sale_price_b :this.state.wr_sale_price_b,
                        wr_code: this.state.wr_code,

                        wr_sale_deposit :this.state.wr_sale_deposit,
                        wr_total_rfee :this.state.wr_total_rfee,
                        wr_year_rate :this.state.wr_year_rate,
                        wr_m_rate_guess :this.state.wr_m_rate_guess,
                        wr_loan :this.state.wr_loan,
                        wr_int_rate :this.state.wr_int_rate,
                        wr_mon_int :this.state.wr_mon_int,
                        wr_year_int :this.state.wr_year_int,
                        wr_mon_income :this.state.wr_mon_income,
                        wr_year_income :this.state.wr_year_income,
                        wr_silinsu :this.state.wr_silinsu,
                        wr_profit_rate :this.state.wr_profit_rate,

                        wr_rand_type:this.state.wr_rand_type,
                        wr_zoning_district:this.state.wr_zoning_district,
                        wr_floor:this.state.wr_floor,
                        wr_gross_area:this.state.wr_gross_area,
                        wr_memo:this.state.wr_memo,
                        wr_content:this.state.wr_content,

                        wr_posx : this.state.wr_posx,
                        wr_posy : this.state.wr_posy,

                      })
                    })
                    .then((res)=>{console.log(res); return res.json()})
                    .then((json) =>{
                      if (json.error){
                        
                        alert("'"+json.item +"'" +' 정보를 입력해주세요.' )

                      }
                      else{
                        
                        alert("매물 정보가 수정되었습니다.")
                        this.props.navigation.goBack(null);   
                        myoffering.refreshFromOutside();
                        detail.updateInformationFromOutside(this.state)
                        // myoffering.setSelectedSaleTypeFromOutside(this.state.segment)                     
                        
                      }
                      
                    })

                  }
              }
            )}
          }
                style={{flex:1,marginBottom:40,marginTop: 40,backgroundColor:'#fff', height: 45, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#3b4db7'}}>
                <Text style={{color:'#3b4db7', fontSize: 14,}}>완료</Text>
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
        flex:7.25,
        height:35,    
        fontSize: 13,
        borderColor:"#e6e6e6",
        backgroundColor: "#fff",
        // borderRadius: 3,
        borderBottomWidth: 1,
        padding:5,
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
 

AppRegistry.registerComponent('writeoffer_sell_fourth', () => writeoffer_sell_fourth);
