import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,WebView } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator} from 'react-navigation';
// import { Header } from 'react-native-elements'
// import ShopDetail from './shopDetail';
// import StreetView from 'react-native-streetview';
import MapDetail from './mapDetail';
import RoomDetail from './roomDetail';
import EmptyCheck from './emptyCheck';
import PopupDialog from 'react-native-popup-dialog';

var self;


export default class detail extends Component{
static navigationOptions= ({navigation}) =>({
     
      title: `${navigation.state.params.bld_name}`,
      headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
      headerStyle: {
        backgroundColor: '#3b4db7',
        elevation:0,
        height: 52,          
      },
      headerTintColor: 'white',
      headerRight:  
    //   navigation.state.params.mode=='edit'? 
     
      <TouchableOpacity
      style={{width:50,height:50,backgroundColor:'#3b4db7', marginRight:-5,justifyContent:'center', alignItems:'center'}}
      onPress={()=>{
        //   if(self.state.segment=='임대'){
        //       self.state.wr_rec_sectors.split(' ');
              self.state.currentRouteName=='Rooms'||self.state.currentRouteName==''?
              self.props.navigation.navigate('WriteofferRent_roomFirst',{...self.state})
              :self.props.navigation.navigate('WriteofferRent',{...self.state})
        //    }
        //    else if(self.state.segment=='매매'){
        //       self.props.navigation.navigate('WriteofferSell',self.state)
        //    }
      }}>                
      <Icon
      name="md-create"
      size={25}
      style={{color:'#fff', marginRight: 20,}}
      /> 
      </TouchableOpacity>
    //    :   <Icon
    //         name="md-create"
    //         size={25}
    //         style={{color:'rgba(255,255,255,0.3)', marginRight:20}}/> 
      
});

static updateInformationFromOutside(params){
    self.setState({...params});
}

    constructor(props){
		super(props)
        this.state={ 
            isLoaded: false,
            selectedRoom : {},
            currentRouteName: '',
                        
        };

        self = this;
    }
    
    componentWillMount(){
        const {params} = this.props.navigation.state;
        this.setState(params, function(){

            // console.log('stateCheck',this.state)
           
          })
        this.setState({isLoaded: true});
       
    
       
    }

    shouldComponentUpdate(nextProps, nextState) {

        if(this.state.currentRouteName !== nextState.currentRouteName){
            return false
        }

        return true
    }

 
    _sum(a,b){
        return parseInt(a)+parseInt(b)
      }
    _renderFooter(){
        return(
            <View style={styles.contactFooter}>
            <View>
              <Text style={{color:'white'}}>담당자: <Text style={{color:'white', fontWeight:'bold'}}>{this.state.wr_writer}</Text></Text>
              <Text style={{color:'white', fontSize:13, marginTop:3}}>{this.state.wr_hp}</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'#3b4db7', padding: 5, paddingLeft:15, paddingRight:15, borderRadius:20}}
            onPress={()=>{
                const args = {
                number: this.state.wr_hp.toString(), // String value with the number to call
                    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
                }
                call(args).catch(console.error)
                
            }}
            >
                <Text style={{color:'white'}}>전화걸기</Text>
            </TouchableOpacity>
          </View> 
        )
    }  

    // _updateVacancy(item, index){
    //     let roomsClone = this.state.rooms.slice(0);
    //     let clone = {...item}
    //     clone.wr_o_vacant == 1? clone.wr_o_vacant = 0 :
    //     clone.wr_o_vacant = 1;
    //     roomsClone[index] = clone;
    //     this.setState({rooms:roomsClone})
    // }
    // _editModeToggle(){
    //     this.setState({onEditMode: !this.state.onEditMode})
    // }
	render(){
        console.log('currentRouteName',this.state.currentRouteName)
        const RoomMapNavigator = TabNavigator({

            Rooms: { screen : ()=><RoomDetail data = {this.state}
            //   onEditMode = {this.state.onEditMode}
            //   editModeToggle = {this._editModeToggle.bind(this)}
            //   updateVacancy = {this._updateVacancy.bind(this)}
              />, 

            navigationOptions:{

                tabBarLabel: '호실정보',
                // tabBarOnPress:   (scene, jumpToIndex) => {
                //     console.log('onpressed')
                // },
                
                            
            }},    

            EmptyCheck: { screen : ()=><EmptyCheck data = {this.state}
            //   onEditMode = {this.state.onEditMode}
            //   editModeToggle = {this._editModeToggle.bind(this)}
            //   updateVacancy = {this._updateVacancy.bind(this)}
              />, 

            navigationOptions:{

                tabBarLabel: '공실체크',
                // tabBarOnPress:   (scene, jumpToIndex) => {
                //     console.log('onpressed')
                // },   
                
                            
            }}, 
           
            MapInfo: { screen : ()=><MapDetail data = {this.state} navigation ={this.props.navigation}/>,
                    navigationOptions:{
                            
                        tabBarLabel: '건물정보',
                                                
                    }},

    
        
        }, {
            backBehavior:'none',         
            tabBarOptions: {
                
                activeTintColor: '#3b4db7',
                inactiveTintColor: '#777',

                labelStyle: {
                    fontSize: 13,
                    fontWeight:'bold',
                    marginTop:5,
                   
                },
                style: {
        
                height:40,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: '#e1e1e1',
                marginTop: -2.5,
                elevation:0,
                
                },
               
                indicatorStyle:{
                    backgroundColor: '#2b3bb5',
                    height: 0,
                    
                }
              }
     })
        
        if(!this.state.isLoaded){
            return(
                <View>
                  <ActivityIndicator />
                </View>
            )
          }

        else{
            return(
             <ScrollView contentContainerStyle={styles.container}>
                    
                     <RoomMapNavigator
                     ref={(ref) => { this.nav = ref; }}
                     onNavigationStateChange={(prevState, currentState) => {
                        const getCurrentRouteName = (navigationState) => {
                          if (!navigationState) return null;
                          const route = navigationState.routes[navigationState.index];
                          if (route.routes) return getCurrentRouteName(route);
                          return route.routeName;
                        };
                     this.setState({currentRouteName :  getCurrentRouteName(currentState) }, function(){console.log(this.state.currentRouteName)});
                   }}
                     />
                
            </ScrollView>

                  );
        }
       
	}
}
const styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor: '#fff'	,	
        
	},
  
    content:{
        flex:1,       
        
        
    },



    contactFooter:{
        position:'absolute',
        flexDirection:'row',
        height:60,
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.8)',
        width:'100%',
        padding:10, 
        // alignItems:'',
        justifyContent:'space-between',
        
    }
	


});


AppRegistry.registerComponent('detail', () => detail);
