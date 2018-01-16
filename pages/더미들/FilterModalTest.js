import React, {Component} from 'react';
import { Modal, Dimensions} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { CheckBox } from 'react-native-elements'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import SegmentedControlTab from 'react-native-segmented-control-tab';
// import myoffering from './myoffering';
import ShopFilterModal from './ShopFilterModal';

var options = ['임대', '매매', '거래완료'];
var previous;
let {width, height} = Dimensions.get('window');

class FilterModalTest extends Component{

constructor(props){
    super(props);
    
    this.state={
       
    }

}


_closeModal(){

    this.props.closeModal();
   
}

_inputHandler(filterState){
    // this.props.offeringHandler(filterState.parsedRes, filterState.parsedRes_count);
    this.props.inputHandler(filterState)
    
}
_segmentChange(segment){
    this.props.segmentChange(segment);
}
_resetHandler(){
    this.props.resetHandler();
}
_recHandler(list){
    this.props.recHandler(list)
}
_offeringHandler(data,count){
    this.props.offeringHandler(data,count)
}

render(){

     return(
    
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={this._closeModal.bind(this)}
        >
                {/* {this.state.selectedOfferingType=='상가'? */}
                 <ShopFilterModal
                 memberID = {this.props.memberID}
                 level = {this.props.level}
                 boss = {this.props.boss}
                 countPerLoad = {this.props.countPerLoad}
                 inputHandler = {this._inputHandler.bind(this)}
                 segmentChange = {this._segmentChange.bind(this)}
                 resetHandler= {this._resetHandler.bind(this)}
                 recHandler ={this._recHandler.bind(this)} 
                 offeringHandler = {this._offeringHandler.bind(this)}
                 closeModal = {this._closeModal.bind(this)}
                 /> 
                {/* //  : null
                // this.state.selectedOfferingType=='토지'? 
                //  <LandFilterModal/> :
                // this.state.selectedOfferingType=='원룸'?  
                // <RoomFilterModal/> :                                                         
                // <ApartFilterModal/>
                // }                */}

        </Modal>

        )
  
    }
}          


export default FilterModalTest;