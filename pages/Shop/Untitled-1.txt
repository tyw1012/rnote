import React, { Component } from 'react';
import {
  Keyboard,
  FlatList,
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import writeoffer_sell_third from './writeoffer_sell_third';
var self;

export default class writeoffer_sell_second extends Component {
  static navigationOptions= ({navigation}) =>{ 
    if(navigation.state.params.mode=='edit'){
      return (
        {
          headerLeft: <TouchableOpacity 
          onPress={()=>{self.props.navigation.goBack(null);  }}
          style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15}}>
            <Icon
            name="md-close"
            size={30}
            style={{color:'#fff'}}
            />
          </TouchableOpacity>,
        title: '매물정보 수정',
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
        headerTintColor: 'white',
        }
      )
    }
    else{
        return (
          {
            headerLeft: <TouchableOpacity 
            onPress={()=>{self.props.navigation.goBack(null);  }}
            style={{justifyContent:'center', alignItems:'center', padding:5, paddingLeft:15}}>
              <Icon
              name="md-close"
              size={30}
              style={{color:'#fff'}}
              />
            </TouchableOpacity>,
          title: '매물등록 - 매매',
          headerTitleStyle: {color:'white',fontSize:16, fontWeight:'100'},
          headerStyle: {
            backgroundColor: '#3b4db7',
            elevation:0,
            height: 52,
            
          },
          headerTintColor: 'white',
          }
        )
    }

};

	constructor(props){
		super(props)
		this.state={
           
            wr_address_sale:'',
            wr_area_p:'',
            wr_area_m:'',
            wr_area_p_all:0,
            wr_area_m_all:0,
            
            wr_area_p_added1:'',
            wr_area_m_added1:'',
            wr_area_p_added2:'',
            wr_area_m_added2:'',
            wr_area_p_added3:'',
            wr_area_m_added3:'',
            wr_area_p_added4:'',
            wr_area_m_added4:'',
            // wr_area_p_added1:'',


            addedInputList:[],
            addedInput_1_visible:false,
            addedInput_2_visible:false,
            addedInput_3_visible:false,
            addedInput_4_visible:false,
        }
    
    self =this;
  
	}
  
  // _parseBackAreaP(raw){
  //   var data = raw;
  //   var dataArray = data.split(',');
  //   dataArray.forEach(function(el){

  //   })
  // }
 
  componentWillMount(){
    
    const {params} = this.props.navigation.state;
    this.setState(
      { 
        mode: params.mode,
        wr_address_sale: params.wr_address_sale,
        wr_address_sale_added1: params.wr_address_sale_added1,
        wr_address_sale_added2: params.wr_address_sale_added2,
        wr_address_sale_added3: params.wr_address_sale_added3,
        wr_address_sale_added4: params.wr_address_sale_added4,
        wr_area_p: params.wr_area_p,
        wr_area_p_added1: params.wr_area_p_added1,
        wr_area_p_added2: params.wr_area_p_added2,
        wr_area_p_added3: params.wr_area_p_added3,
        wr_area_p_added4: params.wr_area_p_added4,
        wr_area_m: params.wr_area_m,
        wr_area_m_added1: params.wr_area_m_added1,
        wr_area_m_added2: params.wr_area_m_added2,
        wr_area_m_added3: params.wr_area_m_added3,
        wr_area_m_added4: params.wr_area_m_added4,
        wr_area_p_all: params.wr_area_p_all,
        wr_area_m_all: params.wr_area_m_all,
        
      }, function(){
        this.props.navigation.state.params={};
     })
  
  }
  
  componentDidMount(){
    if(this.state.wr_address_sale==undefined){
      this.setState({wr_address_sale:''})
    }
    if(this.state.wr_area_p_all==undefined){
      this.setState({wr_area_p_all:0})
    }
    if(this.state.wr_area_m_all==undefined){
      this.setState({wr_area_m_all:0})
    }
    if(this.state.wr_address_sale_added1!=undefined){
      this.setState({addedInput_1_visible:true, addedInputList:[1]})
    }
    if(this.state.wr_address_sale_added2!=undefined){
      this.setState({addedInput_2_visible:true, addedInputList:[1,2]})
    }
    if(this.state.wr_address_sale_added3!=undefined){
      this.setState({addedInput_3_visible:true, addedInputList:[1,2,3]})
    }
    if(this.state.wr_address_sale_added4!=undefined){
      this.setState({addedInput_4_visible:true, addedInputList:[1,2,3,4]})
    }
    if(this.state.wr_area_p==undefined){
      this.setState({wr_area_p:'',})
    }
    if(this.state.wr_area_m==undefined){
      this.setState({wr_area_m:'',})
    }

    // if(this.state.wr_area_p_added1==undefined){
    //   this.setState({wr_area_p_added1:'',wr_area_m_added1: '',})
    // }
    // if(this.state.wr_area_p_added2==undefined){
    //   this.setState({wr_area_p_added2:'',wr_area_m_added2: '',})
    // }
    // if(this.state.wr_area_p_added3==undefined){
    //   this.setState({wr_area_p_added3:'',wr_area_m_added3: '',})
    // }
    // if(this.state.wr_area_p_added4==undefined){
    //   this.setState({wr_area_p_added4:'',wr_area_m_added4: '',})
    // }

   

  }

  include(arr, obj) {
    for(var i=0; i<=arr.length-1; i++) {
        if (arr[i] == obj) return true;
    }
  }
 
  _goNext(){
    
    this.setState(this.props.navigation.state.params, 
      function(){        
      this.props.navigation.navigate('Third',this.state)}
    )

    setTimeout(function(){
      writeoffer_sell_third.updateFigures();
    },500)
    
    
  }
  _goPrevious(){  

    this.state.mode=='edit'?
    this.props.navigation.navigate('First',{mode:'edit'})
    :  this.props.navigation.navigate('First')

  }


  _findInputIndex(item){

    var clone = this.state.addedInputList.slice(0);
    for (var i = 0; i<clone.length; i++){
       if (clone[i]== item){
         return i
       }
    }

  }
  _removeFromInputList(item, visibleBool, value1, value2){
    var temp = this.state.addedInputList.slice(0);
    var index = this._findInputIndex(item);
    temp.splice(index,1);
    this.setState({
      addedInputList:temp, 
      [visibleBool]:false, 
      [value1]:undefined,
      [value2]:undefined,
      wr_area_p_all: this.state[value1]==''? (this.state.wr_area_p_all - 0).toFixed(2) : (this.state.wr_area_p_all - this.state[value1]).toFixed(2),
      wr_area_m_all: this.state[value2]==''? (this.state.wr_area_p_all - 0).toFixed(2) : (this.state.wr_area_m_all - this.state[value2]).toFixed(2),
    });  
  }
  _addedInputStyle(visible){
    if(visible){
      return {borderWidth:1, borderColor:'#e1e1e1', marginBottom:10, padding:15};
    }
    else{
      return {display:'none'}
    }
  }
  _addTextInput(currentInputList){
    if(!this.include(currentInputList,1)){
      this.setState({
        addedInput_1_visible:true, 
        addedInputList:[...this.state.addedInputList, 1],
        wr_address_sale_added1:'',
        wr_area_p_added1: '',
        wr_area_m_added1: ''
      })
    }
    else if(!this.include(currentInputList,2)){
      this.setState({
        addedInput_2_visible:true, 
        addedInputList:[...this.state.addedInputList, 2],
        wr_address_sale_added2:'',
        wr_area_p_added2: '',
        wr_area_m_added2: ''
      })
    }
    else if(!this.include(currentInputList,3)){
      this.setState({
        addedInput_3_visible:true, 
        addedInputList:[...this.state.addedInputList, 3],
        wr_address_sale_added3:'',
        wr_area_p_added3: '',
        wr_area_m_added3: ''

      })
    }
    else if(!this.include(currentInputList,4)){
      this.setState({
        addedInput_4_visible:true, 
        addedInputList:[...this.state.addedInputList, 4],
        wr_address_sale_added4:'',
        wr_area_p_added4: '',
        wr_area_m_added4: ''
      
      })
    }    
    
  }
  _sum(a,b){
    if(b.length==1){
      return parseInt(a)+parseInt(b)
    }
    else{
      var overAdded = parseInt(b.substr(0,b.length-1))
      return parseInt(a)+parseInt(b) - overAdded
    }
    
}
 _getSum(){
   var states= [this.state.wr_area_p, this.state.wr_area_p_added1, this.state.wr_area_p_added2, this.state.wr_area_p_added3, this.state.wr_area_p_added4].filter(function(value){return value!=undefined})
   var sum = 0;
   states.forEach(function(el){
      if(el==''){
        sum = parseFloat(sum) + 0
      }
      else{
        sum = parseFloat(sum) + parseFloat(el)      
      }
    })

   return parseFloat(sum)
 }

  render() {
   
    return (
        
            <KeyboardAwareScrollView enableOnAndroid={true}
            keyboardShouldPersistTaps='always'
            innerRef={ref => {this.scroll = ref}}
            style={styles.container}>
                
             <View>
  {/* ////////////////////////////////////////////첫번째 블락 시작 ////////////////////////////////////////////// */}
                  <View style={{borderWidth:1, borderColor:'#e1e1e1', marginBottom:10, padding:15}}>
                      <View style = {[styles.row, {marginTop:0}]}>    
                
                            <Text style={styles.itemName}>지번</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            onSubmitEditing={(event) => { 
                              this.refs.SecondInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"} 
                            style={[styles.itemInput, {position:'relative'}]}
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_address_sale => this.setState({wr_address_sale})}
                            value={this.state.wr_address_sale}
                            onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                            }}
                            />
                            <TouchableOpacity
                                style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                onPress={()=>{this.setState({wr_address_sale:''})}}
                                >
                                <Icon 
                                name="md-close-circle"
                                size={20}
                                style={{ marginTop: 27,color: '#ddd', }}
                                                      
                                />   
                            </TouchableOpacity>

                            {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                        
                    </View>
                
                    <View style={{flexDirection: 'row',}}>    
    
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}>면적 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='SecondInput'
                                onSubmitEditing={(event) => { 
                                  this.refs.ThirdInput.focus(); 
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_p => this.setState({
                                   wr_area_p: wr_area_p,
                                   wr_area_m: (wr_area_p*3.3058).toFixed(2),                                   
                                   wr_area_m_all: (this._sum(this.state.wr_area_p_all,wr_area_p)*3.3058).toFixed(2)
                                 }, function(){
                                   this.setState({
                                     wr_area_p_all: this._getSum().toFixed(2),
                                     wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                    
                                    })
                                  })}
                                value={`${this.state.wr_area_p}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                                }}
                                />                      

                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_p:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>

                        <Icon 
                        name="ios-repeat"
                        size={20}
                        style={{color: '#000', marginTop: 47, marginLeft: 10, marginRight: 10,}}
                        />
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='ThirdInput'
                                onSubmitEditing={(event) => { 
                                  this.state.addedInput_1_visible?
                                  this.refs.FourthInput.focus():this._goNext()
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_m => this.setState({
                                  wr_area_m: wr_area_m, 
                                  wr_area_p: (wr_area_m*0.3025).toFixed(2), 
                                  
                                }, function(){
                                  this.setState({
                                    wr_area_p_all: this._getSum().toFixed(2),
                                    wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                   
                                   })
                                 })}
                                value={`${this.state.wr_area_m}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 0)
                                }}
                                />                      
                            
                               <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>㎡</Text>
                               <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_m:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>
    
                   </View>
                </View>
{/* //////////////////////////////////첫번째 블락 끝/////////////////////////////////////////////////////////////// */}
{/* //////////////////////////////////두번째 블락 시작/////////////////////////////////////////////////////////////// */}
                <View style={this._addedInputStyle(this.state.addedInput_1_visible)}>

                   <View style = {[styles.row, {marginTop:0}]}>    
                
                        <Text style={styles.itemName}>지번</Text>
            
                        <TextInput
                        placeholder=""
                        placeholderTextColor='#aaa'
                        ref = 'FourthInput'
                        onSubmitEditing={(event) => { 
                          this.refs.FifthInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"} 
                        style={[styles.itemInput, {position:'relative'}]}
                        underlineColorAndroid="transparent"
                        onChangeText= {wr_address_sale_added1 => this.setState({wr_address_sale_added1})}
                        value={this.state.wr_address_sale_added1}
                        onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 120)
                        }}
                        />
                        <TouchableOpacity
                            style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                            onPress={()=>{this.setState({wr_address_sale_added1:''})}}
                            >
                            <Icon 
                            name="md-close-circle"
                            size={20}
                            style={{ marginTop: 27,color: '#ddd', }}
                                                  
                            />   
                        </TouchableOpacity>

                        {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                    
                </View>
    
                <View style={{flexDirection: 'row',}}>    

                    <View style = {styles.row}>    
            
                            <Text style={styles.itemName}>면적 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
            
                        
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            ref='FifthInput'
                            onSubmitEditing={(event) => { 
                              this.refs.SixthInput.focus(); 
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_area_p_added1 => this.setState({
                              wr_area_p_added1:wr_area_p_added1, 
                              wr_area_m_added1:(wr_area_p_added1*3.3058).toFixed(2), 
                             }, function(){
                              this.setState({
                                wr_area_p_all: this._getSum().toFixed(2),
                                wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                               
                               })
                             })}
                            value={`${this.state.wr_area_p_added1}`}
                            onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 120)
                            }}
                            />                      

                          <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                          <TouchableOpacity
                              style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                              onPress={()=>{this.setState({wr_area_p_added1:''})}}
                              >
                              <Icon 
                              name="md-close-circle"
                              size={20}
                              style={{ marginTop: 27,color: '#ddd', }}
                                                    
                              />   
                          </TouchableOpacity>
                    </View>

                    <Icon 
                    name="ios-repeat"
                    size={20}
                    style={{color: '#000', marginTop: 47, marginLeft: 10, marginRight: 10,}}
                    />
                    <View style = {styles.row}>    
            
                            <Text style={styles.itemName}> </Text>
            
                        
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            ref='SixthInput'
                            onSubmitEditing={(event) => { 
                              this.state.addedInput_2_visible?
                              this.refs.SeventhInput.focus(): this._goNext()
                            }}
                            blurOnSubmit={false}
                            returnKeyType = {"next"}
                            style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            onChangeText= {wr_area_m_added1 => this.setState({
                              wr_area_m_added1: wr_area_m_added1, 
                              wr_area_p_added1: (wr_area_m_added1*0.3025).toFixed(2),
                            }, function(){
                              this.setState({
                                wr_area_p_all: this._getSum().toFixed(2),
                                wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                               
                               })
                             })}
                            value={`${this.state.wr_area_m_added1}`}
                            onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 120)
                            }}
                            />                      
                        
                          <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>㎡</Text>
                          <TouchableOpacity
                              style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                              onPress={()=>{this.setState({wr_area_m_added1:''})}}
                              >
                              <Icon 
                              name="md-close-circle"
                              size={20}
                              style={{ marginTop: 27,color: '#ddd', }}
                                                    
                              />   
                          </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                style={{position:'absolute', top:0, right:0, backgroundColor:'red', justifyContent:'center', alignItems:'center', padding:8}}
                onPress={()=>{ this._removeFromInputList(1,'addedInput_1_visible', 'wr_area_p_added1', 'wr_area_m_added1')}}>
                <Text style={{color:'#fff'}}>X</Text>

                </TouchableOpacity>
          </View>
{/* ////////////////////////////////////////////////////////두번째블락 끝////////////////////////////////////////////// */}
{/* ////////////////////////////////////////////////////////세번째블락 시작////////////////////////////////////////////// */}
           <View style={this._addedInputStyle(this.state.addedInput_2_visible)}>   
              <View style = {[styles.row, {marginTop:0}]}>    
                        
                        <Text style={styles.itemName}>지번</Text>
            
                        <TextInput
                        placeholder=""
                        placeholderTextColor='#aaa'
                        ref='SeventhInput'
                        onSubmitEditing={(event) => { 
                          this.refs.EighthInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"} 
                        style={[styles.itemInput, {position:'relative'}]}
                        underlineColorAndroid="transparent"
                        onChangeText= {wr_address_sale_added2 => this.setState({wr_address_sale_added2})}
                        value={this.state.wr_address_sale_added2}
                        onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 250)
                        }}
                        />
                        <TouchableOpacity
                            style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                            onPress={()=>{this.setState({wr_address_sale_added2:''})}}
                            >
                            <Icon 
                            name="md-close-circle"
                            size={20}
                            style={{ marginTop: 27,color: '#ddd', }}
                                                  
                            />   
                        </TouchableOpacity>

                        {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                    
              </View>
                
              <View style={{flexDirection: 'row',}}>    

                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}>면적 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='EighthInput'
                                onSubmitEditing={(event) => { 
                                  this.refs.NinthInput.focus(); 
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_p_added2 => this.setState({
                                  wr_area_p_added2: wr_area_p_added2, 
                                  wr_area_m_added2: (wr_area_p_added2*3.3058).toFixed(2),
                                  }, function(){
                                    this.setState({
                                      wr_area_p_all: this._getSum().toFixed(2),
                                      wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                     
                                     })
                                   })}
                                value={`${this.state.wr_area_p_added2}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 250)
                                }}
                                />                      

                              <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                              <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_p_added2:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>

                        <Icon 
                        name="ios-repeat"
                        size={20}
                        style={{color: '#000', marginTop: 47, marginLeft: 10, marginRight: 10,}}
                        />
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='NinthInput'
                                onSubmitEditing={(event) => { 
                                  this.state.addedInput_3_visible?
                                  this.refs.TenthInput.focus():this._goNext()
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_m_added2 => this.setState({
                                  wr_area_m_added2: wr_area_m_added2, 
                                  wr_area_p_added2: (wr_area_m_added2*0.3025).toFixed(2),
                                 }, function(){
                                  this.setState({
                                    wr_area_p_all: this._getSum().toFixed(2),
                                    wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                   
                                   })
                                 })}
                                value={`${this.state.wr_area_m_added2}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 250)
                                }}
                                />                      
                            
                              <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>㎡</Text>
                              <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_m_added2:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>
                   </View>
                   <TouchableOpacity
                    style={{position:'absolute', top:0, right:0, backgroundColor:'red', justifyContent:'center', alignItems:'center', padding:8}}
                    onPress={()=>{ this._removeFromInputList(2,'addedInput_2_visible', 'wr_area_p_added2', 'wr_area_m_added2')}}>
                    <Text style={{color:'#fff'}}>X</Text>

                    </TouchableOpacity>
              </View>
{/* ////////////////////////////////////////////////////////세번째블락 끝////////////////////////////////////////////// */}
 {/* ///////////////////////////////////////////////네번째블락 시작 ///////////////////////////////////////////////////////  */}
              
 <View style={this._addedInputStyle(this.state.addedInput_3_visible)}>   
              <View style = {[styles.row, {marginTop:0}]}>    
                        
                        <Text style={styles.itemName}>지번</Text>
            
                        <TextInput
                        placeholder=""
                        placeholderTextColor='#aaa'
                        ref='TenthInput'
                        onSubmitEditing={(event) => { 
                          this.refs.EleventhInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"} 
                        style={[styles.itemInput, {position:'relative'}]}
                        underlineColorAndroid="transparent"
                        onChangeText= {wr_address_sale_added3 => this.setState({wr_address_sale_added3})}
                        value={this.state.wr_address_sale_added3}
                        onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 430)
                        }}
                        />
                        <TouchableOpacity
                            style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                            onPress={()=>{this.setState({wr_address_sale_added3:''})}}
                            >
                            <Icon 
                            name="md-close-circle"
                            size={20}
                            style={{ marginTop: 27,color: '#ddd', }}
                                                  
                            />   
                        </TouchableOpacity>

                        {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                    
              </View>
                
              <View style={{flexDirection: 'row',}}>    

                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}>면적 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='EleventhInput'
                                onSubmitEditing={(event) => { 
                                  this.refs.TwelfthInput.focus(); 
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_p_added3 => this.setState({
                                  wr_area_p_added3: wr_area_p_added3, 
                                  wr_area_m_added3: (wr_area_p_added3*3.3058).toFixed(2),
                                  }, function(){
                                    this.setState({
                                      wr_area_p_all: this._getSum().toFixed(2),
                                      wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                     
                                     })
                                   })}
                                value={`${this.state.wr_area_p_added3}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 430)
                                }}
                                />                      

                              <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                              <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_p_added3:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>

                        <Icon 
                        name="ios-repeat"
                        size={20}
                        style={{color: '#000', marginTop: 47, marginLeft: 10, marginRight: 10,}}
                        />
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='TwelfthInput'
                                onSubmitEditing={(event) => { 
                                  this.state.addedInput_4_visible?
                                  this.refs.ThirteenthInput.focus():this._goNext();
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_m_added3 => this.setState({
                                  wr_area_m_added3: wr_area_m_added3, 
                                  wr_area_p_added3: (wr_area_m_added3*0.3025).toFixed(2),
                                 }, function(){
                                  this.setState({
                                    wr_area_p_all: this._getSum().toFixed(2),
                                    wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                   
                                   })
                                 })}
                                value={`${this.state.wr_area_m_added3}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 430)
                                }}
                                />                      
                            
                              <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>㎡</Text>
                              <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_m_added3:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>
                   </View>
                   <TouchableOpacity
                    style={{position:'absolute', top:0, right:0, backgroundColor:'red', justifyContent:'center', alignItems:'center', padding:8}}
                    onPress={()=>{ this._removeFromInputList(3,'addedInput_3_visible', 'wr_area_p_added3', 'wr_area_m_added3')}}>
                    <Text style={{color:'#fff'}}>X</Text>

                    </TouchableOpacity>
              </View>
{/* //////////////////////////////////////////////////////네번째블락 끝///////////////////////////////////////////////// */}
{/* ////////////////////////////////////////////////////////다섯번째블락 시작//////////////////////////////////////////////////////////// */}

<View style={this._addedInputStyle(this.state.addedInput_4_visible)}>   
              <View style = {[styles.row, {marginTop:0}]}>    
                        
                        <Text style={styles.itemName}>지번</Text>
            
                        <TextInput
                        placeholder=""
                        placeholderTextColor='#aaa'
                        ref='ThirteenthInput'
                        onSubmitEditing={(event) => { 
                          this.refs.FourteenthInput.focus(); 
                        }}
                        blurOnSubmit={false}
                        returnKeyType = {"next"} 
                        style={[styles.itemInput, {position:'relative'}]}
                        underlineColorAndroid="transparent"
                        onChangeText= {wr_address_sale_added4 => this.setState({wr_address_sale_added4})}
                        value={this.state.wr_address_sale_added4}
                        onFocus={(event: Event) => {
                            // `bind` the function if you're using ES6 classes
                            this.scroll.props.scrollToPosition(0, 600)
                        }}
                        />
                        <TouchableOpacity
                            style={{position:'absolute', top:5, right:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                            onPress={()=>{this.setState({wr_address_sale_added4:''})}}
                            >
                            <Icon 
                            name="md-close-circle"
                            size={20}
                            style={{ marginTop: 27,color: '#ddd', }}
                                                  
                            />   
                        </TouchableOpacity>

                        {/* <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text> */}
                    
              </View>
                
              <View style={{flexDirection: 'row',}}>    

                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}>면적 <Text style={{color: 'red', fontSize:12, marginTop:5}}> * </Text></Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='FourteenthInput'
                                onSubmitEditing={(event) => { 
                                  this.refs.FifteenthInput.focus(); 
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_p_added4 => this.setState({
                                  wr_area_p_added4: wr_area_p_added4, 
                                  wr_area_m_added4: (wr_area_p_added4*3.3058).toFixed(2),
                                  }, function(){
                                    this.setState({
                                      wr_area_p_all: this._getSum().toFixed(2),
                                      wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                     
                                     })
                                   })}
                                value={`${this.state.wr_area_p_added4}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 600)
                                }}
                                />                      

                              <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                              <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_p_added4:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>

                        <Icon 
                        name="ios-repeat"
                        size={20}
                        style={{color: '#000', marginTop: 47, marginLeft: 10, marginRight: 10,}}
                        />
                        <View style = {styles.row}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                ref='FifteenthInput'
                                onSubmitEditing={(event) => { 
                                  
                                  this._goNext();
                                }}
                                blurOnSubmit={false}
                                returnKeyType = {"next"}
                                style={[styles.itemInput,{textAlign:'right',paddingRight: 35, paddingBottom:0}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                onChangeText= {wr_area_m_added4 => this.setState({
                                  wr_area_m_added4: wr_area_m_added4, 
                                  wr_area_p_added4: (wr_area_m_added4*0.3025).toFixed(2),
                                 }, function(){
                                  this.setState({
                                    wr_area_p_all: this._getSum().toFixed(2),
                                    wr_area_m_all: (this._getSum()*3.3058).toFixed(2)
                                   
                                   })
                                 })}
                                value={`${this.state.wr_area_m_added4}`}
                                onFocus={(event: Event) => {
                                // `bind` the function if you're using ES6 classes
                                this.scroll.props.scrollToPosition(0, 600)
                                }}
                                />                      
                            
                              <Text style={{ marginTop: 38, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>㎡</Text>
                              <TouchableOpacity
                                  style={{position:'absolute', top:5, left:0, justifyContent:'center', alignItems:'center', paddingRight:10, paddingBottom:10,}}
                                  onPress={()=>{this.setState({wr_area_m_added4:''})}}
                                  >
                                  <Icon 
                                  name="md-close-circle"
                                  size={20}
                                  style={{ marginTop: 27,color: '#ddd', }}
                                                        
                                  />   
                              </TouchableOpacity>
                        </View>
                   </View>
                   <TouchableOpacity
                    style={{position:'absolute', top:0, right:0, backgroundColor:'red', justifyContent:'center', alignItems:'center', padding:8}}
                    onPress={()=>{ this._removeFromInputList(4,'addedInput_4_visible', 'wr_area_p_added4', 'wr_area_m_added4')}}>
                    <Text style={{color:'#fff'}}>X</Text>

                    </TouchableOpacity>
              </View>

{/* ///////////////////////////////////////////////////다섯번째블락 끝 /////////////////////////////////*/}

               <TouchableOpacity style={this.state.addedInput_4_visible?{display:'none'}:{width:'100%', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#3b4db7', padding:10}}
                onPress={()=>{this._addTextInput(this.state.addedInputList)}}>

                    <Text style={{color: '#3b4db7', fontSize:14,}}>항목 추가</Text>
              </TouchableOpacity>
               
               <View style={{flexDirection: 'row', marginTop:15,}}>    

                  <Text style={[styles.itemName,{textAlign:'right'}]}>총면적 : {this.state.wr_area_p_all} 평 / {this.state.wr_area_m_all} m² </Text>

                 </View>
                  
        </View>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
          onPress={()=>{
            this._goPrevious();
          }}
          style={{flex:1,marginBottom:40,marginTop: 40, marginRight:10,backgroundColor:'#3b4db7', height: 45, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white', fontSize: 13,}}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
            this._goNext();
          }}
          style={{flex:1,marginBottom:40,marginTop: 40,backgroundColor:'#3b4db7', height: 45, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white', fontSize: 13,}}>다음</Text>
        </TouchableOpacity>
        </View>
                   
             {/* </KeyboardAvoidingView>
             </ScrollView> */}
             </KeyboardAwareScrollView >
        
           );
  }
}

const styles = StyleSheet.create({
    container: {
      
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
      marginTop: 18,
      
    },
    row2:{
        flex:1,
        marginTop: 18,
        flexDirection:'row',
    },
    itemName:{
      // marginTop:5,
      marginBottom:5,
      fontSize: 13,
      fontWeight:'bold',
      color: '#666',
      flex:2.75,    
    
    },
    itemInput:{
      flex:7.25,
      height:35,    
      fontSize: 13,
      borderColor:"#e6e6e6",
      backgroundColor: "#fff",
      // borderRadius: 3,
      borderBottomWidth: 1,
      padding:5,
      paddingLeft: 0,
     
      // borderWidth:1
    },
    formLabel:{
      fontSize: 16,
    },
    formInput:{
      borderBottomWidth: 1,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

AppRegistry.registerComponent('writeoffer_sell_second', () => writeoffer_sell_second);
