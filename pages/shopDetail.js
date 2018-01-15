import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,WebView } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';

class ShopDetail extends Component{

    constructor(props){
        super(props);

    }

    _sum(a,b){
        return parseInt(a)+parseInt(b)
      }
    _renderSaleTypeOne(){
        const {item} = this.props
        return(
            <View style={styles.content}>
            <View style={styles.sec1}>
                 <Text style={styles.title}>{item.wr_subject}</Text>
                 <Text style={styles.address}>{item.wr_address}/{item.wr_sale_area}</Text>
                 <Text style={styles.floor}>{item.wr_floor}층/{item.wr_area_p}평</Text>
                 <View style={styles.pricesContainer}>
                         <View style={styles.price}>
                             <Text>보증금</Text>
                             <Text style={{fontSize:19, color:'#2b3bb5'}}>{item.wr_rent_deposit}</Text>
                         </View>
                         <View style={[styles.price,{borderRightWidth:1, borderLeftWidth:1,borderColor:'#d1d1d1'}]}>
                             <Text>월세</Text>
                             <Text style={{fontSize:19, color:'#2b3bb5'}}>{item.wr_m_rate}</Text>

                         </View>
                         <View style={styles.price}>
                             <Text>권리금</Text>
                             <Text style={{fontSize:19, color:'#2b3bb5'}}>{item.wr_premium_o}</Text>

                         </View>
                                                     
                 </View>
            </View>
            <Text style={{fontSize: 16, fontWeight:'bold', padding:20, paddingBottom:10, backgroundColor:'#fff'}}>기타매물정보</Text>
            <View style={item.mode=='edit'?styles.sec2:[styles.sec2,{marginBottom:60,}]}>

                 <View style={styles.row}>
                     <Text style={styles.columnName}>관리번호</Text>
                     <Text style={styles.columnInfo}>{item.wr_code}</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>추천업종</Text>
                     <Text style={styles.columnInfo}>{item.wr_rec_sectors}</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>임차인연락처</Text>
                     <Text style={[styles.columnInfo,{flex:5.5}]}>{item.level=='emp'&&item.wr_writer_id!=item.memberID?'-':item.wr_renter_contact}</Text>
                     <TouchableOpacity
                       style={{flex:1, alignItems:'flex-end',}}
                       onPress={()=>{
                         const args = {
                         number: item.wr_renter_contact.toString(), // String value with the number to call
                             prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                         }
                         item.level=='emp'?null:call(args).catch(console.error)
                         
                     }}>
                         <Icon 
                         name="ios-call"
                         size={20}
                         style={item.level=='emp'?{display:'none'}:{ color: '#1e6820'}}
                         /> 
                     </TouchableOpacity>
                 </View>
                
                 <View style={styles.row}>
                     <Text style={styles.columnName}>합예산</Text>
                     <Text style={styles.columnInfo}>{this._sum(item.wr_rent_deposit,item.wr_premium_o)}만</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>관리비</Text>
                     <Text style={styles.columnInfo}>{item.wr_mt_cost}</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>기타지출</Text>
                     <Text style={styles.columnInfo}>{item.wr_extra_exp}</Text>
                 </View>
                 <View style={[styles.row,{borderBottomWidth:0,}]}>
                     <Text style={styles.columnName}>메모</Text>
                     <Text style={styles.columnInfo}>{item.wr_memo}</Text>
                 </View>

            </View>
         </View>
        )
    }

    _renderSaleTypeTwo(){
        const {item} = this.props
        
        return(
            <View style={styles.content}>
            
            <View style={styles.sec1}>
                 <Text style={styles.title}>{item.wr_subject}</Text>
                 <Text style={styles.address}>{item.wr_address}</Text>
                 <Text style={styles.floor}>지목 {item.wr_rand_type}/ 건물층수 {item.wr_floor}층 / 연면적 {item.wr_gross_area}평</Text>
                 <View style={styles.pricesContainer}>
                         <View style={styles.price}>
                             <Text>매도가</Text>
                             <Text style={{fontSize:19, color:'#2b3bb5'}}>{item.wr_sale_price}</Text>
                         </View>
                         <View style={[styles.price,{borderRightWidth:1, borderLeftWidth:1,borderColor:'#d1d1d1'}]}>
                             <Text>대지면적</Text>
                             <Text style={{fontSize:19, color:'#2b3bb5'}}>{item.wr_area_p_all}평</Text>

                         </View>
                         <View style={styles.price}>
                             <Text>실인수가</Text>
                             <Text style={{fontSize:19, color:'#2b3bb5'}}>{item.wr_silinsu}</Text>

                         </View>
                                                     
                 </View>
            </View>
            <Text style={{fontSize: 16, fontWeight:'bold', padding:20, paddingBottom:10, backgroundColor:'#fff'}}>기타매물정보</Text>
            <View style={item.mode=='edit'?styles.sec2:[styles.sec2,{marginBottom:60,}]}>

                 <View style={styles.row}>
                     <Text style={styles.columnName}>관리번호</Text>
                     <Text style={styles.columnInfo}>{item.wr_code}</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>지역지구</Text>
                     <Text style={styles.columnInfo}>{item.wr_zoning_district}</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>매도인연락처</Text>
                     <Text style={[styles.columnInfo,{flex:5.5}]}>{item.level=='emp'&&item.wr_writer_id!=item.memberID?'-':item.wr_seller_contact}</Text>
                     <TouchableOpacity
                       style={{flex:1, alignItems:'flex-end',}}
                       onPress={()=>{
                         const args = {
                         number: item.wr_renter_contact.toString(), // String value with the number to call
                             prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                         }
                         item.level=='emp'?null:call(args).catch(console.error)
                         
                     }}>
                         <Icon 
                         name="ios-call"
                         size={20}
                         style={item.level=='emp'?{display:'none'}:{ color: '#1e6820'}}
                         /> 
                     </TouchableOpacity>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>담당자연락처</Text>
                     <Text style={[styles.columnInfo,{flex:5.5}]}>{item.wr_hp} / {item.wr_writer}</Text>
                     <TouchableOpacity
                       style={{flex:1, alignItems:'flex-end',}}
                       onPress={()=>{
                         const args = {
                         number: item.wr_hp.toString(), // String value with the number to call
                             prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                         }
                         call(args).catch(console.error)
                         
                     }}>
                         <Icon 
                         name="ios-call"
                         size={20}
                         style={{ color: '#1e6820'}}
                         /> 
                     </TouchableOpacity>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>대출금</Text>
                     <Text style={styles.columnInfo}>{item.wr_loan}만 (금리 {item.wr_int_rate} %)</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>보증금/임대료</Text>
                     <Text style={styles.columnInfo}>{item.wr_sale_deposit}만 / {item.wr_total_rfee}만</Text>
                 </View>
                 <View style={styles.row}>
                     <Text style={styles.columnName}>연간순수익</Text>
                     <Text style={styles.columnInfo}>{item.wr_year_income}만 (수익률: {item.wr_profit_rate} %)</Text>
                 </View>
                 <View style={[styles.row,{borderBottomWidth:0,}]}>
                     <Text style={styles.columnName}>메모</Text>
                     <Text style={styles.columnInfo}>{item.wr_memo}</Text>
                 </View>

            </View>
         </View>
        )
    }
	render(){
        const {item} = this.props
                
            return(
                    <View>

                    {item.wr_sale_type=='1'?this._renderSaleTypeOne()
                    :this._renderSaleTypeTwo()}

                    </View>     

                  );
   }
       
	
}
const styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor: '#eee'	,	
        
	},
    map:{  
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapView:{
        position: 'relative',
        width:'100%',
        height:280,
    },
    content:{
        flex:1,       
        
        
    },
    sec1:{
        flex:1,
        alignItems: 'center',
        paddingTop:15,
        marginBottom:12,
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderColor:'#d6d6d6'

    },
    sec2:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#fff',
        padding: 15,
        
       
    },
    row:{
        flex:1,
        flexDirection:'row',
        borderBottomWidth: 1,
        borderColor: '#d1d1d1',
        padding:10,

    },
    columnName:{
        flex:3.5,
        fontWeight:'bold'
    },
    columnInfo:{
        flex:6.5,
        
    },
    title:{
        fontSize: 20,
        fontWeight:'bold'
    },
    pricesContainer:{
        flex:1,
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        
    },
    price:{
        flex:1,
        alignItems: 'center',
    },

});

export default ShopDetail;
