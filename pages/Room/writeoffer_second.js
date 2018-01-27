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

static updateFigures(){

  self.setState(previousState => {
    previous = previousState      
    return self.props.navigation.state.params;
  }, function(){
    let rooms = []
    let chunk = self._chunk(self._makeRoomArray(parseInt(self.state.bld_floor), parseInt(self.state.bld_roomPerFloor), self.state.bld_Bfloor, self.state.bld_firstRoomNumber), parseInt(self.state.bld_roomPerFloor) ) ;
    
    for ( let i = 0; i < chunk.length; i ++){
      rooms.push(...chunk[i])
    }
    
    roomsObj = rooms.map(function(el){ return {
        roomNumber: el,
        listChecked : false,
        inActive: false,
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
    !(previous.bld_roomPerFloor === this.state.bld_roomPerFloor && previous.bld_floor === this.state.bld_floor && previous.bld_firstRoomNumber === this.state.bld_firstRoomNumber && previous.bld_Bfloor === this.state.bld_Bfloor)?
    this.setState({rooms:roomsObj,rooms_forList:roomsObj, columnChange:2}, function(){console.log(this.state.rooms)})
    : this.setState({columnChange:2})

  })

  // self.setState(self.props.navigation.state.params, function(){
  //   let rooms = []
  //   let chunk = self._chunk(self._makeRoomArray(parseInt(self.state.bld_floor), parseInt(self.state.bld_roomPerFloor)), parseInt(self.state.bld_roomPerFloor) ) ;
    
  //   for ( let i = 0; i < chunk.length; i ++){
  //     rooms.push(...chunk[i])
  //   }
    
  //   roomsObj = rooms.map(function(el){ return {
  //       roomNumber: el,
  //       listChecked : false,

  //     } 
  //   })
  //   this.state.rooms ==undefined?
  //   this.setState({rooms:roomsObj,rooms_forList:roomsObj, columnChange:2}, function(){console.log(this.state.rooms)})
  //   : this.setState({columnChange:2})

  // })
  
}

	constructor(props){
		super(props)
		this.state={
           
      wr_rec_sectors:[],
      wr_rec_full:['음식점','고깃집','횟집','퓨전주점','소주방','휴게음식점','카페','테이크아웃','분식','미용','네일','뷰티','판매','휴대폰','화장품','의류','잡화','편의점','마트','오락스포츠','헬스','골프','당구장','노래연습장','단란유흥','BAR','스포츠마사지','자동차','학원','병원','사무실','다용도','숙박','양도양수','프렌차이즈','대형매장'],
      wr_rec_full_bool:[],

            columnChange:1,
            selectedRoom:{},
            // rooms:[],
            scrollEnabled:true,
            inActiveMode: false,
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

  booleanConverter(bool){
    if(bool===true){
      return 1
    }
    if(bool===false){
      return 0
    }
  }
  _parseBFloor(number){

    return (number.toString()).replace('-', 'B')

  }
 _makeRoomArray(floor,roomPerFloor,Bfloor = 0, firstRoomNumber = 1){
    let rooms = [];
    for (let i = 0; i < floor+parseInt(Bfloor); i ++){
        
        for ( let j = 0; j < roomPerFloor; j ++){

            if( i < parseInt(Bfloor)){
              rooms.push(parseInt(`-${i+1}0${parseInt(firstRoomNumber)+j}`))
            }
            else{
              rooms.push(parseInt(`${i-parseInt(Bfloor)+1}0${parseInt(firstRoomNumber)+j}`))
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

_roomStyle(item){

  if (this.state.inActiveMode){

    if(item.inActive){
      return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',}
    }
    else{
      return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',backgroundColor:'#f1f1f1'}
    }
    
  }
  else{
    if (item.inActive){
       return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',}
    }
    else{

      if(item.wr_room_type=='원룸'){
        return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#3b9bcc', justifyContent:'center', alignItems:'center'}
    
      }
      else if(item.wr_room_type=='투룸'){
        return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#cc3f3f', justifyContent:'center', alignItems:'center'}
      }
      else if(item.wr_room_type=='쓰리룸'){
        return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#db9e25', justifyContent:'center', alignItems:'center'}
      }
      else{
        return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center'}
      }
    }

  }
  
}
_roomTextStyle(item){

  if (this.state.inActiveMode){

    if(item.inActive){
      return {fontSize:11, color:'#d1d1d1'}
    }
    else{
      return {fontSize:11}
    }
    
  }
  else{

      if (item.inActive){
          return {fontSize:11, color:'#d1d1d1'}
      }
      else{

        if(item.wr_room_type=='원룸'){
          return {fontSize:11}
      
        }
        else if(item.wr_room_type=='투룸'){
          return {fontSize:11}
        }
        else if(item.wr_room_type=='쓰리룸'){
          return {fontSize:11}
        }
        else{
          return {fontSize:11}
        }
        
      }


  }
  
}
_inActiveToggle(item){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(item)]['inActive'] = !clone[this._findRoomIndex(item)]['inActive']
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
_saveRoomInfo(itemState){
  var clone = this.state.rooms.slice(0);
  clone[this._findRoomIndex(itemState)] = itemState;
  this.setState({rooms: clone}, function(){this.roomInfoPopup.dismiss();});
  

}
_findRoomIndex(itemState){
  for (var i = 0; i < this.state.rooms.length; i++){
    if(itemState.roomNumber==this.state.rooms[i].roomNumber){

      return i

    }
  }
}
_applyRoomInfoToOthers(itemState){
  var clone = this.state.rooms.slice(0);
  
  for ( var i = 0; i < clone.length; i ++){
    if(clone[i].listChecked){ 
     clone[i] = {...itemState, roomNumber: clone[i].roomNumber} 
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
    onSwipeLeft={(state) => this.onSwipeLeft(state)}
    onSwipeRight={(state) => this.onSwipeRight(state)}
    
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
                           if(!item.inActive){
                            this.setState({selectedRoom:item, scrollEnabled:false}, function(){
                              this.roomInfoPopup.show();
                            })
                           }
                          
                         }
                      }}
                    >
                      
                        <Text style={this._roomTextStyle(item)}>{item.inActive? '없음':this._parseBFloor(item.roomNumber)+'호'}</Text>


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
                  console.log(this.state)
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
                        bld_floor: this.state.bld_floor,
                        bld_roomPerFloor: this.state.bld_roomPerFloor,
                        bld_posx: this.state.bld_posx,
                        bld_posy: this.state.bld_posy,
                        bld_hasElev: this.booleanConverter(this.state.bld_hasElev),
                        bld_hasParking: this.booleanConverter(this.state.bld_hasParking),
                        
                        rooms: this.state.rooms,

                       
                      })
                    })
                    .then((res)=>{console.log(res); return res.json()})
                    .then((json) =>{
                      // if (json.error){
                        
                      //   alert("'"+json.item +"'" +' 정보를 입력해주세요.' )

                      // }
                      // else{
                        
                      //   alert("매물 등록이 완료되었습니다.")
                      //   this.props.navigation.goBack(null);   
                      //   myoffering.refreshFromOutside();
                      //   myoffering.setSelectedSaleTypeFromOutside(this.state.segment)                     
                        
                      // }
                      
                    })
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
