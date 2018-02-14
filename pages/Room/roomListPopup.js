import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput, ScrollView, StyleSheet, Keyboard, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButtons } from 'react-native-radio-buttons';
import { CheckBox } from 'react-native-elements'
import Writeoffer_second from './writeoffer_second';

var options = [];
class RoomListPopup extends Component{

    constructor(props){
        super(props);
        this.state={
            checkedRoomList:[],
            forceRender:false,
            allSelected:false,
            
        }
    }


componentDidMount(){
 
}

_checkBoxStyle(item){
    if(item){
        return {flex:1, height:50, minWidth:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0, backgroundColor:'#3b4db7',borderWidth:0.7}

    }
    else{
        return {flex:1, height:50,  minWidth:50,justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0,backgroundColor:'#fff',borderWidth:0.7}
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

        <View style ={{flexDirection: 'row',backgroundColor:'#3b4db7', height:45, width:'100%', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={{color:'#fff', marginLeft: 15, fontSize:13,}}> 내용이 복사될 호실을 선택해주세요.</Text>
            <TouchableOpacity 
            onPress={()=>{this.props.cancelHandler() }}
            style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15, marginRight:10 }}>
                <Icon
                name="ios-close"
                size={45}
                style={{color:'#fff', marginTop:12, marginLeft: -3,}}
                />
           </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
        
            <TouchableOpacity style={{flex:1, margin:20, marginBottom:5,padding:10, justifyContent:'center', alignItems:'center', height:40, width:'90%', borderColor:'#3b4db7', borderWidth:1, }}
                            onPress={()=>{
                                
                                if(!this.state.allSelected){
                                    for(let i = 0; i < this.props.rooms.length ; i++){
                                        this.props.rooms[i].listChecked = true;
                                        
                                    }
                                }
                                else{
                                    for(let i = 0; i < this.props.rooms.length ; i++){
                                        this.props.rooms[i].listChecked = false;
                                        
                                    }
                                }
                                this.setState({allSelected:!this.state.allSelected})
                                    

                            }}>
                        <Text style={{color:'#3b4db7'}}>{this.state.allSelected?'전체해제':'전체선택'}</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={{flex:1, margin:20, marginBottom:5,padding:10, justifyContent:'center', alignItems:'center', height:40, width:'90%', borderColor:'#3b4db7', borderWidth:1, }}
                            onPress={()=>this.props.applyRoomInfoToOthers( this.props.savedData)}>
                        <Text style={{color:'#3b4db7'}}>복사하기</Text>
            </TouchableOpacity>
        </View>
    
    
    <KeyboardAwareScrollView enableOnAndroid={true}
    keyboardShouldPersistTaps='always'
    innerRef={ref => {this.scroll = ref}}
    style={styles.container}>

        
        <ScrollView
            contentContainerStyle={{ flexGrow: 1}}
            horizontal={true}
            showsVerticalScrollIndicator
            >

            <FlatList data ={this.props.rooms}
            style={{marginBottom: 70, padding:0,}}
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
            // console.log(item);  
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
        </ScrollView>


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