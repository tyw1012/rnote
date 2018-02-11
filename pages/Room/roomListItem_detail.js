import React, { Component, PureComponent } from 'react';
import { View,Text,ActivityIndicator,TouchableOpacity, } from 'react-native';
export default class RoomListItem_detail extends Component{

constructor(props){
    super(props);
    this.state={
      
    }
}

_roomStyle(item){

  
      if (item.wr_room_inactive==1){
         return {flex:1,margin:2.5,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#f1f1f1', justifyContent:'center', alignItems:'center',borderRadius:5}
      }
      else{

          return {flex:1,margin:2.5,minWidth:60, height:60,padding:8, borderWidth:1, borderColor:'#d1d1d1', justifyContent:'center', alignItems:'center',borderRadius:5}
        
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

  _parseBFloor(number){

    return (number.toString()).replace('-', 'B')

  }

shouldComponentUpdate(nextProps, nextState) {
    
   if(JSON.stringify(this.props.item) === JSON.stringify(nextProps.item)){
      return false   ;
    }
    return true
}

render(){
    const {item} = this.props

    return(

        <TouchableOpacity
        style={this._roomStyle(item)}
        onPress = {()=>{
            
            if(item.wr_room_inactive!=1){
                this.props.showRoomDetailPopup(item)
                }
            
        }}
        >
            
                <Text style={this._roomTextStyle(item)}>{item.wr_room_inactive==1?'없음':this._parseBFloor(item.wr_room_number)}</Text>
                {/* <View style={item.wr_o_vacant==1?{position:'absolute', top:0, right:0, zIndex:10,  padding:2,}:{display:'none'}}>
                <Text style={item.wr_room_inactive==1?{display:'none'}:{fontSize:11, color:'#3b4db7', marginRight:2, marginTop:1, fontWeight:'bold'}}>공실</Text>
                </View> */}
                <View style={{position:'absolute', bottom:0, left:0, zIndex:10, padding:1,}}>
                <Text style={item.wr_room_inactive==1?{display:'none'}:{fontSize:11, color:'#c1c1c1', marginLeft:2, marginBottom:1, fontWeight:'bold'}}>
                {item.wr_room_type=='1'?'원룸':item.wr_room_type=='2'?'투룸':item.wr_room_type=='3'?'쓰리룸':item.wr_room_type=='4'?'1.5룸':''                           
                }
                
                </Text>
                </View>

        </TouchableOpacity>

    )
    

}


}



