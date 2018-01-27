import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,WebView } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';

class MapDetail extends Component{

    constructor(props){
        super(props);

    }

	render(){
        const {data} = this.props
                
            return(
                <View style={styles.map}>
                        
                    <MapView style ={styles.mapView}
                        region={{
                            latitude: parseFloat(data.bld_posy),
                            longitude: parseFloat(data.bld_posx),
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                            
                        }}
                        >
                        
                        <MapView.Marker
                            coordinate ={{
                                latitude: parseFloat(data.bld_posy),
                                longitude: parseFloat(data.bld_posx)
                                
                            }}
                        />
                        
                        </MapView>
                    
                        <TouchableOpacity
                        style={{position:'absolute', top: 234, right: 10, backgroundColor:'#3b4db7', justifyContent:'center', alignItems:'center', padding:8, borderRadius:3,}}
                        onPress={()=>{this.props.navigation.navigate('Profile',{wr_posx:this.state.wr_posx,wr_posy:this.state.wr_posy, wr_subject:this.state.wr_subject})}}
                        ><Text style={{ color:'#fff'}}>로드뷰 보기</Text>
                        </TouchableOpacity>

                </View>   

                  );
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
        height:350,
    },
    content:{
        flex:1,       
        
        
    },
    sec1:{
        flex:1,
        alignItems: 'center',
        paddingTop:15,
        marginBottom:12,
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderColor:'#d6d6d6'

    },
    sec2:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#fff',
        padding: 15,
        
       
    },
    row:{
        flex:1,
        flexDirection:'row',
        borderBottomWidth: 1,
        borderColor: '#d1d1d1',
        padding:10,

    },
    columnName:{
        flex:3.5,
        fontWeight:'bold'
    },
    columnInfo:{
        flex:6.5,
        
    },
    title:{
        fontSize: 20,
        fontWeight:'bold'
    },
    pricesContainer:{
        flex:1,
        flexDirection:'row',
        marginTop:20,
        marginBottom:20,
        
    },
    price:{
        flex:1,
        alignItems: 'center',
    },

});

export default MapDetail;
