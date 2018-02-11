import React, { Component, PureComponent } from 'react';
import { View,Text,ActivityIndicator,TouchableOpacity, } from 'react-native';
export default class RoomListItem_write extends Component{

constructor(props){
    super(props);
    this.state={
      
    }
}

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

  _parseBFloor(number){

    return (number.toString()).replace('-', 'B')

  }

shouldComponentUpdate(nextProps, nextState) {
    
   if(JSON.stringify(this.props.item) === JSON.stringify(nextProps.item)){
      return false   ;
    }
    // console.log(JSON.parse(JSON.stringify(this.props.item)),JSON.parse(JSON.stringify(nextProps.item)) )
    return true
}

render(){
    const {item} = this.props
    // console.log('rendered')

    return(

        <TouchableOpacity
            style={this._roomStyle(item)}
            onPress = {()=>{
                if(this.props.inActiveMode){
                this.props.inActiveToggle(item);
                }
                else{
                if(item.wr_room_inactive!=1){
                // this.setState({selectedRoom:item, scrollEnabled:false}, function(){
                    // this.roomInfoPopup.show();
                    // let itemClone = JSON.parse(JSON.stringify(item));
                    // let roomsClone = JSON.parse(JSON.stringify(this.state.rooms))
                    // let bld_roomPerFloorClone = this.state.bld_roomPerFloor;
                    this.props.navigation.navigate('RoomIndividual', {...item, rooms:this.props.rooms, bld_roomPerFloor: this.props.bld_roomPerFloor, })
                // })
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

        </TouchableOpacity>

    )
    

}


}



