import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call'

class PopupListOffice extends Component{
  render() {
      return(
        <View style={{width:'100%',}}>
                {/* <TouchableOpacity
                 style={{flexDirection:'row', width:'100%', height: 80,  alignItems:'center', justifyContent:'center'}}
                  onPress={()=>{
                     const args = {
                        number: this.props.data.wr_renter_contact.toString(), // String value with the number to call
                        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                       }
                       if(this.props.data.wr_writer == this.props.currentName){
                        call(args).catch(console.error)
                        console.log('writer',this.props.data.wr_writer)
                       }
                      
                      }}
                 
                 >
                    <Icon 
                    name="phone"
                    size={22}
                    style={{marginRight:10,}}
                    
                    />
                    <Text style={{fontSize: 18, fontWeight:'bold',}}>{this.props.popupText1}</Text>
                </TouchableOpacity>   */}
                <TouchableOpacity
                 style={{flexDirection:'row', width:'100%', height: 80,  alignItems:'center', justifyContent:'center'}}
                  onPress={()=>{
                     const args = {
                        number: this.props.data.wr_hp.toString(), // String value with the number to call
                        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                       }
                      call(args).catch(console.error)
                      // console.log(this.props.data.wr_hp)
                      }}>
                    <Icon 
                    name="phone"
                    size={22}
                    style={{marginRight:10,}}
                    
                    />
                    <Text style={{fontSize: 18, fontWeight:'bold',}}>{this.props.popupText2}</Text>
                </TouchableOpacity>                  
        </View>

      )
  }

}

export default PopupListOffice;
// AppRegistry.registerComponent('popupList', () => popupList);