import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,WebView } from 'react-native';
import MapView from 'react-native-maps';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';

class MapDetail extends Component{

    constructor(props){
        super(props);

    }

    componentWillMount(){
        this.setState({bld_posx: this.props.data.bld_posx, bld_posy: this.props.data.bld_posy, bld_name: this.props.data.bld_name})
    }
	render(){
        const {data} = this.props
                
            return(
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                        
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
                    onPress={()=>{this.props.navigation.navigate('Profile',{wr_posx:this.state.bld_posx,wr_posy:this.state.bld_posy, wr_subject:this.state.bld_name})}}
                    ><Text style={{ color:'#fff'}}>로드뷰 보기</Text>
                    </TouchableOpacity>

                </View>   


                <View style={styles.sec}>


                    <View style={styles.row}>
                        <Text style={styles.columnName}>건물주소</Text>
                        <Text style={styles.columnInfo}>{data.bld_address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnName}>건물주연락처</Text>
                        <Text style={styles.columnInfo}>{data.bld_contact}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnName}>인근지하철역</Text>
                        <Text style={[styles.columnInfo,{flex:5.5}]}>{data.bld_subway}</Text>
                        
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.columnName}>주차</Text>
                        <Text style={styles.columnInfo}>{data.bld_hasParking==1?'가능':'불가'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnName}>엘리베이터</Text>
                        <Text style={styles.columnInfo}>{data.bld_hasElev==1?'있음':'없음'}</Text>
                    </View>

                    <View style={[styles.row,{borderBottomWidth:0,}]}>
                        <Text style={styles.columnName}>메모</Text>
                        <Text style={styles.columnInfo}>{data.bld_memo}</Text>
                    </View>


                </View>
            </ScrollView>

                  );
   }
       
	
}
const styles = StyleSheet.create({
	container:{
        // flex:1,
        backgroundColor: '#eee'	,	
        
	},
    map:{  
        // flex:1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center'
        
    },
    mapView:{
        // position: 'relative',
        width:'100%',
        height:280,
    },
    content:{
        flex:1,       
        
        
    },
    sec:{
        // flex:1,
        // flexDirection:'column',
        
        backgroundColor: '#fff',
        padding: 12,
        
       
    },
    row:{
        // flex:1,
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
