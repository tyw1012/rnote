import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput, ScrollView, StyleSheet, Keyboard,FlatList, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButtons } from 'react-native-radio-buttons';
import { CheckBox } from 'react-native-elements'

var options = [];
var previous;
class RoomDetailPopup extends Component{

    constructor(props){
        super(props);
        this.state={

            slideIn: new Animated.ValueXY({x:0,y:220}),
            slideOut: new Animated.ValueXY({x:0, y:0}),

            wr_room_type:'',
            wr_rent_deposit:'',
            wr_m_rate:'',
            wr_area_p:'',
            wr_area_m:'',
            wr_mt_separate:false,
            wr_mt_cost: '',
            
            options :[

                {name:'TV', wr_o_tv: 0, checked: false},
                {name:'에어컨', wr_o_air_cond: 0, checked: false},
                {name:'냉장고', wr_o_fridger: 0, checked: false},
                {name:'세탁기', wr_o_washer: 0, checked: false},
                {name:'싱크대', wr_o_sink: 0, checked: false},
                {name:'인터넷', wr_o_internet: 0, checked: false},
                {name:'전자렌지', wr_o_microwave: 0, checked: false},
                {name:'책상', wr_o_desk: 0, checked: false},
                {name:'침대', wr_o_bed: 0, checked: false},
                {name:'옷장', wr_o_closet: 0, checked: false},
                {name:'신발장', wr_o_shoe_rack: 0, checked: false},
                {name:'책장', wr_o_bookshelf: 0, checked: false},

            ],
            mt_options: [
                {name:'전기', wr_mt_elec: 0, checked: false},
                {name:'수도', wr_mt_water: 0, checked: false},
                {name:'가스', wr_mt_gas: 0, checked: false},
                {name:'TV', wr_mt_tv: 0, checked: false},
                {name:'인터넷', wr_mt_internet: 0, checked: false},
      
              ]
            
        }
        this.default = {...this.state}
    }

slideIn() {

    this.state.slideIn.setValue({x:0,y:220})

    Animated.timing(
        this.state.slideIn,
        { 
            toValue:{x: 0, y: 0},
            duration: 400,
            delay: 0,
            easing: Easing.in(Easing.ease)

        }
    ).start()


}

slideOut() {
    
    this.state.slideOut.setValue({x:0,y:0})
    Animated.timing(
        this.state.slideOut,
        { 
            toValue:{x: 0, y: 220},
            duration: 400,
            delay: 0,
            easing: Easing.in(Easing.ease)

        }
    ).start()


}
componentWillReceiveProps(nextProps) {
    // goes to search state
    if (this.props.visible === true && nextProps.visible === false) {
        this.slideOut()
        console.log('slideOut')
    }
    // goes to default look
    if (this.props.visible === false && nextProps.visible === true ) {
        this.slideIn()
        console.log('slideIn')
    }
    
}

_checkBoxStyle(item){
    if(item==1){
        return {flex:1, height:25, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0, backgroundColor:'#bbb',borderWidth:0.7, paddingLeft:2, paddingRight:2}

    }
    else{
        return {flex:1, height:25, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0,backgroundColor:'#fff',borderWidth:0.7, paddingLeft:2, paddingRight:2}
    }

}
_checkBoxTextStyle(item){
    if(item==1){
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
    this.setState({wr_room_type: type}, function(){this.props.chooseRoomType(type, {roomNumber:this.props.item.roomNumber})});
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

  render() {
      const {item} = this.props
      const slideInStyle = this.state.slideIn.getTranslateTransform();
      const slideOutStyle = this.state.slideOut.getTranslateTransform();

      console.log('slide',slideInStyle)

     
      return(
    <Animated.View
     style={this.props.item.wr_id==undefined?{display:'none'}:this.props.visible? [{transform: [{translateX:slideInStyle[0].translateX}, {translateY: slideInStyle[1].translateY}]},
     {zIndex:10,height:220, backgroundColor:'#fff', position:'absolute', right:15, left:15, bottom:0,  elevation:10, borderRadius:7,}]
     : [{transform: [{translateX:slideOutStyle[0].translateX}, {translateY: slideOutStyle[1].translateY}]},
     {zIndex:10,height:220, backgroundColor:'#fff', position:'absolute', right:15, left:15, bottom:0,  elevation:10, borderRadius:7,}]}
    >


            <View style ={{backgroundColor:'#3b4db7', height:40, width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderTopLeftRadius:7, borderTopRightRadius:7}}>
                <Text style={{fontSize:14, color:'#fff', fontWeight:'bold', marginLeft:15,}}>{item.wr_room_number}호 상세 </Text>
                <TouchableOpacity
                style={{justifyContent:'center', padding:5, paddingLeft:15, alignItems:'center'}}
                onPress ={()=>{this.props.removePopup()}}
                >
                    <Icon
                    name='ios-arrow-down-outline'
                    size={25}
                    style={{color:'#fff', marginRight:15}}
                    />
                </TouchableOpacity>
            
            </View>
            <KeyboardAwareScrollView enableOnAndroid={true}
            keyboardShouldPersistTaps='always'
            innerRef={ref => {this.scroll = ref}}
            style={styles.container}>

                <View style={{flexDirection:'row', marginBottom:10, justifyContent:'space-between',}}>
                    <View style={{flexDirection:'row'}}>
                    
                    <Text style={[styles.itemDesc,{fontWeight:'bold'}]}>{item.wr_room_type==1?'원룸':item.wr_room_type==2?'투룸':item.wr_room_type ==4? '1.5룸':item.wr_room_type ==3? '쓰리룸':''}</Text>
                    <Text style={[styles.itemDesc,{fontWeight:'bold'}]}>{item.wr_rent_type==1?' 월세':item.wr_rent_type==2?' 전세':''}</Text>
                   
                    </View>
                    
                    <View style={{flexDirection:'row'}}>

                   
                    <Text style={[styles.itemDesc,{fontWeight:'bold', color:'#3b4db7',}]}>{item.wr_rent_deposit+ '/'+item.wr_m_rate }</Text>
                    <Text style={{fontSize:12, marginTop:0.75}}>만 </Text>
                    <Text style={[styles.itemDesc,{fontWeight:'bold'}]}> 관 </Text> 
                    <Text style={[styles.itemDesc,{fontWeight:'bold', color:'#3b4db7'}]}>{item.wr_mt_separate==1?' 월세포함' : item.wr_mt_cost}</Text>
                    <Text style={item.wr_mt_separate==1?{display:'none'}:{fontSize:12, marginTop:0.75}}>만 </Text>
                    <Text style={{fontSize:12, marginTop:0.75}}>/ {item.wr_area_p+ '평 ('+parseFloat(item.wr_area_m).toFixed(1) + '㎡)'}</Text>
                    </View>
                    {/* <CheckBox
                    checkedColor='#3b4db7'
                    // uncheckedIcon={null}
                    // checkedIcon={null}            
                    title={'공실'}
                    containerStyle={{backgroundColor:'#fff',borderWidth:0, height:35, marginTop:-12, paddingRight:0, marginRight:0, marginLeft:15,}}
                    textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
                    checked={item.wr_o_vacant==1?true:false}
                /> */}
                    
                </View>

                <View style={{marginBottom:10,}}>
                    <Text style={[styles.itemName, {marginBottom:7}]}>관리비 포함 항목</Text>

                    <FlatList data ={[{checked: item.wr_mt_elec, name:'전기'},{checked: item.wr_mt_water, name:'수도'},{checked: item.wr_mt_gas, name:'가스'},{checked: item.wr_mt_tv, name:'TV'},{checked: item.wr_mt_internet, name:'인터넷'} ]}
                    style={{margin: 0, padding:0,}}
                    extraData={this.props.item}
                    key={(this.props.columnChange)}
                    keyExtractor ={(x,i)=>i}
                    numColumns={5}
                    renderItem ={
                    ({item}) =><CheckBox
                    uncheckedIcon={null}
                    checkedIcon={null}        
                    title={item.name}
                    containerStyle={this._checkBoxStyle(item.checked)}
                    textStyle={this._checkBoxTextStyle(item.checked)}
                    checked={item.checked==1?true:false}
                    onPress={()=>{
                        console.log(item)

                    }}/>}
                    />
                </View>

                <View style={{marginBottom:10,}}>
                    <Text style={[styles.itemName, {marginBottom:7}]}>옵션</Text>
        
                    <FlatList data ={[
                        {checked: item.wr_o_tv, name:'TV'},
                        {checked: item.wr_o_air_cond, name:'에어컨'},
                        {checked: item.wr_o_fridger, name:'냉장고'},
                        {checked: item.wr_o_washer, name:'세탁기'},
                        {checked: item.wr_o_sink, name:'싱크대'},
                        {checked: item.wr_o_internet, name:'인터넷'},
                        {checked: item.wr_o_microwave, name:'전자렌지'},
                        {checked: item.wr_o_desk, name:'책상'},
                        {checked: item.wr_o_bed, name:'침대'},
                        {checked: item.wr_o_closet, name:'옷장'},
                        {checked: item.wr_o_shoe_rack, name:'신발장'},
                        {checked: item.wr_o_bookshelf, name:'책장'},

                    ]}
                    style={{marginBottom: 5, padding:0,}}
                    extraData={this.props.item}
                    key={(this.props.columnChange)}
                    keyExtractor ={(x,i)=>i}
                    numColumns={4}
                    renderItem ={
                    ({item}) =><CheckBox
                    uncheckedIcon={null}
                    checkedIcon={null}        
                    title={item.name}
                    containerStyle={this._checkBoxStyle(item.checked)}
                    textStyle={this._checkBoxTextStyle(item.checked)}
                    checked={item.checked==1?true:false}
                    onPress={()=>{
                        console.log(item)

                    }}/>}
                    />
                </View>
                <View style={{marginBottom:10,}}>
                    <Text style={[styles.itemName, {marginBottom:7}]}>{item.wr_memo == ''? '기타사항: 없음':'기타사항'}</Text>
                    <Text style={[styles.itemDesc,{fontWeight:'bold', marginBottom:15}]}>{item.wr_memo}</Text>
              
                </View>
                
            
            </KeyboardAwareScrollView>
    </Animated.View>
      )
  }

}

export default RoomDetailPopup;

const styles = StyleSheet.create({
    container: {
      
      // justifyContent: 'center',
      // alignItems: 'center',
      padding:15,
      paddingTop:10,
      backgroundColor: '#fff',
      // paddingBottom:50
    },
    itemName : {
        fontSize:12,
        marginBottom:5,
    },
    itemDesc :{

        fontSize:13,
    }

     });
// AppRegistry.registerComponent('popupList', () => popupList);