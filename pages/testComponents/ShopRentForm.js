import React, {Component} from 'react';
import {View, TouchableOpacity,  Text,Modal, TextInput, StyleSheet, ActivityIndicator, Dimensions, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

var options = ['임대', '매매', '거래완료'];
var previous;
let {width, height} = Dimensions.get('window');

class ShopRentForm extends Component{

constructor(props){
    super(props);
    
    this.state={

        isSearching:false,
        depositSliderValue:[0,999999],
        mrateSliderValue:[0,999999],
        premoSliderValue: [0, 999999],
        sumSliderValue:[0,999999],
        onDepositEditMode:false,
        onMrateEditMode:false,
        onPremoEditMode:false,
        onSumEditMode:false,
        flatListVisible:false,
        wr_rec_sectors:[],
        wr_rec_full:['음식점','고깃집','횟집','퓨전주점','소주방','휴게음식점','카페','테이크아웃','분식','미용','네일','뷰티','판매','휴대폰','화장품','의류','잡화','편의점','마트','오락스포츠','헬스','골프','당구장','노래연습장','단란유흥','BAR','스포츠마사지','자동차','학원','병원','사무실','다용도','숙박','양도양수','프렌차이즈','대형매장'],
        wr_rec_full_bool:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
     
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
_checkBoxStyle(item){
    if(item){
        return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0, backgroundColor:'#3b4db7',borderWidth:0.7}

    }
    else{
        return {flex:1, height:50, justifyContent:'center', alignItems:'center',margin:0,marginLeft:0,marginRight:0,borderRadius:0,backgroundColor:'#fff',borderWidth:0.7}
    }

}
_checkBoxTextStyle(item){
  if(item){
      return {fontSize:12, color:'white'}

  }
  else{
      return {fontSize:12, color:'#888'}
  }

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

        wr_rec_sectors : [],
        wr_rec_full_bool:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
   
    })
    this.props.resetHandler();
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

           <View style={styles.segment}>

                <View style={{flexDirection: 'row',}}>

                    <View style = {{flex:1, marginRight:20}}>    
            
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
                            value={ this.state.nameFilter}
                            onChangeText= {input => this.setState({nameFilter:input})}
                            onFocus={(event: Event) => {
                              
                              this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                    
                    </View>
            
                    

                    <View style = {{flex:1}}>    
            
                            <Text style={[styles.itemName,{marginTop:0}]}>상권명</Text>
                    
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
                            value={ this.state.saleAreaFilter}
                            onChangeText= {input => this.setState({saleAreaFilter:input})}
                            onFocus={(event: Event) => {
                              
                              this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                           {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text> */}
                    
                    </View>

                   
              </View>

              <View style={{flexDirection: 'row',}}>

                    <View style = {{flex:1,}}>    
            
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
                            value={ this.state.addrFilter}
                            onChangeText= {input => this.setState({addrFilter:input})}
                            onFocus={(event: Event) => {
                              
                              this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                    
                    </View>
     
                 </View>

                <View style={{flexDirection: 'row', marginBottom:10, marginTop:10,}}>

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
                            value={ this.state.floorMinFilter}
                            onChangeText= {input => this.setState({floorMinFilter:input})}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 50)
                            }}
                            />
                            <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>층</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                
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
                                value={ this.state.floorMaxFilter}
                                onChangeText= {input => this.setState({floorMaxFilter:input})}
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
                            value={ this.state.areaMinFilter}
                            onChangeText= {input => this.setState({areaMinFilter:input})}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 100)
                            }}
                            />
                            <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                            
                                <TextInput
                                placeholder="최대"
                                placeholderTextColor='#aaa'
                                ref='SeventhInput'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.state.areaMaxFilter}
                                onChangeText= {input => this.setState({areaMaxFilter:input})}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 100)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>
                        
                        </View>
                        
                </View>
           
            </View>
        
            <View style={styles.segment_rec}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', padding:20,}}
                onPress={()=>{this.setState({flatListVisible:!this.state.flatListVisible})}}>
               
                    <Text style={[styles.itemName,{ marginTop:0}]}>추천업종</Text>
                    <Icon
                    name="ios-arrow-down"
                    size={22}
                    style={{color: '#3b4db7',}}
                    onPress={()=>{this.setState({flatListVisible:!this.state.flatListVisible})}}
                    />      
                </TouchableOpacity>
              
                <View style={this.state.flatListVisible?styles.flatListWrapper: {height:0}}>
                <FlatList data ={this.state.wr_rec_full}
                style={{margin: 0, padding:0,}}
                extraData={this.state}
                keyExtractor ={(x,i)=>i}
                numColumns={3}
                renderItem ={
                ({item}) =><CheckBox
                uncheckedIcon={null}
                checkedIcon={null}
                
                title={item}
                containerStyle={this._checkBoxStyle(this.state.wr_rec_full_bool[this.state.wr_rec_full.indexOf(item)])}
                textStyle={this._checkBoxTextStyle(this.state.wr_rec_full_bool[this.state.wr_rec_full.indexOf(item)])}
                checked={this.state.wr_rec_full_bool[this.state.wr_rec_full.indexOf(item)]}
                onPress={()=>{
                    this.setState({checkTest: !this.state.checkTest})
                    
                    if(!this.include(this.state.wr_rec_sectors,item)){
                        this.setState({wr_rec_sectors : [...this.state.wr_rec_sectors,item]})
                    }else{ 
                        var index = this.state.wr_rec_sectors.indexOf(item);
                        var temp = this.state.wr_rec_sectors.slice(0);
                        temp.splice(index,1);                       
                        this.setState({wr_rec_sectors : temp}, )
                    }
                    var temp2 = this.state.wr_rec_full_bool.slice(0);
                    var index_full = this.state.wr_rec_full.indexOf(item);
                    temp2[index_full] = !temp2[index_full];
                    this.setState({wr_rec_full_bool : temp2})
            
                }}/>}
                /> 
                </View>
                                  
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
                <Text style={[styles.itemName,{ marginBottom:25}]}>임대료</Text>
                <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>
                {
                    this.state.onMrateEditMode?
                        this.state.mrateSliderValue[0]==this.state.mrateSliderValue[1]?
                            this.state.mrateSliderValue[1]==999999?
                                '2000만 이상'
                            :this.state.mrateSliderValue[1]+'만'
                        :
                            this.state.mrateSliderValue[1]==999999?
                                 this.state.mrateSliderValue[0]+'만 - 2000만 이상'
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
                optionsArray={[0,10,20,30,40,50,60,70,80,90,100,120,140,160,180,200,250,300,350,400,500,600,700,800,900,1000,1500,2000,999999]}
                allowOverlap={true}
                snapped={true}
                touchDimensions	={ {height: 60, width: 100, borderRadius: 35, slipDisplacement: 70} }
                markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7'}}
                selectedStyle={{backgroundColor:'#3b4db7'}}
            />
            </View>

            <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>  
                <Text style={[styles.itemName,{ marginBottom:25}]}>권리금</Text>
                <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>
                {
                    this.state.onPremoEditMode?
                        this.state.premoSliderValue[0]==this.state.premoSliderValue[1]?
                            this.state.premoSliderValue[1]==999999?
                                '100000만 이상'
                            :this.state.premoSliderValue[1]+'만'
                        :
                            this.state.premoSliderValue[1]==999999?
                                 this.state.premoSliderValue[0]+'만 - 100000만 이상'
                            :this.state.premoSliderValue[0]+'만 - '+ this.state.premoSliderValue[1]+'만'
                    :'전체'} 
                 </Text>
              
            </View>
            <View style={{alignItems:'center'}}>
            <MultiSlider
                values={[this.state.premoSliderValue[0], this.state.premoSliderValue[1]]}
                sliderLength={width-65}
                onValuesChange={this._premoSliderValuesChange}
                min={0}
                max={999999}
                containerStyle={{height:30, marginBottom: -10,}}
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
                <Text style={[styles.itemName,{ marginBottom:25}]}>합예산</Text>
                <Text style={{marginTop:15,fontSize:12,fontWeight:'bold'}}>
                {
                    this.state.onSumEditMode?
                        this.state.sumSliderValue[0]==this.state.sumSliderValue[1]?
                            this.state.sumSliderValue[1]==999999?
                                '150000만 이상'
                            :this.state.sumSliderValue[1]+'만'
                        :
                            this.state.sumSliderValue[1]==999999?
                                 this.state.sumSliderValue[0]+'만 - 150000만 이상'
                            :this.state.sumSliderValue[0]+'만 - '+ this.state.sumSliderValue[1]+'만'
                    :'전체'} 
                </Text>
              
            </View>
            <View style={{alignItems:'center'}}>
            <MultiSlider
                values={[this.state.sumSliderValue[0], this.state.sumSliderValue[1]]}
                sliderLength={width-65}
                onValuesChange={this._sumSliderValuesChange}
                min={0}
                max={999999}
                containerStyle={{height:30,marginBottom: 100,}}
                // step={500}
                optionsArray={[0,200,500,1000,1500,2000,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000,12000,14000,16000,18000,20000,25000,30000,40000,50000,100000,150000,999999]}
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
    this.props.segmentChange('임대');  
      
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
        selectedSegment: '임대',
        myoffering_from: 0,
        countPerLoad: this.props.countPerLoad,

        name: this.state.nameFilter,
        addr: this.state.addrFilter,
        saleArea: this.state.saleAreaFilter,
        floorMin: this.state.floorMinFilter,
        floorMax: this.state.floorMaxFilter,
        areaMin: this.state.areaMinFilter,
        areaMax: this.state.areaMaxFilter,   
        
        wr_rec_sectors: this.state.wr_rec_sectors,
                               
        depositMin: this.state.onDepositEditMode? this.state.depositSliderValue[0] : '',
        depositMax: this.state.onDepositEditMode? this.state.depositSliderValue[1] : '',
        mrateMin: this.state.onMrateEditMode? this.state.mrateSliderValue[0] : '',
        mrateMax: this.state.onMrateEditMode? this.state.mrateSliderValue[1] : '',
        premoMin: this.state.onPremoEditMode? this.state.premoSliderValue[0] : '',
        premoMax: this.state.onPremoEditMode? this.state.premoSliderValue[1] : '',
        sumMin: this.state.onSumEditMode? this.state.sumSliderValue[0] : '',
        sumMax: this.state.onSumEditMode? this.state.sumSliderValue[1] : '',

      })

    })
    .then((res)=>{

      console.log(res);
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_count = JSON.parse(res._bodyText).count.count;
      
      this.setState({isSearching:false});

      this.props.inputHandler('nameFilter', this.state.nameFilter);
      this.props.inputHandler('addrFilter', this.state.addrFilter);
      this.props.inputHandler('saleAreaFilter', this.state.saleAreaFilter);
      this.props.inputHandler('floorMinFilter', this.state.floorMinFilter);
      this.props.inputHandler('floorMaxFilter', this.state.floorMaxFilter);
      this.props.inputHandler('areaMinFilter', this.state.areaMinFilter);
      this.props.inputHandler('areaMaxFilter', this.state.areaMaxFilter);

      this.props.recHandler(this.state.wr_rec_sectors)


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
export default ShopRentForm;