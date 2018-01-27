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

    if (this.state.inActiveMode){
    
        if(item.wr_room_inactive==1){
        return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',}
        }
        else{
        return {flex:1,margin:2.5, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',backgroundColor:'#f1f1f1'}
        }
        
    }
    else{
        if (item.wr_room_inactive==1){
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
    
        if(item.wr_room_inactive==1){
        return {fontSize:11, color:'#d1d1d1'}
        }
        else{
        return {fontSize:11}
        }
        
    }
    else{
    
        if (item.wr_room_inactive==1){
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
    _chunk(arr, len) {

    var chunks = [],
        i = 0,
        n = arr.length;
    
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    
    return chunks.sort(function(a,b){return b[0]['wr_room_number']- a[0]['wr_room_number']} )
    }       

	render(){
        const {data} = this.props
        let roomsClone = [...this.props.data.rooms];
        let chunk = this._chunk(roomsClone, parseInt(this.props.data.bld_roomPerFloor))
        let rooms = [];
               
        for ( let i = 0; i < chunk.length; i ++){
          rooms.push(...chunk[i])
        }
            return(
                    <ScrollView style={{padding:10}}>

                        <FlatList data ={rooms}
                        style={{margin: 0, padding:0,}}
                        extraData={data}
                        // key={(this.state.columnChange)}
                        keyExtractor ={(x,i)=>i}
                        numColumns={data.bld_roomPerFloor}
                        renderItem ={
                        ({item}) => <TouchableOpacity
                        style={this._roomStyle(item)}
                        onPress = {()=>{
                           
                            if(item.wr_room_inactive!=1){
                                
                                    this.props.showRoomDetailPopup(item)
                             }
                            
                        }}
                        >
                      
                        <Text style={this._roomTextStyle(item)}>{item.wr_room_inactive==1?'없음':item.wr_room_number}</Text>

                        </TouchableOpacity>}
                        />
                    


                    </ScrollView>     

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
