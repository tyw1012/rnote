import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList, } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import PopupDialog from 'react-native-popup-dialog';
import RoomDetailPopup from './roomDetailPopup';
import RoomListItem_detail from './roomListItem_detail';
import myoffering from './myoffering';

class RoomDetail extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            // columnChange:1
            roomDetailPopupVisible:false,
            selectedRoom: {},
            
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
        // var previous;
        this.setState(prev =>{  return  {selectedRoom: item, roomDetailPopupVisible: true}  } ,
                
            // ()=>{
            //     this.state.rooms[this._findRoomIndex(previous.selectedRoom)]!=undefined?
            //     this.state.rooms[this._findRoomIndex(previous.selectedRoom)].isSelected = false : null;
            // }
        )
    }
    _removePopup(){
        
       this.setState({roomDetailPopupVisible: false,})
       
    }

    componentWillMount(){
        this.setState({rooms: this.props.data.rooms, bld_roomPerFloor: this.props.data.bld_roomPerFloor, memberID: this.props.data.memberID, bld_id : this.props.data.bld_id})
    }

	render(){
        
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
                    <View style={{padding:10, height:'100%'}}> 
                     
                            <RoomDetailPopup
                            visible = {this.state.roomDetailPopupVisible}
                            item = {this.state.selectedRoom}
                            removePopup = {this._removePopup.bind(this)}
                            />
                      
                    
                        <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#f3f3f3', margin:-10, marginBottom:10,  padding: 12, paddingTop:17, paddingBottom:17, borderBottomWidth:1, borderColor:'#e1e1e1'}}>
                            <Text style={{marginLeft:2, fontSize:13, color:'#777'  }}>호실을 선택하면 <Text style={{fontWeight:'bold',color:'#444' }}>상세정보</Text>를 볼 수 있습니다</Text>
                        </View>
                    
                        <ScrollView 
                        contentContainerStyle={{ flexGrow:1, marginBottom:80, flexDirection:'column'}}
                        showsHorizontalScrollIndicator={false}
                        horizontal>

                            <FlatList data ={rooms}
                            style={{margin: 0, padding:0,}}
                            extraData={this.state}
                            keyExtractor ={(x,i)=>i}
                            numColumns={this.state.bld_roomPerFloor}
                            renderItem ={
                            ({item}) => 

                            <RoomListItem_detail
                            item = {item}
                            selectedRoom = {this.state.selectedRoom}
                            showRoomDetailPopup = {this._showRoomDetailPopup.bind(this)}
                            />
                            
                            }
                            />

                        </ScrollView>   
                      
                </View>
            );
   }
	
}
const styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor: '#eee'	,	
	},
});

export default RoomDetail;
