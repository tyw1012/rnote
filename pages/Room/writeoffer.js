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
import { Button, CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import writeoffer_second from './writeoffer_second';

const options = ['임대', '매매'];
var previous;
var self;

export default class writeoffer extends Component {
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
          title: '건물등록',
          headerTitleStyle: {color:'white',fontSize:16, fontWeight:'bold'},
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
                     
            wr_addressList:[],
            columnChange:0,
       
       
    }
      self=this;
	}

  componentWillMount(){
    
    const {params} = this.props.navigation.state;
  
    this.setState(
    { 
      mode: params.mode,
      memberID: params.memberID,
      memberName: params.memberName,
      contact:params.contact,
      bld_id: params.bld_id,
      bld_name: params.bld_name,
      bld_address: params.bld_address,
      bld_contact: params.bld_contact,
      bld_floor: params.bld_floor,
      bld_roomPerFloor: params.bld_roomPerFloor,
      bld_posx: params.bld_posx,
      bld_posy: params.bld_posy,
      
    }, function(){
      this.props.navigation.state.params={};
   })

  }
 

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }

  _goNext(){

    var renter_dash = this.state.wr_renter_contact!=undefined?
    this.state.wr_renter_contact.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"):'';
    var lessor_dash = this.state.wr_lessor_contact!=undefined?
    this.state.wr_lessor_contact.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"):'';
    this.setState({
      wr_renter_contact: renter_dash,
      wr_lessor_contact: lessor_dash,
    },
    function(){
      this.props.navigation.navigate('Recommended',this.state)
      setTimeout(function(){
        writeoffer_second.updateFigures();
      },200)
    })            
 

  }
 
  onSwipeLeft(gestureState) {
    
    this._goNext();
    
  }
 

  render() {
   
    return (
   
    <GestureRecognizer
    onSwipeLeft={(state) => this.onSwipeLeft(state)}>
    <KeyboardAwareScrollView enableOnAndroid={true}
    keyboardShouldPersistTaps='always'
    innerRef={ref => {this.scroll = ref}}
    style={styles.container}>
        
         
        <View>

          <View style = {[styles.row, {marginTop:0}]}>    

              <Text style={styles.itemName}>건물명 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

              <TextInput
              placeholder=""
              onSubmitEditing={(event) => { 
                this.refs.SecondInput.focus(); 
              }}
              blurOnSubmit={false}
              returnKeyType = {"next"}
              placeholderTextColor='#aaa'
              style={styles.itemInput}
              underlineColorAndroid="transparent"
              onChangeText= {bld_name => this.setState({bld_name})}
              value={this.state.bld_name}
              onFocus={(event: Event) => {
                // `bind` the function if you're using ES6 classes
                this.scroll.props.scrollToPosition(0, 0)
               }}
              />
              <TouchableOpacity
                  style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                  onPress={()=>{this.setState({bld_name:''})}}
                  >
                  <Icon 
                  name="md-close-circle"
                  size={20}
                  style={{ marginTop: 27,color: '#ddd', }}
                                        
                  />   
              </TouchableOpacity>

          </View>

          <View style = {styles.row}>    

              <Text style={styles.itemName}>건물주소 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

              <View style={{flexDirection:'row', flex: 7.25}}>
                  <TextInput
                  placeholder=" 읍/면/동 혹은 도로명 검색"
                  ref='SecondInput'
                  onSubmitEditing={(event) => { 
                    this.refs.ThirdInput.focus(); 
                  }}
                  blurOnSubmit={false}
                  returnKeyType = {"next"}
                  blurOnSubmit={false}
                  placeholderTextColor='#aaa'
                  style={[styles.itemInput, {flex: 8, borderRightWidth:0,}]}
                  underlineColorAndroid="transparent"
                  onChangeText= {bld_address => this.setState({bld_address})}
                  value={this.state.bld_address}
                  onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                  }}
                  />

                  <TouchableOpacity
                    
                    onPress={()=>{
                        fetch(`http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=15&keyword=${this.state.wr_address}&confmKey=U01TX0FVVEgyMDE3MTExNTIwNTg0NDEwNzQ4NjI=&resultType=json`)
                        .then((res)=>res.json())
                        .then((text)=>{
                          this.setState({wr_addressList: text.results.juso});
                          })
                        Keyboard.dismiss();
                    }}
                    style={{ flex:2, backgroundColor:'#fff', height: 35, alignItems: 'flex-end', justifyContent:'center', borderBottomWidth:1, borderColor: '#e6e6e6', paddingRight:10}}
                    >
                    {/* <Text style={{color:'white', fontSize: 13,}}>검색</Text> */}
                    <Icon 
                      name="ios-search"
                      size={22}
                      style={{ color: '#666'}}
                          
                      />
                    
                  </TouchableOpacity>  
               </View>
          </View>
          <View>
              <FlatList           
                data ={this.state.wr_addressList}
                keyExtractor ={(x,i)=>i}
                renderItem ={({item}) =><TouchableOpacity onPress = {()=>{this.setState({wr_addressList: [] }); this.setState({bld_address: /.*(동|가|읍|면|리|산) [0-9-산]+/.exec(item.jibunAddr)[0]});
                    fetch(`https://apis.daum.net/local/geo/addr2coord?apikey=306678a15ccad514fa75a3b1ae02b091&q=${/.*(동|가|읍|면|리|산) [0-9-산]+/.exec(item.jibunAddr)[0]}&output=json`)
                    .then((res)=> res.json())
                    .then((text)=> { var coord = text.channel.item[0];
                      this.setState({bld_posx : coord.point_x, bld_posy : coord.point_y})
                    })
                }}>
                <View style={{margin:10,marginLeft:13,}}>
                <Text style={{fontSize: 15}}>{item.jibunAddr}</Text>
                </View>
                </TouchableOpacity>} />
          </View>
     

          <View style = {styles.row}>    

              <Text style={styles.itemName}>건물주연락처</Text>

              <TextInput
              placeholder=" 숫자만 입력해주세요"
              placeholderTextColor='#aaa'
              keyboardType='phone-pad'
              ref='FifthInput'
              onSubmitEditing={(event) => { 
                this.props.navigation.navigate('Recommended',this.state)                
              }}
              blurOnSubmit={false}
              returnKeyType = {"next"}
              style={styles.itemInput}
              underlineColorAndroid="transparent"
              onChangeText= {bld_contact => this.setState({bld_contact})}
              value={this.state.bld_contact}
              onFocus={(event: Event) => {
                // `bind` the function if you're using ES6 classes
                this.scroll.props.scrollToPosition(0, 240)
               }}
              />

              <TouchableOpacity
                  style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                  onPress={()=>{this.setState({bld_contact:''})}}
                  >
                  <Icon 
                  name="md-close-circle"
                  size={20}
                  style={{ marginTop: 27,color: '#ddd', }}
                                        
                  />   
              </TouchableOpacity>

          </View>

          <View style={{flexDirection: 'row',}}>

            <View style = {[styles.row]}>    

                <Text style={styles.itemName}>건물층수 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

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
                onChangeText= {bld_floor => this.setState({bld_floor})}
                value={this.state.bld_floor}
                onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                }}
                />
                <TouchableOpacity
                  style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                  onPress={()=>{this.setState({bld_floor:''})}}
                  >
                  <Icon 
                  name="md-close-circle"
                  size={20}
                  style={{ marginTop: 27,color: '#ddd', }}
                                        
                  />   
                </TouchableOpacity>
                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>

            </View>



            <View style = {[styles.row,]}>    

                    <Text style={styles.itemName}>층당 호실수 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

                
                    <TextInput
                    placeholder=""
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
                    onChangeText= {bld_roomPerFloor => this.setState({bld_roomPerFloor})}
                    value={this.state.bld_roomPerFloor}
                    onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />                      

                  <TouchableOpacity
                    style={{position:'absolute', top:5, left:5, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                    onPress={()=>{this.setState({bld_roomPerFloor:''})}}
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

         

            </View>

            <TouchableOpacity
            onPress={()=>{

              this._goNext();                
              
            }}
            style={{marginBottom:40,marginTop:40,backgroundColor:'#3b4db7',width:'100%', height: 45, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'white', fontSize: 13,}}>다음</Text>
          </TouchableOpacity>
           
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
    // flexDirection:'row',
    marginTop: 23,
    
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

AppRegistry.registerComponent('writeoffer', () => writeoffer);
