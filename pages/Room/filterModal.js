import React, {Component} from 'react';
import {View, TouchableOpacity,  Text,Modal, TextInput, StyleSheet, ActivityIndicator, Dimensions, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { SegmentedControls } from 'react-native-radio-buttons';
import { RadioButtons } from 'react-native-radio-buttons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SegmentedControlTab from 'react-native-segmented-control-tab';
// import myoffering from './myoffering';


var options = ['공실', '건물'];
var previous;
let {width, height} = Dimensions.get('window');

class FilterModal extends Component{

constructor(props){
    super(props);
    
    this.state={
        onEditMode:false,
        selectedSegment: '공실',
        isSearching:false,
        depositSliderValue:[0,999999],
        mrateSliderValue:[0,999999],
        premoSliderValue: [0, 999999],
        sumSliderValue:[0,999999],
        onDepositEditMode:false,
        onMrateEditMode:false,
        onPremoEditMode:false,
        onSumEditMode:false,
        salePriceSliderValue:[0,9999999],
        psalePriceSliderValue:[0,999999],
        silinsuSliderValue:[0,9999999],
        profitSliderValue:[0,999999],

        flatListVisible:false,
        wr_rec_sectors:[],
        wr_rec_full:['음식점','고깃집','횟집','퓨전주점','소주방','휴게음식점','카페','테이크아웃','분식','미용','네일','뷰티','판매','휴대폰','화장품','의류','잡화','편의점','마트','오락스포츠','헬스','골프','당구장','노래연습장','단란유흥','BAR','스포츠마사지','자동차','학원','병원','사무실','다용도','숙박','양도양수','프렌차이즈','대형매장'],
        wr_rec_full_bool:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    }

}

handleIndexChange = (index) => {
    this.setState({
       selectedSegment: options[index],
    });
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

_renderForm_fin(){

    return(

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
                    value={ this.props.getFilterValue('nameFilter_fin')}
                    onChangeText= {input => this.props.inputHandler('nameFilter_fin',input)}
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
                    value={ this.props.getFilterValue('addrFilter_fin')}
                    onChangeText= {input => this.props.inputHandler('addrFilter_fin',input)}
                    onFocus={(event: Event) => {
                      
                      this.scroll.props.scrollToPosition(0, 0)
                    }}
                    />
                    
                 
                {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
            
            </View>
      </View>
      </View>
  </ScrollView>
    )

    

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

_renderForm_sell(){
    return (
        
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
                        value={ this.props.getFilterValue('nameFilter_sell')}
                        onChangeText= {input => this.props.inputHandler('nameFilter_sell',input)}
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
                        value={ this.props.getFilterValue('addrFilter_sell')}
                        onChangeText= {input => this.props.inputHandler('addrFilter_sell',input)}
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
                        value={ this.props.getFilterValue('areaMinFilter_sell')}
                        onChangeText= {input => this.props.inputHandler('areaMinFilter_sell',input)}
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
                            value={ this.props.getFilterValue('areaMaxFilter_sell')}
                            onChangeText= {input => this.props.inputHandler('areaMaxFilter_sell',input)}
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
                            '20000만 이상'
                        :this.state.psalePriceSliderValue[1]+'만'
                    :
                        this.state.psalePriceSliderValue[1]==999999?
                             this.state.psalePriceSliderValue[0]+'만 - 20000만 이상'
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
            optionsArray={[0,100,200,300,400,500,600,700,800,900,1000,1200,1400,1600,1800,2000,2500,3000,3500,4000,5000,6000,7000,8000,9000,10000,15000,20000,999999]}
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
          
    
)
}

_depositSliderValuesChange = (values) => {
    
    
    this.setState({
      depositSliderValue: values,
      onDepositEditMode:true,
    });
    
  }
_mrateSliderValuesChange = (values) => {
this.setState({
    mrateSliderValue: values,
    onMrateEditMode: true,
});

}
_premoSliderValuesChange = (values) => {
this.setState({
    premoSliderValue: values,
    onPremoEditMode:true,
});

}
_sumSliderValuesChange = (values) => {
this.setState({
    sumSliderValue: values,
    onSumEditMode:true,
});

}
_convertToBool(string){
    if (string =='0'){
        return false
    }
    if (string =='1'){
        return true
    }
}
_chooseRoomType(type){
    if (type =='원룸'){
        this.props.inputHandler('roomTypeFilter', "1")
    }
    if (type =='투룸'){
        this.props.inputHandler('roomTypeFilter', "2")
    }
    if (type =='쓰리룸'){
        this.props.inputHandler('roomTypeFilter', "3")
    }
    if (type =='1.5룸'){
        this.props.inputHandler('roomTypeFilter', "4")
    }
    if (type =='전체'){
        this.props.inputHandler('roomTypeFilter', "0")
    }
    
}
_parseBackRoomType(string){
    if (string =='1'){
        return '원룸'
    }
    if (string =='2'){
        return '투룸'
    }
    if (string =='3'){
        return '쓰리룸'
    }
    if (string =='4'){
        return '1.5룸'
    }
    if (string =='0'){
        return '전체'
    }
    if (string == undefined){
        return '전체'
    }
}

_chooseRentType(type){
    if (type =='월세'){
        this.props.inputHandler('rentTypeFilter', "1")
    }
    if (type =='전세'){
        this.props.inputHandler('rentTypeFilter', "2")
    }
    if (type =='전체'){
        this.props.inputHandler('rentTypeFilter', "0")
    }
  
}
_parseBackRentType(string){
    if (string =='1'){
        return '월세'
    }
    if (string =='2'){
        return '전세'
    }
    if (string =='0'){
        return '전체'
    }
    if (string == undefined){
        return '전체'
    }
 
}
renderOption(option, selected, onSelect, index){
    const style = selected ? { fontWeight: 'bold', fontSize:13, margin:12, color: 'white'} : {fontSize:13,margin:12,};
    const style2 = selected ? { backgroundColor: '#3b4db7', alignItems:'center', justifyContent:'center', height: 35,} : {backgroundColor:'#f1f1f1',alignItems:'center', justifyContent:'center', height:35} ;
    return (
        <TouchableOpacity onPress={onSelect} key={index} style={style2} >
        <Text style={style}>{option}</Text>
        </TouchableOpacity>
    );
    }

renderContainer(optionNodes){
return <View style={{flexDirection:'row', }}>{optionNodes}</View>;
}
_renderForm_room(){
    return (
            
       <ScrollView keyboardShouldPersistTaps="always">     

           <View style={styles.segment}>

                <View>

                    <View style = {{flexDirection: 'row', justifyContent:'space-between', marginBottom:15}}>    
            
                            <Text style={[styles.itemName,{marginTop:0}]}>매물형태</Text>                    
                         
                            <RadioButtons
                            options={ ['월세','전세','전체'] }
                            onSelection={ this._chooseRentType.bind(this) }
                            selectedOption={this._parseBackRentType(this.props.getFilterValue('rentTypeFilter'))}
                            renderOption={ this.renderOption }
                            renderContainer={ this.renderContainer }
                            /> 
                    
                    </View>
            
                    

                    <View style = {{flexDirection: 'row', justifyContent:'space-between',marginBottom:10}}>       
            
                            <Text style={[styles.itemName,{marginTop:0}]}>방구분</Text>

                            <RadioButtons
                            options={ ['원룸','1.5룸','투룸','쓰리룸','전체'] }
                            onSelection={ this._chooseRoomType.bind(this) }
                            selectedOption={this._parseBackRoomType(this.props.getFilterValue('roomTypeFilter'))}
                            renderOption={ this.renderOption }
                            renderContainer={ this.renderContainer }

            /> 
                            
                           {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text> */}
                    
                    </View>

                   
              </View>

              <View style={{flexDirection: 'row',}}>

                    <View style = {{flex:1, marginRight:20}}>    
            
                            <Text style={styles.itemName}>주소</Text>
                    
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            ref='ThirdInput'
                            onSubmitEditing={(event) => { 
                            this.refs.FourthInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={styles.itemInput}
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('addrFilter')}
                            onChangeText= {input => this.props.inputHandler('addrFilter',input)}
                            onFocus={(event: Event) => {
                              
                              this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                    
                    </View>

                    <View style = {{flex:1,}}>    
            
                            <Text style={styles.itemName}>인근지하철역</Text>
                    
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            ref='ThirdInput'
                            onSubmitEditing={(event) => { 
                            this.refs.FourthInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={styles.itemInput}
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('subwayFilter')}
                            onChangeText= {input => this.props.inputHandler('subwayFilter',input)}
                            onFocus={(event: Event) => {
                            
                            this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                    
                    </View>
          
     
                 </View>
           {/* </View> */}
       

            </View>

            <View style={styles.segment}>
            <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>  
                <Text style={[styles.itemName,{marginTop:15, marginBottom:25}]}>보증금</Text>
                <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>{
                    this.state.onDepositEditMode?
                        this.state.depositSliderValue[0]==this.state.depositSliderValue[1]?
                            this.state.depositSliderValue[1]==999999?
                                '30000만 이상'
                            :this.state.depositSliderValue[1]+'만'
                        :
                            this.state.depositSliderValue[1]==999999?
                                 this.state.depositSliderValue[0]+'만 - 30000만 이상'
                            :this.state.depositSliderValue[0]+'만 - '+ this.state.depositSliderValue[1]+'만'
                    :'전체'} 
                </Text>
               
            </View>
            <View style={{alignItems:'center'}}>
            <MultiSlider
                values={[this.state.depositSliderValue[0], this.state.depositSliderValue[1]]}
                sliderLength={width-65}
                onValuesChange={this._depositSliderValuesChange}
                min={0}
                max={999999}
                containerStyle={{height:30,marginBottom: -10,}}
                // step={500}
                optionsArray={[0,100,200,300,400,500,1000,1500,2000,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000,12000,14000,16000,18000,20000,25000,30000,999999]}
                allowOverlap={true}
                snapped={true}
                touchDimensions	={ {height: 60, width: 100, borderRadius: 25, slipDisplacement: 70} }
                markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7'}}
                selectedStyle={{backgroundColor:'#3b4db7'}}
           />
            </View>

            <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>  
                <Text style={[styles.itemName,{ marginBottom:25}]}>월세</Text>
                <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>
                {
                    this.state.onMrateEditMode?
                        this.state.mrateSliderValue[0]==this.state.mrateSliderValue[1]?
                            this.state.mrateSliderValue[1]==999999?
                                '300만 이상'
                            :this.state.mrateSliderValue[1]+'만'
                        :
                            this.state.mrateSliderValue[1]==999999?
                                 this.state.mrateSliderValue[0]+'만 - 300만 이상'
                            :this.state.mrateSliderValue[0]+'만 - '+ this.state.mrateSliderValue[1]+'만'
                    :'전체'} 
                </Text>
              
            </View>
            <View style={{alignItems:'center'}}>
            <MultiSlider
                values={[this.state.mrateSliderValue[0], this.state.mrateSliderValue[1]]}
                sliderLength={width-65}
                onValuesChange={this._mrateSliderValuesChange}
                min={0}
                max={999999}
                containerStyle={{height:30,marginBottom: -10,}}
                // step={500}
                optionsArray={[0,10,20,30,40,50,60,70,80,90,100,120,140,160,180,200,250,300,999999]}
                allowOverlap={true}
                snapped={true}
                touchDimensions	={ {height: 60, width: 100, borderRadius: 35, slipDisplacement: 70} }
                markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7'}}
                selectedStyle={{backgroundColor:'#3b4db7'}}
            />
            </View>

 
        </View>
        
            <View style={styles.segment_rec}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', padding:20,}}
                onPress={()=>{this.setState({flatListVisible:!this.state.flatListVisible})}}>
               
                    <Text style={[styles.itemName,{ marginTop:0}]}>층수/면적</Text>
                    <Icon
                    name="ios-arrow-down"
                    size={22}
                    style={{color: '#3b4db7',}}
                    onPress={()=>{this.setState({flatListVisible:!this.state.flatListVisible})}}
                    />      
                </TouchableOpacity>

              <View style={this.state.flatListVisible?{padding:20, paddingTop:5}:{display:'none'}}>
                <View style={{flexDirection: 'row', marginBottom:10}}>

                    <Text style={[styles.itemName,{marginTop:12}]}>층수</Text>

                    <View style = {[styles.row2, {marginTop:6,}]}>    

                        <TextInput
                        placeholder="최소"
                        placeholderTextColor='#aaa'
                        ref='FourthInput'
                        onSubmitEditing={(event) => { 
                        this.refs.FifthInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"}
                        style={[styles.itemInput, {}]}
                        keyboardType='phone-pad'
                        underlineColorAndroid="transparent"
                        value={ this.props.getFilterValue('floorMinFilter')}
                        onChangeText= {input => this.props.inputHandler('floorMinFilter',input)}
                        onFocus={(event: Event) => {
                            
                            this.scroll.props.scrollToPosition(0, 50)
                        }}
                        />
                        <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>층</Text>

                    </View>

                    <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>

                    <View style = {[styles.row2, {marginTop:6}]}>    

                            {/* <Text style={styles.itemName}> </Text> */}

                        
                            <TextInput
                            placeholder="최대"
                            placeholderTextColor='#aaa'
                            ref='FifthInput'
                            onSubmitEditing={(event) => { 
                            this.refs.SixthInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={[styles.itemInput, {}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('floorMaxFilter')}
                            onChangeText= {input => this.props.inputHandler('floorMaxFilter',input)}
                            onFocus={(event: Event) => {
                            
                            this.scroll.props.scrollToPosition(0, 50)
                            }}
                            />                      
                        
                            <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>층</Text>

                    </View>


            </View>

            <View style={{flexDirection: 'row', marginBottom:15, marginTop:10,}}>

                    <Text style={[styles.itemName,{marginTop:12}]}>면적</Text>

                    <View style = {[styles.row2, {marginTop:6,}]}>    

                        

                        <TextInput
                        placeholder="최소"
                        placeholderTextColor='#aaa'
                        ref='SixthInput'
                        onSubmitEditing={(event) => { 
                        this.refs.SeventhInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"}
                        style={[styles.itemInput, {position:'relative'}]}
                        keyboardType='phone-pad'
                        underlineColorAndroid="transparent"
                        value={ this.props.getFilterValue('areaMinFilter')}
                        onChangeText= {input => this.props.inputHandler('areaMinFilter',input)}
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
                            ref='SeventhInput'
                            style={[styles.itemInput, {}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('areaMaxFilter')}
                            onChangeText= {input => this.props.inputHandler('areaMaxFilter',input)}
                            onFocus={(event: Event) => {
                            
                            this.scroll.props.scrollToPosition(0, 100)
                            }}
                            />                      
                        
                            <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>

                    </View>


                </View>
            </View>
              
                
                                  
        </View>

        <View style={[styles.segment_rec, {marginBottom:50}]}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', padding:20,}}
                onPress={()=>{this.setState({flatListVisible2:!this.state.flatListVisible2})}}>
               
                    <Text style={[styles.itemName,{ marginTop:0}]}>추가옵션</Text>
                    <Icon
                    name="ios-arrow-down"
                    size={22}
                    style={{color: '#3b4db7',}}
                    onPress={()=>{this.setState({flatListVisible2:!this.state.flatListVisible2})}}
                    />      
                </TouchableOpacity>

                <View style={this.state.flatListVisible2?{padding:20, paddingTop:5, flexDirection:'row', justifyContent:'space-between'}:{display:'none'}}>

                    <CheckBox
                    checkedColor='#3b4db7'
                    title={'주차가능'}
                    containerStyle={{backgroundColor:'#fff',borderWidth:0, height:35, marginTop:-7, paddingRight:0, marginRight:0, paddingLeft:0, marginLeft: 0}}
                    textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
                    checked={this._convertToBool(this.props.getFilterValue('parkingFilter'))}
                    onPress={()=>{
                        this.props.getFilterValue('parkingFilter') == "1"?
                        this.props.inputHandler('parkingFilter', "0") :
                        this.props.inputHandler('parkingFilter', "1")
                                                
                    }}/> 

                    <CheckBox
                    checkedColor='#3b4db7'
                    title={'엘리베이터'}
                    containerStyle={{backgroundColor:'#fff',borderWidth:0, height:35, marginTop:-7, paddingRight:0, marginRight:30,}}
                    textStyle={{color:'#666', fontSize: 13, marginTop:-2}}
                    checked={this._convertToBool(this.props.getFilterValue('elevFilter'))}
                    onPress={()=>{
                        this.props.getFilterValue('elevFilter') == "1"?
                        this.props.inputHandler('elevFilter', "0") :
                        this.props.inputHandler('elevFilter', "1")
                        
                    }}/>
                     
                 </View>           

        </View>
        
        
    </ScrollView>
              
    )

}

_closeModalAndSetState(){
 this.props.closeModal();
 this.setState({isSearching:false});
}
_resetHandler(){
    this.setState({
        onDepositEditMode:false,
        onMrateEditMode:false,
        onPremoEditMode:false,
        onSumEditMode:false,

        depositSliderValue:[0,999999],
        mrateSliderValue:[0,999999],
        premoSliderValue: [0, 999999],
        sumSliderValue:[0,999999],

        onSalePriceEditMode:false,
        onPsalePriceEditMode:false,
        onSilinsuEditMode:false,
        onProfitEditMode:false,

        salePriceSliderValue:[0,9999999],
        psalePriceSliderValue:[0,999999],
        silinsuSliderValue: [0, 9999999],
        profitSliderValue:[0,999999],

    })
    this.props.resetHandler();
}
render(){

     return(

    
<Modal
animationType="slide"
transparent={false}
visible={this.props.modalVisible}
onRequestClose={this._closeModalAndSetState.bind(this)}
>
  
{/* 헤더 */}
        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#3b4db7', padding:8, height:45, width:'100%'}}>

            <TouchableOpacity
            style={{width:40,height:35,backgroundColor:'#3b4db7', padding:10, alignItems:'center', justifyContent:'center' }}
            onPress={this._closeModalAndSetState.bind(this)}>

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
{/* 헤더 */}

{/* 양식 */}

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
                    /></View>
<KeyboardAwareScrollView enableOnAndroid={true}
keyboardShouldPersistTaps='always'
innerRef={ref => {this.scroll = ref}}
style={styles.modalContainer}
>

{this.state.isSearching? this._renderIndicator():null}  



    <View 
    // style={styles.inputContainer}
    >         

            {this.state.selectedSegment=='공실'?this._renderForm_room() : 
             this.state.selectedSegment=='건물'?this._renderForm_sell() :
             this._renderForm_fin()
            }

    </View>
</KeyboardAwareScrollView>
{/* 양식 */}
   
{/* 필터적용버튼 */}
<TouchableOpacity style={{
  position: 'absolute', width:'50%', height:45, bottom:0, right:0, backgroundColor:'#3b4db7', alignItems:'center',justifyContent:'center'}}
  onPress={()=>{

    this.setState({isSearching:true});
    this.props.segmentChange(options[options.indexOf(this.state.selectedSegment)]);  
      
    fetch('http://real-note.co.kr/app3/searchByFilter_room.php', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        "Accept-Encoding": "gzip, deflate",
        'Content-type': 'application/json',
      },
      body:JSON.stringify({
        selectedOfferingType: this.props.selectedOfferingType,
        memberID: this.props.memberID,
        level:this.props.level,
        memberName: this.props.memberName,
        boss: this.props.boss,
        selectedSegment: this.state.selectedSegment,
        // selectedIndex: this.state.selectedIndex,
        myoffering_from: 0,
        countPerLoad: this.props.countPerLoad,
        
        rentType : this.props.getFilterValue('rentTypeFilter'),
        roomType : this.props.getFilterValue('roomTypeFilter'),
        addr: this.props.getFilterValue('addrFilter'),
        subway: this.props.getFilterValue('subwayFiler'),
        floorMin: this.props.getFilterValue('floorMinFilter'),
        floorMax: this.props.getFilterValue('floorMaxFilter'),
        areaMin: this.props.getFilterValue('areaMinFilter'),
        areaMax: this.props.getFilterValue('areaMaxFilter'),   
        parking: this.props.getFilterValue('parkingFilter'),
        elev: this.props.getFilterValue('elevFilter'),
        
                               
        depositMin: this.state.onDepositEditMode? this.state.depositSliderValue[0] : '',
        depositMax: this.state.onDepositEditMode? this.state.depositSliderValue[1] : '',
        mrateMin: this.state.onMrateEditMode? this.state.mrateSliderValue[0] : '',
        mrateMax: this.state.onMrateEditMode? this.state.mrateSliderValue[1] : '',

        name_sell: this.props.getFilterValue('nameFilter_sell'),
        addr_sell: this.props.getFilterValue('addrFilter_sell'),
        writer_sell: this.props.getFilterValue('writerFilter_sell'),
        areaMin_sell: this.props.getFilterValue('areaMinFilter_sell'),
        areaMax_sell: this.props.getFilterValue('areaMaxFilter_sell'),

        salePriceMin: this.state.onSalePriceEditMode? this.state.salePriceSliderValue[0] : '',
        salePriceMax: this.state.onSalePriceEditMode? this.state.salePriceSliderValue[1] : '',
        psalePriceMin: this.state.onPsalePriceEditMode? this.state.psalePriceSliderValue[0] : '',
        psalePriceMax: this.state.onPsalePriceEditMode? this.state.psalePriceSliderValue[1] : '',
        silinsuMin: this.state.onSilinsuEditMode? this.state.silinsuSliderValue[0] : '',
        silinsuMax: this.state.onSilinsuEditMode? this.state.silinsuSliderValue[1] : '',
        profitMin: this.state.onProfitEditMode? this.state.profitSliderValue[0] : '',
        profitMax: this.state.onProfitEditMode? this.state.profitSliderValue[1] : '',

        name_fin: this.props.getFilterValue('nameFilter_fin'),
        addr_fin: this.props.getFilterValue('addrFilter_fin'),
      })

    })
    .then((res)=>{

      if(this.state.selectedSegment=='공실'){

        var parsedRes_room_count = JSON.parse(res._bodyText).room_count.count;
        var parsedRes_room_data = JSON.parse(res._bodyText).room_data;
        var parsedRes_room_extra_data = JSON.parse(res._bodyText).room_extra_data;

        for(var i =0; i<=parsedRes_room_data.length-1; i++){
        
        
            parsedRes_room_data[i].clone =  {...parsedRes_room_data[i]};
            parsedRes_room_data[i].clone.rooms = [];
            
            for(var j = 0; j<=parsedRes_room_extra_data.length-1; j++){
    
               
              if(parsedRes_room_data[i].wr_bld_match_id == parsedRes_room_extra_data[j].wr_bld_match_id){
    
                parsedRes_room_data[i].clone.rooms.push(parsedRes_room_extra_data[j])
    
              }
    
            }
    
          }

          this.props.offeringHandler(parsedRes_room_data, parsedRes_room_count);

      }
    //   var parsedRes = JSON.parse(res._bodyText).data;
    //   var parsedRes_count = JSON.parse(res._bodyText).count.count;
      
      this.setState({isSearching:false});
      this.state.onDepositEditMode?this.props.inputHandler('depositMinFilter',this.state.depositSliderValue[0]):null
      this.state.onDepositEditMode?this.props.inputHandler('depositMaxFilter',this.state.depositSliderValue[1]):null
      this.state.onMrateEditMode?this.props.inputHandler('mrateMinFilter',this.state.mrateSliderValue[0]):null
      this.state.onMrateEditMode?this.props.inputHandler('mrateMaxFilter',this.state.mrateSliderValue[1]):null


      this.state.onSalePriceEditMode? this.props.inputHandler('salePriceMinFilter',this.state.salePriceSliderValue[0]) : null
      this.state.onSalePriceEditMode? this.props.inputHandler('salePriceMaxFilter',this.state.salePriceSliderValue[1]) : null
      this.state.onPsalePriceEditMode? this.props.inputHandler('psalePriceMinFilter',this.state.psalePriceSliderValue[0]) : null
      this.state.onPsalePriceEditMode? this.props.inputHandler('psalePriceMaxFilter',this.state.psalePriceSliderValue[1]) : null
      this.state.onSilinsuEditMode? this.props.inputHandler('silinsuMinFilter',this.state.silinsuSliderValue[0]) : null
      this.state.onSilinsuEditMode? this.props.inputHandler('silinsuMaxFilter',this.state.silinsuSliderValue[1]) : null
      this.state.onProfitEditMode? this.props.inputHandler('profitMinFilter',this.state.profitSliderValue[0]) : null
      this.state.onProfitEditMode? this.props.inputHandler('profitMaxFilter',this.state.profitSliderValue[1]) : null
      
    //   this.props.offeringHandler(parsedRes, parsedRes_count);
    //   this.props.fromHandler();
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
{/* 필터적용버튼 */}

</Modal>
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

export default FilterModal;