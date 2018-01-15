import React, { Component } from 'react';
import { TextInput,AppRegistry,Keyboard,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,FlatList, Image, StatusBar, AsyncStorage, BackHandler,Alert } from 'react-native';
import { Button, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swipeout from 'react-native-swipeout';
import PopupDialog from 'react-native-popup-dialog';
// import call from 'react-native-phone-call';
import CreateFolderPopup from './createFolderPopup';
import ChangeFolderPopup from './changeFolderPopup';
import { NavigationActions } from 'react-navigation';

import SegmentList from './segmentList';

import PopupList from './popupList';
import FilterModal from './filterModal';

const options = ['임대', '매매', '거래완료'];
var swipeSettings;
var previous;
var self;

export default class getBookmark extends Component{
static navigationOptions= ({navigation}) =>({
      // header: null,
      // tabBarVisible: `${navigation.state.params.tabVisible}`,
      headerLeft:null,
       title:'즐겨찾기',
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
       self.popupDialog.show()
     }}>
                   <Icon 
                   name="create-new-folder"
                   size={26}
                   style={{ marginRight:5,color: '#fff'}}
                        
                   />  
     </TouchableOpacity>,    
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
      selectedSegment: '임대',
      selectedSegment_before:'',
      selectedIndex:0,
      isFiltered:false,
      filterText:'통합검색',
      myoffering_from: 0, 
      countPerLoad: 30,
      offering_count:'',
      offering_count_fltr:'',
      isAdding: false,
      isRefreshing: false,
      isSegmentChanging:false,
      longPressed:'',
      onCheckMode: false,
      onWriteOfferMode: false,
      tabVisible: '',
      
      
    };
    //스태틱 함수용
    self=this;
    
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      // console.log('bookmark state', this.state)
    })

  }
  
  _renderIndicator(){
    return (
      
       <View style={{width:'100%',alignItems: 'center'}}>
              
       <ActivityIndicator size='large' style ={{position: 'absolute', top: 200, zIndex:10,}}/>

       </View>
   )

  }

 
  componentDidMount(){

    const {memberID, memberName, boss,selectedSegment,level,myoffering_from, countPerLoad,selectedOfferingType} = this.state;

    
    fetch('http://real-note.co.kr/app3/getBookmark.php',{
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
        boss: boss,
              
      })
    })
    .then((res)=>{
    
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_folder = JSON.parse(res._bodyText).folder;
     
      
      for(var i =0; i<=parsedRes_folder.length-1; i++){
        
        
        parsedRes_folder[i].data = [];
        
        for(var j = 0; j<=parsedRes.length-1; j++){

          if(parsedRes[j].bm_from==2){
            parsedRes[j].level = this.state.level;
          }
          

          if(parsedRes_folder[i].bmf_id == parsedRes[j].bm_bmf_id){

            parsedRes_folder[i].data.push(parsedRes[j])

          }

        }

      }
      // console.log('parsedRes', parsedRes);
      // console.log('parsedRes_folder', parsedRes_folder);
      // console.log('matchObj', matchObj);
      this.setState({bookmark:parsedRes_folder, bookmark_all: parsedRes_folder,});
      

    })
    
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

 _renderFunnel(){
  return (
   
                 <Icon 
                 name="ios-funnel"
                 size={24}
                 style={{ marginTop:2,color: '#fff'}}
                      
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
  _renderRow({item}){

        swipeSettings = {
          autoClose: true,
          right:[
            {
              onPress: ()=>{

                Alert.alert(
                  `'${item.bmf_name}' 폴더를 삭제하시겠습니까?`,
                  `폴더 내 북마크 정보는 모두 소실됩니다.` ,
                  [
                    
                    {text: '취소', onPress: () => {}, style: 'cancel'},
                    {text: '삭제', onPress: () => {

                      fetch('http://real-note.co.kr/app3/deleteBookmarkFolder.php',{
                        method:'post',
                        header:{
                          'Accept': 'application/json',
                          'Content-type': 'application/json'
                        },
                        body:JSON.stringify({
                          // selectedOfferingType: selectedOfferingType,
                          memberID: this.state.memberID,
                          // myoffering_num: myoffering_num,
                          bmf_id: item.bmf_id,
                                                   
                        })
                      })
                      .then((res)=>{    
                      
                        alert('삭제되었습니다.')
                        this._onRefresh();
                        
                      })
                      
                     
                    }},
                  ],
                  { cancelable: false }
                )
                
            
              },
              
              component: <View style={{flex:1,flexDirection:'row',backgroundColor:'#db343f', marginBottom:4, justifyContent:'center', alignItems:'center',}}><Text style={{color:'#fff', fontSize:14, textAlign:'center'}}>폴더삭제</Text></View>,
              backgroundColor:'transparent'
            }
          ]        
        }
      return(
        <Swipeout {...swipeSettings}
        backgroundColor='#f1f1f1'>
        
        <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
       padding: 12, marginBottom: 4, backgroundColor:'#fff', }}
          onPress={()=>{ this.state.onCheckMode? this._toggle(item) :
            this.props.navigation.navigate('BookmarkList',
             {...item, memberID: this.state.memberID, memberName: this.state.memberName, contact: this.state.contact, segment:this.state.selectedSegment,}
            )}}
          onLongPress={()=>{
            
            }}
       
            >
          <Icon
          name="folder"
          size={30}
          style={{color:'#d0d4db'}}
          />
           <Text style={{marginTop:5, marginLeft:15}}>{item.bmf_name}</Text>

        </TouchableOpacity>
       
        </Swipeout>
      )
  }

  _onRefresh = () =>{

    fetch('http://real-note.co.kr/app3/getBookmark.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        selectedOfferingType: this.state.selectedOfferingType,
        memberID: this.state.memberID,
        // myoffering_num: myoffering_num,
        level:this.state.level,
        memberName: this.state.memberName,
        boss: this.state.boss,
        // selectedSegment: selectedSegment,
        // myoffering_from: myoffering_from,
        // countPerLoad: countPerLoad,
        
      })
    })
    .then((res)=>{
      // console.log(res);
    
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_folder = JSON.parse(res._bodyText).folder;
     
      
      for(var i =0; i<=parsedRes_folder.length-1; i++){
        
        
        parsedRes_folder[i].data = [];
        
        for(var j = 0; j<=parsedRes.length-1; j++){

          if(parsedRes[j].bm_from==2){
            parsedRes[j].level = this.state.level;
          }
          

          if(parsedRes_folder[i].bmf_id == parsedRes[j].bm_bmf_id){

            parsedRes_folder[i].data.push(parsedRes[j])

          }

        }

      }
      // console.log('parsedRes', parsedRes);
      // console.log('parsedRes_folder', parsedRes_folder);
      // console.log('matchObj', matchObj);
      this.setState({bookmark:parsedRes_folder, bookmark_all: parsedRes_folder});
      

    })

  }
  _handleEnd =()=>{
      if(!this.state.isFiltered){


      }
      else{

        this.setState({myoffering_from : this.state.myoffering_from + this.state.countPerLoad,
          isAdding: true,
         }, function(){

       fetch('http://real-note.co.kr/app3/searchByFilter.php',{
         method:'post',
         header:{
           'Accept': 'application/json',
           'Content-type': 'application/json'
         },
         body:JSON.stringify({
           selectedOfferingType:this.state.selectedOfferingType,
           memberID: this.state.memberID,
           memberName: this.state.memberName,
           myoffering_from: this.state.myoffering_from,
           countPerLoad: this.state.countPerLoad,
           selectedSegment: this.state.selectedSegment,
          //  selectedIndex: options.indexOf(this.state.selectedSegment),
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
           depositMin: this.state.depositMinFilter,
           depositMax: this.state.depositMaxFilter,
           mrateMin: this.state.mrateMinFilter,
           mrateMax: this.state.mrateMaxFilter,
           premoMin: this.state.premoMinFilter,
           premoMax: this.state.premoMaxFilter,
           sumMin: this.state.sumMinFilter,
           sumMax: this.state.sumMaxFilter,
         })
       })
       .then((res)=>{
         var parsedRes = JSON.parse(res._bodyText);
         
         
         this.setState({
                        myoffering : [...this.state.myoffering,...parsedRes],
                        myoffering_all:[...this.state.myoffering_all,...parsedRes],
                        isAdding: false,
                       });
       
         // this.setState({isLoaded: true}, function(){console.log(this.state)});
         
       })

     });

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
                  filterText:'필터해제',
                 })

 }
_createNewFolder(){

  fetch('http://real-note.co.kr/app3/createBookmarkFolder.php',{
    method:'post',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body:JSON.stringify({
      selectedOfferingType: this.state.selectedOfferingType,
      memberID: this.state.memberID,
      bmf_name: this.state.newName,     
    })
  })
  .then((res)=>{console.log(res); return res.json()})
  .then((json) =>{
    if (json.error){
       
      if(json.item=='no_value'){
        alert("폴더 이름을 입력해주세요.")
      }
      else{
        alert("똑같은 이름의 폴더가 이미 존재합니다.")
      }
      

    }
    else{
      this._onRefresh();
      this.setState({newName:''})
      this.popupDialog.dismiss();
      Keyboard.dismiss();
      
     }
 
   })

}
_newFolderNameHandler(input){
  this.setState({newName:input});

} 
_nameChangeHandler(input){

  this.setState({changeName:input});
  // const setParamsAction = NavigationActions.setParams({
  //   params: { tabVisible: false },
    
  // })
  // this.props.navigation.dispatch(setParamsAction)
  // this2= this;
  // setTimeout(function(){
  //   console.log(this2.props.navigation)
  // }, 1000);
  
  // this.props.navigation.setParams({ visible:false })
 
}
_updateFolder(){

  fetch('http://real-note.co.kr/app3/changeBookmarkFolder.php',{
    method:'post',
    header:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body:JSON.stringify({
      memberID: this.state.memberID,
      bmf_name: this.state.changeName,  
      bmf_id: this.state.longPressed.bmf_id,  
        
    })
  })
  .then((res)=>{console.log(res); return res.json()})
  .then((json) =>{
    if (json.error){
       
      if(json.item=='no_value'){
        alert("폴더 이름을 입력해주세요.")
      }
      else{
        alert("똑같은 이름의 폴더가 이미 존재합니다.")
      }
      

    }
    else{
      this._onRefresh();
      this.setState({changeName:''})
      this.changeDialog.dismiss();
      Keyboard.dismiss();
      
     }
 
   })


}

	render(){

    return(
      <View style={styles.container}>

        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}            
          dialogStyle ={{elevation:2, width: '80%', height: 150, position:'absolute', top:45}}
          >
            
            <CreateFolderPopup 
            inputHandler={this._newFolderNameHandler.bind(this)}
            submitHandler={this._createNewFolder.bind(this)}
            cancelHandler={()=>{this.popupDialog.dismiss()}}
            // tabHandler={this._tabHandler.bind(this)()}
            />
          
        </PopupDialog>

        <PopupDialog
          ref={(popupDialog) => { this.changeDialog = popupDialog; }}            
          dialogStyle ={{elevation:2, width: '80%', height: 150, position:'absolute', top:45}}
          >
            
            <ChangeFolderPopup 
            inputHandler={this._nameChangeHandler.bind(this)}
            submitHandler={this._updateFolder.bind(this)}
            cancelHandler={()=>{this.changeDialog.dismiss()}}
            originalName={this.state.longPressed.bmf_name}
           
            />
          
        </PopupDialog>
        

        <View style={{padding:10,paddingLeft:15, paddingRight:15, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#fff', borderBottomWidth:1.5, borderColor:'#e1e1e1'}}>
                <View style={{flexDirection:'row', }}>
                <Text style={{ marginTop:3, fontSize: 12}}>총 </Text>
                <Text style={{color:'#3b4db7', fontWeight:'bold', marginTop:3, fontSize: 12}}>{this.state.bookmark==undefined?0:this.state.bookmark.length}</Text>
                <Text style={{ marginTop:3, fontSize: 12}}>개의 폴더 </Text>
                </View>

                <View>
                    <TextInput
                    style={{borderBottomWidth:1, width:150, height:30, padding:5, fontSize:13, marginTop:-5, borderColor:'#e1e1e1'}}
                    placeholder="폴더명 검색"
                    onChangeText= {input => {
                        
                        filtered = this.state.bookmark.filter(function(val){return val.bmf_name.includes(input.toUpperCase()) || val.bmf_name.includes(input.toLowerCase()) || val.bmf_name.includes(input)});
                        this.setState({
                            bookmark:filtered,
                            // isFiltered:true
                        })
                        if (input==''){

                            this.setState({
                                bookmark:this.state.bookmark_all
                                // isFiltered:false,
                            })

                        }
                    }}
                    />
                    <Icon
                     name="search"
                     size={18}
                     style={{color:'#aaa', position:'absolute', right:3, top:0,}}
                    />
                </View>
        </View>

        <FlatList data ={this.state.bookmark}
                ref={(ref) => { this.flatListRef = ref; }}
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


const styles = StyleSheet.create({
	container:{
    display:'flex',
    flex:1,
    backgroundColor:'#f1f1f1'
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


AppRegistry.registerComponent('getBookmark', () => getBookmark);
