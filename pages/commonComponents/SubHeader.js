import React, {Component} from 'react';
import { TextInput,View,Text,StyleSheet,TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class SubHeader extends Component{

shouldComponentUpdate(nextProps, nextState) {

if(this.props.onCheckMode === nextProps.onCheckMode &&
   this.props.offering_count === nextProps.offering_count &&
   this.props.offering_count_fltr === nextProps.offering_count_fltr &&
   this.props.isFiltered === nextProps.isFiltered &&
   this.props.selectedSegment === nextProps.selectedSegment &&
   this.props.checkedOffering === nextProps.checkedOffering ){

    return false;
    }

return true;

}
render(){
    // console.log('headerRendering')
    if(!this.props.onCheckMode){
        return(
           <View style={styles.buttonWrapper}>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginLeft:12, fontSize:12, }}>총 </Text>
                    <Text style={{fontWeight:'bold', color:'#3b4db7', fontSize:12}}>{this.props.isFiltered?this.props.offering_count_fltr:this.props.offering_count}</Text>            
                    <Text style={{fontSize:12,}}>{this.props.isFiltered?'개의 매물이 검색되었습니다':'개의 매물이 있습니다'}</Text>
                  </View>
                  
                  <TouchableOpacity style={{flexDirection:'row', marginRight:10, backgroundColor:'#fff', borderColor:'#3b4db7',borderWidth:1, width:85, height:25, padding:3, alignItems:'center', justifyContent:'center' }}
                  onPress={()=>this.props.segmentDialog()}>
                    <Text style={{ color:'#3b4db7', fontSize:12, marginRight:5,}}>{this.props.selectedSegment} </Text>
                    <Icon
                    name="ios-arrow-down"
                    size={22}
                    style={{color: '#3b4db7',}}
                    />          
                  </TouchableOpacity>
               
             </View>
        )
      }
      else{
        return(
          <View style={[styles.buttonWrapper,{backgroundColor:'#333', height:45, paddingTop:12}]}>
            <View style={{flexDirection:'row',}}>
                {/* {this._renderClose()} */}
                <TouchableOpacity
                style={{padding:5, marginRight:10,}}
                onPress = {()=>{this.props.stateHandler({onCheckMode:!this.props.onCheckMode}) }}
                >
                            <Icon 
                            name="ios-close"
                            size={40}
                            style={{ marginTop:-15, marginLeft: 10, color: '#fff'}}
                                
                            />               
                </TouchableOpacity>
                <Text style={{color:'#fff', fontSize: 14,}}>매물을 선택하세요.</Text>
            </View>
            <View style={{flexDirection:'row',}}>
                <TouchableOpacity
                style={this.props.checkedOffering.length!=0?{marginRight:15, }:{display:'none'}}
                onPress={()=>{
                  var offering = this.props.myoffering.slice(0);
                  for(var i = 0; i<offering.length; i++){
                    offering[i].isChecked=false;
                  }
                  this.props.stateHandler({myoffering:offering, checkedOffering:[], })
                  
                  }}>
    
                <Text style={{color:'#f4c93d', fontSize: 13}}>전체해제 </Text>
    
                </TouchableOpacity>
    
                <TouchableOpacity
                style={this.props.checkedOffering.length!=0?{marginRight:15, }:{display:'none'}}
                onPress={()=>{
                  
                  fetch('http://real-note.co.kr/app3/getBookmark.php',{
                    method:'post',
                    header:{
                      'Accept': 'application/json',
                      'Content-type': 'application/json'
                    },
                    body:JSON.stringify({
                      selectedOfferingType: this.props.selectedOfferingType,
                      memberID: this.props.memberID,
                      boss: this.props.boss,
                      
                    })
                  })
                  .then((res)=>{
                  
                    var parsedRes = JSON.parse(res._bodyText).data;
                    var parsedRes_folder = JSON.parse(res._bodyText).folder;
                    folderList=[];
                   
                    
                    for(var i =0; i<=parsedRes_folder.length-1; i++){
                      
    
                      if(i == 0){
                        this.props.stateHandler({selectedFolder: parsedRes_folder[i].bmf_name})
                      }
                      parsedRes_folder[i].data = [];
                      folderList.push(parsedRes_folder[i].bmf_name);
                        
                    }
                 
                    this.props.stateHandler({bookmark:parsedRes_folder, folderList:folderList}, ()=>{
        
                        this.props.folderListDialog()
        
                    });
                    
                  })
                  
                  }}>
                    <Text style={{color:'#f4c93d', fontSize: 13}}> 추가하기 </Text>
                </TouchableOpacity>
                
            </View>
          </View>
        )
    
      }



}


}

const styles = StyleSheet.create({
	
  buttonWrapper:{
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent:'space-between',
    paddingTop: 10, paddingBottom: 10,
    backgroundColor:'#f9f9f9',
    borderBottomWidth:1,
    borderColor:'#ddd',
   }
})
export default SubHeader