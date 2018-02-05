import React, { Component } from 'react';
import { View,Text,StyleSheet,TouchableOpacity, Image,Switch, StatusBar, AsyncStorage,Alert } from 'react-native';
import { Button, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationActions } from 'react-navigation'

const options = [ '원룸','아파트','상가','토지'];
export default class myOfficeConfig extends Component{
static navigationOptions= ({navigation}) =>({
     
//   headerLeft:null,
  title:'나의 오피스',
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
    
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){

         
    })
  }
 

  render(){

    
         
      return(

  	     <View style={styles.container}>

                             
                <TouchableOpacity style={{ height:60, flexDirection:'row', padding: 15,paddingTop:20, backgroundColor: '#fff', justifyContent:'space-between', borderBottomWidth:0.75,  borderColor:'#e1e1e1'}} 
                 onPress={()=>{this.props.navigation.navigate('Employee', this.state)}}
                >

                    <Text style={{}}>직원 관리</Text>
                    <Icon
                        name="ios-arrow-forward"
                        size={22}
                        style={{}}
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
