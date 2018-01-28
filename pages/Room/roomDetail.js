import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity,FlatList } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';

class RoomDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            // columnChange:1
        }
    }


    _roomStyle(item){

        if (this.state.onEditMode){
        // if (this.props.onEditMode){
      
          if(item.wr_room_inactive==1){
            return {flex:1,margin:2.5,minWidth:50, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',}
          }
          else{
            return {flex:1,margin:2.5,minWidth:50, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',backgroundColor:'#f1f1f1'}
          }
          
        }
        else{
          if (item.wr_room_inactive==1){
             return {flex:1,margin:2.5,minWidth:50, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',}
          }
          else{
      
            if(item.wr_room_type=='원룸'){
              return {flex:1,margin:2.5,minWidth:50, height:60,padding:8, borderWidth:1, borderColor:'#3b9bcc', justifyContent:'center', alignItems:'center'}
          
            }
            else if(item.wr_room_type=='투룸'){
              return {flex:1,margin:2.5,minWidth:50, height:60,padding:8, borderWidth:1, borderColor:'#cc3f3f', justifyContent:'center', alignItems:'center'}
            }
            else if(item.wr_room_type=='쓰리룸'){
              return {flex:1,margin:2.5,minWidth:50, height:60,padding:8, borderWidth:1, borderColor:'#db9e25', justifyContent:'center', alignItems:'center'}
            }
            else{
              return {flex:1,margin:2.5,minWidth:50, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center'}
            }
          }
      
        }
        
      }
    _roomTextStyle(item){
    
    if (this.state.inActiveMode){
    
        if(item.wr_room_inactive==1){
        return {fontSize:11, color:'#d1d1d1', fontWeight:'bold'}
        }
        else{
        return {fontSize:11}
        }
        
    }
    else{
    
        if (item.wr_room_inactive==1){
            return {fontSize:11, color:'#d1d1d1', fontWeight:'bold'}
        }
        else{
    
            if(item.wr_room_type=='원룸'){
            return {fontSize:11, fontWeight:'bold'}
        
            }
            else if(item.wr_room_type=='투룸'){
            return {fontSize:11, fontWeight:'bold'}
            }
            else if(item.wr_room_type=='쓰리룸'){
            return {fontSize:11, fontWeight:'bold'}
            }
            else{
            return {fontSize:11, fontWeight:'bold'}
            }
            
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

    componentWillMount(){
        this.setState({rooms: this.props.data.rooms, bld_roomPerFloor: this.props.data.bld_roomPerFloor})
    }

	render(){
       
        // const {data} = this.props
        // let roomsClone = [...this.props.data.rooms];
        let roomsClone = [...this.state.rooms];
        // let chunk = this._chunk(roomsClone, parseInt(this.props.data.bld_roomPerFloor))
        let chunk = this._chunk(roomsClone, parseInt(this.state.bld_roomPerFloor))
        // console.log('chunk',chunk, 'roomsClone', roomsClone)
        let rooms = [];
             
        for ( let i = 0; i < chunk.length; i ++){
          rooms.push(...chunk[i])
        }

        // console.log('rendering', rooms, roomsClone)
            return(
                    <View style={{padding:10}}> 
                    
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
                                    this.props.showRoomDetailPopup(item)
                                 }
                            
                            }
                           
                        }}
                        >
                      
                        <Text style={this._roomTextStyle(item)}>{item.wr_room_inactive==1?'없음':item.wr_room_number}</Text>
                        <View style={item.wr_o_vacant==1?{position:'absolute', top:0, right:0, zIndex:10, borderLeftWidth:1, borderBottomWidth:1, borderColor:'#d1d1d1', padding:2,}:{display:'none'}}>
                        <Text style={{fontSize:10.5, color:'#3b4db7'}}>공실</Text>
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
