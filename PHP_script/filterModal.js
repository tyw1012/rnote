import React, {Component} from 'react';
import {View, TouchableOpacity,  Text,Modal, TextInput, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SegmentedControls } from 'react-native-radio-buttons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

var options = ['임대', '매매', '거래종료'];
var previous;
let {width, height} = Dimensions.get('window');

class FilterModal extends Component{

constructor(props){
    super(props);
    
    this.state={
        onEditMode:false,
        selectedSegment: '임대',
        isSearching:false,
        depositSliderValue:[0,999999],
        mrateSliderValue:[0,999999],
        premoSliderValue: [0, 999999],
        sumSliderValue:[0,999999],
        onDepositEditMode:false,
        onMrateEditMode:false,
        onPremoEditMode:false,
        onSumEditMode:false,
    }

}

setSelectedOption(selectedSegment){
        
            
            this.setState(previousState => {
              previous = previousState.selectedSegment;
                    
              return {
                selectedSegment, 
              };
            });
 }

 _renderIndicator(){
    return (
       
        <View style={{width:'100%',alignItems: 'center'}}>
               
        <ActivityIndicator size='large' style ={{position: 'absolute', top: 375, zIndex:10,}}/>

        </View>
    )

}
_renderForm_fin(){}
_renderForm_sell(){
    return (
        <View>     
        
            <View style = {[styles.row, {marginTop:5}]}>    
        
                <Text style={styles.itemName}>매물명</Text>
        
                <TextInput
                placeholder=""
                placeholderTextColor='#aaa'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                value={ this.props.getFilterValue('nameFilter')}
                onChangeText= {input => this.props.inputHandler('nameFilter',input)}
                onFocus={(event: Event) => {
                  
                  this.scroll.props.scrollToPosition(0, 0)
                }}
                />
        
            </View>
        
            <View style = {[styles.row, {marginTop:6}]}>    
        
                <Text style={styles.itemName}>상권명</Text>
        
                <TextInput
                placeholder=""
                placeholderTextColor='#aaa'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                value={ this.props.getFilterValue('saleAreaFilter')}
                onChangeText= {input => this.props.inputHandler('saleAreaFilter',input)}
                onFocus={(event: Event) => {
                  
                  this.scroll.props.scrollToPosition(0, 50)
                }}
                />
        
            </View>
        
            <View style = {[styles.row, {marginTop:6}]}>    
        
                <Text style={styles.itemName}>주소</Text>
        
                <TextInput
                placeholder=""
                placeholderTextColor='#aaa'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                value={ this.props.getFilterValue('addrFilter')}
                onChangeText= {input => this.props.inputHandler('addrFilter',input)}
                onFocus={(event: Event) => {
                  
                  this.scroll.props.scrollToPosition(0, 100)
                }}
                />
        
            </View>
        
            <View style = {[styles.row, {marginTop:6}]}>    
        
                <Text style={styles.itemName}>담당자</Text>
        
                <TextInput
                placeholder=""
                placeholderTextColor='#aaa'
                style={styles.itemInput}
                underlineColorAndroid="transparent"
                value={ this.props.getFilterValue('writerFilter')}
                onChangeText= {input => this.props.inputHandler('writerFilter',input)}
                onFocus={(event: Event) => {
                 
                  this.scroll.props.scrollToPosition(0, 150)
                }}
                />
        
            </View>
        
            <View style={{flexDirection: 'row',}}>

                        <Text style={[styles.itemName,{marginTop:15}]}>층수</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                            
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('floorMinFilter')}
                            onChangeText= {input => this.props.inputHandler('floorMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 200)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>층</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                
                                {/* <Text style={styles.itemName}> </Text> */}
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('floorMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('floorMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 200)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>층</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row',}}>

                    <Text style={[styles.itemName,{marginTop:15}]}>면적</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                            
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('areaMinFilter')}
                            onChangeText= {input => this.props.inputHandler('areaMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 240)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                
                                {/* <Text style={styles.itemName}> </Text> */}
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('areaMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('areaMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 240)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>
                        
                        </View>
        
                        
            </View>
        
              
        
          <View style={{flexDirection: 'row',}}>

                        <Text style={[styles.itemName,{marginTop:15}]}>보증금</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('depositMinFilter')}
                            onChangeText= {input => this.props.inputHandler('depositMinFilter',input)}
                            onFocus={(event: Event) => {
                               
                                this.scroll.props.scrollToPosition(0, 280)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                
                                {/* <Text style={styles.itemName}> </Text> */}
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('depositMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('depositMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 280)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row',}}>

                        <Text style={[styles.itemName,{marginTop:15}]}>임대료</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                            
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('mrateMinFilter')}
                            onChangeText= {input => this.props.inputHandler('mrateMinFilter',input)}
                            onFocus={(event: Event) => {
                            
                                this.scroll.props.scrollToPosition(0, 320)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                
                                {/* <Text style={styles.itemName}> </Text> */}
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('mrateMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('mrateMaxFilter',input)}
                                onFocus={(event: Event) => {
                               
                                this.scroll.props.scrollToPosition(0, 320)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row',}}>

                        <Text style={[styles.itemName,{marginTop:15}]}>권리금</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('premoMinFilter')}
                            onChangeText= {input => this.props.inputHandler('premoMinFilter',input)}
                            onFocus={(event: Event) => {
                              
                                this.scroll.props.scrollToPosition(0, 350)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                
                                {/* <Text style={styles.itemName}> </Text> */}
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('premoMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('premoMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 350)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row', marginBottom: 100}}>

                <Text style={[styles.itemName,{marginTop:15}]}>합예산</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                            
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('sumMinFilter')}
                            onChangeText= {input => this.props.inputHandler('sumMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 350)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
                
                        <Text style={{marginTop:12,fontSize: 16,}}> ~ </Text>
        
                        <View style = {[styles.row2, {marginTop:6}]}>    
                
                                {/* <Text style={styles.itemName}> </Text> */}
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('sumMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('sumMaxFilter',input)}
                                onFocus={(event: Event) => {
                          
                                this.scroll.props.scrollToPosition(0, 350)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>만</Text>
                        
                        </View>
        
                        
                </View> 
        
           </View>

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
_renderForm_rent(){
    return (
            
       <View>     

            {/* <View style={{paddingBottom: 10, marginBottom:10, }}> */}

                <View style={{flexDirection: 'row',}}>

                    <View style = {{flex:1, marginRight:20}}>    
            
                            <Text style={[styles.itemName,{marginTop:0}]}>매물명</Text>
                    
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={styles.itemInput}
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('nameFilter')}
                            onChangeText= {input => this.props.inputHandler('nameFilter',input)}
                            onFocus={(event: Event) => {
                              
                              this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                        {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                    
                    </View>
            
                    

                    <View style = {{flex:1}}>    
            
                            <Text style={[styles.itemName,{marginTop:0}]}>상권명</Text>
                    
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={styles.itemInput}
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('saleAreaFilter')}
                            onChangeText= {input => this.props.inputHandler('saleAreaFilter',input)}
                            onFocus={(event: Event) => {
                              
                              this.scroll.props.scrollToPosition(0, 50)
                            }}
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
                            style={styles.itemInput}
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('addrFilter')}
                            onChangeText= {input => this.props.inputHandler('addrFilter',input)}
                            onFocus={(event: Event) => {
                              
                              this.scroll.props.scrollToPosition(0, 100)
                            }}
                            />
                            
                         
                        {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                    
                    </View>
            
                    

                    <View style = {{flex:1}}>    

                    <Text style={styles.itemName}>담당자</Text>
                    
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={styles.itemInput}
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('writerFilter')}
                            onChangeText= {input => this.props.inputHandler('writerFilter',input)}
                            onFocus={(event: Event) => {
                             
                              this.scroll.props.scrollToPosition(0, 150)
                            }}
                            />
                         
                           
                           {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text> */}
                    
                    </View>

                   
                 </View>
           {/* </View> */}
        
        
            <View>

               
                <View style={{flexDirection: 'row', marginBottom:10, marginTop:10,}}>

                        <Text style={[styles.itemName,{marginTop:12}]}>층수</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                            
                
                            <TextInput
                            placeholder="최소"
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('floorMinFilter')}
                            onChangeText= {input => this.props.inputHandler('floorMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 200)
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
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('floorMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('floorMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 200)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>층</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row', marginBottom:10, marginTop:15,}}>

                    <Text style={[styles.itemName,{marginTop:12}]}>면적</Text>
            
                        <View style = {[styles.row2, {marginTop:6,}]}>    
                
                            
                
                            <TextInput
                            placeholder="최소"
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('areaMinFilter')}
                            onChangeText= {input => this.props.inputHandler('areaMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 240)
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
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('areaMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('areaMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 240)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 34, marginLeft: 3, fontSize:12, position: 'absolute', top:-25, right:15}}>평</Text>
                        
                        </View>
        
                        
            </View>
        
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
                containerStyle={{height:30,marginBottom: -10,}}
                // step={500}
                optionsArray={[0,200,500,1000,1500,2000,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000,12000,14000,16000,18000,20000,25000,30000,40000,50000,100000,150000,999999]}
                allowOverlap={true}
                snapped={true}
                touchDimensions	={ {height: 60, width:100, borderRadius: 35, slipDisplacement: 70} }
                markerStyle={{ height:25, width: 25, borderRadius: 22.5, backgroundColor:'#fff', borderWidth: 1, borderColor: '#3b4db7'}}
                selectedStyle={{backgroundColor:'#3b4db7'}}
            />
            </View>
        
        
                

            </View>
        
        </View>
              
        
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

            <Text style={{color: '#fff', fontSize: 16, fontWeight:'bold', marginTop:4}}>통합검색</Text>
            
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
<KeyboardAwareScrollView enableOnAndroid={true}
keyboardShouldPersistTaps='always'
innerRef={ref => {this.scroll = ref}}
style={styles.modalContainer}
>

{this.state.isSearching? this._renderIndicator():null}  
{/* 
<SegmentedControls
            options={ options }
            onSelection={ this.setSelectedOption.bind(this) }
            selectedOption={ this.state.selectedSegment }
            containerStyle={{flex:1, height: 25, borderRadius:0, }}
            optionContainerStyle={{justifyContent:'center', borderRadius:0,}}
            optionStyle ={{fontSize: 12, borderRadius:0,}}
            separatorWidth= {0}
            containerBorderWidth= {0}
            tint={'#3b4db7'}
            selectedTint= {'white'}
            />  */}
    <View 
    // style={styles.inputContainer}
    >         

            {this.state.selectedSegment=='임대'?this._renderForm_rent() : 
             this.state.selectedSegment=='매매'?this._renderForm_sell() :
             this._renderForm_sell()
            }

    </View>
</KeyboardAwareScrollView>
{/* 양식 */}
   
{/* 필터적용버튼 */}
<TouchableOpacity style={{
  position: 'absolute', width:'100%', height:45, bottom:0, backgroundColor:'#3b4db7', alignItems:'center',justifyContent:'center'}}
  onPress={()=>{

    this.setState({isSearching:true});
    
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
        selectedSegment: this.props.selectedSegment,
        myoffering_from: 0,
        countPerLoad: this.props.countPerLoad,

        name: this.props.getFilterValue('nameFilter'),
        addr: this.props.getFilterValue('addrFilter'),
        writer: this.props.getFilterValue('writerFilter'),
        saleArea: this.props.getFilterValue('saleAreaFilter'),
        floorMin: this.props.getFilterValue('floorMinFilter'),
        floorMax: this.props.getFilterValue('floorMaxFilter'),
        areaMin: this.props.getFilterValue('areaMinFilter'),
        areaMax: this.props.getFilterValue('areaMaxFilter'),                               
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
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_count = JSON.parse(res._bodyText).count.count;
    
      this.setState({isSearching:false});
      this.state.onDepositEditMode?this.props.inputHandler('depositMinFilter',this.state.depositSliderValue[0]):null
      this.state.onDepositEditMode?this.props.inputHandler('depositMaxFilter',this.state.depositSliderValue[1]):null
      this.state.onMrateEditMode?this.props.inputHandler('mrateMinFilter',this.state.mrateSliderValue[0]):null
      this.state.onMrateEditMode?this.props.inputHandler('mrateMinFilter',this.state.mrateSliderValue[1]):null
      this.state.onPremoEditMode? this.props.inputHandler('premoMinFilter',this.state.premoSliderValue[0]):null
      this.state.onPremoEditMode?this.props.inputHandler('premoMinFilter',this.state.premoSliderValue[1]):null
      this.state.onSumEditMode?this.props.inputHandler('sumMinFilter',this.state.sumSliderValue[0]):null
      this.state.onSumEditMode?this.props.inputHandler('sumMinFilter',this.state.sumSliderValue[1]):null
      
      this.props.offeringHandler(parsedRes, parsedRes_count);
    //   this.setState({modalVisible:false, myoffering:parsedRes, isFiltered:true, filterText:'필터해제'})
    })
    
  }}
  >
    <Text style={{fontSize: 16, fontWeight:'bold', color: '#fff'}}>필터적용</Text>
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
    padding:20,
    backgroundColor: '#fff',
    // paddingBottom:50
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
    fontWeight: '100',
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