import React, {Component} from 'react';
import {View, TouchableOpacity, AppRegistry, Text, TextInput, ScrollView, StyleSheet, Keyboard,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButtons } from 'react-native-radio-buttons';
import { CheckBox } from 'react-native-elements'

var options = [];
var previous;
class RoomDetailPopup extends Component{

    constructor(props){
        super(props);
        this.state={

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


_checkBoxStyle(item){
    if(item==1){
        return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0, backgroundColor:'#3b4db7',borderWidth:0.7, paddingLeft:2, paddingRight:2}

    }
    else{
        return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0,backgroundColor:'#fff',borderWidth:0.7, paddingLeft:2, paddingRight:2}
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
      return(
    <View>
    <View style ={{backgroundColor:'#3b4db7', height:40, width:'100%', justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:14, color:'#fff', fontWeight:'bold'}}>{item.wr_room_number}호 상세 </Text>
    
    </View>
    <KeyboardAwareScrollView enableOnAndroid={true}
    keyboardShouldPersistTaps='always'
    innerRef={ref => {this.scroll = ref}}
    style={styles.container}>

        <View style={{flexDirection:'row', marginBottom:10, justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.itemName}>구분: </Text>
            
            <Text style={styles.itemDesc}>{item.wr_room_type==1?'원룸':item.wr_room_type==2?'투룸':'쓰리룸'}</Text>

            </View>

            <CheckBox
            checkedColor='#3b4db7'
            // uncheckedIcon={null}
            // checkedIcon={null}            
            title={'공실'}
            containerStyle={{backgroundColor:'#fff',borderWidth:0, height:35, marginTop:-12, paddingRight:0, marginRight:0, marginLeft:15,}}
            textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
            checked={item.wr_o_vacant==1?true:false}
           />
            
        </View>

        <View style={{flexDirection: 'row', marginBottom:15, justifyContent: 'space-between'}}>


            <Text style={styles.itemName}>보증금 / 월세 </Text>
            <Text style={styles.itemDesc}><Text style={{fontWeight:'bold', color:'#3b4db7',}}>{item.wr_rent_deposit+ ' / '+item.wr_m_rate }</Text> 만</Text>
      

        </View>

        <View style={{flexDirection: 'row', marginBottom:15, justifyContent: 'space-between'}}>


            <Text style={styles.itemName}>면적 </Text>
            <Text style={styles.itemDesc}>{item.wr_area_p+ ' 평 ( '+item.wr_area_m + ' ㎡ )'}</Text>
      

        </View>

        <View style={{flexDirection: 'row', marginBottom:15, justifyContent: 'space-between'}}>


            <Text style={styles.itemName}>관리비 </Text>
            <Text style={styles.itemDesc}>{item.wr_mt_separate==1? item.wr_mt_cost +' 만': '월세에 포함'}</Text>
      

        </View>

        <View style={{marginBottom:15,}}>
            <Text style={[styles.itemName, {marginBottom:15}]}>관리비 포함 항목</Text>

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

        <View style={{marginBottom:15,}}>
            <Text style={[styles.itemName, {marginBottom:15}]}>옵션</Text>
   
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
            style={{marginBottom: 70, padding:0,}}
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
        
       
    </KeyboardAwareScrollView>
    </View>
      )
  }

}

export default RoomDetailPopup;

const styles = StyleSheet.create({
    container: {
      
      // justifyContent: 'center',
      // alignItems: 'center',
      padding:20,
      backgroundColor: '#fff',
      // paddingBottom:50
    },
    itemName : {
        fontSize:13,
        fontWeight:'bold',
        marginBottom:5,
    },
    itemDesc :{

        fontSize:13,
    }

     });
// AppRegistry.registerComponent('popupList', () => popupList);