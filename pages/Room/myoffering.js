import React, { Component } from 'react';
import { TextInput,AppRegistry,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,FlatList, Image, StatusBar, AsyncStorage, BackHandler } from 'react-native';
import { Button, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swipeout from 'react-native-swipeout';
import PopupDialog from 'react-native-popup-dialog';
import call from 'react-native-phone-call';
import getBookmark from './getBookmark';
import SegmentList from '../commonComponents/segmentList';
import FolderListPopup from '../commonComponents/folderListPopup';
import PopupList from '../commonComponents/popupList';
import FilterModal from './filterModal';
import ListItem from './listItem';
import SubHeader from '../commonComponents/SubHeader';

const options = ['건물', '공실' ];
var folderList = [];
var swipeSettings;
var previous;
var self;

export default class myoffering extends Component{
static navigationOptions= ({navigation}) =>({
      // header: null,
       headerLeft:null,
       title:'마이노트',
       headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
       headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
       },
      headerTintColor: 'white',    
      headerRight:  
      <View style={{flexDirection:'row'}}> 
          <TouchableOpacity
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

          <TouchableOpacity
          style={{marginRight: 15}}
          onPress={()=>{
          self.setState({onWriteOfferMode:!self.state.onWriteOfferMode,})
        }}>
                      <Icon 
                      name="md-add"
                      size={26}
                      style={{ marginRight:5,color: '#fff'}}
                            
                      />  
        </TouchableOpacity>
      </View>,    
      swipeEnabled:false,
  });
  
static refreshFromOutside() {
  
  self._onRefresh();
  
}

static setSelectedSaleTypeFromOutside(type){

  self.setSelectedOption(type);

}

static setSelectedOfferingType(type){

  self.setState({selectedOfferingType: type})
  self._onRefresh();

}

  constructor(props){
    super(props);
    this.isHome = true;
    this.state ={
      selectedOfferingType:'',
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
      selectedSegment: '공실',
      selectedSegment_before:'',
      selectedIndex:0,
      isFiltered:false,
      
      myoffering_from: 0, 
      myoffering_from_fltr:0,
      countPerLoad: 25,
      offering_count:'',
      offering_count_fltr:'',
      isAdding: false,
      isRefreshing: false,
      isSegmentChanging:false,
      longPressed:null,
      onCheckMode: false,
      onWriteOfferMode: false,
      checkedOffering:[],
      scrollEnabled:true,
      
    };
    //스태틱 함수용
    self=this;
    
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      console.log(this.state);
      
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
                },)
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

          this.setState({isFiltered:false, myoffering_from: 0, isSegmentChanging:true,});
          const {memberID, memberName, countPerLoad, myoffering_from, selectedSegment, level, selectedOfferingType} = this.state;
          
       
          fetch('http://real-note.co.kr/app3/getMyOffering_room2.php',{
            method:'post',
            header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({
              selectedOfferingType: selectedOfferingType,
              memberID: memberID,
              level: level,
              memberName: memberName,
              selectedSegment: selectedSegment,
              myoffering_from: myoffering_from,
              countPerLoad: countPerLoad,
              
            })
          })
          .then((res)=>{
            if(this.state.selectedSegment == '건물'){

              var parsedRes_bld_count = JSON.parse(res._bodyText).bld_count.count;
              var parsedRes_bld_data = JSON.parse(res._bodyText).bld_data;
              var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
              // for(var i =0; i<=parsedRes.length-1; i++){
              //   parsedRes[i].isChecked = false;
              // }
              for(var i =0; i<=parsedRes_bld_data.length-1; i++){
              
              
                parsedRes_bld_data[i].rooms = [];
                
                for(var j = 0; j<=parsedRes_room_data.length-1; j++){
        
                   
                  if(parsedRes_bld_data[i].bld_id == parsedRes_room_data[j].wr_bld_match_id){
        
                    parsedRes_bld_data[i].rooms.push(parsedRes_room_data[j])
        
                  }
        
                }
        
              }
      
              this.setState({myoffering:parsedRes_bld_data, myoffering_all:parsedRes_bld_data, offering_count: parsedRes_bld_count,isSegmentChanging:false,});
      
            }
            else{
      
              var parsedRes_room_count = JSON.parse(res._bodyText).room_count.count;
              var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
              var parsedRes_room_extra_data = JSON.parse(res._bodyText).room_extra_data;

              for(var i =0; i<=parsedRes_room_data.length-1; i++){
              
              
                parsedRes_room_data[i].clone =  {...parsedRes_room_data[i]};
                parsedRes_room_data[i].clone.rooms = [];
                
                for(var j = 0; j<=parsedRes_room_extra_data.length-1; j++){
        
                  
                  if(parsedRes_room_data[i].wr_bld_match_id == parsedRes_room_extra_data[j].wr_bld_match_id){
        
                    parsedRes_room_data[i].clone.rooms.push(parsedRes_room_extra_data[j])
        
                  }
        
                }
        
              }

              this.setState({myoffering:parsedRes_room_data, myoffering_all:parsedRes_room_data, offering_count: parsedRes_room_count,isSegmentChanging:false,});
      
            }
            
          })

        }
       this.segmentDialog.dismiss(); 
    });
  }

  componentDidMount(){

    const {memberID, memberName, selectedSegment,level,myoffering_from, countPerLoad,selectedOfferingType} = this.state;

    fetch('http://real-note.co.kr/app3/getMyOffering_room2.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        selectedOfferingType: selectedOfferingType,
        memberID: memberID,
        level:level,
        memberName: memberName,
        selectedSegment: selectedSegment,
        myoffering_from: myoffering_from,
        countPerLoad: countPerLoad,
        
      })
    })
    .then((res)=>{

      if(this.state.selectedSegment == '건물'){

        var parsedRes_bld_count = JSON.parse(res._bodyText).bld_count.count;
        var parsedRes_bld_data = JSON.parse(res._bodyText).bld_data;
        var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
        // for(var i =0; i<=parsedRes.length-1; i++){
        //   parsedRes[i].isChecked = false;
        // }
        for(var i =0; i<=parsedRes_bld_data.length-1; i++){
        
        
          parsedRes_bld_data[i].rooms = [];
          
          for(var j = 0; j<=parsedRes_room_data.length-1; j++){
  
             
            if(parsedRes_bld_data[i].bld_id == parsedRes_room_data[j].wr_bld_match_id){
  
              parsedRes_bld_data[i].rooms.push(parsedRes_room_data[j])
  
            }
  
          }
  
        }

        this.setState({myoffering:parsedRes_bld_data, myoffering_all:parsedRes_bld_data, offering_count: parsedRes_bld_count,isLoaded: true}, function(){console.log('check',this.state)});

      }
      else{

        var parsedRes_room_count = JSON.parse(res._bodyText).room_count.count;
        var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
        var parsedRes_room_extra_data = JSON.parse(res._bodyText).room_extra_data;

        for(var i =0; i<=parsedRes_room_data.length-1; i++){
        
        
          parsedRes_room_data[i].clone =  {...parsedRes_room_data[i]};
          parsedRes_room_data[i].clone.rooms = [];
          
          for(var j = 0; j<=parsedRes_room_extra_data.length-1; j++){
  
             
            if(parsedRes_room_data[i].wr_bld_match_id == parsedRes_room_extra_data[j].wr_bld_match_id){
  
              parsedRes_room_data[i].clone.rooms.push(parsedRes_room_extra_data[j])
  
            }
  
          }
  
        }

        this.setState({myoffering:parsedRes_room_data, myoffering_all:parsedRes_room_data, offering_count: parsedRes_room_count,isLoaded: true},function(){console.log('check', this.state)});

      }
    

    })
    
  }

  
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
 _renderAdd(){
   return (
     <TouchableOpacity
     onPress={()=>{
      this.setState({onWriteOfferMode:!this.state.onWriteOfferMode,})
    }}>
                  <Icon 
                  name="md-add"
                  size={26}
                  style={{ marginRight:5,color: '#fff'}}
                  />  
    </TouchableOpacity>
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
 _renderSearch(){
  return (   
            <Icon 
            name="ios-search"
            size={30}
            style={{ color: '#fff'}}
            />
  )
 }
 _renderWriteRentButton(){
   return(
    
        <TouchableOpacity style={{borderRadius:27.5, backgroundColor: '#3b4db7', position: 'absolute',
        top: 10, right: 8, width: 50, height: 50, zIndex: 10, elevation: 5, alignItems: 'center'
      , justifyContent: 'center', zIndex:10,}}
        onPress={()=>{
          
          this.props.navigation.navigate('WriteofferRent',{memberID: this.state.memberID, memberName: this.state.memberName, contact:this.state.contact, mode:'write' })
          this.setState({onWriteOfferMode:false,})
        }}
        >
        <Text style={{color:'white'}}>임대</Text>
        </TouchableOpacity>

   )
 }
 _renderWriteSellButton(){
  return(
   
       <TouchableOpacity style={{borderRadius:27.5, backgroundColor: '#3b4db7', position: 'absolute',
       top: 65, right: 8, width: 50, height: 50, zIndex: 10, elevation: 5, alignItems: 'center'
     , justifyContent: 'center', zIndex:10,}}
       onPress={()=>{
         
         this.props.navigation.navigate('WriteofferSell',{memberID: this.state.memberID, memberName: this.state.memberName, contact:this.state.contact, mode:'write' })
         this.setState({onWriteOfferMode:false,})
       }}
       >
       <Text style={{color:'white'}}>매매</Text>
       </TouchableOpacity>
  )
}

  _sum(a,b){
    return parseInt(a)+parseInt(b)
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
                  number: item.wr_renter_contact.toString(), 
                      prompt: false 
                  }
                  call(args).catch(console.error)
                
              },
              
              component: <View style={{flex:1,backgroundColor:'#3b4db7', marginBottom:4, justifyContent:'center', alignItems:'center',}}><Text style={{color:'#fff', fontSize:12, textAlign:'center'}}>임차인에게{"\n"}전화걸기</Text></View>,
              backgroundColor:'transparent'
            }
          ]        
        }
      return(
        <Swipeout {...swipeSettings}
        // scroll={(scrollEnabled) => { this.setState({ scrollEnabled }); }}
        sensitivity={20}
        backgroundColor='#f1f1f1'>

            <ListItem item = {item}
            isChecked = {item.isChecked}
            from = 'myoffering'
            memberID = {this.state.memberID}
            memberName = {this.state.memberName}
            contact = {this.state.contact}
            selectedSegment = {this.state.selectedSegment}
            onCheckMode = {this.state.onCheckMode}
            navigation = {this.props.navigation}
            toggleHandler = {this._toggle.bind(this)}
            longPressHandler = {this._longPress.bind(this)}
            isRefreshing = {this.state.isRefreshing}
            />
       
        </Swipeout>
      )
  }

  _onRefresh = () =>{
    if(!this.state.isFiltered){
        const {memberID, memberName, countPerLoad, myoffering_from,selectedSegment,level, selectedOfferingType} = this.state;
        this.setState({myoffering_from: 0, isRefreshing: true, }, function(){

          fetch('http://real-note.co.kr/app3/getMyOffering_room2.php',{
            method:'post',
            header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({
              selectedOfferingType: selectedOfferingType,
              memberID: memberID,
              level: level,
              selectedSegment: selectedSegment,
              memberName: memberName,
              myoffering_from: 0,
              countPerLoad: countPerLoad,
              
            })
          })
          .then((res)=>{

            if(this.state.selectedSegment == '건물'){

              var parsedRes_bld_count = JSON.parse(res._bodyText).bld_count.count;
              var parsedRes_bld_data = JSON.parse(res._bodyText).bld_data;
              var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
              // for(var i =0; i<=parsedRes.length-1; i++){
              //   parsedRes[i].isChecked = false;
              // }
              for(var i =0; i<=parsedRes_bld_data.length-1; i++){
              
              
                parsedRes_bld_data[i].rooms = [];
                
                for(var j = 0; j<=parsedRes_room_data.length-1; j++){
        
                   
                  if(parsedRes_bld_data[i].bld_id == parsedRes_room_data[j].wr_bld_match_id){
        
                    parsedRes_bld_data[i].rooms.push(parsedRes_room_data[j])
        
                  }
        
                }
        
              }
      
              this.setState({myoffering:parsedRes_bld_data, myoffering_all:parsedRes_bld_data, offering_count: parsedRes_bld_count, isRefreshing: false, noMoreData:false}, function(){console.log('check',this.state)});
      
            }
            else{
      
              var parsedRes_room_count = JSON.parse(res._bodyText).room_count.count;
              var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
              var parsedRes_room_extra_data = JSON.parse(res._bodyText).room_extra_data;
      
              for(var i =0; i<=parsedRes_room_data.length-1; i++){
              
              
                parsedRes_room_data[i].clone =  {...parsedRes_room_data[i]};
                parsedRes_room_data[i].clone.rooms = [];
                
                for(var j = 0; j<=parsedRes_room_extra_data.length-1; j++){
        
                   
                  if(parsedRes_room_data[i].wr_bld_match_id == parsedRes_room_extra_data[j].wr_bld_match_id){
        
                    parsedRes_room_data[i].clone.rooms.push(parsedRes_room_extra_data[j])
        
                  }
        
                }
        
              }
      
              this.setState({myoffering:parsedRes_room_data, myoffering_all:parsedRes_room_data, offering_count: parsedRes_room_count, isRefreshing: false, noMoreData:false},function(){console.log('check', this.state)});
            }
            
            
          })

        }) 
        
      }
      else{

      }

  }
  _handleEnd =()=>{
     
    if(!this.state.noMoreData){

      if(!this.state.isFiltered){

        this.setState({myoffering_from : this.state.myoffering_from + this.state.countPerLoad,
                       isAdding: true,
                      }, function(){
          
                    fetch('http://real-note.co.kr/app3/getMyOffering_room2.php',{
                      method:'post',
                      header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                      },
                      body:JSON.stringify({
                        selectedOfferingType:this.state.selectedOfferingType,
                        memberID: this.state.memberID,
                        memberName: this.state.memberName,
                        level:this.state.level,
                        myoffering_from: this.state.myoffering_from,
                        countPerLoad: this.state.countPerLoad,
                        selectedSegment: this.state.selectedSegment,
                      })
                    })
                    .then((res)=>{
                      // var parsedRes = JSON.parse(res._bodyText).data;

                      if(this.state.selectedSegment == '건물'){

                        var parsedRes_bld_count = JSON.parse(res._bodyText).bld_count.count;
                        var parsedRes_bld_data = JSON.parse(res._bodyText).bld_data;
                        var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
                        // for(var i =0; i<=parsedRes.length-1; i++){
                        //   parsedRes[i].isChecked = false;
                        // }
                        for(var i =0; i<=parsedRes_bld_data.length-1; i++){
                        
                        
                          parsedRes_bld_data[i].rooms = [];
                          
                          for(var j = 0; j<=parsedRes_room_data.length-1; j++){
                  
                             
                            if(parsedRes_bld_data[i].bld_id == parsedRes_room_data[j].wr_bld_match_id){
                  
                              parsedRes_bld_data[i].rooms.push(parsedRes_room_data[j])
                  
                            }
                  
                          }
                  
                        }

                        if(parsedRes_bld_data.length ==0){
                          this.setState({noMoreData:true})
                        }

                        this.setState({
                          myoffering : [...this.state.myoffering,...parsedRes_bld_data],
                          myoffering_all:[...this.state.myoffering_all,...parsedRes_bld_data],
                          isAdding: false,
                         }, function(){ });
                
                
                      }
                      else{
                
                        var parsedRes_room_count = JSON.parse(res._bodyText).room_count.count;
                        var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
                        var parsedRes_room_extra_data = JSON.parse(res._bodyText).room_extra_data;
                
                        for(var i =0; i<=parsedRes_room_data.length-1; i++){
                        
                        
                          parsedRes_room_data[i].clone =  {...parsedRes_room_data[i]};
                          parsedRes_room_data[i].clone.rooms = [];
                          
                          for(var j = 0; j<=parsedRes_room_extra_data.length-1; j++){
                  
                             
                            if(parsedRes_room_data[i].wr_bld_match_id == parsedRes_room_extra_data[j].wr_bld_match_id){
                  
                              parsedRes_room_data[i].clone.rooms.push(parsedRes_room_extra_data[j])
                  
                            }
                  
                          }
                  
                        }

                        if(parsedRes_room_data.length ==0){
                          this.setState({noMoreData:true})
                        }

                        this.setState({
                          myoffering : [...this.state.myoffering,...parsedRes_room_data],
                          myoffering_all:[...this.state.myoffering_all,...parsedRes_room_data],
                          isAdding: false,
                         });
                
                      }
                                      
                    })
          
                  });

      }
      else{

        this.setState({myoffering_from_fltr : this.state.myoffering_from_fltr + this.state.countPerLoad,
          isAdding: true,
         }, function(){

          console.log(this.state);
       fetch('http://real-note.co.kr/app3/searchByFilter_room.php',{
         method:'post',
         header:{
           'Accept': 'application/json',
           'Content-type': 'application/json'
         },
         body:JSON.stringify({
           selectedOfferingType:this.state.selectedOfferingType,
           memberID: this.state.memberID,
           memberName: this.state.memberName,
           myoffering_from: this.state.myoffering_from_fltr,
           countPerLoad: this.state.countPerLoad,
           selectedSegment: this.state.selectedSegment,
          //  selectedIndex: options.indexOf(this.state.selectedSegment),
           level: this.state.level,
           boss: this.state.boss,

           rentType : this.state.rentTypeFilter==undefined?'0': this.state.rentTypeFilter,
           roomType : this.state.roomTypeFilter==undefined?'0': this.state.rentTypeFilter,
           addr: this.state.addrFilter,
           subway: this.state.subwayFilter,
           floorMin: this.state.floorMinFilter,
           floorMax: this.state.floorMaxFilter,
           areaMin: this.state.areaMinFilter,
           areaMax: this.state.areaMaxFilter,
           parking: this.state.parkingFilter==undefined?'0':this.state.parkingFilter,
           elev: this.state.elevFilter==undefined?'0':this.state.elevFilter,
           
                                  
           depositMin: this.state.depositMinFilter,
           depositMax: this.state.depositMaxFilter,
           mrateMin: this.state.mrateMinFilter,
           mrateMax: this.state.mrateMaxFilter,
   
           name_bld: this.state.nameFilter_bld,
           addr_bld: this.state.addrFilter_bld,
           subway_bld: this.state.subwayFilter_bld,
           parking_bld: this.state.parkingFilter_bld==undefined?'0':this.state.parkingFilter_bld,
           elev_bld: this.state.elevFilter_bld==undefined?'0':this.state.elevFilter_bld,
           
         })
       })
       .then((res)=>{

        if(this.state.selectedSegment == '건물'){

          var parsedRes_bld_count = JSON.parse(res._bodyText).bld_count.count;
          var parsedRes_bld_data = JSON.parse(res._bodyText).bld_data;
          var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
          
          for(var i =0; i<=parsedRes_bld_data.length-1; i++){
          
          
            parsedRes_bld_data[i].rooms = [];
            
            for(var j = 0; j<=parsedRes_room_data.length-1; j++){
    
               
              if(parsedRes_bld_data[i].bld_id == parsedRes_room_data[j].wr_bld_match_id){
    
                parsedRes_bld_data[i].rooms.push(parsedRes_room_data[j])
    
              }
    
            }
    
          }

          if(parsedRes_bld_data.length ==0){
            this.setState({noMoreData:true})
          }

          this.setState({
            myoffering : [...this.state.myoffering,...parsedRes_bld_data],
            // myoffering_all:[...this.state.myoffering_all,...parsedRes_bld_data],
            isAdding: false,
           });
  
  
        }
        else{
  
          var parsedRes_room_count = JSON.parse(res._bodyText).room_count.count;
          var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
          var parsedRes_room_extra_data = JSON.parse(res._bodyText).room_extra_data;
  
          for(var i =0; i<=parsedRes_room_data.length-1; i++){
          
          
            parsedRes_room_data[i].clone =  {...parsedRes_room_data[i]};
            parsedRes_room_data[i].clone.rooms = [];
            
            for(var j = 0; j<=parsedRes_room_extra_data.length-1; j++){
    
               
              if(parsedRes_room_data[i].wr_bld_match_id == parsedRes_room_extra_data[j].wr_bld_match_id){
    
                parsedRes_room_data[i].clone.rooms.push(parsedRes_room_extra_data[j])
    
              }
    
            }
    
          }

          if(parsedRes_room_data.length ==0){
            this.setState({noMoreData:true})
          }

          this.setState({
            myoffering : [...this.state.myoffering,...parsedRes_room_data],
            // myoffering_all:[...this.state.myoffering_all,...parsedRes_room_data],
            isAdding: false,
           });
  
        }
         
       })

     });

      }

    }
    
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
    
    rentTypeFilter: undefined,
    roomTypeFilter: undefined,
    addrFilter:'',
    subwayfilter:'',
    floorMinFilter:'',
    floorMaxFilter:'',
    areaMinFilter:'',
    areaMaxFilter:'',
    depositMinFilter:'',
    depositMaxFilter:'',
    mrateMinFilter:'',
    mrateMaxFilter:'',
    parkingFilter: undefined,
    elevFilter: undefined,

       
    nameFilter_bld:'',
    addrFilter_bld:'',
    subwayFilter_bld:'',
    parkingFilter_bld: undefined,
    elevFilter_bld: undefined,

   
   })
 }
 _getFilterValue(st){
   
   return this.state[st]
    
 }

 _filterOfferingHandler(data, count){
   this.setState({myoffering: data,
                  offering_count_fltr: count,
                  modalVisible: false,
                  isFiltered: true,
                  
                  myoffering_from_fltr: 0, noMoreData:false
                 })

 }
 _chooseFolder(folder){

  this.setState({selectedFolder: folder});

 }
_insertToFolder(){

  fetch('http://real-note.co.kr/app3/insertToBookmark.php',{
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
  .then((res)=>{console.log(res); return res.json()})
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
 
    if(!this.state.isLoaded){
      return(
        <View>

          <StatusBar backgroundColor="#16236e"/>
         

          <View>
            <View style={{alignItems: 'center'}}>
            <ActivityIndicator size='large' style ={{position: 'absolute', marginTop: 250}}/>
            </View>
          </View>

        </View>
      )
    }
    else{
      return(

  	     <View style={styles.container}
         >

            {this.state.isSegmentChanging?this._renderIndicator():null}

            <StatusBar backgroundColor="#16236e"/>

            
            {/* 통화팝업 */}
            <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}            
            dialogStyle ={{elevation:2, width: '80%', height: 80,}}
            >
              
              <PopupList data={this.state.longPressed}
              from ="myoffering"
              popupText="임차인에게 전화걸기"/>
            
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

           {/* 검색 버튼 */}
           <TouchableOpacity style={{borderRadius:27.5, backgroundColor: '#3b4db7', position: 'absolute',
           bottom: 20, right: 20, width: 55, height: 55, zIndex: 10, elevation: 5, alignItems: 'center'
          , justifyContent: 'center',}}
            onPress={()=>{              
                this.setState({modalVisible: true})
            }}
            >
                {this._renderSearch()}
               
           </TouchableOpacity>
           {/* 검색 버튼 */}
           
           <TouchableOpacity style={this.state.isFiltered?{borderRadius:27.5, backgroundColor: '#000', position: 'absolute',
           bottom: 20, right: 85, width: 55, height: 55, zIndex: 10, elevation: 5, alignItems: 'center'
          , justifyContent: 'center',}:{display:'none'}}
            onPress={()=>{
              if(this.state.isFiltered){
              
              this.setState({ isFiltered:false, myoffering:this.state.myoffering_all, selectedSegment: this.state.selectedSegment_before, noMoreData:false })
              this.state.offering_count_fltr!=0?
              this.flatListRef.scrollToIndex({animated: true, index: 0}):null;
              
              }
              
            }}
            >
                {this._renderFunnel()}
               
           </TouchableOpacity>
           
           {this.state.onWriteOfferMode?this._renderWriteRentButton():null}
           {this.state.onWriteOfferMode?this._renderWriteSellButton():null}
          
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

             {/* 필터모달 */}
             <FilterModal
             selectedOfferingType={this.state.selectedOfferingType}
             memberID = {this.state.memberID}
             memberName = {this.state.memberName}
             level = {this.state.level}
             boss = {this.state.boss}
             segmentChange = {this.setSelectedOption_filter.bind(this)}
             countPerLoad = {this.state.countPerLoad}
             modalVisible = {this.state.modalVisible}
             getFilterValue = {this._getFilterValue.bind(this)}
             inputHandler = {this._filterInputHandler.bind(this)}
             recHandler = {this._filterRecHandler.bind(this)}
             resetHandler = {this._filterResetHandler.bind(this)}
             offeringHandler ={this._filterOfferingHandler.bind(this)}
             closeModal = {this._closeModal.bind(this)}
             />
        
              {/* 필터모달 */}
                         

            <FlatList data ={this.state.myoffering}
                ref={(ref) => { this.flatListRef = ref; }}
                scrollEnabled={this.state.scrollEnabled}
                style={{ marginTop:0}}
                contentContainerStyle={{paddingTop:10,}}
                keyExtractor ={(x,i)=>i}
                extraData={this.state}
                onEndReached = {this.state.myoffering.length>=this.state.countPerLoad?this._handleEnd:null}
                onEndReachedThreshold ={0.9}
                refreshing = {this.state.isRefreshing}
                onRefresh ={this._onRefresh}
                renderItem = {({item}) => {return this._renderRow({item})}}
                ListFooterComponent = {this._renderFooter}/> 
                
            
           </View>

       		)
    }

	}
}
const styles = StyleSheet.create({
	container:{
    display:'flex',
    flex:1,
    backgroundColor:'#f1f1f1'
	},
  buttonWrapper:{
    flexDirection: 'row',
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
    justifyContent:'center',
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
    borderWidth: 1,
    paddingLeft: 10,
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


AppRegistry.registerComponent('myoffering', () => myoffering);
