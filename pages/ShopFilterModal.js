import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ShopRentForm from './ShopRentForm';
import ShopSellForm from './ShopSellForm';
import ShopFinForm from './ShopFinForm';

// import myoffering from './myoffering';

const options = ['임대', '매매', '거래완료'];
var previous;
let {width, height} = Dimensions.get('window');

class ShopFilterModal extends Component{

constructor(props){
    super(props);
    
    this.state={
     selectedSegment: '임대'
    }

}

handleIndexChange = (index) => {
    this.setState({
       selectedSegment: options[index],
    });
  }

_inputHandler(filtername, input){   
var stateObject = function() {
    returnObj = {};
    returnObj[filtername] = input;
        return returnObj;
    }

this.props.inputHandler(stateObject);

}
_segmentChange(segment){
    this.props.segmentChange(segment);
}
_resetHandler(){
    this.props.resetHandler();
}
_recHandler(list){
   this.props.recHandler(list);
}
_offeringHandler(data,count){

    this.props.offeringHandler(data,count);
}
_closeModal(){
    this.props.closeModal();
}

render(){

     return(
    <View style ={{marginBottom:156}}>

       {/* 헤더 */}
        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#3b4db7', padding:8, height:45, width:'100%'}}>

            <TouchableOpacity
            style={{width:40,height:35,backgroundColor:'#3b4db7', padding:10, alignItems:'center', justifyContent:'center' }}
            onPress={this._closeModal.bind(this)}>

            <Icon
                name="ios-close"
                size={40}
                style={{color: '#fff', marginBottom:5}}
                />     
            
            </TouchableOpacity>

            <Text style={{color: '#fff', fontSize: 16, fontWeight:'bold', marginTop:4}}>조건검색 (마이노트)</Text>
            
            <TouchableOpacity
            style={{width:40,height:35,backgroundColor:'#3b4db7', padding:10, alignItems:'center', justifyContent:'center' }}
            onPress={this._resetHandler.bind(this)}
            >

            <Icon
                name="ios-refresh"
                size={30}
                style={{color: '#fff', marginBottom:5}}
                />     
            
            </TouchableOpacity>

        </View> 

        <View style={{borderBottomWidth:1, borderColor:'#16236e'}}>
            <SegmentedControlTab
            tabsContainerStyle={{marginTop:-0.5, marginRight:-1}}
            borderRadius={0}
            tabStyle={{borderColor: '#16236e', borderWidth:1, borderBottomWidth:1.5, borderRightWidth:0.5, borderLeftWidth:0.5}}
            activeTabStyle={{ backgroundColor: '#16236e', }}
            tabTextStyle={{color:'#16236e'}}
            values={options}
            selectedIndex={options.indexOf(this.state.selectedSegment)}
            onTabPress={this.handleIndexChange}
            />
        </View>

        {this.state.selectedSegment=='임대'? <ShopRentForm
                                              memberID = {this.props.memberID}
                                              level = {this.props.level}
                                              boss = {this.props.boss}
                                              countPerLoad = {this.props.countPerLoad}
                                              inputHandler = {this._inputHandler.bind(this)} 
                                              segmentChange = {this._segmentChange.bind(this)}
                                              resetHandler = {this._resetHandler.bind(this)}
                                              recHandler = {this._recHandler.bind(this)}
                                              offeringHandler = {this._offeringHandler.bind(this)}
                                              /> : 
        this.state.selectedSegment=='매매'?  <ShopSellForm
                                                memberID = {this.props.memberID}
                                                level = {this.props.level}
                                                boss = {this.props.boss}
                                                countPerLoad = {this.props.countPerLoad}
                                                inputHandler = {this._inputHandler.bind(this)} 
                                                segmentChange = {this._segmentChange.bind(this)}
                                                resetHandler = {this._resetHandler.bind(this)}
                                                recHandler = {this._recHandler.bind(this)}
                                                offeringHandler = {this._offeringHandler.bind(this)}
                                                
                                                /> :
                                             <ShopFinForm
                                             memberID = {this.props.memberID}
                                             level = {this.props.level}
                                             boss = {this.props.boss}
                                             countPerLoad = {this.props.countPerLoad}
                                             inputHandler = {this._inputHandler.bind(this)} 
                                             segmentChange = {this._segmentChange.bind(this)}
                                             resetHandler = {this._resetHandler.bind(this)}
                                             recHandler = {this._recHandler.bind(this)}
                                             offeringHandler = {this._offeringHandler.bind(this)}
                                             
                                             />
         }
     
 </View>          

        )
    }
}          

export default ShopFilterModal;