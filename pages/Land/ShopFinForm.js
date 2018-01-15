import React, {Component} from 'react';
import {View, TouchableOpacity,  Text,Modal, TextInput, StyleSheet, ActivityIndicator, Dimensions, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

var options = ['임대', '매매', '거래완료'];
var previous;
let {width, height} = Dimensions.get('window');

class ShopFinForm extends Component{

constructor(props){
    super(props);
    
    this.state={

        isSearching:false,

    }

}

_renderIndicator(){
    return (
       
        <View style={{width:'100%',alignItems: 'center'}}>
               
        <ActivityIndicator size='large' style ={{position: 'absolute', top: 200, zIndex:10,}}/>

        </View>
    )

}
include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
}

_resetHandler(){
    this.setState({

        nameFilter_fin:'',
        addrFilter_fin:'',
      
    })
    this.props.resetHandler();
}



render(){

     return(
    <View>

        <KeyboardAwareScrollView enableOnAndroid={true}
        keyboardShouldPersistTaps='always'
        innerRef={ref => {this.scroll = ref}}
        style={styles.modalContainer}
        >

        {this.state.isSearching? this._renderIndicator():null}  

        <ScrollView keyboardShouldPersistTaps="always">     

    {/* <View style={{paddingBottom: 10, marginBottom:10, }}> */}
    <View style={styles.segment}>

        <View style={{flexDirection: 'row',}}>

            <View style = {{flex:1,}}>    
    
                    <Text style={[styles.itemName,{marginTop:0}]}>매물명</Text>
            
                    <TextInput
                    placeholder=""
                    placeholderTextColor='#aaa'
                    onSubmitEditing={(event) => { 
                      this.refs.SecondInput.focus(); 
                    }}
                    blurOnSubmit={false}
                    returnKeyType = {"next"}
                    style={styles.itemInput}
                    underlineColorAndroid="transparent"
                    value={ this.state.nameFilter_fin}
                    onChangeText= {input => this.setState({nameFilter_fin:input})}
                    onFocus={(event: Event) => {
                      
                      this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />
                {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
            
            </View>
    
      </View>

      <View style={{flexDirection: 'row',}}>

            <View style = {{flex:1, }}>    
    
                    <Text style={styles.itemName}>주소</Text>
            
                    <TextInput
                    placeholder=""
                    placeholderTextColor='#aaa'
                    ref='SecondInput'
                    style={styles.itemInput}
                    underlineColorAndroid="transparent"
                    value={ this.state.addrFilter_fin}
                    onChangeText= {input => this.setState({addrFilter_fin:input})}
                    onFocus={(event: Event) => {
                      
                      this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />
                    
                 
                {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
            
            </View>
      </View>
      </View>
  </ScrollView>
    
        </KeyboardAwareScrollView>
        {/* 양식 */}

        {/* 필터적용버튼 */}
<TouchableOpacity style={{
  position: 'absolute', width:'50%', height:45, bottom:0, right:0, backgroundColor:'#3b4db7', alignItems:'center',justifyContent:'center'}}
  onPress={()=>{

    this.setState({isSearching:true});
    this.props.segmentChange('거래완료');  
      
    fetch('http://real-note.co.kr/app3/searchByFilterMerged.php', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        "Accept-Encoding": "gzip, deflate",
        'Content-type': 'application/json',
      },
      body:JSON.stringify({
        
        memberID: this.props.memberID,
        level:this.props.level,
        memberName: this.props.memberName,
        boss: this.props.boss,
        selectedSegment: '거래완료',
        myoffering_from: 0,
        countPerLoad: this.props.countPerLoad,

        name_fin: this.state.nameFilter_fin,
        addr_fin: this.state.addrFilter_fin,
      
      })

    })
    .then((res)=>{

      
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_count = JSON.parse(res._bodyText).count.count;
      
      this.setState({isSearching:false});

      this.props.inputHandler('nameFilter_fin', this.state.nameFilter_fin);
      this.props.inputHandler('addrFilter_fin', this.state.addrFilter_fin);
          
      this.props.offeringHandler(parsedRes, parsedRes_count);
      
    //   this.setState({modalVisible:false, myoffering:parsedRes, isFiltered:true, filterText:'필터해제'})
    })
    
  }}
  >
    <Text style={{fontSize: 16, fontWeight:'bold', color: '#fff'}}>필터적용</Text>
</TouchableOpacity>  
<TouchableOpacity
style={{position: 'absolute', width:'50%', height:45, bottom:0, left:0, backgroundColor:'#3b4db7', alignItems:'center',justifyContent:'center',}}
onPress={this._resetHandler.bind(this)}
>
<Text style={{fontSize: 16, fontWeight:'bold', color: '#fff'}}>초기화</Text>
</TouchableOpacity>
       
 </View>          


        )
  
    }
}          


const styles = StyleSheet.create({
    modalContainer: {
        
        // justifyContent: 'center',
        // alignItems: 'center',
        padding:0,
        backgroundColor: '#f1f1f1',
        // paddingBottom:50
      },
    
      segment:{
        backgroundColor: '#fff',
        padding:20,
        marginBottom:8,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#e1e1e1'
      },
      segment_rec:{
    
        backgroundColor: '#fff',
        padding:0,
        marginBottom:8,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#e1e1e1'
    
      },
      flatListWrapper:{
          margin:20,
          marginTop:5,
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
        flexDirection:'row',
        marginTop: 18,
        
      },
      row2:{    
        flex:3.625,
        flexDirection:'row',
        marginTop: 18,
        
      },
      itemName:{
        marginTop:10,
        marginBottom:5,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#666',
        flex:2.75,    
        
        
      },
      itemInput:{
        flex:7.25,
        height:30,    
        fontSize: 13,
        borderColor:"#e6e6e6",
        backgroundColor: "#fff",
        // borderRadius: 3,
        borderBottomWidth: 1,
        padding:5,
        // borderWidth:1
      },
      itemInput2:{
        flex:7.25,
        height:30,    
        fontSize: 12,
        borderColor:"#e6e6e6",
        backgroundColor: "#fff",
        // borderRadius: 3,
        borderWidth: 1,
        padding: 5,
        // borderWidth:1
      },
    })
    
export default ShopFinForm;