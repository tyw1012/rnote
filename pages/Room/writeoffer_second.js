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
var previous;
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PopupDialog from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import RoomInfoPopup from './roomInfoPopup';
import RoomListPopup from './roomListPopup';
import myoffering from './myoffering';
import detail from './detail';


export default class writeoffer_second extends Component {
  static navigationOptions= ({navigation}) =>{ 
    if(navigation.state.params.mode=='edit'){
      return (
        {
          headerLeft: <TouchableOpacity 
          onPress={()=>{self.props.navigation.goBack(null);  }}
          style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15}}>
            <Icon
            name="close"
            size={30}
            style={{color:'#fff', marginLeft:-6.5}}
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
              name="close"
              size={30}
              style={{color:'#fff', marginLeft:-6.5}}
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
static getState(name){
  return self.state[name]
}
static updateFigures(){

  self.setState(previousState => {
    previous = previousState 
    const {params} = self.props.navigation.state;
    
    // if 수정모드
    if(params.rooms != undefined  ){


    // 호실정보 수정 후 건물정보로 갔다가 다시 오는경우  
      if(self.state.rooms != undefined) {
        if(self.state.rooms[0].options != undefined){

          if(previous.bld_roomPerFloor === params.bld_roomPerFloor 
            && previous.bld_floor === params.bld_floor 
            && previous.bld_firstRoomNumber === params.bld_firstRoomNumber 
            && previous.bld_Bfloor === params.bld_Bfloor){
              return
            }
          // else{
          //   // let chunk = self._chunk([...params.rooms], parseInt(params.bld_roomPerFloor))
          //   // let roomsClone = [];
                
          //   // for ( let i = 0; i < chunk.length; i ++){
          //   //   roomsClone.push(...chunk[i])
          //   // }
          //     return params 
          // }
             
        }     
      
          
      }
    // 처음 넘어갈때: Object에서 Array 형태로 다시 파싱
      let temp = [...params.rooms];
     
      for ( let i = 0; i< temp.length; i++){
        temp[i] = {...params.rooms[i]}
        temp[i].options= [];
        temp[i].options.push(
          {name:'TV', wr_o_tv: temp[i].wr_o_tv, checked: self._stringConverter(temp[i].wr_o_tv)},
          {name:'에어컨', wr_o_air_cond:  temp[i].wr_o_air_cond, checked: self._stringConverter(temp[i].wr_o_air_cond)},
          {name:'냉장고', wr_o_fridger: temp[i].wr_o_fridger, checked: self._stringConverter(temp[i].wr_o_fridger)},
          {name:'세탁기', wr_o_washer: temp[i].wr_o_washer, checked: self._stringConverter(temp[i].wr_o_washer)},
          {name:'싱크대', wr_o_sink: temp[i].wr_o_sink, checked: self._stringConverter(temp[i].wr_o_sink)},
          {name:'인터넷', wr_o_internet: temp[i].wr_o_internet, checked: self._stringConverter(temp[i].wr_o_internet)},
          {name:'전자렌지', wr_o_microwave: temp[i].wr_o_microwave, checked: self._stringConverter(temp[i].wr_o_microwave)},
          {name:'책상', wr_o_desk: temp[i].wr_o_desk, checked: self._stringConverter(temp[i].wr_o_desk)},
          {name:'침대', wr_o_bed: temp[i].wr_o_bed, checked: self._stringConverter(temp[i].wr_o_bed)},
          {name:'옷장', wr_o_closet: temp[i].wr_o_closet, checked: self._stringConverter(temp[i].wr_o_closet)},
          {name:'신발장', wr_o_shoe_rack: temp[i].wr_o_shoe_rack, checked: self._stringConverter(temp[i].wr_o_shoe_rack)},
          {name:'책장', wr_o_bookshelf: temp[i].wr_o_bookshelf, checked: self._stringConverter(temp[i].wr_o_bookshelf)},
        )
        temp[i].mt_options= [];
        temp[i].mt_options.push(

          {name:'전기', wr_mt_elec: temp[i].wr_mt_elec, checked: self._stringConverter(temp[i].wr_mt_elec)},
          {name:'수도', wr_mt_water: temp[i].wr_mt_water, checked: self._stringConverter(temp[i].wr_mt_water)},
          {name:'가스', wr_mt_gas: temp[i].wr_mt_gas, checked: self._stringConverter(temp[i].wr_mt_gas)},
          {name:'TV', wr_mt_tv: temp[i].wr_mt_tv, checked: self._stringConverter(temp[i].wr_mt_tv)},
          {name:'인터넷', wr_mt_internet: temp[i].wr_mt_internet, checked: self._stringConverter(temp[i].wr_mt_internet)},

        )
        
        temp[i].wr_room_type = self._typeConverter(temp[i].wr_room_type);
        temp[i].wr_mt_separate = self._stringConverter(temp[i].wr_mt_separate);
        temp[i].wr_room_inactive = self._stringConverter(temp[i].wr_room_inactive);
      }

        let chunk = self._chunkObj(temp, parseInt(params.bld_roomPerFloor))
        let roomsClone = [];

        for ( let i = 0; i < chunk.length; i ++){
          if(chunk[i][0]['wr_room_number'][0] == '-'){
              roomsClone.push(...(chunk[i].sort(function(a,b){return b['wr_room_number']-a['wr_room_number']})))
          }
          else{
              roomsClone.push(...chunk[i])
          }
        
        }
            
        // for ( let i = 0; i < chunk.length; i ++){
        //   roomsClone.push(...chunk[i])
        // }
        return {...params, rooms: roomsClone}

    }
      
    return params;
    
  }, function(){
    let rooms = []
    let chunk = self._chunk(self._makeRoomArray(parseInt(self.state.bld_floor), parseInt(self.state.bld_roomPerFloor), self.state.bld_Bfloor, self.state.bld_firstRoomNumber), parseInt(self.state.bld_roomPerFloor) ) ;
    console.log(chunk)


    for ( let i = 0; i < chunk.length; i ++){
      rooms.push(...chunk[i])
    }
    
    //초기화된 호실 정보 오브젝트
    let roomsObj = rooms.map(function(el){ return {
        wr_room_number: el,
        listChecked : false,
        wr_room_inactive: false,
        options: [

          {name:'TV', wr_o_tv: 0, checked: false},
          {name:'에어컨', wr_o_air_cond: 0, checked: false},
          {name:'냉장고', wr_o_fridger: 0, checked: false},
          {name:'세탁기', wr_o_washer: 0, checked: false},
          {name:'싱크대', wr_o_sink: 0, checked: false},
          {name:'인터넷', wr_o_internet: 0, checked: false},
          {name:'전자렌지', wr_o_microwave: 0, checked: false},
          {name:'책상', wr_o_desk: 0, checked: false},
          {name:'침대', wr_o_bed: 0, checked: false},
          {name:'옷장', wr_o_closet: 0, checked: false},
          {name:'신발장', wr_o_shoe_rack: 0, checked: false},
          {name:'책장', wr_o_bookshelf: 0, checked: false},

        ],
        mt_options: [
          {name:'전기', wr_mt_elec: 0, checked: false},
          {name:'수도', wr_mt_water: 0, checked: false},
          {name:'가스', wr_mt_gas: 0, checked: false},
          {name:'TV', wr_mt_tv: 0, checked: false},
          {name:'인터넷', wr_mt_internet: 0, checked: false},

        ]

      } 
    })

   //층수, 최대호실수, 지하층수, 시작번호 정보가 변경되면 
    !(previous.bld_roomPerFloor === this.state.bld_roomPerFloor && previous.bld_floor === this.state.bld_floor && previous.bld_firstRoomNumber === this.state.bld_firstRoomNumber && previous.bld_Bfloor === this.state.bld_Bfloor)?
   //roomsObj로 초기화
    this.setState({rooms:roomsObj,rooms_forList:roomsObj, columnChange:2}, function(){console.log(this.state)})
   //변경없을경우 -> state 그대로
    : this.setState({columnChange:2}, function(){console.log('case2', this.state)})

  })

  
}

	constructor(props){
		super(props)
		this.state={
           

            columnChange:1,
            selectedRoom:{},
            // rooms:[],
            scrollEnabled:true,
            inActiveMode: false,
    }
    self=this;
    
	}
 
  
  componentWillMount(){
    
    const {params} = self.props.navigation.state;
     this.setState(
     {
      mode: params.mode,
      memberID: params.memberID,
      memberName: params.memberName,
      bld_floor: params.bld_floor,
      bld_roomPerFloor: params.bld_roomPerFloor,
      bld_Bfloor: params.bld_Bfloor,
      bld_firstRoomNumber: params.bld_firstRoomNumber,
      
     
     }
      , function(){

        console.log('secondState', this.state)
 
      
    })
   
  }
  

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }

  _typeConverter(string){
    if(string=="1"){
      return '원룸'
    }
    if(string=="2"){
      return '투룸'
    }
    if(string=="3"){
      return '쓰리룸'
    }
    if(string=="4"){
      return '1.5룸'
    }
  }
  _booleanConverter(bool){
    if(bool===true){
      return 1
    }
    if(bool===false){
      return 0
    }
  }

  _stringConverter(string){
    if(string == "1"){
      return true
    }
    if(string == "0"){
      return false
    }
  }

  _parseRooms(rooms){
    

    let roomsClone = [...rooms]
    for ( let i = 0; i< roomsClone.length; i++){
      roomsClone[i] = {...roomsClone[i]}

      roomsClone[i].wr_o_tv = roomsClone[i].options[0].wr_o_tv;
      roomsClone[i].wr_o_air_cond = roomsClone[i].options[1].wr_o_air_cond;
      roomsClone[i].wr_o_fridger = roomsClone[i].options[2].wr_o_fridger;
      roomsClone[i].wr_o_washer = roomsClone[i].options[3].wr_o_washer;
      roomsClone[i].wr_o_sink = roomsClone[i].options[4].wr_o_sink;
      roomsClone[i].wr_o_internet = roomsClone[i].options[5].wr_o_internet;
      roomsClone[i].wr_o_microwave = roomsClone[i].options[6].wr_o_microwave;
      roomsClone[i].wr_o_desk = roomsClone[i].options[7].wr_o_desk;
      roomsClone[i].wr_o_bed = roomsClone[i].options[8].wr_o_bed;
      roomsClone[i].wr_o_closet = roomsClone[i].options[9].wr_o_closet;
      roomsClone[i].wr_o_shoe_rack = roomsClone[i].options[10].wr_o_shoe_rack;
      roomsClone[i].wr_o_bookshelf = roomsClone[i].options[11].wr_o_bookshelf;
     
      roomsClone[i].wr_mt_elec = roomsClone[i].mt_options[0].wr_mt_elec
      roomsClone[i].wr_mt_water = roomsClone[i].mt_options[1].wr_mt_water
      roomsClone[i].wr_mt_gas = roomsClone[i].mt_options[2].wr_mt_gas
      roomsClone[i].wr_mt_tv = roomsClone[i].mt_options[3].wr_mt_tv
      roomsClone[i].wr_mt_internet = roomsClone[i].mt_options[4].wr_mt_internet
      
      if(roomsClone[i].wr_room_type == '원룸'){
        roomsClone[i].wr_room_type = "1"
      }
      if(roomsClone[i].wr_room_type == '투룸'){
        roomsClone[i].wr_room_type = "2"
      }
      if(roomsClone[i].wr_room_type == '쓰리룸'){
        roomsClone[i].wr_room_type = "3"
      }
      if(roomsClone[i].wr_room_type == '1.5룸'){
        roomsClone[i].wr_room_type = "4"
      }

      roomsClone[i].options = undefined;
      roomsClone[i].mt_options = undefined;

    }

    return roomsClone
    
  }

  _parseBFloor(number){

    return (number.toString()).replace('-', 'B')

  }
 _makeRoomArray(floor,roomPerFloor,Bfloor = 0, firstRoomNumber = 1){
    let rooms = [];
    for (let i = 0; i < floor+parseInt(Bfloor); i ++){
        
        for ( let j = 0; j < roomPerFloor; j ++){

            if( i < parseInt(Bfloor)){
              rooms.push(parseInt(`-${(i+1)*100+parseInt(firstRoomNumber)+j}`))
            }
            else{
              rooms.push(parseInt(`${(i-parseInt(Bfloor)+1)*100+parseInt(firstRoomNumber)+j}`))
            }
           
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
  _chunkObj(arr, len) {
  
    var chunks = [],
        i = 0,
        n = arr.length;
  
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
  
    return chunks.sort(function(a,b){return b[0]['wr_room_number']- a[0]['wr_room_number']} )
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

// onSwipeLeft(gestureState) {
  
//   this._goNext();
  
// }
// onSwipeRight(gestureState) {
  
//   this._goPrevious();
  
// }



_roomStyle(item){

  if (this.state.inActiveMode){

    if(item.wr_room_inactive==1){
      return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',borderRadius:5}
    }
    else{
      return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',backgroundColor:'#f1f1f1',borderRadius:5}
    }
    
  }
  else{
    if (item.wr_room_inactive==1){
       return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',borderRadius:5}
    }
    else{

    
        return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',borderRadius:5}
      
    }

  }
  
}
_roomTextStyle(item){

  if (this.state.inActiveMode){

    if(item.wr_room_inactive==1){
      return {fontSize:12, color:'#d1d1d1', fontWeight:'bold'}
    }
    else{
      return {fontSize:12, fontWeight:'bold'}
    }
    
  }
  else{

      if (item.wr_room_inactive==1){
          return {fontSize:12, color:'#d1d1d1', fontWeight:'bold'}
      }
      else{
       
          return {fontSize:12, fontWeight:'bold'}
                
      }


  }
  
}
_inActiveToggle(item){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(item)]['wr_room_inactive'] = !clone[this._findRoomIndex(item)]['wr_room_inactive']
  this.setState({rooms:clone})
}
_inputHandler(name,input,state){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(state)][name] = input;
  this.setState({rooms: clone})
}
_chooseRoomType(type, state){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(state)]['wr_room_type'] = type
  this.setState({rooms: clone})

}
_chooseRentType(type, state){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(state)]['wr_rent_type'] = type
  this.setState({rooms: clone})

}
_saveRoomInfo(itemState){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(itemState)] = itemState;
  this.setState({rooms: clone}, function(){this.roomInfoPopup.dismiss();});
  

}
_findRoomIndex(itemState){
  for (var i = 0; i < this.state.rooms.length; i++){
    if(itemState.wr_room_number==this.state.rooms[i].wr_room_number){

      return i

    }
  }
}
_applyRoomInfoToOthers(itemState){
  var clone = this.state.rooms.slice(0);
  
  for ( var i = 0; i < clone.length; i ++){
    if(clone[i].listChecked){ 
     clone[i] = {...itemState, wr_room_number: clone[i].wr_room_number} 
     clone[i].listChecked = false     
    }
  }

  this.setState({rooms:clone}, function(){
    this.roomListPopup.dismiss();
  })

  // for ( var i = 0; i < checkList.length; i ++){
  //   let index = this._findRoomIndex(checkList[i])
  //   clone[index] = {...itemState,...checkList[i]}
  // }
  // let index = this._findRoomIndex(itemState)
  // clone[index] = itemState
  // this.setState({rooms:clone}, function(){
  //   this.roomListPopup.dismiss();
  //   console.log(this.state.rooms)
  // })
}
_showRoomList(itemState){
  let clone = {...itemState}
  clone.listChecked = true;
  let temp = this.state.rooms.slice(0);
  for (let i = 0; i < temp.length; i++){
    temp[i].listChecked = false;
  }
  temp[this._findRoomIndex(clone)] = clone;
  this.setState({savedData: clone, rooms:temp},
    function(){
     
      this.roomListPopup.show();
    }
  )
 
}

_checkboxHandler(optionItem,optionIndex, roomItem, optionType){
  let optionClone = {...optionItem};
  optionClone.checked = !optionClone.checked;
  optionClone[Object.keys(optionClone)[1]] == 1?
  optionClone[Object.keys(optionClone)[1]] = 0 : optionClone[Object.keys(optionClone)[1]] = 1
  
  let temp = [...this.state.rooms];
  let roomClone = {...roomItem};
  roomClone[optionType][optionIndex] = optionClone;
  temp[this._findRoomIndex(roomClone)] = roomClone;
  this.setState({rooms:temp}, function(){console.log(this.state.rooms)} );

}
_cancelHandler(){
  this.roomInfoPopup.dismiss();
  this.setState({scrollEnabled:true})
}
  render() {
   
    return (
    
    <GestureRecognizer
    // onSwipeLeft={(state) => this.onSwipeLeft(state)}
    // onSwipeRight={(state) => this.onSwipeRight(state)}
    
    >

    <PopupDialog
    // dismissOnTouchOutside={false}
    // haveOverlay = {false}
    
    ref={(popupDialog) => { this.roomInfoPopup = popupDialog; }}            
    dialogStyle ={{elevation:2, width: '90%', position:'absolute', height:400, top: 30, }}
    onDismissed ={()=>this.setState({scrollEnabled:true})}
    >
              <RoomInfoPopup
              item = {this.state.selectedRoom}
              inputHandler = {this._inputHandler.bind(this)}
              chooseRoomType = {this._chooseRoomType.bind(this)}
              chooseRentType = {this._chooseRentType.bind(this)}
              saveRoomInfo = {this._saveRoomInfo.bind(this)}
              showRoomList = {this._showRoomList.bind(this)}
              checkboxHandler = {this._checkboxHandler.bind(this)}
              applyRoomInfoToOthers = {this._applyRoomInfoToOthers.bind(this)}
              cancelHandler= {()=>this.roomInfoPopup.dismiss()}
              />

    </PopupDialog>

    <PopupDialog
    // haveOverlay = {false}
    // dismissOnTouchOutside={false}
    ref={(popupDialog) => { this.roomListPopup = popupDialog; }}            
    dialogStyle ={{elevation:2, width: '90%', position:'absolute', height:400, top: 30, }}
    // onDismissed ={()=>this.roomInfoPopup.show()}
    >
              <RoomListPopup
              rooms = {this.state.rooms}
              columnChange= {this.state.columnChange}
              bld_roomPerFloor = {this.state.bld_roomPerFloor}
              savedData = {this.state.savedData}
              applyRoomInfoToOthers = {this._applyRoomInfoToOthers.bind(this)}
              cancelHandler= {()=>this.roomListPopup.dismiss()}
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
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{marginBottom:20, fontSize:13, marginLeft:2,}}>{this.state.inActiveMode?'선택한 호실을 비활성화 할 수 있습니다.':'호실 선택 후 정보를 입력해주세요.'}</Text>
                <Icon
                name = "grid-off"
                size = {23}
                style={this.state.inActiveMode?{color:'#3b4db7', marginRight:1}:{color:'#888', marginRight:1}}
                onPress={()=>{this.setState({inActiveMode:!this.state.inActiveMode})}}
                />
              </View>  
               <ScrollView
               contentContainerStyle={{ flexGrow: 1}}
               horizontal={true}
               showsVerticalScrollIndicator
               >
                      <FlatList data ={this.state.rooms}
                      style={{margin: 0, padding:0,}}
                      extraData={this.state}
                      key={(this.state.columnChange)}
                      keyExtractor ={(x,i)=>i}
                      numColumns={this.state.bld_roomPerFloor}
                      renderItem ={
                      ({item}) => <TouchableOpacity
                       style={this._roomStyle(item)}
                       onPress = {()=>{
                         if(this.state.inActiveMode){
                           this._inActiveToggle(item);
                         }
                         else{
                           if(item.wr_room_inactive!=1){
                            this.setState({selectedRoom:item, scrollEnabled:false}, function(){
                              this.roomInfoPopup.show();
                            })
                           }
                          
                         }
                      }}
                    >
                      
                        <Text style={this._roomTextStyle(item)}>{item.wr_room_inactive==1? '없음':this._parseBFloor(item.wr_room_number)}</Text>
                        <View style={item.wr_o_vacant==1?{position:'absolute', top:0, right:0, zIndex:10, padding:1,}:{display:'none'}}>
                        <Text style={item.wr_room_inactive==1?{display:'none'}:{fontSize:11, color:'#3b4db7', marginRight:2, marginTop:1, fontWeight:'bold'}}>공실</Text>
                        </View>
                        <View style={{position:'absolute', bottom:0, left:0, zIndex:10, padding:1,}}>
                        <Text style={item.wr_room_inactive==1?{display:'none'}:{fontSize:11, color:'#c1c1c1', marginLeft:2, marginBottom:1, fontWeight:'bold'}}>
                         {item.wr_room_type=='원룸'?'원룸':item.wr_room_type=='1.5룸'?'1.5룸':item.wr_room_type=='투룸'?'투룸':item.wr_room_type=='쓰리룸'?'쓰리룸':''                           
                         }
                        
                        </Text>
                        </View>

                      </TouchableOpacity>}
                        />
              </ScrollView>
             
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
                  
                  if(this.state.mode == 'edit'){

                      
                      fetch('http://real-note.co.kr/app3/editOffer_room.php',{
                        method:'post',
                        header:{
                          'Accept': 'application/json',
                          'Content-type': 'application/json'
                        },
                        body:JSON.stringify({
                          memberID : this.state.memberID,
                          memberName: this.state.memberName,
                          contact: this.state.contact,
                          roomsShouldBeInserted: this.state.roomsShouldBeInserted,
                          
                          bld_id : this.state.bld_id,
                          bld_name : this.state.bld_name,
                          bld_address : this.state.bld_address,
                          bld_contact : this.state.bld_contact,
                          bld_floor: parseInt(this.state.bld_floor),
                          bld_roomPerFloor: parseInt(this.state.bld_roomPerFloor),
                          bld_Bfloor: parseInt(this.state.bld_Bfloor),
                          bld_firstRoomNumber: parseInt(this.state.bld_firstRoomNumber),
                          bld_subway: this.state.bld_subway,
                          bld_posx: this.state.bld_posx,
                          bld_posy: this.state.bld_posy,
                          bld_hasElev: this._booleanConverter(this.state.bld_hasElev),
                          bld_hasParking: this._booleanConverter(this.state.bld_hasParking),
                          bld_memo: this.state.bld_memo,
                          
                          rooms: this.state.rooms,

                        
                        })
                      })
                      .then((res)=>{console.log(res); return res.json()})
                      .then((json) =>{
                        if (json.error){
                          if(json.typeError){

                            alert("'"+json.item +"'" + ' 의 입력값이 유효하지 않습니다.')

                          }
                          else{
                            alert("'"+json.item +"'" +' 정보를 입력해주세요.' )
                          }
                          

                        }
                        else{
                          
                          detail.updateInformationFromOutside({rooms:this._parseRooms(this.state.rooms)});

                          alert("매물 수정이 완료되었습니다.")
                          this.props.navigation.goBack(null);   
                          myoffering.refreshFromOutside();
                          myoffering.setSelectedSaleTypeFromOutside(this.state.segment)                     
                          
                        }
                        
                      })

                  }
                  else{

                    fetch('http://real-note.co.kr/app3/writeOffer_room.php',{
                      method:'post',
                      header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                      },
                      body:JSON.stringify({
                        memberID : this.state.memberID,
                        memberName: this.state.memberName,
                        contact: this.state.contact,
                      
                        bld_name : this.state.bld_name,
                        bld_address : this.state.bld_address,
                        bld_contact : this.state.bld_contact,
                        bld_floor: parseInt(this.state.bld_floor),
                        bld_roomPerFloor: parseInt(this.state.bld_roomPerFloor),
                        bld_Bfloor: parseInt(this.state.bld_Bfloor),
                        bld_firstRoomNumber: parseInt(this.state.bld_firstRoomNumber),
                        bld_subway: this.state.bld_subway,
                        bld_posx: this.state.bld_posx,
                        bld_posy: this.state.bld_posy,
                        bld_hasElev: this._booleanConverter(this.state.bld_hasElev),
                        bld_hasParking: this._booleanConverter(this.state.bld_hasParking),
                        bld_memo: this.state.bld_memo,
                        
                        rooms: this.state.rooms,

                       
                      })
                    })
                    .then((res)=>{console.log(res); return res.json()})
                    .then((json) =>{
                        if (json.error){
                          if(json.typeError){

                            alert("'"+json.item +"'" + ' 의 입력값이 유효하지 않습니다.')

                          }
                          else{
                            alert("'"+json.item +"'" +' 정보를 입력해주세요.' )
                          }
                          

                        }
                        else{
                          
                          alert("매물 등록이 완료되었습니다.")
                          this.props.navigation.goBack(null);   
                          myoffering.refreshFromOutside();
                          myoffering.setSelectedSaleTypeFromOutside(this.state.segment)                     
                          
                        }
                      
                    })

                  }
                  
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
