import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import PopupDialog from 'react-native-popup-dialog';
import RoomDetailPopup from './roomDetailPopup';
import RoomListItem_empty from './roomListItem_empty';
import myoffering from './myoffering';

class EmptyCheck extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            // columnChange:1
           
            roomDetailPopupVisible:false,
            selectedRoom: {},
            
        }
            
        
    }


    _roomStyle(item){

        if (this.state.onEditMode){
        // if (this.props.onEditMode){
      
          if(item.wr_room_inactive==1){
            return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center', borderRadius:5}
          }
          else{
            return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',backgroundColor:'#f1f1f1', borderRadius:5}
          }
          
        }
        else{
          if (item.wr_room_inactive==1){
             return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center', borderRadius:5}
          }
          else{
      
              return {flex:1,margin:4,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center', borderRadius:5}
            
          }
      
        }
        
      }
    _roomTextStyle(item){
    
    if (this.state.inActiveMode){
    
        if(item.wr_room_inactive==1){
        return {fontSize:12, color:'#d1d1d1', fontWeight:'bold'}
        }
        else{
        return {fontSize:12}
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
    _chunk(arr, len) {
    
    var chunks = [],
        i = 0,
        n = arr.length;
    // console.log('chunksEMpty',chunks)
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    // console.log('chunks', chunks, 'arr', arr)
    return chunks.sort(function(a,b){return b[0]['wr_room_number']- a[0]['wr_room_number']} )
    }       

    _findRoomIndex(itemState){
        for (var i = 0; i < this.state.rooms.length; i++){
          if(itemState.wr_room_number==this.state.rooms[i].wr_room_number){
      
            return i
      
          }
        }
      }

    _parseBFloor(number){

    return (number.toString()).replace('-', 'B')

    }

    _showRoomDetailPopup(item){
        
        this.setState({selectedRoom: item, roomDetailPopupVisible: true},
                
    )
    }
    _removePopup(){
        
       this.setState({roomDetailPopupVisible: false,})
        
       
    }
    _updateVacancy(item){

        let roomsClone = JSON.parse(JSON.stringify(this.state.rooms))
        let clone = JSON.parse(JSON.stringify(item))
        let index = this._findRoomIndex(clone);
        clone.wr_o_vacant == 1? clone.wr_o_vacant = "0" :
        clone.wr_o_vacant = "1";
        roomsClone[index] = clone;
        this.setState({rooms:roomsClone}, function(){console.log(this.state.rooms)})
    }

    componentWillMount(){
        this.setState({rooms: this.props.data.rooms, rooms_before: this.props.data.rooms, bld_roomPerFloor: this.props.data.bld_roomPerFloor, memberID: this.props.data.memberID, bld_id : this.props.data.bld_id,})
    }
    

	render(){
        
        // let {height} = Dimensions.get('window')  ;
        let scrollHeight = parseInt(this.props.data.bld_floor)*70 + 35;
        // let maxHeight = height - 150;
        
        let roomsJson = JSON.stringify(this.state.rooms)
        let roomsJson_before =  JSON.stringify(this.state.rooms_before)
                
        let roomsClone = [...this.state.rooms];
        let chunk = this._chunk(roomsClone, parseInt(this.state.bld_roomPerFloor))
        let rooms = [];
             
        for ( let i = 0; i < chunk.length; i ++){
            if(chunk[i][0]['wr_room_number'][0] == '-'){
                rooms.push(...(chunk[i].sort(function(a,b){return b['wr_room_number']-a['wr_room_number']})))
            }
            else{
                rooms.push(...chunk[i].sort(function(a,b){return a['wr_room_number']-b['wr_room_number']}))
            }
          
        }

        
            return(
                    <View style={{padding:10, height:'100%', flexDirection:'column'}}> 
                        {/* <View style={{elevation:2, width: '100%', position:'absolute',  top: 0, bottom:0 }}> */}
                        {/* <PopupDialog
                        ref={(popupDialog) => { this.roomDetailPopup = popupDialog; }}            
                        dialogStyle ={{elevation:2, width: '100%', height:'100%', position:'absolute', top: 0, bottom:0 }}
                        >  */}
                        {/* <Animated.View style={this.state.roomDetailPopupVisible?
                        [slideInStyle,{zIndex:10,height:300, backgroundColor:'#fff', position:'absolute', right:15, left:15, bottom:0,  elevation:10, borderRadius:7,}]
                        : [slideOutStyle,{zIndex:10,height:300, backgroundColor:'#fff', position:'absolute', right:15, left:15, bottom:0,  elevation:10, borderRadius:7,}]}
                        // {this.state.roomDetailPopupVisible?{zIndex:10,height:300,margin:10, backgroundColor:'#fff', width:'100%', position:'absolute', bottom:0}:{display:'none'}}
                        > */}
                            <RoomDetailPopup
                            visible = {this.state.roomDetailPopupVisible}
                            item = {this.state.selectedRoom}
                            removePopup = {this._removePopup.bind(this)}
                            />
                        {/* </Animated.View> */}
                        {/* </PopupDialog> */}
                        {/* </View> */}
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#f3f3f3', margin:-10, marginBottom:10,  padding: 12, paddingTop:17, paddingBottom:17, borderBottomWidth:1, borderColor:'#e1e1e1'}}>
                        <Text style={{marginLeft:2, fontSize:13, color:'#777' }}>호실을 선택하면 <Text style={{fontWeight:'bold',color:'#444' }}>공실여부</Text>를 변경합니다</Text>

                        <TouchableOpacity style={roomsJson == roomsJson_before?{justifyContent:'center', alignItems:'center', padding:8, width:75, backgroundColor:'#d1d1d1', margin:-8, marginRight: 2}:{justifyContent:'center', alignItems:'center', padding:8, width:75, backgroundColor:'#3b4db7', margin:-8, marginRight: 2}}
                            onPress={()=>{
                                if(roomsJson != roomsJson_before){

                                    fetch('http://real-note.co.kr/app3/emptyCheckRoom.php',{
                                        method:'post',
                                        header:{
                                        'Accept': 'application/json',
                                        'Content-type': 'application/json'
                                        },
                                        body:JSON.stringify({
                                            memberID: this.state.memberID,
                                            bld_id: this.state.bld_id,
                                            rooms: this.state.rooms,
                                        })
                                    })
                                    .then((res)=>{console.log(res); return res.json()})
                                    .then((json) =>{
                                        
                                        if(!json.error){

                                            alert('공실 정보가 저장되었습니다.')
                                            myoffering.refreshFromOutside()

                                        }

                                    })
                                }
                                else{
                                   
                                }
                                
                            }}
                        >
                            <Text style={{color:'#fff', fontSize:13,}}>저장</Text>

                        </TouchableOpacity>                    
                    </View>

                    <ScrollView 
                    contentContainerStyle={{ flexGrow:1,  maxHeight: scrollHeight, marginBottom:40, flexDirection:'column', }}
                    showsHorizontalScrollIndicator={false}
                    horizontal>

                        <FlatList data ={rooms}
                        style={{margin: 0, padding:0,}}
                        extraData={this.state}
                        // key={(this.state.columnChange)}
                        keyExtractor ={(x,i)=>i}
                        numColumns={this.state.bld_roomPerFloor}
                        renderItem ={
                        ({item}) => 
                        <RoomListItem_empty
                        item = {item}
                        rooms = {this.state.rooms}
                        updateVacancy = {this._updateVacancy.bind(this)}
                        />
                       
                        }
                        />

                    </ScrollView>   
                        <View style={{flexDirection:'row', }}>
                            <View style={{width:20, height: 20, borderRadius:3, backgroundColor:'#3b4db7', margin:5,}}></View>
                            <Text style={{marginLeft: 10, marginTop: 5, fontSize: 12.5, fontWeight:'bold'}}>공실</Text>

                        </View>
                    </View>
                  );
   }
       
	
}
const styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor: '#eee'	,	
        
	},
    map:{  
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapView:{
        position: 'relative',
        width:'100%',
        height:280,
    },
    content:{
        flex:1,       
        
        
    },
    sec1:{
        flex:1,
        alignItems: 'center',
        paddingTop:15,
        marginBottom:12,
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderColor:'#d6d6d6'

    },
    sec2:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#fff',
        padding: 15,
        
       
    },
    row:{
        flex:1,
        flexDirection:'row',
        borderBottomWidth: 1,
        borderColor: '#d1d1d1',
        padding:10,

    },
    columnName:{
        flex:3.5,
        fontWeight:'bold'
    },
    columnInfo:{
        flex:6.5,
        
    },
    title:{
        fontSize: 20,
        fontWeight:'bold'
    },
    pricesContainer:{
        flex:1,
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        
    },
    price:{
        flex:1,
        alignItems: 'center',
    },

});

export default EmptyCheck;
