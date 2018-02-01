import React, { Component, PureComponent } from 'react';
import { TextInput,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity, StatusBar, AsyncStorage, BackHandler, } from 'react-native';

export default class listItem extends Component{

constructor(props){
    super(props);
    this.state={
        // isChecked: this.props.item.isChecked, 
        // wr_subject: this.props.item.wr_subject, 
        onCheckMode: this.props.onCheckMode
    }
}

shouldComponentUpdate(nextProps, nextState) {
    
   if(this.props.onCheckMode === nextProps.onCheckMode && this.props.isChecked === nextProps.isChecked && this.props.item.wr_subject === nextProps.item.wr_subject){
    //   console.log(this.props.onCheckMode, nextProps.onCheckMode )
      return false   ;
    }
    // console.log(this.props.isChecked, nextProps.isChecked )
    return true
}
_sum(a,b){
    return parseInt(a)+parseInt(b)
}
_bldSaleTypeConverter(number){

    if(number==0){
        return '방 임대'
    }
    if(number==1){
        return '매매'
    }

}
_roomTypeConverter(number){
    if(number==1){
        return '원룸'
    }
    if(number==2){
        return '투룸'
    }
    if(number==3){
        return '쓰리룸'
    }
    if(number==4){
        return '1.5룸'
    }
    if(number==undefined || number == null){
        return ''
    }
}
_rentTypeConverter(number){
    if(number==1){
        return '월세'
    }
    if(number==2){
        return '전세'
    }
    if(number==undefined || number == null){
        return ''
    }
    
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
_touchStyle(item){
    
    if(this.props.onCheckMode){
            if(item==true){ 
                
                return {
                flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
                padding: 12, marginBottom: 4, backgroundColor:'#3b4cb766', justifyContent:'space-between'
                }
        
            }
            else{
        
                return {
                flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
                padding: 12, marginBottom: 4, backgroundColor:'#aaacae54', justifyContent:'space-between'
                }
            }
    }
    else{

        return {flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
        padding: 12, marginBottom: 4, backgroundColor:'#fff', justifyContent:'space-between'}

    }
        
}

render() {
  const {item} = this.props
//   console.log('list lendering');
  return(

    <TouchableOpacity 
    activeOpacity={1}
    style={this._touchStyle(item.isChecked)}
    onPress={()=>{ this.props.onCheckMode? this.props.toggleHandler(item) :
      this.props.selectedSegment == '건물'?
      this.props.navigation.navigate('Detail',
       {...item, memberID: this.props.memberID, memberName: this.props.memberName, contact: this.props.contact, segment:this.props.selectedSegment, mode:'edit'}
      ) :
      this.props.navigation.navigate('Detail',
       {...item.clone, memberID: this.props.memberID, memberName: this.props.memberName, contact: this.props.contact, segment:this.props.selectedSegment, mode:'edit'}
      );
    }}
    onLongPress={()=>{
        this.props.longPressHandler(item);     
      }}
    >
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold', }}>
          {this.props.selectedSegment=='건물'?item.bld_name: item.bld_name + ' ' + item.wr_room_number+'호'
            }
          </Text>
         
        </View>
        <Text style={{fontSize: 12.5, marginTop:1}}>
           {item.bld_address}
        </Text>
        <Text style={{fontSize: 12.5, marginTop:1}}>
        {this.props.selectedSegment=='건물'?this._bldSaleTypeConverter(item.bld_sale_type): this._roomTypeConverter(item.wr_room_type) +' '+ this._rentTypeConverter(item.wr_rent_type)
            }
        </Text>
      
      </View>
      
      <View>
        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
          {/* 건물 */}
          <Text style={this.props.selectedSegment=='건물'?{fontSize: 13, color:'#555', marginTop:2,}:{display:'none'}}>
            {item.bld_floor}층 건물
          </Text>
          {/* 방 */}
          <View style={this.props.selectedSegment=='공실'?{flexDirection:'row',}:{display:'none'}}>
            <Text style={{fontSize: 15, fontWeight:'bold', color:'#2b3bb5', textAlign:'right',}}> {item.wr_rent_deposit}/{item.wr_m_rate}</Text>
            <Text style={{fontSize:12, fontWeight:'100', color:'#444', marginTop:2, marginLeft:1,}}>만</Text>
          </View>
          {/* 방 */}
         
          {/* <Text style={this.props.selectedSegment=='매매'?{fontSize: 13, textAlign:'right', color:'#3b4db7', fontWeight:'bold'}:{display:'none'}}> {this.number2Kor(`${item.wr_sale_price.toString()}0000`, "LOW").trim()}</Text> */}
          {/* 임대 */}
          
        </View>
       
        <Text style={this.props.selectedSegment=='건물'?{fontSize: 13, textAlign:'right',}:{display:'none'}}> 호실 총 {item.rooms==undefined?0:item.rooms.length}개</Text>  
        <Text style={this.props.selectedSegment=='공실'?{fontSize: 13, textAlign:'right',}:{display:'none'}}> {item.wr_area_p+'평 ('+item.wr_area_m+'㎡)'}</Text>      
        
        <Text style={this.props.selectedSegment=='건물'?{fontSize: 13, textAlign:'right',}:{display:'none'}}>
        공실 총 {item.rooms==undefined?0:item.rooms.filter(function(el){return el.wr_o_vacant==1}).length}개
        </Text>
        <Text style={this.props.selectedSegment=='공실'?{fontSize: 13, textAlign:'right',}:{display:'none'}}>
         {item.wr_mt_separate==0?'관리비 월세에 포함':'관리비 별도'}
        </Text>
    
      </View>
    
    </TouchableOpacity>

  )

}

}

