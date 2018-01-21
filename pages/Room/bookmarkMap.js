import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,WebView } from 'react-native';
import MapView from 'react-native-maps';

export default class BookmarkMap extends Component{
static navigationOptions= ({navigation}) =>({
	
        title:`전체 지도`,
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
        headerTintColor: 'white',
        
	});
	constructor(props){
		super(props);
		this.state = {};
	
	}
	componentWillMount(){
		const {params} = this.props.navigation.state;
		this.setState(params, function(){
			console.log(this.state);
		  
		})
	  }
	render(){
		const { navigate } = this.props.navigation;
		return(
	  <View style={styles.container}>

            <MapView style ={styles.mapView}
            region={{
                latitude: parseFloat(this.state.filteredData_all[0].wr_posy),
                longitude: parseFloat(this.state.filteredData_all[0].wr_posx),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                
            }}
            >

            {this.state.filteredData_all.map(data => (
                <MapView.Marker
                coordinate={{
                    latitude: parseFloat(data.wr_posy),
                    longitude: parseFloat(data.wr_posx)
                }}
                title={data.wr_subject}
                // description={marker.description}
                />
            ))}

            {/* <MapView.Marker
                coordinate ={{
                    latitude: parseFloat(this.state.wr_posy),
                    longitude: parseFloat(this.state.wr_posx)
                    
                }}
            /> */}

            </MapView>

      </View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1
	},

	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
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
        flex:1,
        // height:280,
    },

});


AppRegistry.registerComponent('BookmarkMap', () => BookmarkMap);
