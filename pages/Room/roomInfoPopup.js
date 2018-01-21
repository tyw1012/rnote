import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput, ScrollView, StyleSheet, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButtons } from 'react-native-radio-buttons';

var options = [];
class RoomInfoPopup extends Component{

    constructor(props){
        super(props);
        this.state={
            wr_room_type:'원룸'
            
        }
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
    
  _chooseRoomType(type){
      this.setState({wr_room_type: type});
  }


  render() {
      const {item} = this.props
      return(
    <View>
    <View style ={{backgroundColor:'#3b4db7', height:40, width:'100%', justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:14, color:'#fff', fontWeight:'bold'}}>{item.roomNumber}호 상세 </Text>
    
    </View>
    <KeyboardAwareScrollView enableOnAndroid={true}
    keyboardShouldPersistTaps='always'
    innerRef={ref => {this.scroll = ref}}
    style={styles.container}>

        <View style={{flexDirection:'row', marginBottom:25, justifyContent:'space-between'}}>
            <Text style={{fontWeight:'bold', fontSize:13,marginBottom:10, marginTop:5}}>구분 </Text>
            <RadioButtons
                options={ ['원룸','투룸','쓰리룸'] }
                onSelection={ this._chooseRoomType.bind(this) }
                selectedOption={this.state.wr_room_type}
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }

            />  
        </View>

        <View style={{flexDirection: 'row', marginBottom:10}}>

            <View style={{flex:1, marginRight:15,}}>    

                <Text style={{fontWeight:'bold', fontSize:13,}}>보증금 </Text>

                <TextInput
                style={{borderBottomWidth:1, borderColor:'#e1e1e1', height:35,padding:5}}
                placeholder=""
                placeholderTextColor='#aaa'
                blurOnSubmit={false}
                onSubmitEditing={(event) => { 
                  this.refs.SecondInput.focus(); 
                }}
                returnKeyType = {"next"}
                // style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                keyboardType='phone-pad'
                underlineColorAndroid="transparent"
                onChangeText= {wr_rent_deposit => this.setState({wr_rent_deposit})}
                value={item==undefined?'':item.wr_rent_deposit}
                onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                }}
                />
                
                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:10}}>만</Text>

            </View>



            <View style={{flex:1}}>    

                    <Text style={{fontWeight:'bold',fontSize:13,}}>월세 </Text>

                
                    <TextInput
                    style={{borderBottomWidth:1, borderColor:'#e1e1e1', height:35, padding:5}}
                    placeholder=""
                    placeholderTextColor='#aaa'
                    // style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                    ref='SecondInput'
                    onSubmitEditing={(event) => { 
                      this.refs.ThirdInput.focus(); 
                    }}
                    blurOnSubmit={false}
                    returnKeyType = {"next"}                            
                    keyboardType='phone-pad'
                    underlineColorAndroid="transparent"
                    onChangeText= {wr_m_rate => this.setState({wr_m_rate})}
                    value={item==undefined?'':item.wr_rent_deposit}
                    onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />                      

                 

                  <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:10}}>만</Text>

            </View>


            </View>

            <View style={{flex:1, marginBottom:10,}}>    

            <Text style={{fontWeight:'bold', fontSize:13,}}>관리비 </Text>

            <TextInput
            style={{borderBottomWidth:1, borderColor:'#e1e1e1', height:35, padding:5}}
            placeholder=""
            placeholderTextColor='#aaa'
            // style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
            ref='SecondInput'
            onSubmitEditing={(event) => { 
            this.refs.ThirdInput.focus(); 
            }}
            blurOnSubmit={false}
            returnKeyType = {"next"}                            
            keyboardType='phone-pad'
            underlineColorAndroid="transparent"
            onChangeText= {wr_mt_cost => this.setState({wr_mt_cost})}
            value={item==undefined?'':item.wr_mt_cost}
            onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            this.scroll.props.scrollToPosition(0, 0)
            }}
            />                      



            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:10}}>만</Text>

            </View>

          

            <View style={{flexDirection:'row', marginTop:0, justifyContent:'flex-end'}}>
                    

                <TouchableOpacity style={{padding:15, justifyContent:'center', alignItems:'center',  }}
                onPress={()=>this.props.applyRoomInfoToOthers(this.state)}>
                    <Text style={{color:'#3b4db7'}}>해당 정보를 다른 호실에도 적용</Text>
                </TouchableOpacity>    
                {/* <TouchableOpacity style={{padding:15, justifyContent:'center', alignItems:'center',  }}
                onPress={()=>this.props.applyRoomInfoToOthers(this.state)}>
                    <Text style={{color:'#3b4db7'}}>모든 호실에 적용</Text>
                </TouchableOpacity>  */}
                <TouchableOpacity style={{padding:15, justifyContent:'center', alignItems:'center', width:65, }}
                onPress={()=>this.props.saveRoomInfo({...this.state, roomNumber: item.roomNumber})}>
                    <Text style={{color:'#3b4db7'}}>저장</Text>
                </TouchableOpacity>   
                {/* <TouchableOpacity style={{padding:15, justifyContent:'center', alignItems:'center', width:65, }}
                onPress={this.props.cancelHandler}>
                    <Text style={{color:'#3b4db7'}}>취소</Text>
                </TouchableOpacity>    */}
            </View>          
        </KeyboardAwareScrollView>
        </View>
      )
  }

}

export default RoomInfoPopup;

const styles = StyleSheet.create({
    container: {
      
      // justifyContent: 'center',
      // alignItems: 'center',
      padding:20,
      backgroundColor: '#fff',
      // paddingBottom:50
    },
    inputContainer:{
      flex:1,
      // alignItems:'center',
      justifyContent:'center',
      // height: 600,
      borderColor: '#e6e6e6',
      backgroundColor: '#f2f2f2',
      borderWidth: 1,
      padding:20,
      paddingBottom:25,
  
    },
    row:{    
      flex:1,
      // flexDirection:'row',
      marginTop: 23,
      
    },
    itemName:{
      // marginTop:5,
      marginBottom:5,
      fontSize: 13,
      fontWeight:'bold',
      color: '#666',
      flex:2.75,    
    
    },
    itemInput:{
      flex:7.25,
      height:35,    
      fontSize: 13,
      borderColor:"#e6e6e6",
      backgroundColor: "#fff",
      // borderRadius: 3,
      borderBottomWidth: 1,
      padding:5,
      paddingLeft: 0,
     
      // borderWidth:1
    },
    formLabel:{
      fontSize: 16,
    },
    formInput:{
      borderBottomWidth: 1,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
// AppRegistry.registerComponent('popupList', () => popupList);