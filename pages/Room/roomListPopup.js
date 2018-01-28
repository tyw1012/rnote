import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput, ScrollView, StyleSheet, Keyboard, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButtons } from 'react-native-radio-buttons';
import { CheckBox } from 'react-native-elements'

var options = [];
class RoomListPopup extends Component{

    constructor(props){
        super(props);
        this.state={
            checkedRoomList:[],
            forceRender:false,
            
        }
    }


componentDidMount(){
 
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

_parseBFloor(number){

    return (number.toString()).replace('-', 'B')

  }

    renderOption(option, selected, onSelect, index){
        const style = selected ? { fontWeight: 'bold', fontSize:13, margin:12, color: 'white'} : {fontSize:13,margin:12,};
        const style2 = selected ? { backgroundColor: '#3b4db7', alignItems:'center', justifyContent:'center', height: 35,} : {backgroundColor:'#f1f1f1',alignItems:'center', justifyContent:'center', height:35} ;
        return (
            <TouchableOpacity onPress={onSelect} key={index} style={style2} >
            <Text style={style}>{option}</Text>
            </TouchableOpacity>
        );
    }

    renderContainer(optionNodes){
    return <View style={{flexDirection:'row', }}>{optionNodes}</View>;
    }
    
  

  render() {
      return(
    <View>
    
    
    <KeyboardAwareScrollView enableOnAndroid={true}
    keyboardShouldPersistTaps='always'
    innerRef={ref => {this.scroll = ref}}
    style={styles.container}>

        <FlatList data ={this.props.rooms}
        style={{margin: 0, padding:0,}}
        extraData={this.props.rooms}
        key={(this.props.columnChange)}
        keyExtractor ={(x,i)=>i}
        numColumns={this.props.bld_roomPerFloor}
        renderItem ={
        ({item}) =><CheckBox
        uncheckedIcon={null}
        checkedIcon={null}
        
        title={this._parseBFloor(item.wr_room_number.toString())}
        containerStyle={this._checkBoxStyle(item.listChecked)}
        textStyle={this._checkBoxTextStyle(item.listChecked)}
        checked={item.listChecked}
        onPress={()=>{
         
        item.listChecked = !item.listChecked;
        this.setState({forceRender: !this.state.forceRender})
        console.log(item);  
        // if(item.listChecked){
        //     this.setState({checkedRoomList : [...this.state.checkedRoomList,item]}, function(){console.log(this.state.checkedRoomList)})
        // }else{ 
        //     var index = this.state.checkedRoomList.indexOf(item);
        //     var temp = this.state.checkedRoomList.slice(0);
        //     temp.splice(index,1);                       
        //     this.setState({checkedRoomList : temp},  function(){console.log(this.state.checkedRoomList)})
        // }
                
    
        }}/>}
        />


         <TouchableOpacity style={{padding:15, justifyContent:'center', alignItems:'center',  }}
                           onPress={()=>this.props.applyRoomInfoToOthers( this.props.savedData)}>
                    <Text style={{color:'#3b4db7'}}>확인</Text>
        </TouchableOpacity> 

    </KeyboardAwareScrollView>
    </View>
      )
  }

}

export default RoomListPopup;

const styles = StyleSheet.create({
    container: {
      
      // justifyContent: 'center',
      // alignItems: 'center',
      padding:20,
      backgroundColor: '#fff',
      // paddingBottom:50
    },
  
  });
// AppRegistry.registerComponent('popupList', () => popupList);