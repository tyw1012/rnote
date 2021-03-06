import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,TouchableOpacity,KeyboardAvoidingView,Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import writeoffer_second from './writeoffer_second';

const options = ['임대', '매매'];
var previous;
var self;

export default class writeoffer extends Component {
  static navigationOptions= ({navigation}) =>{ 
    if(navigation.state.params.mode=='edit'){
      return (
        {
        headerLeft: <TouchableOpacity 
        onPress={()=>{self.props.navigation.goBack(null);  }}
        style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:20}}>
          <Icon
          name="md-close"
          size={30}
          style={{color:'#fff'}}
          />
        </TouchableOpacity>,
        headerRight:      <TouchableOpacity style={{padding:5, paddingLeft:20, paddingRight:20,}}
                          onPress ={()=>{self._goNext();}}>
                            <Icon
                            name='ios-arrow-forward'
                            size={25}
                            style={{color:'#fff'}}/>
                          </TouchableOpacity>     ,                     
                    
        title:'매물정보 수정',
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
        headerTintColor: 'white',
        }
      )
    }
    else{
        return (
          {
            headerLeft: <TouchableOpacity 
                        onPress={()=>{self.props.navigation.goBack(null);  }}
                        style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:20}}>
                        <Icon
                        name="md-close"
                        size={30}
                        style={{color:'#fff'}}
                        />
                       </TouchableOpacity>,
          headerRight:  <TouchableOpacity style={{padding:5, paddingLeft:20, paddingRight:20, }}
                        onPress ={()=>{self._goNext();}}>
                          <Icon
                          name='ios-arrow-forward'
                          size={25}
                          style={{color:'#fff',}}/>
                        </TouchableOpacity>     ,   
          title: '매물등록 - 임대',
          headerTitleStyle: {color:'white',fontSize:16, fontWeight:'100'},
          headerStyle: {
            backgroundColor: '#3b4db7',
            elevation:0,
            height: 52,
            
          },
          headerTintColor: 'white',
          }
        )
    }

};

	constructor(props){
		super(props)
		this.state={
                     
            wr_addressList:[],
            columnChange:0,
       
       
    }
      self=this;
	}

  componentWillMount(){
    // console.log('dev')
    const {params} = this.props.navigation.state;
  
    this.setState(
    { 
      mode: params.mode,
      memberID: params.memberID,
      memberName: params.memberName,
      contact:params.contact,
      bld_id: params.bld_id,
      bld_name: params.bld_name,
      bld_address: params.bld_address,
      bld_contact: params.bld_contact,
      bld_floor: params.bld_floor,
      bld_Bfloor: params.bld_Bfloor,
      bld_subway: params.bld_subway,
      bld_firstRoomNumber: params.bld_firstRoomNumber,
      bld_roomPerFloor: params.bld_roomPerFloor,
      bld_posx: params.bld_posx,
      bld_posy: params.bld_posy,
      
    }, function(){
      this.state.bld_firstRoomNumber==0?
      this.setState({bld_firstRoomNumber: "1"}) : null
      this.props.navigation.state.params={};
      
   })

  }
 

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }

  _goNext(){

   
    var contact_dash = this.state.bld_contact!=undefined?
    this.state.bld_contact.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"):'';

    if (this.state.bld_floor == undefined ){
      alert('호실정보 작성을 위해 건물층수를 입력해주세요.')
        return
    }

    if (this.state.bld_roomPerFloor == undefined ){
      alert('호실정보 작성을 위해 층당 최대 호실수를 입력해주세요.')
        return
    }

    if ( parseInt(this.state.bld_floor) <= 0  ){
      alert('건물층수는 최소 1층부터 입력하실 수 있습니다.')
        return
    }
    if ( parseInt(this.state.bld_floor) > 8 ){
      alert('건물층수는 최대 10층까지 입력하실 수 있습니다.')
        return
    }
    if ( parseInt(this.state.bld_roomPerFloor) <= 0  ){
      alert('층당 최대 호실수는 최소 1개부터 입력하실 수 있습니다.')
        return
    }
    if ( parseInt(this.state.bld_roomPerFloor) > 10 ){
      alert('건물층수는 최대 10개까지 입력하실 수 있습니다.')
        return
    }

    if(
     (
      (writeoffer_second.getState('bld_roomPerFloor') === this.state.bld_roomPerFloor)
    &&(writeoffer_second.getState('bld_floor') === this.state.bld_floor)
    &&(writeoffer_second.getState('bld_Bfloor') === this.state.bld_Bfloor)
    &&(writeoffer_second.getState('bld_firstRoomNumber') === this.state.bld_firstRoomNumber)
    ) 
    || (
      (writeoffer_second.getState('bld_roomPerFloor') ==undefined)
    &&(writeoffer_second.getState('bld_floor') ==undefined)
    &&(writeoffer_second.getState('bld_Bfloor') ==undefined)
    &&(writeoffer_second.getState('bld_firstRoomNumber') ==undefined)
    )
     

  //  (writeoffer_second.getState('bld_roomPerFloor') === this.state.bld_roomPerFloor || writeoffer_second.getState('bld_roomPerFloor') ==undefined)
  //  && (writeoffer_second.getState('bld_floor') === this.state.bld_floor || writeoffer_second.getState('bld_floor') ==undefined)
  //  && (writeoffer_second.getState('bld_Bfloor') === this.state.bld_Bfloor || writeoffer_second.getState('bld_Bfloor') ==undefined)
  //  && (writeoffer_second.getState('bld_firstRoomNumber') === this.state.bld_firstRoomNumber|| writeoffer_second.getState('bld_firstRoomNumber') ==undefined)
 )
   {
      this.setState( {bld_contact: contact_dash},
      function(){
        this.props.navigation.navigate('Second',this.state)
        setTimeout(function(){
          writeoffer_second.updateFigures();
        }, 200)
      }) 
    
   }
 else{

   Alert.alert(
     '해당 정보 중 일부가 수정되어 호실정보가 초기화됩니다.',
     '건물층수, 층당 최대 호실 수, 지하층수, 첫호실번호',
     [
       
       {text: '취소', onPress: () => {}, style: 'cancel'},
       {text: '확인', onPress: () => {

        //수정모드에서 호실이 초기화 되면 Insert 되어야함 
         if(this.state.mode == 'edit'){

          this.setState( {bld_contact: contact_dash, roomsShouldBeInserted: true,},
            function(){
              this.props.navigation.navigate('Second',this.state)
              setTimeout(function(){
                writeoffer_second.updateFigures();
              }, 200)
            }) 

         }
         else{
          this.setState( {bld_contact: contact_dash},
            function(){
              this.props.navigation.navigate('Second',this.state)
              setTimeout(function(){
                writeoffer_second.updateFigures();
              }, 200)
            }) 

         }
            

       } },
     ],
     { cancelable: false }
   )

 }
        
 

  }


  render() {

    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 1
    }
   
    return (
   
    
    <KeyboardAwareScrollView enableOnAndroid={true}
    keyboardShouldPersistTaps='always'
    innerRef={ref => {this.scroll = ref}}
    style={styles.container}>
        
         
        <View>

          <View style = {[styles.row, {marginTop:0}]}>    

              <Text style={styles.itemName}>건물명 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

              <TextInput
              placeholder=""
              onSubmitEditing={(event) => { 
                this.refs.SecondInput.focus(); 
              }}
              blurOnSubmit={false}
              returnKeyType = {"next"}
              placeholderTextColor='#aaa'
              style={styles.itemInput}
              underlineColorAndroid="transparent"
              onChangeText= {bld_name => this.setState({bld_name})}
              value={this.state.bld_name}
              onFocus={(event: Event) => {
                // `bind` the function if you're using ES6 classes
                this.scroll.props.scrollToPosition(0, 0)
               }}
              />
           
          </View>

          <View style = {styles.row}>    

              <Text style={styles.itemName}>건물주소 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

              <View style={{flexDirection:'row', flex: 7.25}}>
                  <TextInput
                  placeholder=" 읍/면/동 혹은 도로명 검색"
                  ref='SecondInput'
                  onSubmitEditing={(event) => { 
                    this.refs.ThirdInput.focus(); 
                  }}
                  blurOnSubmit={false}
                  returnKeyType = {"next"}
                  blurOnSubmit={false}
                  placeholderTextColor='#aaa'
                  style={[styles.itemInput, {flex: 8, borderRightWidth:0,}]}
                  underlineColorAndroid="transparent"
                  onChangeText= {bld_address => this.setState({bld_address})}
                  value={this.state.bld_address}
                  onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                  }}
                  />

                  <TouchableOpacity
                    
                    onPress={()=>{
                        fetch(`http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=15&keyword='${this.state.bld_address}'&confmKey=U01TX0FVVEgyMDE3MTExNTIwNTg0NDEwNzQ4NjI=&resultType=json`)
                        .then((res)=>res.json())
                        .then((text)=>{
                          this.setState({wr_addressList: text.results.juso});
                          })
                        Keyboard.dismiss();
                    }}
                    style={{ flex:2, backgroundColor:'#fff', height: 35, alignItems: 'flex-end', justifyContent:'center', borderBottomWidth:1, borderColor: '#e6e6e6', paddingRight:10}}
                    >
                    {/* <Text style={{color:'white', fontSize: 13,}}>검색</Text> */}
                    <Icon 
                      name="ios-search"
                      size={22}
                      style={{ color: '#666'}}
                          
                      />
                    
                  </TouchableOpacity>  
               </View>
          </View>
          <View>
              <FlatList           
                data ={this.state.wr_addressList}
                keyExtractor ={(x,i)=>i}
                renderItem ={({item}) =><TouchableOpacity onPress = {()=>{this.setState({wr_addressList: [] }); this.setState({bld_address: /.*(동|가|읍|면|리|산) [0-9-산]+/.exec(item.jibunAddr)[0]});
                    fetch(`https://apis.daum.net/local/geo/addr2coord?apikey=306678a15ccad514fa75a3b1ae02b091&q=${/.*(동|가|읍|면|리|산) [0-9-산]+/.exec(item.jibunAddr)[0]}&output=json`)
                    .then((res)=> res.json())
                    .then((text)=> { var coord = text.channel.item[0];
                      this.setState({bld_posx : coord.point_x, bld_posy : coord.point_y})
                    })
                }}>
                <View style={{margin:10,marginLeft:13,}}>
                <Text style={{fontSize: 15}}>{item.jibunAddr}</Text>
                </View>
                </TouchableOpacity>} />
          </View>
     
          <View style={{flexDirection: 'row',}}>
          <View style = {[styles.row,{marginRight:20}]}>    

              <Text style={styles.itemName}>건물주연락처</Text>

              <TextInput
              placeholder=" 숫자만 입력해주세요"
              placeholderTextColor='#aaa'
              keyboardType='phone-pad'
              ref='FifthInput'
              onSubmitEditing={(event) => { 
                this.props.navigation.navigate('Second',this.state)                
              }}
              blurOnSubmit={false}
              returnKeyType = {"next"}
              style={styles.itemInput}
              underlineColorAndroid="transparent"
              onChangeText= {bld_contact => this.setState({bld_contact})}
              value={this.state.bld_contact}
              onFocus={(event: Event) => {
                // `bind` the function if you're using ES6 classes
                this.scroll.props.scrollToPosition(0, 240)
               }}
              />

         
          </View>

          <View style = {styles.row}>    

            <Text style={styles.itemName}>인근 지하철역</Text>

            <TextInput
            placeholder=""
            placeholderTextColor='#aaa'
            // keyboardType='phone-pad'
            ref='FifthInput'
            onSubmitEditing={(event) => { 
              this.props.navigation.navigate('Second',this.state)                
            }}
            blurOnSubmit={false}
            returnKeyType = {"next"}
            style={styles.itemInput}
            underlineColorAndroid="transparent"
            onChangeText= {bld_subway => this.setState({bld_subway})}
            value={this.state.bld_subway}
            onFocus={(event: Event) => {
              // `bind` the function if you're using ES6 classes
              this.scroll.props.scrollToPosition(0, 240)
            }}
            />

            </View>

          </View>

          
          <View style={{flexDirection: 'row',}}>

            <View style = {[styles.row, {marginRight:20}]}>    

                <Text style={styles.itemName}>건물층수 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

                <TextInput
                placeholder="최대 9"
                placeholderTextColor='#aaa'
                blurOnSubmit={false}
                onSubmitEditing={(event) => { 
                  this.refs.SecondInput.focus(); 
                }}
                returnKeyType = {"next"}
                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                keyboardType='phone-pad'
                underlineColorAndroid="transparent"
                onChangeText= {bld_floor => this.setState({bld_floor})}
                value={this.state.bld_floor}
                onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                }}
                />
         
                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>

            </View>



            <View style = {[styles.row,]}>    

                    <Text style={styles.itemName}>층당 최대 호실수 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>

                
                    <TextInput
                    placeholder="최대 10"
                    placeholderTextColor='#aaa'
                    style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                    ref='SecondInput'
                    onSubmitEditing={(event) => { 
                      this.refs.ThirdInput.focus(); 
                    }}
                    blurOnSubmit={false}
                    returnKeyType = {"next"}                            
                    keyboardType='phone-pad'
                    underlineColorAndroid="transparent"
                    onChangeText= {bld_roomPerFloor => this.setState({bld_roomPerFloor})}
                    value={this.state.bld_roomPerFloor}
                    onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />                      

             
                  <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>개</Text>

            </View>


            </View>

            <View style={{flexDirection: 'row',}}>

            <View style = {[styles.row, {marginRight:20}]}>    

                <Text style={styles.itemName}>지하층수 </Text>

                <TextInput
                placeholder=""
                placeholderTextColor='#aaa'
                blurOnSubmit={false}
                onSubmitEditing={(event) => { 
                  this.refs.SecondInput.focus(); 
                }}
                returnKeyType = {"next"}
                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                keyboardType='phone-pad'
                underlineColorAndroid="transparent"
                onChangeText= {bld_Bfloor => this.setState({bld_Bfloor})}
                value={this.state.bld_Bfloor}
                onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                }}
                />
       
                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>

            </View>



            <View style = {[styles.row,]}>    

                    <Text style={styles.itemName}>첫호실 숫자 </Text>

                
                    <TextInput
                    placeholder="미입력시 1"
                    placeholderTextColor='#aaa'
                    style={[styles.itemInput,{ paddingBottom:0}]}
                    ref='SecondInput'
                    onSubmitEditing={(event) => { 
                      this.refs.ThirdInput.focus(); 
                    }}
                    blurOnSubmit={false}
                    returnKeyType = {"next"}                            
                    keyboardType='phone-pad'
                    underlineColorAndroid="transparent"
                    onChangeText= {bld_firstRoomNumber => this.setState({bld_firstRoomNumber})}
                    value={this.state.bld_firstRoomNumber}
                    onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />                      

                  

            </View>


            </View>

            

            <View style={{flexDirection:'row', marginTop:20}}>

            <CheckBox
            checkedColor='#3b4db7'
            // uncheckedIcon={null}
            // checkedIcon={null}            
            title={'주차가능'}
            containerStyle={{backgroundColor:'#fff',borderWidth:0, height:35, marginTop:-7, paddingRight:0, marginRight:0, paddingLeft:0, marginLeft: 0}}
            textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
            checked={this.state.bld_hasParking}
            onPress={()=>{
             this.setState({bld_hasParking : !this.state.bld_hasParking})
                    
            }}/> 

            <CheckBox
            checkedColor='#3b4db7'
            // uncheckedIcon={null}
            // checkedIcon={null}            
            title={'엘리베이터'}
            containerStyle={{backgroundColor:'#fff',borderWidth:0, height:35, marginTop:-7, paddingRight:0, marginRight:0,}}
            textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
            checked={this.state.bld_hasElev}
            onPress={()=>{
             this.setState({bld_hasElev : !this.state.bld_hasElev})
                  
            }}/> 

          </View>

          <View style = {[styles.row,]}> 
          <Text style={styles.itemName}>기타사항 </Text> 
          <TextInput
          placeholder=" 기타내용"
          placeholderTextColor='#aaa'
          ref='FifthInput'
          onSubmitEditing={(event) => { 
            this.refs.SixthInput.focus(); 
          }}
          blurOnSubmit={false}
          returnKeyType = {"next"}
          multiline = {true}
          numberOfLines = {5}
          style={[styles.itemInput, {borderWidth:1,height:75, padding:10,paddingLeft:5, textAlignVertical:'top'}]}
          underlineColorAndroid="transparent"
          onChangeText= {bld_memo => this.setState({bld_memo})}
          value={this.state.bld_memo}
          onFocus={(event: Event) => {
              // `bind` the function if you're using ES6 classes
              this.scroll.props.scrollToPosition(0, 100)
          }}
          />
          </View>

            </View>

            <TouchableOpacity
            onPress={()=>{

              this._goNext();                
              
            }}
            style={{marginBottom:40,marginTop:40,backgroundColor:'#fff',width:'100%', height: 45, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#3b4db7'}}>
            <Text style={{color:'#3b4db7', fontSize: 13,}}>다음</Text>
          </TouchableOpacity>
           
     {/* </KeyboardAvoidingView>
     </ScrollView> */}
     </KeyboardAwareScrollView >
     

   );
  }
}

const styles = StyleSheet.create({
  container: {
    
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:20,
    backgroundColor: '#fff',
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
    // flexDirection:'row',
    marginTop: 23,
    
  },
  itemName:{
    // marginTop:5,
    marginBottom:5,
    fontSize: 13,
    fontWeight:'bold',
    color: '#666',
    flex:2.75,    
  
  },
  itemInput:{
    flex:7.25,
    height:35,    
    fontSize: 13,
    borderColor:"#e6e6e6",
    backgroundColor: "#fff",
    // borderRadius: 3,
    borderBottomWidth: 1,
    padding:5,
    paddingLeft: 0,
   
    // borderWidth:1
  },
  formLabel:{
    fontSize: 16,
  },
  formInput:{
    borderBottomWidth: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('writeoffer', () => writeoffer);
