import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import PopupDialog from 'react-native-popup-dialog';
import RoomDetailPopup from './roomDetailPopup';

class RoomDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            // columnChange:1
            selectedRoom: {},
        }
    }


    _roomStyle(item){

        if (this.state.onEditMode){
        // if (this.props.onEditMode){
      
          if(item.wr_room_inactive==1){
            return {flex:1,margin:2.5,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',}
          }
          else{
            return {flex:1,margin:2.5,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',backgroundColor:'#f1f1f1'}
          }
          
        }
        else{
          if (item.wr_room_inactive==1){
             return {flex:1,margin:2.5,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',}
          }
          else{
      
              return {flex:1,margin:2.5,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center'}
            
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

        this.setState({selectedRoom: item},
        ()=>{ this.roomDetailPopup.show()})
    }

    componentWillMount(){
        this.setState({rooms: this.props.data.rooms, bld_roomPerFloor: this.props.data.bld_roomPerFloor})
    }

	render(){
       
        // const {data} = this.props
        // let roomsClone = [...this.props.data.rooms];
        let roomsClone = [...this.state.rooms];
        console.log(roomsClone);
        // let chunk = this._chunk(roomsClone, parseInt(this.props.data.bld_roomPerFloor))
        let chunk = this._chunk(roomsClone, parseInt(this.state.bld_roomPerFloor))
        console.log(chunk);
        // console.log('chunk',chunk, 'roomsClone', roomsClone)
        let rooms = [];
             
        for ( let i = 0; i < chunk.length; i ++){
            if(chunk[i][0]['wr_room_number'][0] == '-'){
                rooms.push(...(chunk[i].sort(function(a,b){return b['wr_room_number']-a['wr_room_number']})))
            }
            else{
                rooms.push(...chunk[i])
            }
          
        }

        // console.log('rendering', rooms, roomsClone)
            return(
                    <View style={{padding:10}}> 

                    <PopupDialog
                     ref={(popupDialog) => { this.roomDetailPopup = popupDialog; }}            
                     dialogStyle ={{elevation:2, width: '90%', position:'absolute', height:400, top: 30, }}
                     > 
                        <RoomDetailPopup
                        item = {this.state.selectedRoom}/>
                     </PopupDialog>

                    
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
                        <Text style={{marginLeft:2, fontSize:13, }}>{this.state.onEditMode?'호실을 선택하면 공실여부를 변경합니다':'호실을 선택하면 상세정보를 볼 수 있습니다.'}</Text>
                    
                        
                    </View>

                    <ScrollView 
                    contentContainerStyle={{ flexGrow:1,}}
                    horizontal>

                        

                        <FlatList data ={rooms}
                        style={{margin: 0, padding:0,}}
                        extraData={this.state}
                        // key={(this.state.columnChange)}
                        keyExtractor ={(x,i)=>i}
                        numColumns={this.state.bld_roomPerFloor}
                        renderItem ={
                        ({item}) => <TouchableOpacity
                        style={this._roomStyle(item)}
                        onPress = {()=>{
                           
                            if(this.state.onEditMode){
                            // if(this.props.onEditMode){
                                // let index = this._findRoomIndex(item)
                                // this.props.updateVacancy(item, index)
                                let roomsClone = [...this.state.rooms]
                                let clone = {...item}
                                let index = this._findRoomIndex(clone);
                                clone.wr_o_vacant == 1? clone.wr_o_vacant = 0 :
                                clone.wr_o_vacant = 1;
                                roomsClone[index] = clone;
                                this.setState({rooms:roomsClone})
                                
                            }
                            else{

                                if(item.wr_room_inactive!=1){
                                    this._showRoomDetailPopup(item)
                                 }
                            
                            }
                           
                        }}
                        >
                      
                        <Text style={this._roomTextStyle(item)}>{item.wr_room_inactive==1?'없음':this._parseBFloor(item.wr_room_number)}</Text>
                        <View style={item.wr_o_vacant==1?{position:'absolute', top:0, right:0, zIndex:10,  padding:2,}:{display:'none'}}>
                        <Text style={item.wr_room_inactive==1?{display:'none'}:{fontSize:11, color:'#3b4db7', marginRight:2, marginTop:1, fontWeight:'bold'}}>공실</Text>
                        </View>
                        <View style={{position:'absolute', bottom:0, left:0, zIndex:10, padding:1,}}>
                        <Text style={item.wr_room_inactive==1?{display:'none'}:{fontSize:11, color:'#c1c1c1', marginLeft:2, marginBottom:1, fontWeight:'bold'}}>
                         {item.wr_room_type=='1'?'원룸':item.wr_room_type=='2'?'투룸':item.wr_room_type=='3'?'쓰리룸':item.wr_room_type=='4'?'1.5룸':''                           
                         }
                        
                        </Text>
                        </View>
                        </TouchableOpacity>
                        }
                        />


                    </ScrollView>   

                    <View style={{flexDirection:'row', marginTop:10}}>
                        <TouchableOpacity style={this.state.onEditMode?{flex:1, justifyContent:'center', alignItems:'center', padding:12, backgroundColor:'#3b4db7', marginLeft:2, marginRight:2, marginBottom:3}:{display:'none'}}
                            onPress={()=>{
                                // this.props.editModeToggle()
                                this.setState({onEditMode:false, rooms: this.state.rooms_before})
                            }}
                        >
                            <Text style={{color:'#fff', fontSize:13,}}>취소</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,justifyContent:'center', alignItems:'center', padding:12, backgroundColor:'#3b4db7', marginLeft:2, marginRight:2, marginBottom:3}}
                            onPress={()=>{
                                if(this.state.onEditMode){
                                    alert('저장되었습니다.')
                                    this.setState({onEditMode:false,})
                                }
                                else{
                                    let temp = this.state.rooms.slice(0);                                    
                                    this.setState({onEditMode:true, rooms_before: temp})
                                }
                                
                            }}
                        >
                            <Text style={{color:'#fff', fontSize:13,}}>{this.state.onEditMode?'저장':'공실체크'}</Text>

                        </TouchableOpacity>
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

export default RoomDetail;
