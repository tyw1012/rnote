import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,WebView } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements'
import ShopDetail from './shopDetail';
// import StreetView from 'react-native-streetview';
var self;

export default class detail extends Component{
static navigationOptions= ({navigation}) =>({
          
    header:null,
    // title: '매물정보',
    // headerTitleStyle: {color:'white',fontSize:16, },
    // headerStyle: {
    //   backgroundColor: '#3b4db7',
    //   elevation:0,
    //   height: 52,
      
      
    // },
    // headerTintColor: 'white',
    });

static updateInformationFromOutside(params){
    self.setState({...params});
}

    constructor(props){
		super(props)
        this.state={ 
            isLoaded: false,
                        
        };
    }
    
    componentWillMount(){
        const {params} = this.props.navigation.state;
        this.setState(params, function(){

            // console.log('stateCheck',this.state)
           
          })
        this.setState({isLoaded: true});
       
    self = this;
       
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

    _renderHeader(){

        if(this.state.mode=='edit'){

            return(
                
                        <Header
                        outerContainerStyles={{height: 52, backgroundColor: '#3b4db7', borderBottomWidth:0,}}
                        innerContainerStyles={{ alignItems:'center'}}
                        leftComponent={ 
                            <Icon
                            name="md-arrow-back"
                            size={25}
                            style={{color:'#fff', marginLeft:5}}
                            onPress={()=>{this.props.navigation.goBack(null); }}
                            />
                        }
                        centerComponent={ <Text style={{color:'#fff',fontSize:18, fontWeight:'bold',marginLeft:5,}}>{this.state.wr_subject}</Text>}
                        rightComponent={ 
                            <TouchableOpacity
                            style={{width:50,height:50,backgroundColor:'#3b4db7', marginRight:-10,justifyContent:'center', alignItems:'center'}}
                            onPress={()=>{
                                if(this.state.segment=='임대'){
                                    this.state.wr_rec_sectors.split(' ');
                                    this.props.navigation.navigate('WriteofferRent',{...this.state, wr_rec_sectors: this.state.wr_rec_sectors.split(' ')})
                                 }
                                 else if(this.state.segment=='매매'){
                                    this.props.navigation.navigate('WriteofferSell',this.state)
                                 }
                            }}>                
                            <Icon
                            name="md-create"
                            size={25}
                            style={{color:'#fff'}}
                            /> 
                            </TouchableOpacity>                           
                        } />                       
                   )
        }
        else{
            return(
                        <Header
                        outerContainerStyles={{height: 52, backgroundColor: '#3b4db7', borderBottomWidth:0,}}
                        innerContainerStyles={{ alignItems:'center'}}
                        leftComponent={ 
                            <Icon
                            name="md-arrow-back"
                            size={25}
                            style={{color:'#fff', marginLeft:5}}
                            onPress={()=>{this.props.navigation.goBack(null); }}
                            />
                        }
                        centerComponent={ <Text style={{color:'#fff',fontSize:18, fontWeight:'bold', marginLeft:5,}}>{this.state.wr_subject}</Text>}
                        rightComponent={ 
                
                            <Icon
                            name="md-create"
                            size={25}
                            style={{color:'rgba(255,255,255,0.3)', marginRight:5}}/> 
                           
                        }
                        />
            )
        }
    }

   
	render(){
        
        if(!this.state.isLoaded){
            return(
                <View>
                  <ActivityIndicator />
                </View>
            )
          }

        else{
            return(
             <View style={styles.container}>
                {this._renderHeader()}
                <ScrollView >
                    
                    <View style={styles.map}>
                        
                        <MapView style ={styles.mapView}
                            region={{
                                latitude: parseFloat(this.state.wr_posy),
                                longitude: parseFloat(this.state.wr_posx),
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                                
                            }}
                         >
                         
                            <MapView.Marker
                                coordinate ={{
                                    latitude: parseFloat(this.state.wr_posy),
                                    longitude: parseFloat(this.state.wr_posx)
                                    
                                }}
                            />
                            
                         </MapView>
                       
                         <TouchableOpacity
                            style={{position:'absolute', top: 234, right: 10, backgroundColor:'#3b4db7', justifyContent:'center', alignItems:'center', padding:8, borderRadius:3,}}
                            onPress={()=>{this.props.navigation.navigate('Profile',{wr_posx:this.state.wr_posx,wr_posy:this.state.wr_posy, wr_subject:this.state.wr_subject})}}
                            ><Text style={{ color:'#fff'}}>로드뷰 보기</Text>
                         </TouchableOpacity>

                    </View>
                  
                    <ShopDetail item = {this.state}/>
                     
                </ScrollView>

                {this.state.mode!='edit'?this._renderFooter():null}
                
          </View>
         
                  );
        }
       
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
