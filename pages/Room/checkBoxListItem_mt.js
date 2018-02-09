import React, { Component, PureComponent } from 'react';
import { TextInput,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity, StatusBar, AsyncStorage, BackHandler, } from 'react-native';
import { CheckBox } from 'react-native-elements';
export default class CheckBoxListItem_mt extends Component{

constructor(props){
    super(props);
    this.state={
      
    }
}

_checkBoxStyle(item){
    if(item){
        return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0, backgroundColor:'#3b4db7',borderWidth:0.7, paddingLeft:2, paddingRight:2}

    }
    else{
        return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0,backgroundColor:'#fff',borderWidth:0.7, paddingLeft:2, paddingRight:2}
    }

}
_checkBoxTextStyle(item){
    if(item){
        return {fontSize:11, color:'white'}

    }
    else{
        return {fontSize:11, color:'#888'}
    }

}

_findMtOptionIndex(optionItem){
    for (var i = 0; i < this.props.mt_options.length; i++){
      if(optionItem.name==this.props.mt_options[i].name){
  
        return i
  
      }
    }
 }

shouldComponentUpdate(nextProps, nextState) {
    
   if(this.props.item.checked === nextProps.item.checked){
      return false   ;
    }
    return true
}

render(){
    const {item} = this.props

    return(

        <CheckBox
        uncheckedIcon={null}
        checkedIcon={null}
        
        title={item.name}
        containerStyle={this._checkBoxStyle(item.checked)}
        textStyle={this._checkBoxTextStyle(item.checked)}
        checked={item.checked}
        onPress={()=>{

        // let optionClone = {...item};
        // optionClone.checked = !optionClone.checked;
        // optionClone[Object.keys(optionClone)[1]] == 1?
        // optionClone[Object.keys(optionClone)[1]] = 0 : optionClone[Object.keys(optionClone)[1]] = 1

        let optionIndex = this._findMtOptionIndex(item)
        // console.log(optionIndex)
        this.props.checkboxHandler(item, optionIndex, 'mt_options');
     
        // let clone = this.props.mt_options.slice(0);
        // clone[optionIndex] = optionClone
        // this.setState({mt_options: clone}, function(){
        // })
            
        
    
        }}/>

    )
    

}


}
