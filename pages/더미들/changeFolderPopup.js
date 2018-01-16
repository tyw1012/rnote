import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class ChangeFolderPopup extends Component{

    constructor(props){
        super(props);
        this.state={
            newName:'',
        }
    }
  render() {
      return(
        <View style={{width:'100%', padding: 15}}>
                <Text>새로운 이름을 입력해주세요.</Text> 
                <TextInput
                style={{borderBottomWidth:1, borderColor:'#e1e1e1',paddingBottom:5}}
                onChangeText={input=>this.props.inputHandler(input)}
                defaultValue = {this.props.originalName}
                selectTextOnFocus                
                />
                  
            <View style={{flexDirection:'row', marginTop:20, justifyContent:'flex-end'}}>
                <TouchableOpacity style={{padding:10, justifyContent:'center', alignItems:'center', width:50}}
                onPress={this.props.submitHandler}>
                    <Text>확인</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={{padding:10, justifyContent:'center', alignItems:'center', width:50,}}
                onPress={this.props.cancelHandler}>
                    <Text>취소</Text>
                </TouchableOpacity>   
            </View>          
        </View>

      )
  }

}

export default ChangeFolderPopup;
// AppRegistry.registerComponent('popupList', () => popupList);