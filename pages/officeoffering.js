import React, { Component } from 'react';
import { AppRegistry,TextInput,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,FlatList,Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Header, } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PopupDialog from 'react-native-popup-dialog';
import PopupListOffice from './popupList_office';
import SegmentList from './segmentList';
import FilterModalOffice from './filterModalOffice';
import Swipeout from 'react-native-swipeout';
import call from 'react-native-phone-call';
import FolderListPopup from './folderListPopup';
import getBookmark from './getBookmark';
import ListItem from './listItem';
import SubHeader from './SubHeader';

var folderList = [];
var swipeSettings;
const options = ['임대', '매매', '거래완료'];
var previous;
var self;

export default class officeoffering extends Component{
static navigationOptions= ({navigation}) =>({
        headerLeft:null,
        title:'오피스노트',
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
      headerTintColor: 'white',    
      headerRight:  <TouchableOpacity
      style={{marginRight: 15}}
      onPress={()=>{
      self.setState({onCheckMode:!self.state.onCheckMode,})
    }}>
                  <Icon 
                  name="md-star"
                  size={25}
                  style={{ marginRight:5,color: '#fff'}}
                        
                  />  
    </TouchableOpacity>
     
	});

  constructor(props){
    super(props);
    this.state ={
      memberID: '',
      memberName:'',
      email:'',
      level:'',
      boss:'',
      minWrite:'',
      isLoaded: false,
      myoffering: [],
      myoffering_all:[],
      myoffering_num:30,
      modalVisible: false,
      selectedSegment: '임대',
      selectedSegment_before:'',
      isFiltered:false,
      filterText:'통합검색',
      nameFilter:'',
      addrFilter:'',
      writerFilter:'',
      saleAreaFilter:'',
      floorMinFilter:'',
      floorMaxFilter:'',
      areaMinFilter:'',
      areaMaxFilter:'',
      depositMinFilter:'',
      depositMaxFilter:'',
      mrateMinFilter:'',
      mrateMaxFilter:'',
      premoMinFilter:'',
      premoMaxFilter:'',
      sumMinFilter:'',
      sumMaxFilter:'',
      myoffering_from: 0, 
      myoffering_from_fltr:0,
      countPerLoad: 25,
      offering_count:'',
      offering_count_fltr:'',
      isAdding: false,
      isRefreshing:false,
      isSegmentChanging:false,
      longPressed: {},
      checkedOffering:[],
      onCheckMode:false
      
    };
    self=this;
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      // console.log(this.state);
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
              this.setState({isFiltered:false, filterText: '통합검색', myoffering_from: 0, isSegmentChanging:true});
              const {memberID, memberName, countPerLoad, myoffering_from, selectedSegment, level,boss, selectedOfferingType} = this.state;
              
                
              fetch('http://real-note.co.kr/app3/getOfficeOfferingMerged.php',{
                method:'post',
                header:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
                },
                body:JSON.stringify({
                  selectedOfferingType: selectedOfferingType,
                  memberID: memberID,
                  boss:boss,
                  level: level,
                  memberName: memberName,
                  selectedSegment: selectedSegment,
                  myoffering_from: myoffering_from,
                  countPerLoad: countPerLoad,
                  
                })
              })
              .then((res)=>{
                var parsedRes = JSON.parse(res._bodyText).data;
                var parsedRes_count = JSON.parse(res._bodyText).count.count;
                for(var i =0; i<=parsedRes.length-1; i++){
                  parsedRes[i].level = this.state.level;
              }
                this.setState({myoffering:parsedRes, myoffering_all:parsedRes, offering_count: parsedRes_count, isSegmentChanging:false,});
                
                
              })
    
            }
           
           this.segmentDialog.dismiss(); 
        });
      }

  componentDidMount(){

    const {memberID, memberName, countPerLoad, myoffering_from,level,boss, selectedSegment, selectedOfferingType} = this.state;
    
    fetch('http://real-note.co.kr/app3/getOfficeOfferingMerged.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        selectedOfferingType: selectedOfferingType,
        memberID: memberID,
        level: level,
        boss: boss,
        memberName: memberName,
        selectedSegment: selectedSegment,
        myoffering_from: myoffering_from,
        countPerLoad: countPerLoad,
        
      })
    })
    .then((res)=>{
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_count = JSON.parse(res._bodyText).count.count;

      for(var i =0; i<=parsedRes.length-1; i++){
          parsedRes[i].level = this.state.level;
      }
     
      this.setState({myoffering:parsedRes, myoffering_all:parsedRes, offering_count: parsedRes_count, isLoaded: true});
      
      
    })
    
  }

  
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // _renderHeader(){
    
  //   if(!this.state.onCheckMode){
  //     return(
        
  //         <View style={styles.buttonWrapper}>
  //                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
  //                  <Text style={{marginLeft:12, fontSize:12, }}>총 </Text>
  //                  <Text style={{fontWeight:'bold', color:'#3b4db7', fontSize:12}}>{this.state.isFiltered?this.state.offering_count_fltr:this.state.offering_count}</Text>            
  //                  <Text style={{fontSize:12,}}>{this.state.isFiltered?'개의 매물이 검색되었습니다':'개의 매물이 있습니다'}</Text>
  //                </View>
                 
                 
                 
  //                <TouchableOpacity style={{flexDirection:'row', marginRight:10, backgroundColor:'#fff', borderColor:'#3b4db7',borderWidth:1, width:85, height:25, padding:3, alignItems:'center', justifyContent:'center' }}
  //                onPress={()=>this.segmentDialog.show()}>
  //                  <Text style={{ color:'#3b4db7', fontSize:12, marginRight:5,}}>{this.state.selectedSegment} </Text>
  //                  <Icon
  //                  name="ios-arrow-down"
  //                  size={22}
  //                  style={{color: '#3b4db7',}}
  //                  />          
  //                </TouchableOpacity>
              
                  
  //           </View>
  //     )
  //   }
  //   else{
  //     return(
  //       <View style={[styles.buttonWrapper,{backgroundColor:'#333', height:45, paddingTop:12}]}>
  //       <View style={{flexDirection:'row',}}>
  //           {this._renderClose()}
  //           <Text style={{color:'#fff', fontSize: 14,}}>매물을 선택하세요.</Text>
  //       </View>
  //       <View style={{flexDirection:'row',}}>
  //           <TouchableOpacity
  //           style={this.state.checkedOffering.length!=0?{marginRight:15, }:{display:'none'}}
  //           onPress={()=>{
  //             var offering = this.state.myoffering.slice(0);
  //             for(var i = 0; i<offering.length; i++){
  //               offering[i].isChecked=false;
  //             }
  //             this.setState({myoffering:offering, checkedOffering:[], })
              
  //             }}>

  //           <Text style={{color:'#f4c93d', fontSize: 13}}>전체해제 </Text>

  //           </TouchableOpacity>

  //           <TouchableOpacity
  //           style={this.state.checkedOffering.length!=0?{marginRight:15, }:{display:'none'}}
  //           onPress={()=>{
              
  //             fetch('http://real-note.co.kr/app3/getBookmark.php',{
  //               method:'post',
  //               header:{
  //                 'Accept': 'application/json',
  //                 'Content-type': 'application/json'
  //               },
  //               body:JSON.stringify({
  //                 selectedOfferingType: this.state.selectedOfferingType,
  //                 memberID: this.state.memberID,
  //                 boss: this.state.boss,
                  
  //               })
  //             })
  //             .then((res)=>{
              
  //               var parsedRes = JSON.parse(res._bodyText).data;
  //               var parsedRes_folder = JSON.parse(res._bodyText).folder;
  //               folderList=[];
                               
  //               for(var i =0; i<=parsedRes_folder.length-1; i++){
                  
  //                 if(i == 0){
  //                   this.setState({selectedFolder: parsedRes_folder[i].bmf_name})
  //                 }
  //                 parsedRes_folder[i].data = [];
  //                 folderList.push(parsedRes_folder[i].bmf_name);
                    
  //               }
             
  //               this.setState({bookmark:parsedRes_folder}, function(){
    
  //                   this.folderListDialog.show()
    
  //               });
                
  //             })
              
              
  //             }}>
  //               <Text style={{color:'#f4c93d', fontSize: 13}}> 추가하기 </Text>
  //           </TouchableOpacity>
            
  //       </View>
  //     </View>
  //     )

  //   }
  
  // }
  _renderClose(){

    return (
      <TouchableOpacity
      style={{padding:5, marginRight:10,}}
      onPress = {()=>{this.setState({onCheckMode:!this.state.onCheckMode}) }}
      >
             
                  <Icon 
                  name="ios-close"
                  size={40}
                  style={{ marginTop:-15, marginLeft: 10, color: '#fff'}}
                       
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
 _renderSearch(){
   return (
     
                  <Icon 
                  name="ios-search"
                  size={30}
                  style={{ marginTop:2,color: '#fff'}}
                       
                  />  
    
   )
 }
 _renderFunnel(){
  return (
   
                 <Icon 
                 name="md-options"
                 size={27}
                 style={{ marginTop:0,color: '#f4bb41'}}
                      
                 />              
   
  )

 }
  _sum(a,b){
    return parseInt(a)+parseInt(b)
  }


  _onRefresh = () =>{
    if(!this.state.isFiltered){
        
      const {memberID, countPerLoad, myoffering_from,level,boss,selectedSegment} = this.state;
      this.setState({myoffering_from: 0, isRefreshing: true, }, function(){
        fetch('http://real-note.co.kr/app3/getOfficeOfferingMerged.php',{
          method:'post',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            selectedOfferingType: selectedOfferingType,
            memberID: memberID,
            level: level,
            boss: boss,
            selectedSegment: selectedSegment,
            // myoffering_num: myoffering_num,
            myoffering_from: 0,
            countPerLoad: countPerLoad,
            
          })
        })
        .then((res)=>{
          var parsedRes = JSON.parse(res._bodyText).data;
          var parsedRes_count = JSON.parse(res._bodyText).count.count;
    
          for(var i =0; i<=parsedRes.length-1; i++){
              parsedRes[i].level = this.state.level;
          }
         
          this.setState({myoffering:parsedRes, myoffering_all:parsedRes,offering_count: parsedRes_count, isRefreshing:false, noMoreData:false},
          function(){});
          
          
        })
  
      })

    }  
    
  }
  _permissionStyle(item){
    if(item==1){

      return {
        backgroundColor:'#f25776',
        marginLeft: 5, borderRadius:5, width:40, height: 20, justifyContent: 'center', alignItems: 'center'
      }

    }
    else{
      return{
        display:'none'
      }
    }
      

  }

  _toggle(item){
    
     var offering = this.state.myoffering.slice(0);
     offering[this._findToggledIndex(item)].isChecked = !item.isChecked;   
     
     if(offering[this._findToggledIndex(item)].isChecked==true){
       this.setState({myoffering: offering, checkedOffering:[...this.state.checkedOffering, item] }, function(){ console.log('checkedOffering',this.state.checkedOffering)});
     }
     else{
       var temp = this.state.checkedOffering.slice(0);
       temp.splice(this._findCheckedIndex(item),1); 
       // setTimeout(function(){}, 100)
       this.setState({myoffering: offering, checkedOffering: temp }, function(){ console.log('checkedOffering',this.state.checkedOffering)});
     }
     
 
   }
   _findToggledIndex(item){
     var clone = this.state.myoffering.slice(0);
     for (var i = 0; i<clone.length; i++){
        if (clone[i].wr_id == item.wr_id && clone[i].wr_writer==item.wr_writer){
          return i
        }
     }
 
   }
   _findCheckedIndex(item){
     var clone = this.state.checkedOffering.slice(0);
     for (var i = 0; i<clone.length; i++){
        if (clone[i].wr_id == item.wr_id && clone[i].wr_writer==item.wr_writer){
          return i
        }
     }
 
   }

  _longPress(item){
  
      this.setState({longPressed:item},
      function(){this.popupDialog.show()})
  }

  _renderRow({item}){

      swipeSettings = {
        autoClose: true,
        right:[
          {
            onPress: ()=>{
              const args = {
                number: item.wr_hp.toString(), // String value with the number to call
                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                }
                call(args).catch(console.error)
              
            },
            
            component: <View style={{flex:1,backgroundColor:'#3b4db7', marginBottom:4, justifyContent:'center', alignItems:'center',}}><Text style={{color:'#fff', fontSize:12, textAlign:'center'}}>담당자에게{"\n"}전화걸기</Text></View>,
            backgroundColor:'transparent'
          }
        ]        
      }

      return(
        <Swipeout {...swipeSettings}
        backgroundColor='#f1f1f1'>

            <ListItem item = {item}
            isChecked = {item.isChecked}
            from = 'officeoffering'
            memberID = {this.state.memberID}
            memberName = {this.state.memberName}
            contact = {this.state.contact}
            selectedSegment = {this.state.selectedSegment}
            onCheckMode = {this.state.onCheckMode}
            navigation = {this.props.navigation}
            toggleHandler = {this._toggle.bind(this)}
            longPressHandler = {this._longPress.bind(this)}
            />
       
        </Swipeout>
      )
  }
  _handleEnd(){



    if(!this.state.noMoreData){


      if(!this.state.isFiltered ){
        
                this.setState({myoffering_from : this.state.myoffering_from + this.state.countPerLoad,
                               isAdding: true,
                              }, function(){
                  
                            fetch('http://real-note.co.kr/app3/getOfficeOffering.php',{
                              method:'post',
                              header:{
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                              },
                              body:JSON.stringify({
                                selectedOfferingType: this.state.selectedOfferingType,
                                memberID: this.state.memberID,
                                level: this.state.level,
                                boss: this.state.boss,
                                myoffering_from: this.state.myoffering_from,
                                countPerLoad: this.state.countPerLoad,
                                selectedSegment: this.state.selectedSegment,
                              })
                            })
                            .then((res)=>{
                              var parsedRes = JSON.parse(res._bodyText);

                              if(parsedRes.length ==0){
                                this.setState({noMoreData:true})
                              }
                              // console.log(parsedRes);
                              for(var i =0; i<=parsedRes.length-1; i++){
                                parsedRes[i].level = this.state.level;
                            }
              
                              
                              this.setState({
                                             myoffering : [...this.state.myoffering,...parsedRes],
                                             myoffering_all:[...this.state.myoffering_all,...parsedRes],
                                             isAdding: false,
                                            });
                            
                              // this.setState({isLoaded: true}, function(){console.log(this.state)});
                              
                            })
                  
                          });
        
      }
      else{
        
                this.setState({myoffering_from_fltr : this.state.myoffering_from_fltr + this.state.countPerLoad,
                  isAdding: true,
                  }, function(){
        
                fetch('http://real-note.co.kr/app3/searchByFilter_office.php',{
                  method:'post',
                  header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                  },
                  body:JSON.stringify({
                    selectedOfferingType: this.state.selectedOfferingType,
                    memberID: this.state.memberID,
                    memberName: this.state.memberName,
                    myoffering_from: this.state.myoffering_from_fltr,
                    countPerLoad: this.state.countPerLoad,
                    selectedSegment: this.state.selectedSegment,
                    level: this.state.level,
                    boss: this.state.boss,

                    name: this.state.nameFilter,
                    addr: this.state.addrFilter,
                    writer: this.state.writerFilter,
                    saleArea: this.state.saleAreaFilter,
                    floorMin: this.state.floorMinFilter,
                    floorMax: this.state.floorMaxFilter,
                    areaMin: this.state.areaMinFilter,
                    areaMax: this.state.areaMaxFilter,
                    
                    wr_rec_sectors: this.state.wr_rec_sectors,

                    depositMin: this.state.depositMinFilter,
                    depositMax: this.state.depositMaxFilter,
                    mrateMin: this.state.mrateMinFilter,
                    mrateMax: this.state.mrateMaxFilter,
                    premoMin: this.state.premoMinFilter,
                    premoMax: this.state.premoMaxFilter,
                    sumMin: this.state.sumMinFilter,
                    sumMax: this.state.sumMaxFilter,

                    name_sell: this.state.nameFilter_sell,
                    addr_sell: this.state.addrFilter_sell,
                    writer_sell: this.state.writerFilter_sell,
                    areaMin_sell: this.state.areaMinFilter_sell,
                    areaMax_sell: this.state.areaMaxFilter_sell, 
         
                    salePriceMin: this.state.salePriceMinFilter,
                    salePriceMax: this.state.salePriceMaxFilter,
                    psalePriceMin: this.state.psalePriceMinFilter,
                    psalePriceMax: this.state.psalePriceMaxFilter,
                    silinsuMin: this.state.silinsuMinFilter,
                    silinsuMax: this.state.silinsuMaxFilter,
                    profitMin: this.state.profitMinFilter,
                    profitMax: this.state.profitMaxFilter,
         
                    name_fin: this.state.nameFilter_fin,
                    addr_fin: this.state.addrFilter_fin,
                    writer_fin : this.state.writerFilter_fin,
                  })
                })
                .then((res)=>{
                  
                console.log(res);
                
                  var parsedRes = JSON.parse(res._bodyText);

                  if(parsedRes.length ==0){
                    this.setState({noMoreData:true})
                  }
                  
                  for(var i =0; i<=parsedRes.length-1; i++){
                  parsedRes[i].level = this.state.level;
              }
        
                  
                  this.setState({
                                myoffering : [...this.state.myoffering,...parsedRes],
                                myoffering_all:[...this.state.myoffering_all,...parsedRes],
                                isAdding: false,
                                });
                
                  
                })
        
              });
        
        }
    }
     
  }
  _renderFooter(){
    if (!this.state.isAdding) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE",
              
            }}
          >
            <ActivityIndicator/>
          </View>
        );
  }

  _closeModal() {
    this.setState({
        modalVisible: false
    });
}

  _filterInputHandler(filtername, input){   
    var stateObject = function() {
      returnObj = {};
      returnObj[filtername] = input;
         return returnObj;
      }
    this.setState(stateObject)
   }


  _filterRecHandler(array){
  
    this.setState({wr_rec_sectors: array})
  
  }

   _filterResetHandler(){
     this.setState({
      nameFilter:'',
      addrFilter:'',
      writerFilter:'',
      saleAreaFilter:'',
      floorMinFilter:'',
      floorMaxFilter:'',
      areaMinFilter:'',
      areaMaxFilter:'',
      depositMinFilter:'',
      depositMaxFilter:'',
      mrateMinFilter:'',
      mrateMaxFilter:'',
      premoMinFilter:'',
      premoMaxFilter:'',
      sumMinFilter:'',
      sumMaxFilter:'',

      nameFilter_sell:'',
      addrFilter_sell:'',
      writerFilter_sell:'',
      areaMinFilter_sell:'',
      areaMaxFilter_sell:'',
  
      salePriceMinFilter:'',
      salePriceMaxFilter:'',
      psalePriceMinFilter:'',
      psalePriceMaxFilter:'',
      silinsuMinFilter:'',
      silinsuMaxFilter:'',
      profitMinFilter:'',
      profitMaxFilter:'',
  
      nameFilter_fin:'',
      addrFilter_fin:'',
     })
   }
   _getFilterValue(st){
     
     return this.state[st]
      
   }
   _filterOfferingCountHandler(count){
    this.setState({offering_count_fltr: count})
   }
   _filterOfferingHandler(data, count){
     this.setState({myoffering: data,
                    offering_count_fltr: count,
                    modalVisible: false,
                    isFiltered: true,
                    filterText:'필터해제'})
  
   }

   _chooseFolder(folder){
    
      this.setState({selectedFolder: folder});
    
     }
    _insertToFolder(){
    
      fetch('http://real-note.co.kr/app3/insertToBookmark_office.php',{
        method:'post',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          memberID: this.state.memberID,
          checkedOffering: this.state.checkedOffering,
          selectedFolder: this.state.selectedFolder,
        })
      })
      .then((res)=>res.json())
      .then((json) =>{
        if (json.error){
          
          alert("'"+json.item +"'" +'는(은) 이미 등록된 매물입니다.' )
    
        }
        else{
          
          alert("해당 폴더에 북마크 되었습니다.")
          this.folderListDialog.dismiss();  
          getBookmark.refreshFromOutside();
                            
          
        }
        
      })
      
    
    }


_makeFromZero(){
  this.setState({myoffering_from_fltr: 0, noMoreData:false})
}

_showFolderListDialog(){
  if(this.folderListDialog){
    this.folderListDialog.show()
  }
}
_showSegmentDialog(){
  if(this.segmentDialog){
    this.segmentDialog.show()
  }
}
    
	render(){
    // const {params} = this.props.navigation.state;

    if(!this.state.isLoaded){
      return(
          <View>
            <View style={{alignItems: 'center'}}>
            <ActivityIndicator size='large' style ={{position: 'absolute', marginTop: 250}}/>
            </View>
          </View>
      )
    }
    else{
      return(
  	     <View style={styles.container}>

            {this.state.isSegmentChanging?this._renderIndicator():null}
            
            {/* 헤더 */}
            
              {/* {this._renderHeader()} */}
           


          {/* 통화팝업 */}
            <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}            
            dialogStyle ={{elevation:2, width: '80%', height: 80,}}
            >
              
              <PopupListOffice data={this.state.longPressed}
              currentName = {this.state.memberName}
              popupText1="임차인에게 전화걸기" 
              popupText2="담당자에게 전화걸기"/>
            
            </PopupDialog>
           {/* 통화팝업 */}

            {/* 세그먼트팝업 */}
            <PopupDialog
            ref={(popupDialog) => { this.segmentDialog = popupDialog; }}            
            dialogStyle ={{elevation:2, width: '60%', height: 134, position:'absolute', top: 100, borderRadius:0, justifyContent:'center'}}
            
            >
              
              <SegmentList 
              selectedSegment = {this.state.selectedSegment}
              options={options}
              handler ={this.setSelectedOption.bind(this)}
              />
            
            </PopupDialog>
           {/* 세그먼트팝업 */}

           <PopupDialog
            ref={(popupDialog) => { this.folderListDialog = popupDialog; }}            
            dialogStyle ={{elevation:2, width: '70%', height: 350, position:'absolute', top: 60}}
            
            >
              
              <FolderListPopup 
              memberID = {this.state.memberID}
              boss ={this.state.boss}
              folderList = {folderList}
              selectedFolder = {this.state.selectedFolder}
              selectHandler ={this._chooseFolder.bind(this)}
              submitHandler={this._insertToFolder.bind(this)}
              cancelHandler={()=>{this.folderListDialog.dismiss()}}
              />
            
            </PopupDialog>

           <TouchableOpacity style={{borderRadius:27.5, backgroundColor: '#3b4db7', position: 'absolute',
           bottom: 20, right: 20, width: 55, height: 55, zIndex: 10, elevation: 5, alignItems: 'center'
          , justifyContent: 'center',}}
            onPress={()=>{
              // if(this.state.isFiltered){

              //   // this.setState(previousState => {
              //   //   previous = previousState.selectedSegment;
                        
              //   //   return {
                        
              //   //     filterText:'통합검색', isFiltered:false, myoffering:this.state.myoffering_all
              //   //   };
              //   // })
              // this.setState({filterText:'통합검색', isFiltered:false, myoffering:this.state.myoffering_all, selectedSegment: this.state.selectedSegment_before })
              // this.state.offering_count_fltr!=0?
              // this.flatListRef.scrollToIndex({animated: true, index: 0}):null;
              // }
              // else{
                this.setState({modalVisible: true})
              // }
              // this.props.navigation.navigate('Writeoffer',{memberID: this.state.memberID, memberName: this.state.memberName, contact:this.state.contact })
            }}
            >
                {/* {this.state.isFiltered?this._renderFunnel():this._renderSearch()} */}
                {this._renderSearch()}
               
           </TouchableOpacity>

           <TouchableOpacity style={this.state.isFiltered?{borderRadius:27.5, backgroundColor: '#000', position: 'absolute',
           bottom: 20, right: 85, width: 55, height: 55, zIndex: 10, elevation: 5, alignItems: 'center'
          , justifyContent: 'center',}:{display:'none'}}
            onPress={()=>{
              if(this.state.isFiltered){

                // this.setState(previousState => {
                //   previous = previousState.selectedSegment;
                        
                //   return {
                        
                //     filterText:'통합검색', isFiltered:false, myoffering:this.state.myoffering_all
                //   };
                // })
              this.setState({filterText:'통합검색', isFiltered:false, myoffering:this.state.myoffering_all, selectedSegment: this.state.selectedSegment_before, noMoreData:false  })
              this.state.offering_count_fltr!=0?
              this.flatListRef.scrollToIndex({animated: true, index: 0}):null;
              }
              
              // this.props.navigation.navigate('Writeoffer',{memberID: this.state.memberID, memberName: this.state.memberName, contact:this.state.contact })
            }}
            >
                {/* {this.state.isFiltered?this._renderFunnel():this._renderSearch()} */}
                {this._renderFunnel()}
               
           </TouchableOpacity>

           <SubHeader
          stateHandler={this.setState.bind(this)}
          onCheckMode={this.state.onCheckMode}
          offering_count={this.state.offering_count}
          offering_count_fltr={this.state.offering_count_fltr}
          isFiltered={this.state.isFiltered}
          selectedSegment={this.state.selectedSegment}
          checkedOffering={this.state.checkedOffering}
          myoffering={this.state.myoffering}
          memberID={this.state.memberID}
          boss={this.state.boss}
          folderListDialog={this._showFolderListDialog.bind(this)}
          segmentDialog={this._showSegmentDialog.bind(this)}
          selectedOfferingType={this.state.selectedOfferingType}
          />
                                   
            {/* 필터 모달창 */}
                   
            <FilterModalOffice
             memberID = {this.state.memberID}
             memberName = {this.state.memberName}
             level = {this.state.level}
             boss = {this.state.boss}
             segmentChange = {this.setSelectedOption_filter.bind(this)}
             selectedSegment = {this.state.selectedSegment}
             countPerLoad = {this.state.countPerLoad}
             modalVisible = {this.state.modalVisible}
             getFilterValue = {this._getFilterValue.bind(this)}
             inputHandler = {this._filterInputHandler.bind(this)}
             recHandler = {this._filterRecHandler.bind(this)}
             resetHandler = {this._filterResetHandler.bind(this)}
             offeringCountHandler = {this._filterOfferingCountHandler.bind(this)}
             offeringHandler ={this._filterOfferingHandler.bind(this)}
             fromHandler= {this._makeFromZero.bind(this)}
             closeModal = {this._closeModal.bind(this)}
             />

            {/* 필터 모달창 */}          

            <FlatList data ={this.state.myoffering}
                ref={(ref) => { this.flatListRef = ref; }}
                style={{ marginTop:0}}
                contentContainerStyle={{paddingTop:10,}}
                keyExtractor ={(x,i)=>i}
                extraData={this.state}
                onEndReached = {() => this.state.myoffering.length>=this.state.countPerLoad?this._handleEnd():null}
                onEndReachedThreshold ={0.05}
                refreshing = {this.state.isRefreshing}
                onRefresh ={this._onRefresh}
                renderItem = {({item}) => {return this._renderRow({item})}}
                ListFooterComponent = {this._renderFooter()}/> 
                
            
           </View>

       		)
    }

	}
}
const styles = StyleSheet.create({
	container:{
    display:'flex',
    flex:1,
    backgroundColor: '#f1f1f1'
	},
  buttonWrapper:{
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent:'space-between',
    paddingTop: 10, paddingBottom: 10,
    backgroundColor:'#f7f7f7',
    borderBottomWidth:1,
    borderColor:'#ddd'
   
  },
  modalContainer: {
    
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:20,
    backgroundColor: '#fbfbfb',
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


AppRegistry.registerComponent('officeoffering', () => officeoffering);
