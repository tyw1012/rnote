import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
// import HomeScreen from './home';
import Login from './login/login';
import Register from './Register/register';
import Register_emp from './Register/register_emp';
// import Home_emp from './home_emp';
import Agreement from './Register/agreement';
import Agreement_text_1 from './Register/agreement_text_1';
import Agreement_text_2 from './Register/agreement_text_2';
import FunctionList from './commonComponents/functionList';
import Employee from './commonComponents/employee';

function getCurrentRouteName(navigationState) {
	if (!navigationState) {
	  return null;
	}
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if (route.routes) {
	  return getCurrentRouteName(route);
	}
	return route.routeName;
  }
  
/////////////////////////// 상가시작 ///////////////////////////////////////////////////

import Myoffering from './Shop/myoffering';
import Officeoffering from './Shop/officeoffering';
import GetBookmark from './Shop/getBookmark';
import BookmarkList from './Shop/bookmarkList';
import BookmarkMap from './Shop/bookmarkMap';
import Detail from './Shop/detail';
import Profile from './Shop/profile';
import Writeoffer from './Shop/writeoffer';
import Writeoffer_second from './Shop/writeoffer_second';
import Writeoffer_third from './Shop/writeoffer_third';
import Writeoffer_fourth from './Shop/writeoffer_fourth';
import Writeoffer_sell from './Shop/writeoffer_sell';
import Writeoffer_sell_second from './Shop/writeoffer_sell_second';
import Writeoffer_sell_third from './Shop/writeoffer_sell_third';
import Writeoffer_sell_fourth from './Shop/writeoffer_sell_fourth';

 const WriteOfferRentNavigator = TabNavigator({
	 Basic: { 
		 screen: Writeoffer,
		 navigationOptions:{
			 
			 tabBarLabel: '위치/연락처',
			 tabBarOnPress: (scene, jumpToIndex) => {
               
            },
			 
		 }
	 },
	 Recommended: {
		 screen: Writeoffer_second,
		 navigationOptions:{
			 tabBarLabel: '추천업종',
			 tabBarOnPress: (scene, jumpToIndex) => {
				
			 },
		 }

	 },
	 Prices:{
		 screen: Writeoffer_third,
		 navigationOptions:{
			 tabBarLabel: '매물정보',
			 tabBarOnPress: (scene, jumpToIndex) => {
				
			 },
		 }

	 },
	 Others:{
		screen: Writeoffer_fourth,
		navigationOptions:{
			tabBarLabel: '기타정보',
			tabBarOnPress: (scene, jumpToIndex) => {
				
			 },
		}
	 }
	 
 },{
	backBehavior:'none',
	swipeEnabled:false,
 	tabBarOptions: {
		// inactiveBackgroundColor: '#e91e63',
		
		labelStyle: {
			fontSize: 10.5,
			
			color:'#777',
		},
		style: {

		height:45,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderColor: '#e1e1e1',
		marginTop: -2.5,
		elevation:0,
		
		},
		tabStyle: {
			
			// marginBottom: 3,
		},
		indicatorStyle:{
			backgroundColor: '#2b3bb5',
			height: 3,
			
		}
	  }
	})

const WriteOfferSellNavigator = TabNavigator({
		First: { 
			screen: Writeoffer_sell,
			navigationOptions:{
				tabBarLabel: '위치/연락처',
				tabBarOnPress: (scene, jumpToIndex) => {
				  
			   },
				
			}
		},
		Second: {
			screen: Writeoffer_sell_second,
			navigationOptions:{
				tabBarLabel: '면적/가격',
				tabBarOnPress: (scene, jumpToIndex) => {
				   
				},
			}
   
		},
		Third:{
			screen: Writeoffer_sell_third,
			navigationOptions:{
				tabBarLabel: '대출/임차',
				tabBarOnPress: (scene, jumpToIndex) => {
				   
				},
			}
   
		},
		Fourth:{
		   screen: Writeoffer_sell_fourth,
		   navigationOptions:{
			   tabBarLabel: '기타정보',
			   tabBarOnPress: (scene, jumpToIndex) => {
				   
				},
		   }
		}
		
	},{
	   backBehavior:'none',
	   swipeEnabled:false,
		tabBarOptions: {
		   // inactiveBackgroundColor: '#e91e63',
		   
		   labelStyle: {
			   fontSize: 10.5,
			   
			   color:'#777',
		   },
		   style: {
   
		   height:45,
		   backgroundColor: '#fff',
		   borderBottomWidth: 1,
		   borderColor: '#e1e1e1',
		   marginTop: -2.5,
		   elevation:0,
		   
		   },
		   tabStyle: {
			   
			   // marginBottom: 3,
		   },
		   indicatorStyle:{
			   backgroundColor: '#2b3bb5',
			   height: 3,
			   
		   }
		 }
})


 const MyNoteStack = StackNavigator({
	 Myoffering: {screen: Myoffering},
	 Detail: { screen: Detail,
			   navigationOptions:{tabBarVisible:false,}
	},
	 Profile : {screen : Profile,
		navigationOptions:{tabBarVisible:false,}
	},
	 WriteofferRent: {
		 screen: WriteOfferRentNavigator,
		 navigationOptions:{tabBarVisible:false,}	
	},
	 WriteofferSell: {
		screen: WriteOfferSellNavigator,
		navigationOptions:{tabBarVisible:false,}	
     },
	 
 },)

 const OfficeNoteStack = StackNavigator({
	Officeoffering: {screen: Officeoffering},
	Detail:{ screen: Detail,
		navigationOptions:{tabBarVisible:false,}
	},
	Profile : {screen : Profile,
		navigationOptions:{tabBarVisible:false,}
	},
},)

 const FunctionNoteStack = StackNavigator({
	 FunctionList: {screen: FunctionList},
	 Employee:{screen: Employee},
 },)


 const BookmarkStack = StackNavigator({
	GetBookmark: {screen: GetBookmark},
	BookmarkList : {screen: BookmarkList, 
					navigationOptions:{tabBarVisible:false,}},
	BookmarkMap : {screen: BookmarkMap, 
					navigationOptions:{tabBarVisible:false,}},
	Detail:{screen: Detail,
					navigationOptions:{tabBarVisible:false,}
	},		

},)

 const MainNavigator = TabNavigator({
	
	MyNote: {
		screen: MyNoteStack,
		navigationOptions:{
			tabBarLabel: '마이노트',
			tabBarIcon:({ tintColor }) => (
				<Icon
				  name='book'
				  size={25}
				  style={{color:tintColor,}}
				/>
			)
			
		},
	},
	OfficeNote: {
		screen: OfficeNoteStack,
		navigationOptions:{
			tabBarLabel: '오피스노트',
			tabBarIcon:({ tintColor }) => (
				<Icon
				  name='archive'
				  size={25}
				  style={{color:tintColor,}}
				/>
			)
			
		},
	},
	Bookmark: {
		screen: BookmarkStack,
		navigationOptions:{
			tabBarLabel: '즐겨찾기',
			tabBarIcon:({ tintColor }) => (
				<Icon
				  name='star'
				  size={25}
				  style={{color:tintColor,}}
				/>
			)
		},
	},
	FunctionNote: {
		
		screen: FunctionNoteStack,
		navigationOptions:{
			tabBarLabel: '설정',
			tabBarIcon:({ tintColor }) => (
				<Icon
				  name='cog'
				  size={25}
				  style={{color:tintColor,}}
				/>
			)
		}
	},
	

 },{
	
	swipeEnabled:false,
	tabBarPosition: 'bottom',
 	tabBarOptions: {
		// inactiveBackgroundColor: '#e91e63',
		
		showLabel: true,
		showIcon:true,
		activeTintColor: '#3b4db7',
		inactiveTintColor: '#777',
		labelStyle: {
			fontSize: 11,
			fontWeight: 'bold',
			// color:'#2b3bb5',
			marginBottom:5,
		
		},
		style: {
			backgroundColor: '#fafafa',
			borderTopWidth: 1, borderColor: '#e1e1e1',
			height:55, 
			elevation:0,		
		},
		tabStyle: {
			
		},
		indicatorStyle:{
			backgroundColor: '#2b3bb5',
			height: 0,
			top:0,
		},
		iconStyle:{
			marginBottom:-5,
			marginTop:-3,
		}
		
	  }
	})
/////////////////////////// 상가끝 /////////////////////////////////////////////////// 

//////////////////////////// 토지시작 ////////////////////////////////////////////////////

import Myoffering_land from './Land/myoffering';
import Officeoffering_land from './Land/officeoffering';
import GetBookmark_land from './Land/getBookmark';
import BookmarkList_land from './Land/bookmarkList';
import Detail_land from './Land/detail';
import Profile_land from './Land/profile';

import Writeoffer_sell_land from './Land/writeoffer_sell';
import Writeoffer_sell_second_land from './Land/writeoffer_sell_second';
import Writeoffer_sell_third_land from './Land/writeoffer_sell_third';
import Writeoffer_sell_fourth_land from './Land/writeoffer_sell_fourth';

const WriteOfferSellNavigator_land = TabNavigator({
	First: { 
		screen: Writeoffer_sell_land,
		navigationOptions:{
			tabBarLabel: '위치/연락처',
			tabBarOnPress: (scene, jumpToIndex) => {
			  
		   },
			
		}
	},
	Second: {
		screen: Writeoffer_sell_second_land,
		navigationOptions:{
			tabBarLabel: '면적/가격',
			tabBarOnPress: (scene, jumpToIndex) => {
			   
			},
		}

	},
	Third:{
		screen: Writeoffer_sell_third_land,
		navigationOptions:{
			tabBarLabel: '대출/임차',
			tabBarOnPress: (scene, jumpToIndex) => {
			   
			},
		}

	},
	Fourth:{
	   screen: Writeoffer_sell_fourth_land,
	   navigationOptions:{
		   tabBarLabel: '기타정보',
		   tabBarOnPress: (scene, jumpToIndex) => {
			   
			},
	   }
	}
	
},{
   backBehavior:'none',
   swipeEnabled:false,
	tabBarOptions: {
	   // inactiveBackgroundColor: '#e91e63',
	   
	   labelStyle: {
		   fontSize: 10.5,
		   
		   color:'#777',
	   },
	   style: {

	   height:45,
	   backgroundColor: '#fff',
	   borderBottomWidth: 1,
	   borderColor: '#e1e1e1',
	   marginTop: -2.5,
	   elevation:0,
	   
	   },
	   tabStyle: {
		   
		   // marginBottom: 3,
	   },
	   indicatorStyle:{
		   backgroundColor: '#2b3bb5',
		   height: 3,
		   
	   }
	 }
})

const MyNoteStack_land = StackNavigator({
	Myoffering: {screen: Myoffering_land},
	Detail: { screen: Detail_land,
			  navigationOptions:{tabBarVisible:false,}
   },
	Profile : {screen : Profile_land,
	   navigationOptions:{tabBarVisible:false,}
   },

	WriteofferSell: {
	   screen: WriteOfferSellNavigator_land,
	   navigationOptions:{tabBarVisible:false,}	
	},
	
},)

const OfficeNoteStack_land = StackNavigator({
   Officeoffering: {screen: Officeoffering_land},
   Detail:{ screen: Detail_land,
	   navigationOptions:{tabBarVisible:false,}
   },
   Profile : {screen : Profile_land,
	   navigationOptions:{tabBarVisible:false,}
   },
},)

const BookmarkStack_land = StackNavigator({
   GetBookmark: {screen: GetBookmark_land},
   BookmarkList : {screen: BookmarkList_land},
   Detail:{screen: Detail_land,
	   navigationOptions:{tabBarVisible:false,}
   },

},)


const MainNavigator_land = TabNavigator({

MyNote: {
	screen: MyNoteStack_land,
	navigationOptions:{
		tabBarLabel: '마이노트',
		tabBarIcon:({ tintColor }) => (
			<Icon
				name='book'
				size={25}
				style={{color:tintColor,}}
			/>
		)
		
	},
},
OfficeNote: {
	screen: OfficeNoteStack_land,
	navigationOptions:{
		tabBarLabel: '오피스노트',
		tabBarIcon:({ tintColor }) => (
			<Icon
				name='archive'
				size={25}
				style={{color:tintColor,}}
			/>
		)
		
	},
},
Bookmark: {
	screen: BookmarkStack_land,
	navigationOptions:{
		tabBarLabel: '즐겨찾기',
		tabBarIcon:({ tintColor }) => (
			<Icon
				name='star'
				size={25}
				style={{color:tintColor,}}
			/>
		)
	},
},
FunctionNote: {
	
	screen: FunctionNoteStack,
	navigationOptions:{
		tabBarLabel: '설정',
		tabBarIcon:({ tintColor }) => (
			<Icon
				name='cog'
				size={25}
				style={{color:tintColor,}}
			/>
		)
	}
},

},{

swipeEnabled:false,
tabBarPosition: 'bottom',
	tabBarOptions: {
	// inactiveBackgroundColor: '#e91e63',
	
	showLabel: true,
	showIcon:true,
	activeTintColor: '#3b4db7',
	inactiveTintColor: '#777',
	labelStyle: {
		fontSize: 11,
		fontWeight: 'bold',
		// color:'#2b3bb5',
		marginBottom:5,
	
	},
	style: {
		backgroundColor: '#fafafa',
		borderTopWidth: 1, borderColor: '#e1e1e1',
		height:55, 
		elevation:0,		
	},
	tabStyle: {
		
	},
	indicatorStyle:{
		backgroundColor: '#2b3bb5',
		height: 0,
		top:0,
	},
	iconStyle:{
		marginBottom:-5,
		marginTop:-3,
	}
	
	}
})
///////////////////////////////////////토지 끝////////////////////////////////////////////////
///////////////////////////////////////원룸 시작/////////////////////////////////////////////
import Myoffering_room from './Room/myoffering';
import Officeoffering_room from './Room/officeoffering';
import GetBookmark_room from './Room/getBookmark';
import BookmarkList_room from './Room/bookmarkList';
import Detail_room from './Room/detail';
import Profile_room from './Room/profile';

import Writeoffer_room from './Room/writeoffer';
import Writeoffer_second_room from './Room/writeoffer_second';
import Writeoffer_third_room from './Room/writeoffer_third';
import Writeoffer_fourth_room from './Room/writeoffer_fourth';

import Writeoffer_sell_room from './Room/writeoffer_sell';
import Writeoffer_sell_second_room from './Room/writeoffer_sell_second';
import Writeoffer_sell_third_room from './Room/writeoffer_sell_third';
import Writeoffer_sell_fourth_room from './Room/writeoffer_sell_fourth';


const WriteOfferRentNavigator_room = TabNavigator({
	Basic: { 
		screen: Writeoffer_room,
		navigationOptions:{
			
			tabBarLabel: '건물정보',
			tabBarOnPress: (scene, jumpToIndex) => {
			  
		   },
			
		}
	},
	Recommended: {
		screen: Writeoffer_second_room,
		navigationOptions:{
			tabBarLabel: '호실정보',
			tabBarOnPress: (scene, jumpToIndex) => {
			   
			},
		}

	},
	// Prices:{
	// 	screen: Writeoffer_third_room,
	// 	navigationOptions:{
	// 		tabBarLabel: '공실여부',
	// 		tabBarOnPress: (scene, jumpToIndex) => {
			   
	// 		},
	// 	}

	// },
	// Others:{
	//    screen: Writeoffer_fourth_room,
	//    navigationOptions:{
	// 	   tabBarLabel: '기타정보',
	// 	   tabBarOnPress: (scene, jumpToIndex) => {
			   
	// 		},
	//    }
	// }
	
},{
   backBehavior:'none',
   swipeEnabled:false,
	tabBarOptions: {
	   // inactiveBackgroundColor: '#e91e63',
	   
	   labelStyle: {
		   fontSize: 10.5,
		   
		   color:'#777',
	   },
	   style: {

	   height:45,
	   backgroundColor: '#fff',
	   borderBottomWidth: 1,
	   borderColor: '#e1e1e1',
	   marginTop: -2.5,
	   elevation:0,
	   
	   },
	   tabStyle: {
		   
		   // marginBottom: 3,
	   },
	   indicatorStyle:{
		   backgroundColor: '#2b3bb5',
		   height: 3,
		   
	   }
	 }
   })

const WriteOfferSellNavigator_room = TabNavigator({
	First: { 
		screen: Writeoffer_sell_room,
		navigationOptions:{
			tabBarLabel: '위치/연락처',
			tabBarOnPress: (scene, jumpToIndex) => {
			  
		   },
			
		}
	},
	Second: {
		screen: Writeoffer_sell_second_room,
		navigationOptions:{
			tabBarLabel: '면적/가격',
			tabBarOnPress: (scene, jumpToIndex) => {
			   
			},
		}

	},
	Third:{
		screen: Writeoffer_sell_third_room,
		navigationOptions:{
			tabBarLabel: '대출/임차',
			tabBarOnPress: (scene, jumpToIndex) => {
			   
			},
		}

	},
	Fourth:{
	   screen: Writeoffer_sell_fourth_room,
	   navigationOptions:{
		   tabBarLabel: '기타정보',
		   tabBarOnPress: (scene, jumpToIndex) => {
			   
			},
	   }
	}
	
},{
   backBehavior:'none',
   swipeEnabled:false,
	tabBarOptions: {
	   // inactiveBackgroundColor: '#e91e63',
	   
	   labelStyle: {
		   fontSize: 10.5,
		   
		   color:'#777',
	   },
	   style: {

	   height:45,
	   backgroundColor: '#fff',
	   borderBottomWidth: 1,
	   borderColor: '#e1e1e1',
	   marginTop: -2.5,
	   elevation:0,
	   
	   },
	   tabStyle: {
		   
		   // marginBottom: 3,
	   },
	   indicatorStyle:{
		   backgroundColor: '#2b3bb5',
		   height: 3,
		   
	   }
	 }
})


const MyNoteStack_room = StackNavigator({
	Myoffering: {screen: Myoffering_room},
	Detail: { screen: Detail_room,
			  navigationOptions:{tabBarVisible:false,}
   },
	Profile : {screen : Profile_room,
	   navigationOptions:{tabBarVisible:false,}
   },
   WriteofferRent: {
	screen: WriteOfferRentNavigator_room,
	navigationOptions:{tabBarVisible:false,}	
 },
	WriteofferSell: {
	   screen: WriteOfferSellNavigator_room,
	   navigationOptions:{tabBarVisible:false,}	
	},
	
},)

const OfficeNoteStack_room = StackNavigator({
   Officeoffering: {screen: Officeoffering_room},
   Detail:{ screen: Detail_room,
	   navigationOptions:{tabBarVisible:false,}
   },
   Profile : {screen : Profile_room,
	   navigationOptions:{tabBarVisible:false,}
   },
},)

const BookmarkStack_room = StackNavigator({
   GetBookmark: {screen: GetBookmark_room},
   BookmarkList : {screen: BookmarkList_room},
   Detail:{screen: Detail_room,
	   navigationOptions:{tabBarVisible:false,}
   },

},)

const MainNavigator_room = TabNavigator({

	MyNote: {
		screen: MyNoteStack_room,
		navigationOptions:{
			tabBarLabel: '마이노트',
			tabBarIcon:({ tintColor }) => (
				<Icon
					name='book'
					size={25}
					style={{color:tintColor,}}
				/>
			)
			
		},
	},
	OfficeNote: {
		screen: OfficeNoteStack_room,
		navigationOptions:{
			tabBarLabel: '오피스노트',
			tabBarIcon:({ tintColor }) => (
				<Icon
					name='archive'
					size={25}
					style={{color:tintColor,}}
				/>
			)
			
		},
	},
	Bookmark: {
		screen: BookmarkStack_room,
		navigationOptions:{
			tabBarLabel: '즐겨찾기',
			tabBarIcon:({ tintColor }) => (
				<Icon
					name='star'
					size={25}
					style={{color:tintColor,}}
				/>
			)
		},
	},
	FunctionNote: {
		
		screen: FunctionNoteStack,
		navigationOptions:{
			tabBarLabel: '설정',
			tabBarIcon:({ tintColor }) => (
				<Icon
					name='cog'
					size={25}
					style={{color:tintColor,}}
				/>
			)
		}
	},


	},{

	swipeEnabled:false,
	tabBarPosition: 'bottom',
		tabBarOptions: {
		// inactiveBackgroundColor: '#e91e63',
		
		showLabel: true,
		showIcon:true,
		activeTintColor: '#3b4db7',
		inactiveTintColor: '#777',
		labelStyle: {
			fontSize: 11,
			fontWeight: 'bold',
			// color:'#2b3bb5',
			marginBottom:5,
		
		},
		style: {
			backgroundColor: '#fafafa',
			borderTopWidth: 1, borderColor: '#e1e1e1',
			height:55, 
			elevation:0,		
		},
		tabStyle: {
			
		},
		indicatorStyle:{
			backgroundColor: '#2b3bb5',
			height: 0,
			top:0,
		},
		iconStyle:{
			marginBottom:-5,
			marginTop:-3,
		}
		
		}
})

			const MainNavigator4 = TabNavigator({
	
				MyNote: {
					screen: MyNoteStack,
					navigationOptions:{
						tabBarLabel: '마이노트',
						tabBarIcon:({ tintColor }) => (
							<Icon
							  name='book'
							  size={25}
							  style={{color:tintColor,}}
							/>
						)
						
					},
				},
				OfficeNote: {
					screen: OfficeNoteStack,
					navigationOptions:{
						tabBarLabel: '오피스노트',
						tabBarIcon:({ tintColor }) => (
							<Icon
							  name='archive'
							  size={25}
							  style={{color:tintColor,}}
							/>
						)
						
					},
				},
				Bookmark: {
					screen: BookmarkStack,
					navigationOptions:{
						tabBarLabel: '즐겨찾기',
						tabBarIcon:({ tintColor }) => (
							<Icon
							  name='star'
							  size={25}
							  style={{color:tintColor,}}
							/>
						)
					},
				},
				FunctionNote: {
					
					screen: FunctionNoteStack,
					navigationOptions:{
						tabBarLabel: '설정',
						tabBarIcon:({ tintColor }) => (
							<Icon
							  name='cog'
							  size={25}
							  style={{color:tintColor,}}
							/>
						)
					}
				},
		
			 },{
				
				swipeEnabled:false,
				tabBarPosition: 'bottom',
				 tabBarOptions: {
					
					showLabel: true,
					showIcon:true,
					activeTintColor: '#3b4db7',
					inactiveTintColor: '#777',
					labelStyle: {
						fontSize: 11,
						fontWeight: 'bold',
						// color:'#2b3bb5',
						marginBottom:5,
					
					},
					style: {
						backgroundColor: '#fafafa',
						borderTopWidth: 1, borderColor: '#e1e1e1',
						height:55, 
						elevation:0,		
					},
					tabStyle: {
						
					},
					indicatorStyle:{
						backgroundColor: '#2b3bb5',
						height: 0,
						top:0,
					},
					iconStyle:{
						marginBottom:-5,
						marginTop:-3,
					}
					
				  }
				})


const RootNavigator = StackNavigator({
	Login: { screen: Login },
	Agreement: {screen: Agreement},
	Agreement_text_1 : {screen : Agreement_text_1},
	Agreement_text_2 : {screen : Agreement_text_2},
	Register: {screen: Register},
	Register_emp: {screen: Register_emp},
	MainNavigator3 : {screen: MainNavigator,  
					 navigationOptions:{header:null}, 	},
	MainNavigator4: {screen: MainNavigator_land,
					navigationOptions:{header:null}, },
	MainNavigator2: {screen: MainNavigator},
	MainNavigator1: {screen: MainNavigator_room, 
					navigationOptions:{header:null},},
	
},)


export default class Root extends Component{
	constructor(props) {
		super(props);
		this.backButtonListener = null;
        this.lastBackButtonPress = null;
	}
	
	componentDidMount() {
        
        if (Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
                if (this.currentRouteName !== 'Myoffering') {
					return false;
				}
				if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
                    BackHandler.exitApp();
                    return true;
                }
                ToastAndroid.show('뒤로가기를 한번 더 누르면 앱이 종료됩니다.', ToastAndroid.SHORT);
				this.lastBackButtonPress = new Date().getTime();
				
				return true;

            });
        }
	}
	
	componentWillUnmount() {
        this.backButtonListener.remove();
    }

    render() {
        return (<RootNavigator
            	onNavigationStateChange={(prevState, currentState, action) => {
				  this.currentRouteName = getCurrentRouteName(currentState);
                
            }}
        />);
    }
}
// export default ()=> (
// 	<RootNavigator/>
// );
