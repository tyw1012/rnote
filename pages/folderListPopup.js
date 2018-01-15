import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput, ScrollView} from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButtons } from 'react-native-radio-buttons';

var options = [];
class FolderListPopup extends Component{

    constructor(props){
        super(props);
        this.state={
            newName:'',
        }
    }



    renderOption(option, selected, onSelect, index){
        const style = selected ? { fontWeight: 'bold', fontSize:15, margin:12, color: 'white'} : {fontSize:15,margin:12,};
        const style2 = selected ? { backgroundColor: '#3b4db7', alignItems:'center', justifyContent:'center', height: 40} : {backgroundColor:'#f1f1f1',alignItems:'center', justifyContent:'center', height:40} ;
        return (
          <TouchableOpacity onPress={onSelect} key={index} style={style2} >
            <Text style={style}>{option}</Text>
          </TouchableOpacity>
        );
      }
    
      renderContainer(optionNodes){
        return <View style={{}}>{optionNodes}</View>;
      }




  render() {
      return(
        <View style={{width:'100%', padding: 20, paddingTop:15}}>
                <Text style={{ fontSize: 13 }}>북마크될 폴더를 선택해 주세요.</Text> 


                <ScrollView style ={{marginTop: 15, height: 250}}>    
                        <RadioButtons
                            options={ this.props.folderList }
                            onSelection={ this.props.selectHandler }
                            selectedOption={this.props.selectedFolder }
                            renderOption={ this.renderOption }
                            renderContainer={ this.renderContainer }
                        
                        />  
                </ScrollView>   
                

            <View style={{flexDirection:'row', marginTop:0, justifyContent:'flex-end'}}>
                <TouchableOpacity style={{padding:15, justifyContent:'center', alignItems:'center', width:65, }}
                onPress={this.props.submitHandler}>
                    <Text style={{color:'#3b4db7'}}>확인</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={{padding:15, justifyContent:'center', alignItems:'center', width:65, }}
                onPress={this.props.cancelHandler}>
                    <Text style={{color:'#3b4db7'}}>취소</Text>
                </TouchableOpacity>   
            </View>          
        </View>

      )
  }

}

export default FolderListPopup;
// AppRegistry.registerComponent('popupList', () => popupList);