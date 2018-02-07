import React, { Component, PureComponent } from 'react';
import { TextInput,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity, StatusBar, AsyncStorage, BackHandler, } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class ListItem_bookmark extends Component{

constructor(props){
    super(props);
    this.state={
     
        mapVisible: this.props.mapVisible
    }
}

shouldComponentUpdate(nextProps, nextState) {
    
   if(this.props.item.wr_id === nextProps.item.wr_id && this.props.item.bm_from === nextProps.item.bm_from ){
    //   console.log(this.props.onCheckMode, nextProps.onCheckMode )
      return false   ;
    }
    // console.log(this.props.isChecked, nextProps.isChecked )
    return true
}
_sum(a,b){
    return parseInt(a)+parseInt(b)
}
number2Kor(num, type, delimChar) {
    (function() {
        var fnEach = String.prototype.each ;
        String.prototype.each = fnEach || function(callback) {
        var str = this;
        for( var i = 0 ; i < str.length ; i++) {
            callback(i, str.charAt(i));
        }
        };
    })();
    var baseNames =  ["천", "백", "십", ""];
    var levelNames = ["", "만", "억", "조",
                        "경", "해", "자", "양",
                        "구", "간", "정", "재",
                        "극", "항하사", "아승기", "나유타",
                        "불가사의", "무량대수"];
    type = type || "HALF";
    delimChar = delimChar || " ";
    
    var decimal = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
    
    var level = parseInt(num.length / baseNames.length);
    var start = 0;
    var end = num.length % baseNames.length; // 0, 1, 2, 3
    /* start validation */
    if ( num.length > 69 ) {
        throw "too long number : " + num ;
    }
    if ( isNaN(num) ) {
        throw "not a number form : " + num ;
    }
    if ( ! isFinite(num) ) {
        throw "not finite : " + num ;
    }
    /* end validation */
    
    if ( end == 0) { // in case the length of num is => 0, 4, 8, 12, ...
        end = Math.min(num.length, baseNames.length) ;
        level --;
    } else {
        for( var k = 0 ; k < baseNames.length-end; k++) {
        num = "0" + num;
        }
        end = baseNames.length;
    }
    
    var toKorString = "";
    var fns = {
        "LOW" : function (i, ch) {
            if ( ch !== "0"){
            unitStr += ch;
            } else if ( ch === "0" && unitStr.length > 0 ) {
            unitStr += ch;
            }
        },
        "HALF" : function(i, ch) {
            if ( ch != "0" ) {
            unitStr += ch + baseNames[i];
            }
        },
        "HIGH" : function (i, ch) {
            if ( ch != "0") {
            unitStr += decimal [ parseInt(ch)] + baseNames[i];
            }
        }
        };
    
    while ( start < num.length ) {
        var partial = num.substring(start, end);
        var unitStr = "";
    
        partial.each ( fns[type] );
    
        if ( unitStr.length > 0 ) {
        toKorString += unitStr + levelNames[level] + delimChar ;
        }
        level --;
        start = end;
        end += baseNames.length;
    }
    
    return toKorString;
}


_renderDescription(item){
    if(item.wr_sale_type==1){
      return (
      <View>
      <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <Text style={{fontSize: 12, color:'#555', marginTop:2,}}>
        {item.wr_floor}층·{item.wr_area_p}평
        </Text>
         <View style={{flexDirection:'row',}}>
            <Text style={{fontSize: 14, fontWeight:'bold', color:'#2b3bb5', textAlign:'right',}}> {item.wr_rent_deposit}/{item.wr_m_rate}</Text>
            <Text style={{fontSize:11, fontWeight:'100', color:'#444', marginTop:2, marginLeft:1,}}>만</Text>
        </View>
      </View>
      <Text style={{fontSize: 13, fontWeight: 'bold',textAlign:'right',}}> 권 {item.wr_premium_o} 합 {this._sum(item.wr_premium_o,item.wr_rent_deposit)}</Text>  
      {/* <Text style={{fontSize: 13, textAlign:'right',}}> {item.wr_code}</Text>  */}
      </View>
      )
    }
    else if(item.wr_sale_type==2){
      return (
        <View>
          <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <Text style={{fontSize: 13, color:'#555', textAlign:'right'}}>
            {item.wr_area_p_all}평 
            </Text>
            <Text style={{fontSize: 13, textAlign:'right', fontWeight:'bold', color:'#2b3bb5'}}> {this.number2Kor(`${item.wr_sale_price.toString()}0000`, "LOW").trim()}</Text>
          </View>
          <Text style={{fontSize: 13, textAlign:'right', fontWeight:'bold'}}>
          {item.wr_p_sale_price} 만/평
          </Text>
        </View>
      )
    }
    
  }
  _renderSaleType(item){
    if(item.wr_sale_type==1){
      return (
        <Text style={{fontSize:11, marginLeft:3}}>임대</Text>
      )
    }
    else if(item.wr_sale_type==2){
      return (
        <Text style={{fontSize:11, marginLeft:3}}>매매</Text>
      )
    }
    
  }
  _renderIcon(item){
    if(item.bm_from==1){
      return(
        <Icon
        name='book'
        size={25}
        style={{color:'#d0d4db', marginRight:15}}
        />
            )
    }
   else{
     return(
      <Icon
      name='archive'
      size={25}
      style={{color:'#d0d4db', marginRight:15}}
      />
     )
   }
  }

render() {
  const {item} = this.props
//   console.log('list lendering');
  return(

    <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
    padding: 12, marginBottom: 4, backgroundColor:'#fff', justifyContent:'space-between' }}
       onPress={()=>{ 
         if(this.props.mapVisible){
           this.props.panToSelection(item)
         }
         else{
           
            if(item.bm_from==1){
             this.props.navigation.navigate('Detail',
             {...item, memberID: this.props.memberID, memberName: this.props.memberName, contact: this.props.contact, segment:this.props.selectedSegment,mode:'edit'})
            }
            else{
             this.props.navigation.navigate('Detail',
             {...item, memberID: this.props.memberID, memberName: this.props.memberName, contact: this.props.contact, segment:this.props.selectedSegment})
            }
          
         }
         
        }
       }
             
         >
       <View style={{flexDirection:'row'}}>
         <View>  
         {this._renderIcon(item)}    
         {this._renderSaleType(item)}
         </View>
         <View>      
         <Text style={{fontWeight:'bold'}}>{item.wr_subject}</Text>
         <Text style={{fontSize:12}}>{item.wr_address}</Text>
         </View>
       </View>

       <View>
         {this._renderDescription(item)}
       </View>

     </TouchableOpacity>
  )

}

}

