import React, { Component } from 'react';
import { TextInput,AppRegistry,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,FlatList, Image, StatusBar, AsyncStorage, BackHandler, Alert } from 'react-native';
import { Button, Header } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swipeout from 'react-native-swipeout';
import PopupDialog from 'react-native-popup-dialog';
import call from 'react-native-phone-call';
import Icon from 'react-native-vector-icons/Entypo';
import MapView from 'react-native-maps';
import SegmentList from '../commonComponents/segmentList';

import PopupList from '../commonComponents/popupList';
import FilterModal from './filterModal';
import getBookmark from './getBookmark';
import ListItem_bookmark from './listItem_bookmark';

const options = ['임대', '매매', '거래완료'];
var swipeSettings;
var previous;
var self;

export default class bookmarkList extends Component{
static navigationOptions= ({navigation}) =>({
      // header: null,
     
       title: `${navigation.state.params.bmf_name}`,
       headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
       headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
       },
      headerTintColor: 'white',    
      headerRight:  <TouchableOpacity
      style={{marginRight: 20}}
      onPress={()=>{
      //  self.props.navigation.navigate('BookmarkMap', self.state)
      self.setState({mapVisible:!self.state.mapVisible})
     }}>
             <Icon
             name="location"
             size={23}
             style={{color:'#fff', }}
             />
     </TouchableOpacity>,    
      swipeEnabled:false,
  });
  

  constructor(props){
    super(props);
    this.isHome = true;
    this.state ={
      selectedOfferingType:'상가',
      memberID: '',
      memberName:'',
      email:'',
      contact:'',
      level:'',
      minWrite: '',
      isLoaded: false,
      myoffering: [],
      myoffering_all:[],
      myoffering_num:30,
      modalVisible: false,
      selectedSegment: '임대',
      selectedSegment_before:'',
      selectedIndex:0,
      isFiltered:false,
      filterText:'통합검색',     
      myoffering_from: 0, 
      countPerLoad: 25,
      offering_count:'',
      offering_count_fltr:'',
      isAdding: false,
      isRefreshing: false,
      isSegmentChanging:false,
      longPressed:null,
      onCheckMode: false,
      onWriteOfferMode: false,
      arrayStart: 0,
      arrayEnd: 24,
      filteredData:[],
      mapVisible:false,
    
      
    };
    //스태틱 함수용
    self=this;
    this.marker=[];
    
  }
  componentWillMount(){
    
    const {params} = this.props.navigation.state;
    this.setState(params, function(){

      this.setState({
        filteredData: this.state.data.filter(function(d,i){return self.state.arrayStart<=i && i<=self.state.arrayEnd}),
        filteredData_all : this.state.data.filter(function(d,i){return self.state.arrayStart<=i && i<=self.state.arrayEnd}) 
      
      }, function(){
         this.state.filteredData[0] == undefined?
          this.setState({mapCoordX: 126.8739597, mapCoordY: 37.5643456, }):
          this.setState({mapCoordX: this.state.filteredData[0].wr_posx, mapCoordY: this.state.filteredData[0].wr_posy})
      })
      
    })

  }
  
  _renderIndicator(){
    return (
      
       <View style={{width:'100%',alignItems: 'center'}}>
              
       <ActivityIndicator size='large' style ={{position: 'absolute', top: 200, zIndex:10,}}/>

       </View>
   )

  }
  setSelectedOption_filter(selectedSegment){

      this.setState(previousState => {
                  previous = previousState.selectedSegment;
                        
                  return {
                    selectedSegment: selectedSegment,
                    selectedSegment_before: previous

                  };
                }, function(){console.log('before',this.state.selectedSegment_before)})
    // this.setState({selectedSegment: selectedSegment,});
  }
  setSelectedOption(selectedSegment){

    
    this.setState(previousState => {
      previous = previousState.selectedSegment;
            
      return {
        selectedSegment: selectedSegment,
        selectedSegment_before: previous     
        
      };
    }, function(){
        if(previous != this.state.selectedSegment){

          // console.log('working');
          this.setState({isFiltered:false, filterText: '통합검색', myoffering_from: 0, isSegmentChanging:true,});
          const {memberID, memberName, countPerLoad, myoffering_from, selectedSegment, level, selectedOfferingType} = this.state;
          
       
          fetch('http://real-note.co.kr/app3/getMyOfferingMerged.php',{
            method:'post',
            header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({
              memberID: memberID,
              // myoffering_num: myoffering_num,
              level: level,
              memberName: memberName,
              selectedSegment: selectedSegment,
              myoffering_from: myoffering_from,
              countPerLoad: countPerLoad,
              
            })
          })
          .then((res)=>{
            // var parsedRes = JSON.parse(res._bodyText);
            // this.setState({myoffering:parsedRes, myoffering_all:parsedRes,});
            // this.setState({isLoaded: true}, function(){console.log(this.state)});

            var parsedRes = JSON.parse(res._bodyText).data;
            var parsedRes_count = JSON.parse(res._bodyText).count.count;
            for(var i =0; i<=parsedRes.length-1; i++){
              parsedRes[i].isChecked = false;
            }
            this.setState({myoffering:parsedRes, myoffering_all:parsedRes, offering_count: parsedRes_count, isSegmentChanging:false,});
            
            
          })

        }
       
       this.segmentDialog.dismiss(); 
    });
  }

  componentDidMount(){

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

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  _renderClose(){

    return (
      <TouchableOpacity
      onPress = {()=>{this.setState({onCheckMode:!this.state.onCheckMode}) }}
      >
             
                  <Icon 
                  name="ios-close"
                  size={40}
                  style={{ marginTop:2,color: '#fff'}}
                       
                  />               
      </TouchableOpacity>
    )
    
  }
  _renderForward(){
    return (
      <TouchableOpacity
      onPress = {()=>{this.setState({onCheckMode:!this.state.onCheckMode}) }}
      >
             
                  <Icon 
                  name="ios-share-alt"
                  size={24}
                  style={{ marginTop:2,color: '#fff'}}
                       
                  />               
      </TouchableOpacity>
  )
  }
 _renderAdd(){
   return (
     <TouchableOpacity
     onPress={()=>{
      this.setState({onWriteOfferMode:!this.state.onWriteOfferMode,})
    }}>
                  {/* <Icon 
                  name="md-add"
                  size={26}
                  style={{ marginRight:5,color: '#fff'}}
                       
                  />   */}
    </TouchableOpacity>
   )
 }
 _renderFunnel(){
  return (
   
                 <Icon 
                 name="ios-funnel"
                 size={24}
                 style={{ marginTop:2,color: '#fff'}}
                      
                 />              
  
  )
 }
 _renderSearch(){
  return (   
            <Icon 
            name="ios-search"
            size={30}
            style={{ color: '#fff'}}
                
            />
  )
 }


  _sum(a,b){
    return parseInt(a)+parseInt(b)
  }
  _officeStyle(item){
    if(item==1){

      return {
        backgroundColor:'#3b4db7',
        marginLeft: 5, borderRadius:5, width:40, height: 20, justifyContent: 'center', alignItems: 'center'
      }

    }
    else{
      return{
        display:'none'
      }
    }
      

  }
  _touchStyle(item){

    if(this.state.onCheckMode){
            if(item==true){ 
               
              return {
                flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
                padding: 12, marginBottom: 4, backgroundColor:'#3b4cb766', justifyContent:'space-between'
              }
        
            }
            else{
        
              return {
                flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
                padding: 12, marginBottom: 4, backgroundColor:'#aaacae94', justifyContent:'space-between'
              }
            }
    }
    else{

      return {flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
       padding: 12, marginBottom: 4, backgroundColor:'#fff', justifyContent:'space-between'}

    }
  
  }
  _checkStyle(item){
    if(this.state.onCheckMode){
      if(item==true){
        return {color: '#fff', marginLeft: 35, marginTop: 15,}
      }
      else{
        return {color: '#92939594',marginLeft: 35, marginTop: 15,}
      }

    }
    else{
      return {display:'none'}
    }
    
  }
  _panToSelection(item){
    
      let newRegion = {
          latitude: parseFloat(item.wr_posy),
          longitude: parseFloat(item.wr_posx),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
      this.marker[item.wr_id].showCallout();
      this.mapView.animateToRegion(newRegion, 650)
     
   
  }
  _toggle(item){
   
    var offering = this.state.myoffering.slice(0);
    offering[this._findToggledIndex(item)].isChecked = !item.isChecked;    
    this.setState({myoffering: offering});

  }
  _findToggledIndex(item){
    var clone = this.state.myoffering.slice(0);
    for (var i = 0; i<clone.length; i++){
       if (clone[i].wr_id == item.wr_id && clone[i].wr_writer==item.wr_writer){
         return i
       }
    }

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
  _deleteBookmark(item){

    var temp = this.state.data.slice(0);
    temp.splice(this._findDeletedIndex(item),1); 

    fetch('http://real-note.co.kr/app3/deleteBookmark.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        memberID: this.state.memberID,
        bm_id: item.bm_id
      })
    })
    .then((res)=>{console.log('delcheck', res); return res.json()})
    .then((json) =>{

           
      alert('삭제되었습니다.')
      this.setState({data: temp});
      getBookmark.refreshFromOutside()
      
    })

  }

  _findDeletedIndex(item){
    var clone = this.state.data.slice(0);
    for (var i = 0; i<clone.length; i++){
       if (clone[i].bm_id == item.bm_id){
         return i
       }
    }

  }
  _renderRow({item}){

        swipeSettings = {
          autoClose: true,
          right:[
            {
              onPress: ()=>{
                const args = item.bm_from==1?{
                  number: item.wr_renter_contact.toString(), // String value with the number to call
                      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                  } : {
                  number: item.wr_hp.toString(), // String value with the number to call
                      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                  }
                  call(args).catch(console.error)
                
              },
              
              component: <View style={{flex:1,backgroundColor:'#3b4db7', marginBottom:4, justifyContent:'center', alignItems:'center',}}>
              <Text style={{color:'#fff', fontSize:12, textAlign:'center'}}>{item.bm_from==1?`임차인에게${"\n"}전화걸기`:`담당자에게${"\n"}전화걸기`}</Text>
              
              </View>,
              backgroundColor:'transparent'
            },
            {
              onPress: ()=>{
                  
                Alert.alert(
                  '알림',
                  `'${item.wr_subject}'를(을) 북마크에서 삭제 하시겠습니까?`,
                  [
                    
                    {text: '취소', onPress: () => {}, style: 'cancel'},
                    {text: '확인', onPress: () => {
                      this._deleteBookmark(item);
                    }},
                  ],
                  { cancelable: false }
                )

                  
              },

              component:<View style={{flex:1,backgroundColor:'#db343f', marginBottom:4, justifyContent:'center', alignItems:'center',}}>
              <Text style={{color:'#fff', fontSize:12, textAlign:'center'}}>북마크{"\n"}삭제</Text>
              
              </View>,
              backgroundColor:'transparent'
            }
          ]        
        }
      return(
        <Swipeout {...swipeSettings}
        backgroundColor='#f1f1f1'>
        
        {/* <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
       padding: 12, marginBottom: 4, backgroundColor:'#fff', justifyContent:'space-between' }}
          onPress={()=>{ 
            if(this.state.mapVisible){
              this._panToSelection(item)
            }
            else{
              
               if(item.bm_from==1){
                this.props.navigation.navigate('Detail',
                {...item, memberID: this.state.memberID, memberName: this.state.memberName, contact: this.state.contact, segment:this.state.selectedSegment,mode:'edit'})
               }
               else{
                this.props.navigation.navigate('Detail',
                {...item, memberID: this.state.memberID, memberName: this.state.memberName, contact: this.state.contact, segment:this.state.selectedSegment})
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

        </TouchableOpacity> */}
        <ListItem_bookmark
         item = {item}
         mapVisible={this.state.mapVisible}
         memberID = {this.state.memberID}
         memberName = {this.state.memberName}
         contact = {this.state.contact}
         selectedSegment = {this.state.selectedSegment}
         navigation = {this.props.navigation}
         panToSelection = {this._panToSelection.bind(this)}
         
        />
        
       
        </Swipeout>
      )
  }

  _onRefresh = () =>{
   

  }
  
  _renderFooter=()=>{
    if (!this.state.isAdding) return null;
    
        return (
          
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            
            <ActivityIndicator/>
          </View>
        );
  }


  _handleEnd = () =>{
    console.log('handleEnd')
    this.setState({arrayEnd: this.state.arrayEnd+25, 
                   filteredData: this.state.data.filter(function(d,i){return self.state.arrayStart<=i && i<=self.state.arrayEnd+25}),
                   filteredData_all : this.state.data.filter(function(d,i){return self.state.arrayStart<=i && i<=self.state.arrayEnd+25}) }
    
    )

  }
  _renderMapView(){
    if(this.state.mapVisible){
      return (
      <View style={{height:220}}>
        <MapView style ={styles.mapView}
        region={{
            latitude: parseFloat(this.state.mapCoordY),
            longitude: parseFloat(this.state.mapCoordX),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            
        }}
        ref = {c => this.mapView = c}
        >
  
        {this.state.filteredData.map(data => (
            <MapView.Marker
            key={data.wr_id}
            coordinate={{
                latitude: parseFloat(data.wr_posy),
                longitude: parseFloat(data.wr_posx)
            }}
            title={data.wr_subject}
            ref = {c => this.marker[data.wr_id]=c}
            // description={data.wr_subject}
            >
              
            </MapView.Marker>
        ))}
  
        {/* <MapView.Marker
            coordinate ={{
                latitude: parseFloat(this.state.wr_posy),
                longitude: parseFloat(this.state.wr_posx)
                
            }}
        /> */}
  
      </MapView> 
        </View>
      )
     
  
    
    }
    
  }
	render(){

    return(
      <View style={styles.container}>

          <View style={{padding:10,paddingLeft:15, paddingRight:15, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#fff', borderBottomWidth:1.5, borderColor:'#e1e1e1'}}>
                <View style={{flexDirection:'row', }}>
                <Text style={{ marginTop:3, fontSize: 12}}>총 </Text>
                <Text style={{color:'#3b4db7', fontWeight:'bold', marginTop:3, fontSize: 12}}>{this.state.data==undefined?0:this.state.data.length}</Text>
                <Text style={{ marginTop:3, fontSize: 12}}>개의 북마크 </Text>
                </View>

                <View>
                    <TextInput
                    style={{borderBottomWidth:1, width:150, height:30, padding:5, fontSize:13, marginTop:-5, borderColor:'#e1e1e1'}}
                    placeholder="매물명 검색"
                    onChangeText= {input => {
                        
                        filtered = this.state.data.filter(function(val){return val.wr_subject.includes(input.toUpperCase()) || val.wr_subject.includes(input.toLowerCase())});
                        filtered[0]==undefined?
                        this.setState({
                          filteredData:filtered,
                          isFiltered:true,
                          mapCoordX: 126.8739597,
                          mapCoordY: 37.5643456,  
                                              
                        }):
                        this.setState({
                            filteredData:filtered,
                            isFiltered:true,
                            mapCoordX: filtered[0].wr_posx,
                            mapCoordY: filtered[0].wr_posy,
                            
                        })
                        if (input==''){

                            this.setState({
                                filteredData:this.state.filteredData_all,
                                isFiltered:false,
                            })

                        }
                    }}
                    />
                    <Icon
                     name="magnifying-glass"
                     size={18}
                     style={{color:'#aaa', position:'absolute', right:3, top:0,}}
                    />
                </View>
        </View>
    
        <View>
                      {this._renderMapView()}
        </View>
     
        
        <FlatList data ={this.state.filteredData}
                ref={(ref) => { this.flatListRef = ref; }}
                style={{ marginTop:0}}
                contentContainerStyle={{paddingTop:10,}}
                keyExtractor ={(x,i)=>i}
                extraData={this.state}
                onEndReached = {this.state.data.length>this.state.filteredData.length&&!this.state.isFiltered?this._handleEnd:null}
                onEndReachedThreshold ={0.9}
                refreshing = {this.state.isRefreshing}
                onRefresh ={this._onRefresh}
                renderItem = {({item}) => {return this._renderRow({item})}}
                ListFooterComponent = {this._renderFooter}/> 
      </View>
    )
 
  }
}


const styles = StyleSheet.create({
	container:{
    display:'flex',
    flex:1,
    backgroundColor:'#f1f1f1'
  },
  mapView:{
    position: 'relative',
    width:'100%',
    flex:1,
    height:220,
},
  buttonWrapper:{
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent:'space-between',
    paddingTop: 10, paddingBottom: 10,
    backgroundColor:'#f9f9f9',
    borderBottomWidth:1,
    borderColor:'#ddd',
    
   
  },
  modalContainer: {
  
    padding:20,
    backgroundColor: '#fbfbfb',
 
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
    marginTop: 18,
    
  },
  itemName:{
    // marginTop:5,
    marginBottom:5,
    fontSize: 12,
    fontWeight: '100',
    color: '#666',
    flex:2.75,    
    
    
  },
  itemInput:{
    flex:7.25,
    height:40,    
    fontSize: 13,
    borderColor:"#e6e6e6",
    backgroundColor: "#fff",
    // borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 10,
    // borderWidth:1
  },

  formInput:{
    borderWidth: 1, width: 110,borderColor:'#d1d1d1', marginBottom: 15,
  },
  formInput_str:{
    borderWidth:1, borderColor:'#d1d1d1', marginBottom:15,
  },
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
  },
  


});


AppRegistry.registerComponent('bookmarkList', () => bookmarkList);
