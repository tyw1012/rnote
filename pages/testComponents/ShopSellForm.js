import React, {Component} from 'react';
import {View, TouchableOpacity,  Text,Modal, TextInput, StyleSheet, ActivityIndicator, Dimensions, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

var options = ['임대', '매매', '거래완료'];
var previous;
let {width, height} = Dimensions.get('window');

class ShopSellForm extends Component{

constructor(props){
    super(props);
    
    this.state={

        isSearching:false,

        onSalePriceEditMode:false,
        onPsalePriceEditMode:false,
        onSilinsuEditMode:false,
        onProfitEditMode:false,
        
        salePriceSliderValue:[0,9999999],
        psalePriceSliderValue:[0,999999],
        silinsuSliderValue:[0,9999999],
        profitSliderValue:[0,999999],
       
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

        nameFilter_sell:'',
        addrFilter_sell:'',
        writerFilter_sell:'',
        areaMinFilter_sell:'',
        areaMaxFilter_sell:'',
    
        salePriceMinFilter:'',
        salePriceMaxFilter:'',
        psalePriceMinFilter:'',
        psalePriceMaxFilter:'',
        silinsuMinFilter:'',
        silinsuMaxFilter:'',
        profitMinFilter:'',
        profitMaxFilter:'',

        onSalePriceEditMode:false,
        onPsalePriceEditMode:false,
        onSilinsuEditMode:false,
        onProfitEditMode:false,

        salePriceSliderValue:[0,9999999],
        psalePriceSliderValue:[0,999999],
        silinsuSliderValue:[0,9999999],
        profitSliderValue:[0,999999],

      
    })
    this.props.resetHandler();
}

_salePriceSliderValuesChange = (values) => {
    
    this.setState({
      salePriceSliderValue: values,
      onSalePriceEditMode:true,
    });
    
  }

_psalePriceSliderValuesChange = (values) => {


this.setState({
    psalePriceSliderValue: values,
    onPsalePriceEditMode:true,
});

}
_silinsuSliderValuesChange = (values) => {


this.setState({
    silinsuSliderValue: values,
    onSilinsuEditMode:true,
});

}
_profitSliderValuesChange = (values) => {


this.setState({
    profitSliderValue: values,
    onProfitEditMode:true,
});

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
                        value={ this.state.nameFilter_sell}
                        onChangeText= {input => this.setState({nameFilter_sell: input})}
                        onFocus={(event: Event) => {
                          
                          this.scroll.props.scrollToPosition(0, 0)
                        }}
                        />
                    {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                
                </View>
        
          </View>

          <View style={{flexDirection: 'row',}}>

                <View style = {{flex:1,}}>    
        
                        <Text style={styles.itemName}>주소</Text>
                
                        <TextInput
                        placeholder=""
                        placeholderTextColor='#aaa'
                        ref='SecondInput'
                        onSubmitEditing={(event) => { 
                          this.refs.ThirdInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"}
                        style={styles.itemInput}
                        underlineColorAndroid="transparent"
                        value={ this.state.addrFilter_sell}
                        onChangeText= {input => this.setState({addrFilter_sell: input})}
                        onFocus={(event: Event) => {
                          
                          this.scroll.props.scrollToPosition(0, 0)
                        }}
                        />
                        
                     
                    {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                
                </View>
        
       
             </View>
       {/* </View> */}
    
        <View style={{flexDirection: 'row', marginBottom:15, marginTop:10,}}>

                <Text style={[styles.itemName,{marginTop:12}]}>면적</Text>
        
                    <View style = {[styles.row2, {marginTop:6,}]}>    
            
                        
            
                        <TextInput
                        placeholder="최소"
                        placeholderTextColor='#aaa'
                        ref='ThirdInput'
                        onSubmitEditing={(event) => { 
                          this.refs.FourthInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"}
                        style={[styles.itemInput, {position:'relative'}]}
                        keyboardType='phone-pad'
                        underlineColorAndroid="transparent"
                        value={ this.state.areaMinFilter_sell}
                        onChangeText= {input => this.setState({areaMinFilter_sell: input})}
                        onFocus={(event: Event) => {
                            
                            this.scroll.props.scrollToPosition(0, 100)
                        }}
                        />
                        <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>
                    
                    </View>
            
                    <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
    
                    <View style = {[styles.row2, {marginTop:6}]}>    
            
                            {/* <Text style={styles.itemName}> </Text> */}
            
                        
                            <TextInput
                            placeholder="최대"
                            placeholderTextColor='#aaa'
                            ref='FourthInput'
                            style={[styles.itemInput, {}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.state.areaMaxFilter_sell}
                            onChangeText= {input => this.setState({areaMaxFilter_sell: input})}
                            onFocus={(event: Event) => {
                            
                            this.scroll.props.scrollToPosition(0, 100)
                            }}
                            />                      
                        
                            <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>
                    
                    </View>
    
                    
        </View>
        </View>
        
        <View style={styles.segment}>  

        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>  
            <Text style={[styles.itemName,{marginTop:15, marginBottom:25}]}>총매도가</Text>
            <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>{
                this.state.onSalePriceEditMode?
                    this.state.salePriceSliderValue[0]==this.state.salePriceSliderValue[1]?
                        this.state.salePriceSliderValue[1]==9999999?
                            '1000000만 이상'
                        :this.state.salePriceSliderValue[1]+'만'
                    :
                        this.state.salePriceSliderValue[1]==9999999?
                             this.state.salePriceSliderValue[0]+'만 - 1000000만 이상'
                        :this.state.salePriceSliderValue[0]+'만 - '+ this.state.salePriceSliderValue[1]+'만'
                :'전체'} 
            </Text>
           
        </View>
        <View style={{alignItems:'center'}}>
        <MultiSlider
            values={[this.state.salePriceSliderValue[0], this.state.salePriceSliderValue[1]]}
            sliderLength={width-65}
            onValuesChange={this._salePriceSliderValuesChange}
            min={0}
            max={9999999}
            containerStyle={{height:30,marginBottom: -10,}}
            // step={500}
            optionsArray={[0,10000,15000,20000,25000,30000,35000,40000,45000,50000,60000,70000,80000,90000,100000,150000,200000,250000,300000,350000,400000,500000,600000,700000,800000,900000,1000000,9999999]}
            allowOverlap={true}
            snapped={true}
            touchDimensions	={ {height: 60, width: 100, borderRadius: 25, slipDisplacement: 70} }
            markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7'}}
            selectedStyle={{backgroundColor:'#3b4db7'}}
       />
        </View>

        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>  
            <Text style={[styles.itemName,{ marginBottom:25}]}>평당가격</Text>
            <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>
            {
                this.state.onPsalePriceEditMode?
                    this.state.psalePriceSliderValue[0]==this.state.psalePriceSliderValue[1]?
                        this.state.psalePriceSliderValue[1]==999999?
                            '10000만 이상'
                        :this.state.psalePriceSliderValue[1]+'만'
                    :
                        this.state.psalePriceSliderValue[1]==999999?
                             this.state.psalePriceSliderValue[0]+'만 - 10000만 이상'
                        :this.state.psalePriceSliderValue[0]+'만 - '+ this.state.psalePriceSliderValue[1]+'만'
                :'전체'} 
            </Text>
          
        </View>
        <View style={{alignItems:'center'}}>
        <MultiSlider
            values={[this.state.psalePriceSliderValue[0], this.state.psalePriceSliderValue[1]]}
            sliderLength={width-65}
            onValuesChange={this._psalePriceSliderValuesChange}
            min={0}
            max={999999}
            containerStyle={{height:30,marginBottom: -10,}}
            // step={500}
            optionsArray={[0,200,500,1000,1500,2000,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000,12000,14000,16000,18000,20000,25000,30000,40000,50000,100000,999999]}
            allowOverlap={true}
            snapped={true}
            touchDimensions	={ {height: 60, width: 100, borderRadius: 35, slipDisplacement: 70} }
            markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7'}}
            selectedStyle={{backgroundColor:'#3b4db7'}}
        />
        </View>

        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>  
            <Text style={[styles.itemName,{ marginBottom:25}]}>실인수가</Text>
            <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>
            {
                this.state.onSilinsuEditMode?
                    this.state.silinsuSliderValue[0]==this.state.silinsuSliderValue[1]?
                        this.state.silinsuSliderValue[1]==9999999?
                            '1000000만 이상'
                        :this.state.silinsuSliderValue[1]+'만'
                    :
                        this.state.silinsuSliderValue[1]==9999999?
                             this.state.silinsuSliderValue[0]+'만 - 1000000만 이상'
                        :this.state.silinsuSliderValue[0]+'만 - '+ this.state.silinsuSliderValue[1]+'만'
                :'전체'} 
             </Text>
          
        </View>
        <View style={{alignItems:'center'}}>
        <MultiSlider
            values={[this.state.silinsuSliderValue[0], this.state.silinsuSliderValue[1]]}
            sliderLength={width-65}
            onValuesChange={this._silinsuSliderValuesChange}
            min={0}
            max={9999999}
            containerStyle={{height:30, marginBottom: -10,}}
            // step={500}
            optionsArray={[0,10000,15000,20000,25000,30000,35000,40000,45000,50000,60000,70000,80000,90000,100000,150000,200000,250000,300000,350000,400000,500000,600000,700000,800000,900000,1000000,9999999]}
            allowOverlap={true}
            snapped={true}
            touchDimensions	={ {height: 60, width: 100, borderRadius: 35, slipDisplacement: 70} }
            markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7'}}
            selectedStyle={{backgroundColor:'#3b4db7'}}
        />
        </View>

        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>  
            <Text style={[styles.itemName,{ marginBottom:25}]}>수익률</Text>
            <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>
            {
                this.state.onProfitEditMode?
                    this.state.profitSliderValue[0]==this.state.profitSliderValue[1]?
                        this.state.profitSliderValue[1]==999999?
                            '50% 이상'
                        :this.state.profitSliderValue[1]+' %'
                    :
                        this.state.profitSliderValue[1]==999999?
                             this.state.profitSliderValue[0]+' % - 50% 이상'
                        :this.state.profitSliderValue[0]+'% - '+ this.state.profitSliderValue[1]+'%'
                :'전체'} 
            </Text>
          
        </View>
        <View style={{alignItems:'center'}}>
        <MultiSlider
            values={[this.state.profitSliderValue[0], this.state.profitSliderValue[1]]}
            sliderLength={width-65}
            onValuesChange={this._profitSliderValuesChange}
            min={0}
            max={999999}
            containerStyle={{height:30,marginBottom: 100,}}
            // step={500}
            optionsArray={[0,1,2,3,4,5,6,7,8,9,10,12,15,20,25,30,35,40,50,999999]}
            allowOverlap={true}
            snapped={true}
            touchDimensions	={ {height: 60, width:100, borderRadius: 35, slipDisplacement: 70} }
            markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7',}}
            selectedStyle={{backgroundColor:'#3b4db7'}}
        />
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
    this.props.segmentChange('매매');  
      
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
        selectedSegment: '매매',
        myoffering_from: 0,
        countPerLoad: this.props.countPerLoad,

        name_sell: this.state.nameFilter_sell,
        addr_sell: this.state.addrFilter_sell,
        areaMin_sell: this.state.areaMinFilter_sell,
        areaMax_sell: this.state.areaMaxFilter_sell,   
        
        salePriceMin: this.state.onSalePriceEditMode? this.state.salePriceSliderValue[0] : '',
        salePriceMax: this.state.onSalePriceEditMode? this.state.salePriceSliderValue[1] : '',
        psalePriceMin: this.state.onPsalePriceEditMode? this.state.psalePriceSliderValue[0] : '',
        psalePriceMax: this.state.onPsalePriceEditMode? this.state.psalePriceSliderValue[1] : '',
        silinsuMin: this.state.onSilinsuEditMode? this.state.silinsuSliderValue[0] : '',
        silinsuMax: this.state.onSilinsuEditMode? this.state.silinsuSliderValue[1] : '',
        profitMin: this.state.onProfitEditMode? this.state.profitSliderValue[0] : '',
        profitMax: this.state.onProfitEditMode? this.state.profitSliderValue[1] : '',

      })

    })
    .then((res)=>{

      
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_count = JSON.parse(res._bodyText).count.count;
      
      this.setState({isSearching:false});

      this.props.inputHandler('nameFilter_sell', this.state.nameFilter_sell);
      this.props.inputHandler('addrFilter_sell', this.state.addrFilter_sell);
      this.props.inputHandler('areaMinFilter_sell', this.state.areaMinFilter_sell);
      this.props.inputHandler('areaMaxFilter_sell', this.state.areaMaxFilter_sell);

      this.state.onDepositEditMode?this.props.inputHandler('depositMinFilter',this.state.depositSliderValue[0]):null
      this.state.onDepositEditMode?this.props.inputHandler('depositMaxFilter',this.state.depositSliderValue[1]):null
      this.state.onMrateEditMode?this.props.inputHandler('mrateMinFilter',this.state.mrateSliderValue[0]):null
      this.state.onMrateEditMode?this.props.inputHandler('mrateMaxFilter',this.state.mrateSliderValue[1]):null
      this.state.onPremoEditMode? this.props.inputHandler('premoMinFilter',this.state.premoSliderValue[0]):null
      this.state.onPremoEditMode?this.props.inputHandler('premoMaxFilter',this.state.premoSliderValue[1]):null
      this.state.onSumEditMode?this.props.inputHandler('sumMinFilter',this.state.sumSliderValue[0]):null
      this.state.onSumEditMode?this.props.inputHandler('sumMaxFilter',this.state.sumSliderValue[1]):null
      
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
    
export default ShopSellForm;