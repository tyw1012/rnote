import React, { Component } from 'react';
import { TextInput,AppRegistry,View,Text,StyleSheet,ActivityIndicator,TouchableOpacity,FlatList, Image, StatusBar, AsyncStorage,Alert } from 'react-native';
import { Button, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from 'react-navigation'



const options = [ '원룸','아파트','상가','토지'];
var swipeSettings;
var previous;
var self;

export default class functionList extends Component{
static navigationOptions= ({navigation}) =>({
     
  headerLeft:null,
  title:'설정',
  headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
  headerStyle: {
     backgroundColor: '#3b4db7',
     elevation:0,
     height: 52,          
  },
 headerTintColor: 'white',    
      swipeEnabled:false,
  });
  


  constructor(props){
    super(props);
    this.state ={
                 
    };
    //스태틱 함수용
    self=this;
    
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      
    })
  }
  

  handleIndexChange = (index) => {
    this.setState(previousState => {
      previous = previousState.selectedOfferingType;
            
      return {
        selectedOfferingType: options[index]
      }
    }, function(){

      if(previous != this.state.selectedOfferingType){

        Alert.alert(
          '변경사항을 저장 하시겠습니까?',
          '확인을 누르면 앱이 재실행됩니다.',
          [
            
            {text: '취소', onPress: () => { this.setState({selectedOfferingType: previous})}, style: 'cancel'},
            {text: '확인', onPress: () => {

              this._saveTypeAndRefresh(index);

            }},
          ],
          { cancelable: false }
        )
       
       
    }

    })
  }

  // setSelectedOption(selectedOfferingType){

    
  //   this.setState(previousState => {
  //     previous = previousState.selectedOfferingType;
            
  //     return {
  //       selectedOfferingType, 
  //     };
  //   }, function(){
  //       if(previous != this.state.selectedOfferingType){

  //           this._saveTypeAndRefresh();

  //       }
       
      
  //   });
  // }

  _saveTypeAndRefresh(type){

    fetch('http://real-note.co.kr/app3/saveSelectedOfferingType.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        memberID: this.state.memberID,
        memberName: this.state.memberName,
        contact: this.state.contact,
        email: this.state.email,
        level: this.state.level=='office'?'gr_admin':'',
        minWrite: this.state.minWrite,
        boss: this.state.boss,
        selectedOfferingType: (type+1).toString(), //index+1
        
      })
    })
    .then((response) => response.json())
		 .then((responseJson)=>{
      
         AsyncStorage.removeItem('token');
         AsyncStorage.setItem('token', responseJson['token']);
         
         const resetAction = NavigationActions.reset({
          index: 0,
          // stateName: 'test',
          key: null,
          actions: [
            // NavigationActions.navigate({ routeName: 'MainNavigator2'}),
            {
              type: 'Navigation/INIT',
              routeName: `MainNavigator${(type+1)}`, // index+1
              params: {
                memberID: this.state.memberID,
                memberName: this.state.memberName,
                email: this.state.email,
                contact:this.state.contact,
                level:this.state.level,
                boss:this.state.boss,
                minWrite: this.state.minWrite,
                selectedOfferingType: (type+1).toString(),
              }
            }
          ]
        })
        this.props.navigation.dispatch(resetAction)
     
     })
}


	render(){

        
     
      return(

  	     <View style={styles.container}>
          
                
                <StatusBar backgroundColor="#16236e"/>


                <View style={{height:110,flexDirection:'row',justifyContent:'space-between', padding: 20, borderBottomWidth:1, borderTopWidth:1, borderColor:'#e1e1e1', marginBottom: 8, backgroundColor: '#fff'}}>

                    <View style={{flexDirection:'row'}}>
                      <Image 
                        source={require('./person2.png')}
                        resizeMode="contain"
                        style={{width: 60, padding: 10, height: 60, marginRight: 15}}/>
                        <View>
                          <Text style={{fontSize: 15, fontWeight:'bold'}}>{this.state.memberName}  <Text style={{fontWeight:'100'}}>( {this.state.memberID} )</Text> </Text>
                          <Text>{this.state.email}</Text>
                          <Text style={{color: '#888', fontSize:12, marginTop:2}}>{this.state.level=='emp'?'개인회원':'업체회원'}</Text>
                        </View>
                      
                    </View>
                    <View style={{justifyContent:'flex-end'}}>
                          <TouchableOpacity style={{flexDirection:'row',}}
                           onPress={()=>{
                            Alert.alert(
                              '알림',
                              '로그아웃 하시겠습니까?',
                              [
                                
                                {text: '취소', onPress: () => {}, style: 'cancel'},
                                {text: '확인', onPress: () => {
                                  AsyncStorage.removeItem('token');
                                  // this.props.navigation.navigate('Login')

                                  const resetAction = NavigationActions.reset({
                                    index: 0,
                                    stateName: 'test',
                                    key: null,
                                    actions: [
                                      NavigationActions.navigate({ routeName: 'Login'}),
                                  
                                    ]
                                  })
                                  this.props.navigation.dispatch(resetAction)

                                }},
                              ],
                              { cancelable: false }
                            )

                           }}
                          >
                            <Icon
                            name="ios-log-out"    
                            size={20}                    
                            />
                            <Text style={{marginLeft:3, marginTop:1, fontSize:12, }}>로그아웃</Text>
                          </TouchableOpacity>
                    </View>
                
                </View>

                <View style={{ height:120,  padding: 20, backgroundColor: '#fff', marginBottom: 8, borderBottomWidth:1, borderTopWidth:1, borderColor:'#e1e1e1'}}>
               
                  <Text style={{marginBottom: 20, }}>내 노트에 표시될 부동산</Text>
                    {/* <SegmentedControls      
                            
                    options={ options }
                    onSelection={ this.setSelectedOption.bind(this) }
                    selectedOption={ this.state.selectedOfferingType }
                    containerStyle={{height: 35,  borderRadius:5, }}
                    optionContainerStyle={{justifyContent:'center',}}
                    optionStyle ={{fontSize: 12, borderRadius:5,}}
                    separatorWidth= {1}
                    
                    tint={'#3b4db7'}
                    selectedTint= {'white'}
                    />  */}

                    <SegmentedControlTab
                    tabsContainerStyle={{marginTop:-0.5, marginRight:-1}}
                    borderRadius={0}
                    tabStyle={{borderColor: '#777', borderWidth:0.5, borderColor:'#bbb'}}
                    activeTabStyle={{ backgroundColor: '#777', }}
                    tabTextStyle={{color:'#777'}}
                    values={options}
                    selectedIndex={parseInt(this.state.selectedOfferingType)-1}
                    onTabPress={this.handleIndexChange}
                    />

                </View>

                <TouchableOpacity style={{ height:70, flexDirection:'row', padding: 20, backgroundColor: '#fff', justifyContent:'space-between', borderBottomWidth:1, borderTopWidth:1, borderColor:'#e1e1e1'}} 
                 onPress={()=>{this.props.navigation.navigate('Employee', this.state)}}
                >

                  <Text style={{color:'#3b4db7'}}>직원 권한관리</Text>
                  <Icon
                    name="ios-arrow-forward"
                    size={22}
                    style={{color: '#3b4db7',}}
                    onPress={()=>{}}
                    /> 

                </TouchableOpacity>
        
            
        </View>
        

          

       		)
    }

}

const styles = StyleSheet.create({
	container:{
    
    display:'flex',
    flex:1,
    backgroundColor:'#f1f1f1',
    
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


AppRegistry.registerComponent('functionList', () => functionList);
