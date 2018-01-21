import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

var self;
var option = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var option2 = "ABCDFGHJKMPQRSTUVWZ123456789";

export default class writeoffer_sell_third extends Component {
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

static updateFigures(){

  self.setState(self.props.navigation.state.params, function(){

    self.state.wr_sale_price == ''?
    self.setState({
      
      wr_profit_rate: '',
      wr_silinsu:self.state.wr_sale_price-self.state.wr_loan-self.state.wr_sale_deposit,
      // wr_sale_price: self.state.wr_sale_price,
      wr_p_sale_price: ''
  
    }):
    self.setState({
      
          wr_profit_rate: (((self.state.wr_year_rate-(self.state.wr_loan*self.state.wr_int_rate*0.01))/(self.state.wr_sale_price-self.state.wr_loan-self.state.wr_sale_deposit))*100).toFixed(1),
          wr_silinsu:(self.state.wr_sale_price-self.state.wr_loan-self.state.wr_sale_deposit).toFixed(0),
          // wr_sale_price: self.state.wr_sale_price,
          wr_p_sale_price: (self.state.wr_sale_price/self.state.wr_area_p_all).toFixed(0)
      
        })

  })
  
}

	constructor(props){
		super(props)
		this.state={
           
            wr_sale_price:'',
            wr_p_sale_price:'',
            wr_sale_price_b:'',
            wr_sale_deposit:null,
            wr_total_rfee:null,
            wr_year_rate:null,
            wr_m_rate_guess:null,
            wr_loan:null,
            wr_int_rate:'4',
            wr_mon_int:null,
            wr_year_int:null,
            wr_mon_income:null,
            wr_year_income:null,
            wr_silinsu:null,
            wr_profit_rate:'',
            wr_code:'',
            
        }
    
    self = this;
	}

 
  componentWillMount(){
    
    const {params} = this.props.navigation.state;
    this.setState(
      { 
        wr_sale_price: params.wr_sale_price,
        wr_p_sale_price: params.wr_p_sale_price,   
        wr_sale_price_b: params.wr_sale_price_b,
        wr_sale_deposit: params.wr_sale_deposit,
        wr_total_rfee: params.wr_total_rfee,
        wr_year_rate: params.wr_year_rate,
        wr_m_rate_guess: params.wr_m_rate_guess,
        wr_loan: params.wr_loan,
        wr_int_rate: params.wr_int_rate,
        wr_mon_int: params.wr_mon_int,
        wr_year_int: params.wr_year_int,
        wr_mon_income: params.wr_mon_income,
        wr_year_income: params.wr_year_income,
        wr_silinsu: params.wr_silinsu,
        wr_profit_rate: params.wr_profit_rate,
        wr_code: params.wr_code,
      }, function(){
        this.props.navigation.state.params={};
     })
  }

  componentDidMount(){
    if(this.state.wr_sale_price==undefined){
      this.setState({wr_sale_price:''})
    }
    if(this.state.wr_p_sale_price==undefined){
      this.setState({wr_p_sale_price:''})
    }
    if(this.state.wr_sale_price_b==undefined){
      this.setState({wr_sale_price_b:''})
    }
    if(this.state.wr_sale_deposit==undefined){
      this.setState({wr_sale_deposit:''})
    }
    if(this.state.wr_total_rfee==undefined){
      this.setState({wr_total_rfee:''})
    }
    if(this.state.wr_year_rate==undefined){
      this.setState({wr_year_rate:''})
    }
    if(this.state.wr_m_rate_guess==undefined){
      this.setState({wr_m_rate_guess:''})
    }
    if(this.state.wr_loan==undefined){
      this.setState({wr_loan:''})
    }
    if(this.state.wr_int_rate==undefined){
      this.setState({wr_int_rate:4})
    }
    if(this.state.wr_mon_int==undefined){
      this.setState({wr_mon_int:''})
    }
    if(this.state.wr_year_int==undefined){
      this.setState({wr_year_int:''})
    }
    if(this.state.wr_mon_income==undefined){
      this.setState({wr_mon_income:''})
    }
    if(this.state.wr_year_income==undefined){
      this.setState({wr_year_income:''})
    }
    if(this.state.wr_silinsu==undefined){
      this.setState({wr_silinsu:''})
    }
    if(this.state.wr_profit_rate==undefined){
      this.setState({wr_profit_rate:''})
    }

  }

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }
  _sum(a,b){
    return parseInt(a)+parseInt(b)
  }

  _goNext(){
    
    this.setState(this.props.navigation.state.params, 
      function(){ 
       
            this.props.navigation.navigate('Fourth',this.state);
          }
        )
      
    
    
  }
  _goPrevious(){  

    this.props.navigation.navigate('Second');
    
  }

  onSwipeLeft(gestureState) {
    
    this._goNext();
    
  }
  onSwipeRight(gestureState) {
    
    this._goPrevious();
    
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

  render() {

    const {params} = this.props.navigation.state;
   
    return (
        <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}>
            <KeyboardAwareScrollView enableOnAndroid={true}
            keyboardShouldPersistTaps='always'
            innerRef={ref => {this.scroll = ref}}
            style={styles.container}>
                
         
                <View>
                    <View style={{flexDirection: 'row', marginBottom:20,}}>     
                        <View style = {[styles.row,{marginTop:0, marginRight:20,}]}>    
                
                            <Text style={styles.itemName}>총매도가 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            onSubmitEditing={(event) => { 
                              this.refs.SecondInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_sale_price => this.setState({wr_sale_price: wr_sale_price, wr_p_sale_price: Math.round(wr_sale_price/this.state.wr_area_p_all), wr_silinsu:wr_sale_price - this.state.wr_loan - this.state.wr_sale_deposit})}
                            value={`${this.state.wr_sale_price}`}
                            onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                            {/* <Text style={{flex:0.833}}>만원</Text> */}
            
                            <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만</Text>
                            <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_sale_price:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                            </TouchableOpacity>
                        </View>

                        {/* <Icon 
                        name="ios-repeat"
                        size={20}
                        style={{color: '#fff', marginTop: 47, marginLeft: 10, marginRight: 10,}}
                        /> */}

                        <View style = {[styles.row,{marginTop:0,}]}>    
                
                            <Text style={styles.itemName}>평당매도가 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
                
            
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            ref='SecondInput'
                            onSubmitEditing={(event) => { 
                              this.refs.ThirdInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={[styles.itemInput,{textAlign:'right',paddingRight: 60, paddingBottom:0}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_p_sale_price => this.setState({wr_p_sale_price: wr_p_sale_price, wr_sale_price: Math.round(wr_p_sale_price*this.state.wr_area_p_all)})}
                            value={`${this.state.wr_p_sale_price}`}
                            onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                            {/* <Text style={{flex:0.833}}>만원</Text> */}
            
                            <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만 / PY</Text>
                            <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_p_sale_price:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{flex:1,justifyContent:'center', alignItems:'center' }}>
                            <Text style={{flex:1,marginTop:47,fontSize:12,  }}> * 평당가격: {this.state.wr_p_sale_price}만 </Text>
                        </View> */}
                       
                  </View>
                  <View style={{marginBottom:20}}>
                       <Text style={styles.itemName}>매도절충가 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

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
                            onChangeText= {wr_sale_price_b => this.setState({wr_sale_price_b: wr_sale_price_b, wr_code: this.generateSerial(wr_sale_price_b)})}
                            value={`${this.state.wr_sale_price_b}`}
                            onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                            }}
                        />

                          <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만</Text>
                          <TouchableOpacity
                                style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                onPress={()=>{this.setState({wr_p_sale_price:''})}}
                                >
                                <Icon 
                                name="md-close-circle"
                                size={20}
                                style={{ marginTop: 27,color: '#ddd', }}
                                                      
                                />   
                          </TouchableOpacity>
                  </View>
                  
                  
                    <View style={{flexDirection: 'row',}}>    
    
                        <View style = {[styles.row,{marginTop:0, marginRight:20}]}>    
                
                                <Text style={styles.itemName}>총보증금</Text>
                
                            
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
                                onChangeText= {wr_sale_deposit => {                                

                                    this.setState({
                                      
                                        wr_sale_deposit:wr_sale_deposit,
                                        wr_m_rate_guess: this._sum(this.state.wr_total_rfee*200, wr_sale_deposit),
                                        wr_profit_rate: (((this.state.wr_year_rate-this.state.wr_year_int)/(this.state.wr_sale_price-this.state.wr_loan-wr_sale_deposit))*100).toFixed(1),
                                        wr_silinsu: this.state.wr_sale_price - this.state.wr_loan - wr_sale_deposit
                                      })

                                }}
                                value={this.state.wr_sale_deposit}
                                onFocus={(event: Event) => {                                
                                this.scroll.props.scrollToPosition(0, 70)
                                }}
                                />                      
                            
                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_sale_deposit:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>

                        
                        <View style = {[styles.row,{marginTop:0}]}>    
                
                                <Text style={styles.itemName}>총임대료</Text>
                
                            
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
                                onChangeText= {wr_total_rfee => this.setState({
                                  wr_total_rfee: wr_total_rfee,
                                  wr_year_rate : (wr_total_rfee * 12).toFixed(0), 
                                  wr_m_rate_guess: this._sum(wr_total_rfee*200, this.state.wr_sale_deposit),
                                  wr_mon_income: (wr_total_rfee - this.state.wr_mon_int).toFixed(2),
                                  wr_year_income: (wr_total_rfee*12 - this.state.wr_year_int).toFixed(2),
                                  wr_profit_rate: (((wr_total_rfee*12 - this.state.wr_year_int)/(this.state.wr_sale_price - this.state.wr_loan - this.state.wr_sale_deposit))*100).toFixed(1)

                                })}
                                value={this.state.wr_total_rfee}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 70)
                                }}
                                />                      
                            
                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_total_rfee:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>
    
                       
                   </View>
    
                   <View style={{flexDirection: 'row',}}>     
                        
                        <View style={{flex:1,justifyContent:'center',  }}>
                            <Text style={{marginTop:10, fontSize: 12, marginBottom:15, textAlign:'right'}}> * 연임대수익: {this.state.wr_year_rate}만,  임대료추정가치시세: {this.state.wr_m_rate_guess}만 </Text>
                        </View>
                     
                        {/* <View style={{flex:1,justifyContent:'center', alignItems:'center' }}>
                            <Text style={{flex:1,marginTop:47,  }}> ( 평당가격: {this.state.wr_p_sale_price}만 )</Text>
                        </View> */}
                       
                  </View>


                  <View style={{flexDirection: 'row',}}>    
    
                        <View style = {[styles.row,{marginRight:20}]}>    
                
                                <Text style={styles.itemName}>대출금</Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='SixthInput'
                                onSubmitEditing={(event) => { 
                                  this.refs.SeventhInput.focus(); 
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_loan => this.setState({
                                  wr_loan:wr_loan,
                                  wr_year_int: (wr_loan*0.01*this.state.wr_int_rate).toFixed(2),
                                  wr_mon_int: (wr_loan*0.01*this.state.wr_int_rate/12).toFixed(2),
                                  wr_profit_rate: (((this.state.wr_year_rate-(wr_loan*this.state.wr_int_rate*0.01))/(this.state.wr_sale_price-wr_loan-this.state.wr_sale_deposit))*100).toFixed(1),
                                  wr_silinsu:this.state.wr_sale_price-wr_loan-this.state.wr_sale_deposit,
                                  wr_mon_income:(this.state.wr_total_rfee-(wr_loan*this.state.wr_int_rate*0.01/12)).toFixed(2),
                                  wr_year_income:(this.state.wr_year_rate-(wr_loan*this.state.wr_int_rate*0.01)).toFixed(2),

                                })}
                                value={this.state.wr_loan}
                                onFocus={(event: Event) => {                                
                                this.scroll.props.scrollToPosition(0, 140)
                                }}
                                />                      
                            
                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_loan:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>

                        
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}>금리</Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='SeventhInput'
                                onSubmitEditing={(event) => { 

                                  this.setState(this.props.navigation.state.params, 
                                    function(){ 
                                      this.setState(
                                        {
                                          wr_profit_rate: (((this.state.wr_year_rate-(this.state.wr_loan*this.state.wr_int_rate*0.01))/(this.state.wr_sale_price-this.state.wr_loan-this.state.wr_sale_deposit))*100).toFixed(1),
                                          wr_silinsu:this.state.wr_sale_price-this.state.wr_loan-this.state.wr_sale_deposit,
                                        }
                                        ,
                                        function(){
                                          this.props.navigation.navigate('Fourth',this.state);
                                        }
                                      )
                                    }
                                  )
                                  
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_int_rate => this.setState({
                                  wr_int_rate: wr_int_rate,
                                  wr_year_int: (this.state.wr_loan*0.01*wr_int_rate).toFixed(2),
                                  wr_mon_int: (this.state.wr_loan*0.01*wr_int_rate/12).toFixed(2),
                                  wr_profit_rate: (((this.state.wr_year_rate-(this.state.wr_loan*wr_int_rate*0.01))/(this.state.wr_sale_price-this.state.wr_loan-this.state.wr_sale_deposit))*100).toFixed(1),
                                  wr_mon_income:(this.state.wr_total_rfee-(this.state.wr_loan*wr_int_rate*0.01/12)).toFixed(2),
                                  wr_year_income:(this.state.wr_year_rate-(this.state.wr_loan*wr_int_rate*0.01)).toFixed(2),
                                })}
                                value={`${this.state.wr_int_rate}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 140)
                                }}
                                />                      
                            
                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>%</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_int_rate:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>
    
                       
                   </View>
    
                   <View style={{}}>     
                        
                        <View style={{flex:1,justifyContent:'center',  }}>
                            <Text style={{marginTop:10, fontSize: 12, marginBottom:3, textAlign:'right'}}> * 연이자: {this.state.wr_year_int}만,  월이자: {this.state.wr_mon_int}만 </Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',  }}>
                            <Text style={{marginTop:10, fontSize: 12, marginBottom:3, textAlign:'right' }}> * 연간순수익: {this.state.wr_year_income}만,  월순수익: {this.state.wr_mon_income}만 </Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',  }}>
                            <Text style={{marginTop:10, fontSize: 12, marginBottom:3, textAlign:'right'}}> * 실인수가: {this.state.wr_silinsu}만,  수익률: {this.state.wr_profit_rate} % </Text>
                        </View>
                        {/* <View style={{flex:1,justifyContent:'center', alignItems:'center' }}>
                            <Text style={{flex:1,marginTop:47,  }}> ( 평당가격: {this.state.wr_p_sale_price}만 )</Text>
                        </View> */}
                       
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

AppRegistry.registerComponent('writeoffer_sell_third', () => writeoffer_sell_third);
