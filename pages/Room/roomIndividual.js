import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput, ScrollView, StyleSheet, Keyboard,FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButtons } from 'react-native-radio-buttons';
import { CheckBox } from 'react-native-elements';
import CheckBoxListItem_mt from './checkBoxListItem_mt';
import CheckBoxListItem_opt from './checkBoxListItem_opt';
import PopupDialog from 'react-native-popup-dialog';
import RoomListPopup from './roomListPopup';
import Writeoffer_second from './writeoffer_second';


var options = [];
var previous;
var self;
class RoomIndividual extends Component{


    static navigationOptions= ({navigation}) =>{ 
    
        return (
            {
            // headerLeft: <TouchableOpacity 
            // onPress={()=>{self.props.navigation.goBack(null);  }}
            // style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15}}>
            //     <Icon
            //     name="close"
            //     size={30}
            //     style={{color:'#fff', marginLeft:-6.5}}
            //     />
            // </TouchableOpacity>,
            title: `${navigation.state.params.wr_room_number}호 상세`,
            headerTitleStyle: {color:'white',fontSize:16, fontWeight:'100'},
            headerStyle: {
            backgroundColor: '#3b4db7',
            elevation:0,
            height: 52,
            
            },
            headerTintColor: 'white',
            headerRight: <TouchableOpacity onPress = {()=>{

                self._saveRoomInfo();

                Alert.alert(
                    '호실 정보가 저장되었습니다',
                    '이 정보를 다른 호실에도 적용하시겠습니까?',
                    [
                        {text: '네', onPress: () => {
                        
                        self._showRoomList()

                        }},

                      {text: '아니오', onPress: () => {
                        self.props.navigation.goBack(null);   
                      } },
                     
                    ],
                    { cancelable: false }
                  )
                
            
            }}
            style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15}}>
                <Text style ={{color:'#fff', fontSize: 15, fontWeight:'bold', marginRight:15}}>저장</Text>
            </TouchableOpacity>
            }
            
        )
    
    };

    constructor(props){
        super(props);
        this.state={
            // listPopupVisible: false,

            // wr_room_type:'',
            // wr_rent_deposit:'',
            // wr_m_rate:'',
            // wr_area_p:'',
            // wr_area_m:'',
            // wr_mt_separate:false,
            // wr_mt_cost: '',
            
            // options :[

            
            //     {name:'TV', wr_o_tv: 0, checked: false},
            //     {name:'에어컨', wr_o_air_cond: 0, checked: false},
            //     {name:'냉장고', wr_o_fridger: 0, checked: false},
            //     {name:'세탁기', wr_o_washer: 0, checked: false},
            //     {name:'싱크대', wr_o_sink: 0, checked: false},
            //     {name:'인터넷', wr_o_internet: 0, checked: false},
            //     {name:'전자렌지', wr_o_microwave: 0, checked: false},
            //     {name:'책상', wr_o_desk: 0, checked: false},
            //     {name:'침대', wr_o_bed: 0, checked: false},
            //     {name:'옷장', wr_o_closet: 0, checked: false},
            //     {name:'신발장', wr_o_shoe_rack: 0, checked: false},
            //     {name:'책장', wr_o_bookshelf: 0, checked: false},

            // ],
            // mt_options: [
            //     {name:'전기', wr_mt_elec: 0, checked: false},
            //     {name:'수도', wr_mt_water: 0, checked: false},
            //     {name:'가스', wr_mt_gas: 0, checked: false},
            //     {name:'TV', wr_mt_tv: 0, checked: false},
            //     {name:'인터넷', wr_mt_internet: 0, checked: false},
      
            //   ]
            
        }
        // this.default = {...this.state}
        self = this;
    }

componentWillMount(){
    const {params} = this.props.navigation.state;
    
    this.setState(params, function(){
        // console.log('item', this.state)
        
    })
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
    this.setState({wr_room_type: type},
        //  function(){this.props.chooseRoomType(type, {wr_room_number:this.props.item.wr_room_number})}
        );
}
_chooseRentType(type){
    this.setState({wr_rent_type: type}, 
        // function(){this.props.chooseRentType(type, {wr_room_number:this.props.item.wr_room_number})}
    );
}
_findOptionIndex(optionItem){
    for (var i = 0; i < this.state.options.length; i++){
      if(optionItem.name==this.state.options[i].name){
  
        return i
  
      }
    }
 }
 _findMtOptionIndex(optionItem){
    for (var i = 0; i < this.state.mt_options.length; i++){
      if(optionItem.name==this.state.mt_options[i].name){
  
        return i
  
      }
    }
 }
 _convertToBool(string){
     if(string == '1'){
         return true
     }
     if(string == '0' || string == '' || string == undefined){
        return false
    }
 }

 _checkboxHandler(optionItem,optionIndex, optionType){
    // let optionClone = {...optionItem};
    // optionClone.checked = !optionClone.checked;
    // optionClone[Object.keys(optionClone)[1]] == 1?
    // optionClone[Object.keys(optionClone)[1]] = 0 : optionClone[Object.keys(optionClone)[1]] = 1
    
    // let temp = this.state.rooms.slice(0);
    // let roomClone = {...roomItem};
    // roomClone[optionType][optionIndex] = optionClone;
    // temp[this._findRoomIndex(roomClone)] = roomClone;
    // this.setState({rooms:temp, selectedRoom: roomClone }, function(){console.log(this.state.rooms)} );j
    let temp = JSON.parse(JSON.stringify(this.state[optionType]))
    
    let optionClone = {...optionItem}
    optionClone.checked = !optionClone.checked;
    optionClone[Object.keys(optionClone)[1]] == 1?
    optionClone[Object.keys(optionClone)[1]] = 0 : optionClone[Object.keys(optionClone)[1]] = 1
    temp[optionIndex] = optionClone;
    this.setState({[optionType]: temp})
  
  }

  _findRoomIndex(itemState){
    for (var i = 0; i < this.state.rooms.length; i++){
      if(itemState.wr_room_number==this.state.rooms[i].wr_room_number){
  
        return i
  
      }
    }
  }

  _showRoomList(){
    // let clone = {...itemState}

    let {rooms, ...itemState} = this.state;
    let clone = {...itemState};

    clone.listChecked = true;
    let temp = this.state.rooms.slice(0);
    for (let i = 0; i < temp.length; i++){
      temp[i].listChecked = false;
    }
    temp[this._findRoomIndex(clone)] = clone;
    this.setState({savedData: clone, rooms:temp},
      function(){
       
        this.roomListPopup.show();
        
      }
    )
   
  }

  _saveRoomInfo(){

    let {rooms, ...itemState} = this.state;
    let clone = {...itemState};

    Writeoffer_second.saveRoomInfo(clone)
    
  
  }
  _applyRoomInfoToOthers(savedData){

    Writeoffer_second.copyRoomInfo(savedData)

    // Alert.alert(
    //     '호실 정보가 복사되었습니다',
        
    //         {text: '확인', onPress: () => {
            
    //          this.roomListPopup.dismiss();
    //          this.props.navigation.goBack(null);

    //         }},
                  
        
    //     { cancelable: false }
    //   )

      Alert.alert(
        '',
        '호실 정보가 복사되었습니다',
        [
            {text: '확인', onPress: () => {
            
                this.roomListPopup.dismiss();
                this.props.navigation.goBack(null);
   
               }},

        //   {text: '아니오', onPress: () => {
        //     self.props.navigation.goBack(null);   
        //   } },
         
        ],
        { cancelable: false }
      )
    

  }

 
  render() {
      const {item} = this.props
      const {rooms, ...itemState} = this.state
    //   console.log('now I\'m being rendered')
      return(
    <View>

    <PopupDialog
    // haveOverlay = {false}
    // dismissOnTouchOutside={false}
    ref={(popupDialog) => { this.roomListPopup = popupDialog; }}            
    dialogStyle ={{elevation:2, width: '90%', position:'absolute', height:400, top: 30, }}
    // onDismissed ={()=>this.roomInfoPopup.show()}
    >
              <RoomListPopup
              rooms = {this.state.rooms}
              columnChange= {this.state.columnChange}
              bld_roomPerFloor = {parseInt(this.state.bld_roomPerFloor)}
              savedData = {this.state.savedData}
              applyRoomInfoToOthers = {this._applyRoomInfoToOthers.bind(this)}
              cancelHandler= {()=>this.roomListPopup.dismiss()}
              />

    </PopupDialog>

  
    <KeyboardAwareScrollView enableOnAndroid={true}
    keyboardShouldPersistTaps='always'
    innerRef={ref => {this.scroll = ref}}
    style={styles.container}>


        <View style={{flexDirection:'row', marginBottom:25, justifyContent:'space-between'}}>
            
            <View style={{flexDirection:'row',}}>
                <Text style={{fontWeight:'bold', fontSize:13,marginBottom:10, marginTop:5, marginRight: 25}}>매물형태 </Text>
                <RadioButtons
                    options={ ['월세','전세'] }
                    onSelection={ this._chooseRentType.bind(this) }
                    selectedOption={this.state.wr_rent_type}
                    renderOption={ this.renderOption }
                    renderContainer={ this.renderContainer }

                /> 
            </View> 
            <CheckBox
            checkedColor='#3b4db7'
            // uncheckedIcon={null}
            // checkedIcon={null}            
            title={'공실'}
            containerStyle={{backgroundColor:'#fff',borderWidth:0, height:35, marginTop:-7, paddingRight:0, marginRight:0,}}
            textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
            checked={this._convertToBool(this.state.wr_o_vacant)}
            onPress={()=>{
             this.setState({wr_o_vacant : !this.state.wr_o_vacant})
            //  this.state.wr_o_vacant = !this.state.wr_o_vacant;
        
            }}/>

         
            
        </View>
         

        <View style={{flexDirection:'row', marginBottom:25, justifyContent:'space-between'}}>
            
            <Text style={{fontWeight:'bold', fontSize:13,marginBottom:10, marginTop:5, marginRight: 25}}>방 구분 </Text>
            <RadioButtons
                options={ ['원룸','1.5룸','투룸','쓰리룸'] }
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
                selectTextOnFocus
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
                onChangeText= {wr_rent_deposit => {this.setState({wr_rent_deposit}) }}
                value={this.state.wr_rent_deposit}
                onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                }}
                />
                
                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-6, right:10}}>만</Text>

            </View>



            <View style={{flex:1}}>    

                    <Text style={{fontWeight:'bold',fontSize:13,}}>월세 </Text>

                
                    <TextInput
                    selectTextOnFocus
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
                    onChangeText= {wr_m_rate => {this.setState({wr_m_rate}) }}
                    value={this.state.wr_m_rate}
                    // value='hhhh'
                    onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />                      

                 

                  <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-6, right:10}}>만</Text>

            </View>


        </View>

        <View style={{flexDirection: 'row', marginBottom:10}}>

        <View style={{flex:1, marginRight:15,}}>    

            <Text style={{fontWeight:'bold', fontSize:13,}}>면적 </Text>

            <TextInput
            selectTextOnFocus
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
            onChangeText= {wr_area_p => {this.setState({wr_area_p: wr_area_p, wr_area_m: (wr_area_p*3.3058).toFixed(2)}, 
           
            )}}
            value={this.state.wr_area_p}
            onFocus={(event: Event) => {
                // `bind` the function if you're using ES6 classes
                this.scroll.props.scrollToPosition(0, 0)
            }}
            />
            
            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-6, right:10}}>평</Text>

        </View>



        <View style={{flex:1}}>    

                <Text style={{fontWeight:'bold',fontSize:13,}}> </Text>

            
                <TextInput
                selectTextOnFocus
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
                onChangeText= {wr_area_m => {this.setState({wr_area_m:wr_area_m, wr_area_p: (wr_area_m * 0.3025).toFixed(2)}, function(){
                  
                })}}
                value={this.state.wr_area_m}
                // value='hhhh'
                onFocus={(event: Event) => {
                // `bind` the function if you're using ES6 classes
                this.scroll.props.scrollToPosition(0, 0)
                }}
                />                      

            

            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-6, right:10}}>㎡</Text>

        </View>


        </View>

        <View style={{flexDirection:'row', marginBottom:25}}> 

            <CheckBox
            checkedColor='#3b4db7'
            // uncheckedIcon={null}
            // checkedIcon={null}            
            title={'관리비 별도'}
            containerStyle={{backgroundColor:'#fff',flex:1,borderWidth:0, height:35, marginTop:0, paddingLeft:0, marginLeft:0,}}
            textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
            checked={this.state.wr_mt_separate}
            onPress={()=>{
             this.setState({wr_mt_separate : !this.state.wr_mt_separate})
            // item.wr_mt_separate = !item.wr_mt_separate;
        
            }}/>
               

            <View style={this.state.wr_mt_separate?{flex:1,}:{display:'none'}}>    

            {/* <Text style={{fontWeight:'bold', fontSize:13,}}>관리비 </Text> */}

            <TextInput
            selectTextOnFocus
            style={{borderBottomWidth:1, borderColor:'#e1e1e1', height:35, padding:5}}
            placeholder="관리비"
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
            onChangeText= {wr_mt_cost => {this.setState({wr_mt_cost}) }}
            value={this.state.wr_mt_cost}
            onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            this.scroll.props.scrollToPosition(0, 0)
            }}
            />                      



            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-23, right:10}}>만</Text>

            </View>
        </View>


        <View style={{flex:1, marginBottom:20,}}> 
        <Text style={{fontWeight:'bold', fontSize:13, marginBottom:10,}}>관리비 포함 항목 </Text>

        <FlatList data ={this.state.mt_options}
        style={{margin: 0, padding:0,}}
        extraData={this.state}
        keyExtractor ={(x,i)=>i}
        numColumns={5}
        renderItem ={
        ({item}) =>

        <CheckBoxListItem_mt
        item = {item}
        mt_options = {this.state.mt_options}
        checkboxHandler = {this._checkboxHandler.bind(this)}
        />
        // <CheckBox
        // uncheckedIcon={null}
        // checkedIcon={null}
        
        // title={item.name}
        // containerStyle={this._checkBoxStyle(item.checked)}
        // textStyle={this._checkBoxTextStyle(item.checked)}
        // checked={item.checked}
        // onPress={()=>{

        // let optionClone = {...item};
        // optionClone.checked = !optionClone.checked;
        // optionClone[Object.keys(optionClone)[1]] == 1?
        // optionClone[Object.keys(optionClone)[1]] = 0 : optionClone[Object.keys(optionClone)[1]] = 1

        // let optionIndex = this._findMtOptionIndex(item)
        // // console.log(optionIndex)
        // this.props.checkboxHandler(item, optionIndex, this.props.item, 'mt_options');
     
        // let clone = this.state.mt_options.slice(0);
        // clone[optionIndex] = optionClone
        // this.setState({mt_options: clone}, function(){
        //     console.log(item, this.state.mt_options); 
        // })
            
        
    
        // }}/>
    }
        />
        </View>    


        <View style={{flex:1, marginBottom:10,}}> 
        <Text style={{fontWeight:'bold', fontSize:13, marginBottom:10,}}>옵션 </Text>

        <FlatList data ={this.state.options}
        style={{margin: 0, padding:0,}}
        extraData={this.state}
        keyExtractor ={(x,i)=>i}
        numColumns={4}
        renderItem ={
        ({item}) =>
        
        <CheckBoxListItem_opt
        item = {item}
        options = {this.state.options}
        checkboxHandler = {this._checkboxHandler.bind(this)}
        />
       
    }
        />

        </View>

        <View>

                <Text style={{fontWeight:'bold', fontSize:13, marginBottom:5,}}>기타사항 </Text>

                <TextInput
                placeholder=" 기타내용"
                placeholderTextColor='#aaa'
                multiline = {true}
                numberOfLines = {5}
                style={{borderWidth:1, borderColor:'#e1e1e1',height:75, padding:10,paddingLeft:5, textAlignVertical:'top'}}
                underlineColorAndroid="transparent"
                onChangeText= {wr_memo => this.setState({wr_memo})}
                value={this.state.wr_memo}
                onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                }}
                />


        </View>
      

        <View style={{flexDirection:'row', marginBottom:70, justifyContent:'flex-end'}}>
        </View>         
    </KeyboardAwareScrollView>
    </View>
      )
  }

}

export default RoomIndividual;

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