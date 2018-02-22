import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,WebView,PermissionsAndroid,Alert } from 'react-native';
import MapView from 'react-native-maps';
import Permissions from 'react-native-permissions'



export default class RoomMapView extends Component{
static navigationOptions= ({navigation}) =>({
	
        title:`${navigation.state.params.wr_subject}`,
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
		this.state = {
            initialPosition: {
                latitude : 0,
                longitude: 0,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            },
            markerPosition : {

                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,

            }
        };
	
    }
    
    
	// componentWillMount(){

    //     this.requestLocationPermission();
	// 	const {params} = this.props.navigation.state;
	// 	this.setState(params, function(){
	// 		// console.log(this.state);
		  
	// 	})
    //   }
      

      _requestPermission = () => {
        Permissions.request('location').then(response => {
          // Returns once the user has chosen to 'allow' or to 'not allow' access
          // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
          this.setState({ photoPermission: response }, function(){alert(response)})
        })
      }
    
      // Check the status of multiple permissions
      _checkCameraAndPhotos = () => {
        Permissions.checkMultiple(['camera', 'photo']).then(response => {
          //response is an object mapping type to permission
          this.setState({
            cameraPermission: response.camera,
            photoPermission: response.photo,
          })
        })
      }
    
      // This is a common pattern when asking for permissions.
      // iOS only gives you once chance to show the permission dialog,
      // after which the user needs to manually enable them from settings.
      // The idea here is to explain why we need access and determine if
      // the user will say no, so that we don't blow our one chance.
      // If the user already denied access, we can ask them to enable it from settings.
      _alertForLocationPermission() {
        Alert.alert(
          'Can we access your location?',
          'We need access so you can set your profile pic',
          [
            {
              text: 'No way',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
            // this.state.photoPermission == 'undetermined'
              { text: 'OK', onPress: this._requestPermission }
            //   : { text: 'Open Settings', onPress: Permissions.openSettings },
          ],
        )
      }
    
        componentDidMount(){
    
          Permissions.check('location').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ photoPermission: response }, 

               
    
              function(){
                
                if(response != 'authorized'){
                    this._alertForLocationPermission()
                }

                else{
                    alert(response)
                    navigator.geolocation.getCurrentPosition((position) => {
                        var lat = parseFloat(position.coords.latitude)
                        var long = parseFloat(position.coords.longitude)
            
                        var initialRegion = {
            
                            latitude : lat,
                            longitude: long,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }
            
                        this.setState({initialPosition: initialRegion, markerPosition: initialRegion})
                    },
                    (error) => alert(JSON.stringify(error)),
                    )
            
                    this.watchID = navigator.geolocation.watchPosition((position) => {
                        var lat = parseFloat(position.coords.latitude)
                        var long = parseFloat(position.coords.longitude)
            
                        var lastRegion = {
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }
            
                        this.setState({initialPosition: lastRegion, markerPosition: lastRegion})
                    })

                }
               
              }
              
            )
          })
      
          // this._alertForPhotosPermission()
    
            
        }
    
        componentWillUnmount(){
            navigator.geolocation.clearWatch(this.watchID);
        }
    // componentDidMount(){
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         var lat = parseFloat(position.coords.latitude)
    //         var long = parseFloat(position.coords.longitude)

    //         var initialRegion = {

    //             latitude : lat,
    //             longitude: long,
    //             latitudeDelta: 0.02,
    //             longitudeDelta: 0.02,
    //         }

    //         this.setState({initialPosition: initialRegion, markerPosition: initialRegion})
    //     },
    //     (error) => alert(JSON.stringify(error)),
    //     {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000})

    //     this.watchID = navigator.geolocation.watchPosition((position) => {
    //         var lat = parseFloat(position.coords.latitude)
    //         var long = parseFloat(position.coords.longitude)

    //         var lastRegion = {
    //             latitude: lat,
    //             longitude: long,
    //             latitudeDelta: 0.02,
    //             longitudeDelta: 0.02,
    //         }

    //         this.setState({initialPosition: lastRegion, markerPosition: lastRegion})
    //     })
    // }

    // componentWillUnmount(){
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

	render(){
		const { navigate } = this.props.navigation;
		return(

                <View>
                        
                    <MapView style ={styles.mapView}
                        region={this.state.initialPosition}
                        >
                        
                        <MapView.Marker
                            coordinate ={this.state.markerPosition}
                        />
                        
                    </MapView>
                
                   
            </View> 
	 
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


});


// AppRegistry.registerComponent('profile', () => profile);
