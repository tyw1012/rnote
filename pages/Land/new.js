import React, { Component } from 'react';
import { Picker,TextInput,AppRegistry,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,Modal,FlatList, KeyboardAvoidingView, Image, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, Button, Header } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PopupDialog from 'react-native-popup-dialog';
import ModalPicker from 'react-native-modal-picker';
import SegmentList from './segmentList';

// import Config from './myoffering_config';
import PopupList from './popupList'

const options = ['임대', '매매', '거래완료'];

var previous;
export default class myoffering extends Component{
static navigationOptions= ({navigation}) =>({
      header: null,
      title: '나의 노트',
      headerTitleStyle:{
        fontWeight:'500',
        fontSize:20,
        alignSelf: 'center'
      },
	});

  constructor(props){
    super(props);
    this.state ={
      memberID: '',
      memberName:'',
      email:'',
      level:'',
      minWrite: '',
      isLoaded: false,
      myoffering: [],
      myoffering_all:[],
      myoffering_num:30,
      modalVisible: false,
      selectedSegment: '임대',
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
      countPerLoad: 25,
      offering_count:'',
      isAdding: false,
      isRefreshing: false,
      longPressed:null,
      onCheckMode: false,
      
    };
    console.log(this);
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      console.log(this.state);
    })
  }
  

  setSelectedOption(selectedSegment){

    
    this.setState(previousState => {
      previous = previousState.selectedSegment;
      console.log(previous);
      
      return {
        selectedSegment, 
      };
    }, function(){
        if(previous != this.state.selectedSegment){

          // console.log('working');
          this.setState({isFiltered:false, filterText: '통합검색', myoffering_from: 0});
          const {memberID, memberName, countPerLoad, myoffering_from, selectedSegment, level,} = this.state;
          
          fetch('http://real-note.co.kr/app/getMyOfferingCount.php',{
            method:'post',
            header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({
              memberID: memberID,
              // myoffering_num: myoffering_num,
              level:level,
              memberName: memberName,
              selectedSegment: selectedSegment,
                     
            })
          }).then((res)=>{
            var parsedRes = JSON.parse(res._bodyText);
            console.log(parsedRes[0].count)
            this.setState({offering_count: parsedRes[0].count})
          });  


          fetch('http://real-note.co.kr/app/getMyOffering.php',{
            method:'post',
            header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({
              memberID: memberID,
              // myoffering_num: myoffering_num,
              level, level,
              memberName: memberName,
              selectedSegment: selectedSegment,
              myoffering_from: myoffering_from,
              countPerLoad: countPerLoad,
              
            })
          })
          .then((res)=>{
            var parsedRes = JSON.parse(res._bodyText);
            this.setState({myoffering:parsedRes, myoffering_all:parsedRes,});
            this.setState({isLoaded: true}, function(){console.log(this.state)});
            
          })

        }
       
       this.segmentDialog.dismiss(); 
    });
  }

 
  
  componentDidMount(){

    const {memberID, memberName, selectedSegment,level,myoffering_from, countPerLoad} = this.state;

    fetch('http://real-note.co.kr/app/getMyOfferingCount.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        memberID: memberID,
        // myoffering_num: myoffering_num,
        level:level,
        memberName: memberName,
        selectedSegment: selectedSegment,
               
      })
    }).then((res)=>{
      var parsedRes = JSON.parse(res._bodyText);
      console.log(parsedRes[0].count)
      this.setState({offering_count: parsedRes[0].count})
    });

    fetch('http://real-note.co.kr/app/getMyOffering.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        memberID: memberID,
        // myoffering_num: myoffering_num,
        level:level,
        memberName: memberName,
        selectedSegment: selectedSegment,
        myoffering_from: myoffering_from,
        countPerLoad: countPerLoad,
        
      })
    })
    .then((res)=>{
      var parsedRes = JSON.parse(res._bodyText);
      for(var i =0; i<=parsedRes.length-1; i++){
        parsedRes[i].isChecked = false;
      }
      this.setState({myoffering:parsedRes, myoffering_all:parsedRes,});
      this.setState({isLoaded: true}, function(){console.log(this.state)});
      
    })
    
  }

  _renderHeader(){
    
    if(!this.state.onCheckMode){
      return(
        <Header
        outerContainerStyles={{height: 52, backgroundColor: '#3b4db7'}}
        innerContainerStyles={{ alignItems:'center'}}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={ <Image
          source={require('./rnote_header.png')}
          resizeMode="contain"
          style={{width: 70, padding: 10}}
      />}
        rightComponent={this.state.isFiltered?this._renderFunnel():this._renderSearch()}
      />
      )
    }
    else{
      return(
        <Header
        outerContainerStyles={{height: 52, backgroundColor: '#41434f'}}
        innerContainerStyles={{ alignItems:'center'}}
        leftComponent={<Text style={{color:'#fff', fontSize: 16,}}>매물을 선택하세요.</Text>}
      //   centerComponent={ <Image
      //     source={require('./rnote_header.png')}
      //     resizeMode="contain"
      //     style={{width: 70, padding: 10}}
      // />}
        rightComponent={this._renderClose()}
      />
      )

    }
  
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
 _renderSearch(){
   return (
     <TouchableOpacity
     onPress={()=>{
        this.setState({modalVisible: true})
    }}>
                  <Icon 
                  name="ios-search"
                  size={24}
                  style={{ marginTop:2,color: '#fff'}}
                       
                  />  
    </TouchableOpacity>
   )
 }
 _renderFunnel(){
  return (
    <TouchableOpacity
    onPress={()=>{
      this.setState({filterText:'통합검색', isFiltered:false, myoffering:this.state.myoffering_all })
   }}>
                 <Icon 
                 name="ios-funnel"
                 size={24}
                 style={{ marginTop:2,color: '#fff'}}
                      
                 />              style={{ marginTop:2,color: '#fff'}}
                      
                 />  
   </TouchableOpacity>
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
                padding: 12, marginBottom: 6, backgroundColor:'#3b4cb766', justifyContent:'space-between'
              }
        
            }
            else{
        
              return {
                flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
                padding: 12, marginBottom: 6, backgroundColor:'#aaacae94', justifyContent:'space-between'
              }
            }
    }
    else{

      return {flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
       padding: 12, marginBottom: 6, backgroundColor:'#fff', justifyContent:'space-between'}

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
    console.log(item);
    var offering = this.state.myoffering.slice(0);
    offering[this._findToggledIndex(item)].isChecked = !item.isChecked;
    console.log(offering)
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
      return(
        <TouchableOpacity style={this._touchStyle(item.isChecked)}
          onPress={()=>{ this.state.onCheckMode? this._toggle(item) :this.props.navigation.navigate('Detail', item);}}
          onLongPress={()=>{
            this.setState({longPressed:item},
              function(){this.popupDialog.show()})
            }}
       
            >
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', }}>{item.wr_subject}</Text>
                <View style={this._officeStyle(item.wr_important)}>
                  <Text style={{fontSize: 10, color:'white', textAlign:'center'}}>오피스</Text>
                </View>
              </View>
              <Text style={{fontSize: 12.5,}}>{item.wr_sale_area}</Text>
              {/* <Text style={{fontSize: 13, fontWeight: 'bold'}}>{item.wr_writer}층·{item.wr_area_p}평</Text> */}
            </View>
              <View >
                <Icon 
                  name="ios-checkmark"
                  size={20}
                  style={this._checkStyle(item.isChecked)}
                  />
             </View> 
            <View>
              <View style={{flexDirection:'row'}}>
               
                <Text style={{fontSize: 13, color:'#555', marginTop:2,}}>{item.wr_floor}층·{item.wr_area_p}평 </Text>
                <Text style={{fontSize: 15, fontWeight:'bold', color:'#2b3bb5', textAlign:'right',}}> {item.wr_rent_deposit}/{item.wr_m_rate}만</Text>
              </View>
              <Text style={{fontSize: 13, fontWeight: 'bold',textAlign:'right',}}> 권 {item.wr_premium_o} 합 {this._sum(item.wr_premium_o,item.wr_rent_deposit)}</Text>  
              <Text style={{fontSize: 13, textAlign:'right',}}> {item.wr_code}</Text>           

            </View>

        </TouchableOpacity>
      )
  }

  _onRefresh = () =>{
    if(!this.state.isFiltered){
        const {memberID, memberName, countPerLoad, myoffering_from,selectedSegment,level} = this.state;
        this.setState({myoffering_from: 0, isRefreshing: true, }, function(){

          fetch('http://real-note.co.kr/app/getMyOffering.php',{
            method:'post',
            header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({
              memberID: memberID,
              // myoffering_num: myoffering_num,
              level: level,
              selectedSegment: selectedSegment,
              memberName: memberName,
              myoffering_from: 0,
              countPerLoad: countPerLoad,
              
            })
          })
          .then((res)=>{
            console.log(this.state.myoffering_from)
            var parsedRes = JSON.parse(res._bodyText);
            this.setState({myoffering:parsedRes, myoffering_all:parsedRes, isRefreshing: false,});
            // this.setState({isLoaded: true}, function(){console.log(this.state)});
            console.log(parsedRes);
            
          })


        }) 
        
      }
      else{

      }

  }
  _handleEnd =()=>{
      if(!this.state.isFiltered){

        this.setState({myoffering_from : this.state.myoffering_from + this.state.countPerLoad,
                       isAdding: true,
                      }, function(){
          
                    fetch('http://real-note.co.kr/app/getMyOffering.php',{
                      method:'post',
                      header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                      },
                      body:JSON.stringify({
                        memberID: this.state.memberID,
                        memberName: this.state.memberName,
                        level:this.state.level,
                        myoffering_from: this.state.myoffering_from,
                        countPerLoad: this.state.countPerLoad,
                        selectedSegment: this.state.selectedSegment,
                      })
                    })
                    .then((res)=>{
                      var parsedRes = JSON.parse(res._bodyText);
                      
                      
                      this.setState({
                                     myoffering : [...this.state.myoffering,...parsedRes],
                                     myoffering_all:[...this.state.myoffering_all,...parsedRes],
                                     isAdding: false,
                                    }, function(){ console.log(this.state.myoffering)});
                    
                      // this.setState({isLoaded: true}, function(){console.log(this.state)});
                      
                    })
          
                  });

      }
      else{

        this.setState({myoffering_from : this.state.myoffering_from + this.state.countPerLoad,
          isAdding: true,
         }, function(){

       fetch('http://real-note.co.kr/app/searchByFilter.php',{
         method:'post',
         header:{
           'Accept': 'application/json',
           'Content-type': 'application/json'
         },
         body:JSON.stringify({
           memberID: this.state.memberID,
           memberName: this.state.memberName,
           myoffering_from: this.state.myoffering_from,
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
                       }, function(){ console.log(this.state.myoffering)});
       
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
  _test(){
    console.log('testssss');
  }

  _closeModal() {
    this.setState({
        modalVisible: false
    });
}
	render(){
    // const {params} = this.props.navigation.state;


    if(!this.state.isLoaded){
      return(
        <View>

          <StatusBar backgroundColor="#16236e"/>
          <View>
            <Header
              outerContainerStyles={{height: 52, backgroundColor: '#3b4db7'}}
              innerContainerStyles={{ alignItems:'center'}}
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={ <Image
                source={require('./rnote_header.png')}
                resizeMode="contain"
                style={{width: 70,}}
            />}
              
                
              />
              
          </View>

          <View>
            <View style={{alignItems: 'center'}}>
            <ActivityIndicator style ={{position: 'absolute', marginTop: 250}}/>
            </View>
          </View>

        </View>
      )
    }
    else{
      return(

  	     <View style={styles.container}>

            <StatusBar backgroundColor="#16236e"/>

            {/* 헤더 */}
            <View>
              {this._renderHeader()}
            </View>

            {/* 통화팝업 */}
            <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}            
            dialogStyle ={{elevation:2, width: '80%', height: 80,}}
            >
              
              <PopupList data={this.state.longPressed}
              popupText="임차인에게 전화걸기"/>
            
            </PopupDialog>
           {/* 통화팝업 */}

            {/* 세그먼트팝업 */}
            <PopupDialog
            ref={(popupDialog) => { this.segmentDialog = popupDialog; }}            
            dialogStyle ={{elevation:2, width: '60%', height: 140,}}
            
            >
              
              <SegmentList 
              selectedSegment = {this.state.selectedSegment}
              options={options}
              handler ={this.setSelectedOption.bind(this)}
              />
            
            </PopupDialog>
           {/* 세그먼트팝업 */}

           {/* 매물등록 버튼 */}
           <TouchableOpacity style={{borderRadius:27.5, backgroundColor: '#3b4db7', position: 'absolute',
           bottom: 120, right: 20, width: 55, height: 55, zIndex: 10, elevation: 5, alignItems: 'center'
          , justifyContent: 'center',}}
            onPress={()=>{this.props.navigation.navigate('Writeoffer')}}
            >
            
                 <Icon 
                  name="md-add"
                  size={30}
                  style={{ marginTop:2,color: '#fff'}}
                       
                  />
           </TouchableOpacity>
           {/* 매물등록 버튼 */}


            <View style={styles.buttonWrapper}>
                <View style={{flexDirection:'row',}}>
                 <Text style={{marginLeft:10, fontSize:14,}}>총 </Text>
                 <Text style={{fontWeight:'bold', color:'#3b4db7', fontSize:14}}>{this.state.isFiltered?this.state.offering_count_fltr:this.state.offering_count}</Text>            
                 <Text style={{fontSize:14,}}>{this.state.isFiltered?'개의 매물이 검색되었습니다':'개의 매물이 있습니다'}</Text>
                </View>

             
                
                  <TouchableOpacity style={{flexDirection:'row', marginRight:10, backgroundColor:'#3b4db7', width:85, height:25, padding:3, borderRadius:4, alignItems:'center', justifyContent:'center' }}
                  onPress={()=>this.segmentDialog.show()}>
                  <Text style={{ color:'#fff', fontSize:14, marginRight:5,}}>{this.state.selectedSegment} </Text>
                  <Icon
                  name="ios-arrow-down"
                  size={22}
                  style={{color: '#fff',}}
                  />          
                  </TouchableOpacity>
                
                  {/* <SegmentedControls
                    options={ options }
                    onSelection={ this.setSelectedOption.bind(this) }
                    selectedOption={ this.state.selectedSegment }
                    containerStyle={{width:180, height: 40, marginLeft: 15,}}
                    optionContainerStyle={{justifyContent:'center',}}
                    optionStyle ={{fontSize: 16,}}
                    separatorWidth= {1}
                    containerBorderWidth= {1}
                    tint={'#3b4db7'}
                    selectedTint= {'white'}
                    
                  /> */}
                  
                  
              
              

              {/* <Button
                buttonStyle={{width: 100, height: 40,backgroundColor: '#3b4db7', borderRadius: 5,}}
                title={this.state.filterText}
                onPress={()=>{
                  if(this.state.isFiltered){
                    this.setState({filterText:'통합검색', isFiltered:false, myoffering:this.state.myoffering_all })
                  
                  }
                  else{
                    this.setState({modalVisible: true})
                  }
                                
                }}  
              /> */}
              </View>
            
             {/* 필터 모달창 */}
                  <Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={()=>{this._closeModal()}}
                      >

                      <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#3b4db7', padding:8, height:45, width:'100%'}}>

                          <TouchableOpacity
                          style={{width:40,height:35,backgroundColor:'#3b4db7', padding:10, alignItems:'center', justifyContent:'center' }}
                          onPress={()=>this.setState({modalVisible:false})}>

                            <Icon
                              name="ios-close"
                              size={40}
                              style={{color: '#fff', marginBottom:5}}
                              />     
                          
                          </TouchableOpacity>

                          <Text style={{color: '#fff', fontSize: 16, fontWeight:'bold', marginTop:4}}>통합검색</Text>
                          
                          <TouchableOpacity
                          style={{width:40,height:35,backgroundColor:'#3b4db7', padding:10, alignItems:'center', justifyContent:'center' }}
                          onPress={()=>this.setState({
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
                          })}>

                            <Icon
                              name="ios-refresh"
                              size={30}
                              style={{color: '#fff', marginBottom:5}}
                              />     
                          
                          </TouchableOpacity>

                      </View>
                    
                      <KeyboardAwareScrollView enableOnAndroid={true}
                      keyboardShouldPersistTaps='always'
                      innerRef={ref => {this.scroll = ref}}
                      style={styles.modalContainer}>
                          {/* <KeyboardAvoidingView style={{marginBottom:100}}> */}
                        
                        <View style={styles.inputContainer}>

                          <View style = {[styles.row, {marginTop:6}]}>    

                              <Text style={styles.itemName}>매물명</Text>

                              <TextInput
                              placeholder=""
                              placeholderTextColor='#aaa'
                              style={styles.itemInput}
                              underlineColorAndroid="transparent"
                              value={this.state.nameFilter}
                              onChangeText= {nameFilter => this.setState({nameFilter})}
                              onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                              }}
                              />

                          </View>

                          <View style = {[styles.row, {marginTop:6}]}>    

                              <Text style={styles.itemName}>상권명</Text>

                              <TextInput
                              placeholder=""
                              placeholderTextColor='#aaa'
                              style={styles.itemInput}
                              underlineColorAndroid="transparent"
                              value={this.state.saleAreaFilter}
                              onChangeText= {saleAreaFilter => this.setState({saleAreaFilter})}
                              onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 60)
                              }}
                              />

                          </View>

                          <View style = {[styles.row, {marginTop:6}]}>    

                              <Text style={styles.itemName}>주소</Text>

                              <TextInput
                              placeholder=""
                              placeholderTextColor='#aaa'
                              style={styles.itemInput}
                              underlineColorAndroid="transparent"
                              value={this.state.addrFilter}
                              onChangeText= {addrFilter => this.setState({addrFilter})}
                              onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 120)
                              }}
                              />

                          </View>

                          <View style = {[styles.row, {marginTop:6}]}>    

                              <Text style={styles.itemName}>담당자</Text>

                              <TextInput
                              placeholder=""
                              placeholderTextColor='#aaa'
                              style={styles.itemInput}
                              underlineColorAndroid="transparent"
                              value={this.state.writerFilter}
                              onChangeText= {writerFilter => this.setState({writerFilter})}
                              onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 180)
                              }}
                              />

                          </View>

                          <View style={{flexDirection: 'row',}}>
                          
                                      <View style = {[styles.row, {marginTop:6,}]}>    
                              
                                          <Text style={styles.itemName}>층수</Text>
                              
                                          <TextInput
                                          placeholder=""
                                          placeholderTextColor='#aaa'
                                          style={[styles.itemInput, {position:'relative'}]}
                                          keyboardType='phone-pad'
                                          underlineColorAndroid="transparent"
                                          value={this.state.floorMinFilter}
                                          onChangeText= {floorMinFilter => this.setState({floorMinFilter})}
                                          onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 240)
                                          }}
                                          />
                                          <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>
                                      
                                      </View>
                              
                                      <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
                  
                                      <View style = {[styles.row, {marginTop:6}]}>    
                              
                                              <Text style={styles.itemName}> </Text>
                              
                                          
                                              <TextInput
                                              placeholder=""
                                              placeholderTextColor='#aaa'
                                              style={[styles.itemInput, {}]}
                                              keyboardType='phone-pad'
                                              underlineColorAndroid="transparent"
                                              onChangeText= {floorMaxFilter => this.setState({floorMaxFilter})}
                                              value={this.state.floorMaxFilter}
                                              onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 240)
                                              }}
                                              />                      
                                          
                                              <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>
                                      
                                      </View>
                  
                                      
                          </View>

                          <View style={{flexDirection: 'row',}}>
                          
                                      <View style = {[styles.row, {marginTop:6,}]}>    
                              
                                          <Text style={styles.itemName}>면적</Text>
                              
                                          <TextInput
                                          placeholder=""
                                          placeholderTextColor='#aaa'
                                          style={[styles.itemInput, {position:'relative'}]}
                                          keyboardType='phone-pad'
                                          underlineColorAndroid="transparent"
                                          value={this.state.areaMinFilter}
                                          onChangeText= {areaMinFilter => this.setState({areaMinFilter})}
                                          onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 300)
                                          }}
                                          />
                                          <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                                      
                                      </View>
                              
                                      <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
                  
                                      <View style = {[styles.row, {marginTop:6}]}>    
                              
                                              <Text style={styles.itemName}> </Text>
                              
                                          
                                              <TextInput
                                              placeholder=""
                                              placeholderTextColor='#aaa'
                                              style={[styles.itemInput, {}]}
                                              keyboardType='phone-pad'
                                              underlineColorAndroid="transparent"
                                              onChangeText= {areaMaxFilter => this.setState({areaMaxFilter})}
                                              value={this.state.areaMaxFilter}
                                              onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 300)
                                              }}
                                              />                      
                                          
                                              <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                                      
                                      </View>
                  
                                      
                          </View>
                    
                            

                                {/* <FormLabel labelStyle={styles.formLabel}>면적</FormLabel>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    
                                    <FormInput
                                    inputStyle={styles.formInput}  
                                    placeholder='' 
                                    value={this.state.areaMinFilter}              
                                    onChangeText= {                   
                                        areaMinFilter => this.setState({areaMinFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10,fontSize: 17}}> ~ </Text>
                                    <FormInput
                                    inputStyle={styles.formInput}   
                                    placeholder=''
                                    value={this.state.areaMaxFilter}             
                                    onChangeText= {                   
                                        areaMaxFilter => this.setState({areaMaxFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10, fontSize: 17}}>평</Text>
                                  
                                </View>             */}
                        <View style={{flexDirection: 'row',}}>
                          
                                      <View style = {[styles.row, {marginTop:6,}]}>    
                              
                                          <Text style={styles.itemName}>보증금</Text>
                              
                                          <TextInput
                                          placeholder=""
                                          placeholderTextColor='#aaa'
                                          style={[styles.itemInput, {position:'relative'}]}
                                          keyboardType='phone-pad'
                                          underlineColorAndroid="transparent"
                                          value={this.state.depositMinFilter}
                                          onChangeText= {depositMinFilter => this.setState({depositMinFilter})}
                                          onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 360)
                                          }}
                                          />
                                          <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                              
                                      <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
                  
                                      <View style = {[styles.row, {marginTop:6}]}>    
                              
                                              <Text style={styles.itemName}> </Text>
                              
                                          
                                              <TextInput
                                              placeholder=""
                                              placeholderTextColor='#aaa'
                                              style={[styles.itemInput, {}]}
                                              keyboardType='phone-pad'
                                              underlineColorAndroid="transparent"
                                              onChangeText= {depositMaxFilter => this.setState({depositMaxFilter})}
                                              value={this.state.depositMaxFilter}
                                              onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 360)
                                              }}
                                              />                      
                                          
                                              <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                  
                                      
                          </View>

                          <View style={{flexDirection: 'row',}}>
                          
                                      <View style = {[styles.row, {marginTop:6,}]}>    
                              
                                          <Text style={styles.itemName}>임대료</Text>
                              
                                          <TextInput
                                          placeholder=""
                                          placeholderTextColor='#aaa'
                                          style={[styles.itemInput, {position:'relative'}]}
                                          keyboardType='phone-pad'
                                          underlineColorAndroid="transparent"
                                          value={this.state.mrateMinFilter}
                                          onChangeText= {mrateMinFilter => this.setState({mrateMinFilter})}
                                          onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 420)
                                          }}
                                          />
                                          <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                              
                                      <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
                  
                                      <View style = {[styles.row, {marginTop:6}]}>    
                              
                                              <Text style={styles.itemName}> </Text>
                              
                                          
                                              <TextInput
                                              placeholder=""
                                              placeholderTextColor='#aaa'
                                              style={[styles.itemInput, {}]}
                                              keyboardType='phone-pad'
                                              underlineColorAndroid="transparent"
                                              onChangeText= {mrateMaxFilter => this.setState({mrateMaxFilter})}
                                              value={this.state.mrateMaxFilter}
                                              onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 420)
                                              }}
                                              />                      
                                          
                                              <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                  
                                      
                          </View>

                          <View style={{flexDirection: 'row',}}>
                          
                                      <View style = {[styles.row, {marginTop:6,}]}>    
                              
                                          <Text style={styles.itemName}>권리금</Text>
                              
                                          <TextInput
                                          placeholder=""
                                          placeholderTextColor='#aaa'
                                          style={[styles.itemInput, {position:'relative'}]}
                                          keyboardType='phone-pad'
                                          underlineColorAndroid="transparent"
                                          value={this.state.premoMinFilter}
                                          onChangeText= {premoMinFilter => this.setState({premoMinFilter})}
                                          onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 480)
                                          }}
                                          />
                                          <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                              
                                      <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
                  
                                      <View style = {[styles.row, {marginTop:6}]}>    
                              
                                              <Text style={styles.itemName}> </Text>
                              
                                          
                                              <TextInput
                                              placeholder=""
                                              placeholderTextColor='#aaa'
                                              style={[styles.itemInput, {}]}
                                              keyboardType='phone-pad'
                                              underlineColorAndroid="transparent"
                                              onChangeText= {premoMaxFilter => this.setState({premoMaxFilter})}
                                              value={this.state.premoMaxFilter}
                                              onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 480)
                                              }}
                                              />                      
                                          
                                              <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                  
                                      
                          </View>

                          <View style={{flexDirection: 'row', marginBottom: 60}}>
                          
                                      <View style = {[styles.row, {marginTop:6,}]}>    
                              
                                          <Text style={styles.itemName}>합예산</Text>
                              
                                          <TextInput
                                          placeholder=""
                                          placeholderTextColor='#aaa'
                                          style={[styles.itemInput, {position:'relative'}]}
                                          keyboardType='phone-pad'
                                          underlineColorAndroid="transparent"
                                          value={this.state.sumMinFilter}
                                          onChangeText= {sumMinFilter => this.setState({sumMinFilter})}
                                          onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 540)
                                          }}
                                          />
                                          <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                              
                                      <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
                  
                                      <View style = {[styles.row, {marginTop:6}]}>    
                              
                                              <Text style={styles.itemName}> </Text>
                              
                                          
                                              <TextInput
                                              placeholder=""
                                              placeholderTextColor='#aaa'
                                              style={[styles.itemInput, {}]}
                                              keyboardType='phone-pad'
                                              underlineColorAndroid="transparent"
                                              onChangeText= {sumMaxFilter => this.setState({sumMaxFilter})}
                                              value={this.state.sumMaxFilter}
                                              onFocus={(event: Event) => {
                                              // `bind` the function if you're using ES6 classes
                                              this.scroll.props.scrollToPosition(0, 540)
                                              }}
                                              />                      
                                          
                                              <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                                      
                                      </View>
                  
                                      
                          </View>

                              </View>
                          </KeyboardAwareScrollView>              
                      <TouchableOpacity style={{
                        position: 'absolute', width:'100%', height:45, bottom:0, backgroundColor:'#3b4db7', alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{

                          fetch('http://real-note.co.kr/app/searchByFilterCount.php',{
                            method:'post',
                            header:{
                              'Accept': 'application/json',
                              'Content-type': 'application/json'
                            },
                            body:JSON.stringify({
                              memberID: this.state.memberID,
                              level:this.state.level,
                              memberName: this.state.memberName,
                              boss: this.state.boss,
                              selectedSegment: this.state.selectedSegment,

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
                                    
                            })}).then((res)=>{
                              var parsedRes = JSON.parse(res._bodyText);
                              console.log('count',parsedRes)
                              
                              this.setState({offering_count_fltr: parsedRes[0].count})
                            }); 


                          fetch('http://real-note.co.kr/app/searchByFilter.php', {
                            method: 'POST',
                            headers:{
                              'Accept': 'application/json',
                              "Accept-Encoding": "gzip, deflate",
                              'Content-type': 'application/json',
                            },
                            body:JSON.stringify({
                              
                              memberID: this.state.memberID,
                              memberName: this.state.memberName,
                              level: this.state.level,
                              boss: this.state.boss,
                              selectedSegment: this.state.selectedSegment,
                              myoffering_from: 0,
                              countPerLoad: this.state.countPerLoad,

                              //filter
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
                            console.log(JSON.parse(res._bodyText));
                            this.setState({modalVisible:false, myoffering:parsedRes, isFiltered:true, filterText:'필터해제'})
                          })
                          
                        }}
                        >
                          <Text style={{fontSize: 16, fontWeight:'bold', color: '#fff'}}>필터적용</Text>
                      </TouchableOpacity> 

                  </Modal>
            {/* 필터 모달창 */}             
            {/* <ListView dataSource={this.state.myoffering} renderRow = {(rowData) => this._renderRow(rowData)}>
            </ListView>  */}

            <FlatList data ={this.state.myoffering}
                style={{marginBottom:110, marginTop:15}}
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
    backgroundColor:'#f1f1f1'
	},
  buttonWrapper:{
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent:'space-between',
    marginTop: 10,
   
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


AppRegistry.registerComponent('myoffering', () => myoffering);
