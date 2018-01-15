import React, {Component} from 'react';
import {View, TouchableOpacity, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButtons } from 'react-native-radio-buttons';


class SegmentList extends Component{
  
  renderOption(option, selected, onSelect, index){
    const style = selected ? { fontWeight: 'bold', fontSize:15, margin:12, color: 'white'} : {fontSize:15,margin:12,};
    const style2 = selected ? { backgroundColor: '#3b4db7', alignItems:'center', justifyContent:'center'} : {alignItems:'center', justifyContent:'center'} ;
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
        <View style={{width:'100%', height: 140, justifyContent:'center',}}>

                    <RadioButtons
                    options={this.props.options }
                    onSelection={ this.props.handler }
                    selectedOption={this.props.selectedSegment }
                    renderOption={ this.renderOption }
                    renderContainer={ this.renderContainer }
                   
                  />                 
        </View>

      )
  }

}

export default SegmentList;
// AppRegistry.registerComponent('popupList', () => popupList);