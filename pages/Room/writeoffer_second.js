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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PopupDialog from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import RoomInfoPopup from './roomInfoPopup';





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

static updateFigures(){

  self.setState(self.props.navigation.state.params, function(){
    let rooms = []
    let chunk = self._chunk(self._makeRoomArray(parseInt(self.state.bld_floor), parseInt(self.state.bld_roomPerFloor)), parseInt(self.state.bld_roomPerFloor) ) ;
    
    for ( let i = 0; i < chunk.length; i ++){
      rooms.push(...chunk[i])
    }
    
    roomsObj = rooms.map(function(el){ return {
        roomNumber: el

      } 
    })
    this.setState({rooms:roomsObj, columnChange:2}, function(){console.log(this.state.rooms)});


  })
  
}

	constructor(props){
		super(props)
		this.state={
           
      wr_rec_sectors:[],
      wr_rec_full:['음식점','고깃집','횟집','퓨전주점','소주방','휴게음식점','카페','테이크아웃','분식','미용','네일','뷰티','판매','휴대폰','화장품','의류','잡화','편의점','마트','오락스포츠','헬스','골프','당구장','노래연습장','단란유흥','BAR','스포츠마사지','자동차','학원','병원','사무실','다용도','숙박','양도양수','프렌차이즈','대형매장'],
      wr_rec_full_bool:[],

            columnChange:1,
            selectedRoom:{},
            rooms:[],
            scrollEnabled:true,
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
      bld_name: params.bld_name,
      bld_address: params.bld_address,
      bld_contact: params.bld_contact,
      bld_floor: params.bld_floor,
      bld_roomPerFloor: params.bld_roomPerFloor,
      bld_posx: params.bld_posx,
      bld_posy: params.bld_posy,
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

  _makeRoomArray(floor,roomPerFloor){
    let rooms = [];
    for (let i = 0; i < floor; i ++){
        
        for ( let j = 0; j < roomPerFloor; j ++){
            rooms.push(parseInt(`${i+1}0${j+1}`))
        }
    
    }
  
    return rooms
  }
  
  
  _chunk(arr, len) {
  
    var chunks = [],
        i = 0,
        n = arr.length;
  
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
  
    return chunks.sort(function(a,b){return b[0]- a[0]} )
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

_saveRoomInfo(itemState){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(itemState)] = itemState;
  this.setState({rooms: clone}, function(){console.log(this.state.rooms)});
  this.roomInfoPopup.dismiss();

}
_findRoomIndex(itemState){
  for (var i = 0; i < this.state.rooms.length; i++){
    if(itemState.roomNumber==this.state.rooms[i].roomNumber){

      return i

    }
  }
}
_applyRoomInfoToOthers(itemState){
  // var clone = this.state.rooms.slice(0);
  // for ( var i = 0; i < this.state.rooms.length; i ++){
  //   clone[i] = {...clone[i],...itemState}
  // }
  // this.setState({rooms:clone})
}
_cancelHandler(){
  this.roomInfoPopup.dismiss();
  this.setState({scrollEnabled:true})
}
  render() {
   
    return (
    
    <GestureRecognizer
    onSwipeLeft={(state) => this.onSwipeLeft(state)}
    onSwipeRight={(state) => this.onSwipeRight(state)}
    
    >

  <PopupDialog
              ref={(popupDialog) => { this.roomInfoPopup = popupDialog; }}            
              dialogStyle ={{elevation:2, width: '85%', position:'absolute', height:350, top: 30, }}
              onDismissed ={()=>this.setState({scrollEnabled:true})}
              >
              <RoomInfoPopup
              item = {this.state.selectedRoom}
              saveRoomInfo = {this._saveRoomInfo.bind(this)}
              applyRoomInfoToOthers = {this._applyRoomInfoToOthers.bind(this)}
              cancelHandler= {()=>this.roomInfoPopup.dismiss()}
              />
              </PopupDialog>
    <ScrollView 
    keyboardShouldPersistTaps="always"
    scrollEnabled={this.state.scrollEnabled}
    style={styles.container}
    minHeight={550}
    >
  
      
       {/* <Text style={{marginBottom:10, fontSize:12}}>선택해주세요</Text> */}
           <View style={styles.inputContainer}>
              <Text style={{marginBottom:10, }}>호실을 선택하여 정보를 입력해주세요</Text>
              
                      <FlatList data ={this.state.rooms}
                      style={{margin: 0, padding:0,}}
                      extraData={this.state}
                      key={(this.state.columnChange)}
                      keyExtractor ={(x,i)=>i}
                      numColumns={this.state.bld_roomPerFloor}
                      renderItem ={
                      ({item}) => <TouchableOpacity
                       style={{flex:1,margin:2.5, height:60,padding:10, borderWidth:1, borderColor:'#e1e1e1', justifyContent:'center', alignItems:'center'}}
                       onPress = {()=>{this.setState({selectedRoom:item, scrollEnabled:false}, function(){
                         this.roomInfoPopup.show()
                      })}}
                       >
                      
                        <Text style={{fontSize:12}}>{item.roomNumber}호</Text>


                      </TouchableOpacity>}
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
     
     </ScrollView>
     </GestureRecognizer>

   );
  }
}

const styles = StyleSheet.create({
    container: {
        
        // justifyContent: 'center',
        // alignItems: 'center',
        padding:15,
        backgroundColor: '#fff',
      },
      inputContainer:{
        flex:1,
        // alignItems:'center',
        justifyContent:'center',
        // height: 600,
        borderColor: '#e6e6e6',
        backgroundColor: '#fff',
        // borderWidth: 1,
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
