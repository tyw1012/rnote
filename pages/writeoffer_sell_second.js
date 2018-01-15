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
import writeoffer_sell_third from './writeoffer_sell_third';
var self;

export default class writeoffer_sell_second extends Component {
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
           
            wr_address_sale:'',
            wr_area_p_all:'',
            wr_area_m_all:'',
           
            
        }
    
    self =this;
  
	}

 
  componentWillMount(){
    
    const {params} = this.props.navigation.state;
    this.setState(
      { 
        mode: params.mode,
        wr_address_sale: params.wr_address_sale,
        wr_area_p_all: params.wr_area_p_all,
        wr_area_m_all: params.wr_area_m_all,
            
        
      }, function(){
        this.props.navigation.state.params={};
     })
  
  }
  
  componentDidMount(){
    if(this.state.wr_address_sale==undefined){
      this.setState({wr_address_sale:''})
    }
    if(this.state.wr_area_p_all==undefined){
      this.setState({wr_area_p_all:''})
    }
    if(this.state.wr_area_m_all==undefined){
      this.setState({wr_area_m_all:''})
    }
  

  }

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }
 
  _goNext(){
    
    this.setState(this.props.navigation.state.params, 
      function(){        
      this.props.navigation.navigate('Third',this.state)}
    )

    setTimeout(function(){
      writeoffer_sell_third.updateFigures();
    },500)
    
    
  }
  _goPrevious(){  

    this.state.mode=='edit'?
    this.props.navigation.navigate('First',{mode:'edit'})
    :  this.props.navigation.navigate('First')

  }

  onSwipeLeft(gestureState) {
    
    this._goNext();
    
  }
  onSwipeRight(gestureState) {
    
    this._goPrevious();
    
  }
  
  _addedInputStyle(visible){
    if(visible){
      return {};
    }
    else{
      return {display:'none'}
    }
  }
  
  render() {
   
    return (
        <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}>
            <KeyboardAwareScrollView enableOnAndroid={true}
            keyboardShouldPersistTaps='always'
            innerRef={ref => {this.scroll = ref}}
            style={styles.container}>
                
             <View>
  {/* ////////////////////////////////////////////첫번째 블락 시작 ////////////////////////////////////////////// */}
                  <View>
                      <View style = {[styles.row, {marginTop:0}]}>    
                
                            <Text style={styles.itemName}>지번</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            onSubmitEditing={(event) => { 
                              this.refs.SecondInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"} 
                            style={[styles.itemInput, {position:'relative'}]}
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_address_sale => this.setState({wr_address_sale})}
                            value={this.state.wr_address_sale}
                            onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                            <TouchableOpacity
                                style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                onPress={()=>{this.setState({wr_address_sale:''})}}
                                >
                                <Icon 
                                name="md-close-circle"
                                size={20}
                                style={{ marginTop: 27,color: '#ddd', }}
                                                      
                                />   
                            </TouchableOpacity>

                            {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                        
                    </View>
                
                    <View style={{flexDirection: 'row',}}>    
    
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}>면적 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
                
                            
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
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_p_all => this.setState({wr_area_p_all:wr_area_p_all, wr_area_m_all: wr_area_p_all*3.3058.toFixed(2)})}
                                value={`${this.state.wr_area_p_all}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                                }}
                                />                      

                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_p_all:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>

                        <Icon 
                        name="ios-repeat"
                        size={20}
                        style={{color: '#000', marginTop: 47, marginLeft: 10, marginRight: 10,}}
                        />
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='ThirdInput'
                                onSubmitEditing={(event) => { 
                                  this.setState(this.props.navigation.state.params, 
                                    function(){                                   
                                    this.props.navigation.navigate('Third',this.state)}
                                  )
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_m_all => this.setState({wr_area_m_all: wr_area_m_all, wr_area_p_all: (wr_area_m_all*0.3025).toFixed(2), })}
                                value={`${this.state.wr_area_m_all}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                                }}
                                />                      
                            
                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>㎡</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_m_all:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>
    
                   </View>
                </View>
{/* //////////////////////////////////첫번째 블락 끝/////////////////////////////////////////////////////////////// */}
{/* //////////////////////////////////두번째 블락 시작/////////////////////////////////////////////////////////////// */}
               
{/* ////////////////////////////////////////////////////////세번째블락 끝////////////////////////////////////////////// */}
    
                  
                                     
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

AppRegistry.registerComponent('writeoffer_sell_second', () => writeoffer_sell_second);
