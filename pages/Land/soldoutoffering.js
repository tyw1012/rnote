import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity,Modal,FlatList,Image, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, Button, Header } from 'react-native-elements';
import { SegmentedControls } from 'react-native-radio-buttons';

const options = ['임대', '매매'];
var previous;

export default class soldoutoffering extends Component{
static navigationOptions= ({navigation}) =>({
      header: null,
      title: '거래종료',
      headerTitleStyle:{
        fontWeight:'500',
        fontSize:20,
        alignSelf: 'center'
      },
	});

  constructor(props){
    super(props);
    this.state ={
      memberID: '',
      memberName:'',
      email:'',
      level:'',
      boss:'',
      minWrite:'',
      isLoaded: false,
      myoffering: [],
      myoffering_all:[],
      myoffering_num:30,
      modalVisible: false,
      selectedSegment: '임대',
      isFiltered:false,
      filterText:'통합검색',
      nameFilter:'',
      addrFilter:'',
      writerFilter:'',
      saleAreaFilter:'',
      floorMinFilter:'',
      floorMaxFilter:'',
      areaMinFilter:'',
      areaMaxFilter:'',
      depositMinFilter:'',
      depositMaxFilter:'',
      mrateMinFilter:'',
      mrateMaxFilter:'',
      premoMinFilter:'',
      premoMaxFilter:'',
      sumMinFilter:'',
      sumMaxFilter:'',
      myoffering_from: 0, 
      countPerLoad: 25,
      isAdding: false,
      isRefreshing: false,
      
    };
    console.log(this);
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      console.log(this.state);
    })
  }
  setSelectedOption(selectedSegment){
    
        
        this.setState(previousState => {
          previous = previousState.selectedSegment;
          console.log(previous);
          
          return {
            selectedSegment, 
          };
        }, function(){
            if(previous != this.state.selectedSegment){
    
              // console.log('working');
              this.setState({isFiltered:false, filterText: '통합검색', myoffering_from: 0});
              const {memberID, memberName, countPerLoad, myoffering_from, selectedSegment, level, boss,} = this.state;
              
              fetch('http://real-note.co.kr/app/getSoldOutOffering.php',{
                method:'post',
                header:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
                },
                body:JSON.stringify({
                  memberID: memberID,
                  // myoffering_num: myoffering_num,
                  memberName: memberName,
                  level: level,
                  boss: boss,
                  selectedSegment: selectedSegment,
                  myoffering_from: myoffering_from,
                  countPerLoad: countPerLoad,
                  
                })
              })
              .then((res)=>{
                var parsedRes = JSON.parse(res._bodyText);
                for(var i =0; i<=parsedRes.length-1; i++){
                  parsedRes[i].level = this.state.level;
              }
                this.setState({myoffering:parsedRes, myoffering_all:parsedRes,});
                this.setState({isLoaded: true}, function(){console.log(this.state)});
                
              })
    
            }
           
    
        });
  }
  componentDidMount(){

    const {memberID, memberName, countPerLoad, myoffering_from, boss, level, selectedSegment} = this.state;
    
    fetch('http://real-note.co.kr/app/getSoldOutOffering.php',{
      method:'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        memberID: memberID,
        // myoffering_num: myoffering_num,
        level:level,
        boss:boss,
        selectedSegment:selectedSegment,
        memberName: memberName,
        myoffering_from: myoffering_from,
        countPerLoad: countPerLoad,
        
      })
    })
    .then((res)=>{
      var parsedRes = JSON.parse(res._bodyText);
      for(var i =0; i<=parsedRes.length-1; i++){
        parsedRes[i].level = this.state.level;
    }
      this.setState({myoffering:parsedRes, myoffering_all:parsedRes,});
      this.setState({isLoaded: true}, function(){console.log(this.state)});
      
    })
    
  }
  _sum(a,b){
    return parseInt(a)+parseInt(b)
  }

  _onRefresh = () =>{
    
    if(!this.state.isFiltered){
        const {memberID, memberName, countPerLoad, myoffering_from, boss,level,selectedSegment} = this.state;
        this.setState({myoffering_from: 0, isRefreshing: true, }, function(){

            fetch('http://real-note.co.kr/app/getSoldOutOffering.php',{
                method:'post',
                header:{
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
                },
                body:JSON.stringify({
                  memberID: memberID,
                  // myoffering_num: myoffering_num,
                  selectedSegment: selectedSegment,
                  boss:boss,
                  level:level,
                  memberName: memberName,
                  myoffering_from: 0,
                  countPerLoad: countPerLoad,
                  
                })
              })
              .then((res)=>{
                var parsedRes = JSON.parse(res._bodyText);
                for(var i =0; i<=parsedRes.length-1; i++){
                  parsedRes[i].level = this.state.level;
              }
                this.setState({myoffering:parsedRes, myoffering_all:parsedRes,isRefreshing:false,});
                
                
              })

        })
      }
    
  }
  _renderRow({item}){
      return(
        <TouchableOpacity style={{flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd', padding: 12, marginBottom: 6, backgroundColor:'#fff', justifyContent:'space-between'}}
          onPress={()=>{this.props.navigation.navigate('Detail', item); console.log(item)}}>
            <View>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.wr_subject}</Text>
              <Text style={{fontSize: 12.5,}}>{item.wr_sale_area}</Text>
              <Text style={{fontSize: 12.5}}>담당자: {item.wr_writer}</Text>
            </View>
            <View>
              <View style={{flexDirection:'row'}}>               
                <Text style={{fontSize: 13, color:'#555', marginTop:2,}}>{item.wr_floor}층·{item.wr_area_p}평 </Text>
                <Text style={{fontSize: 15, fontWeight:'bold', color:'#2b3bb5', textAlign:'right',}}> {item.wr_rent_deposit}/{item.wr_m_rate}만</Text>
              </View>
              <Text style={{fontSize: 13, fontWeight: 'bold',textAlign:'right',}}> 권 {item.wr_premium_o} 합 {this._sum(item.wr_premium_o,item.wr_rent_deposit)}</Text>             
              <Text style={{fontSize: 13,textAlign:'right',}}>{item.wr_code}</Text>
            </View>

        </TouchableOpacity>
      )
  }
  _handleEnd(){
      if(!this.state.isFiltered){

        this.setState({myoffering_from : this.state.myoffering_from + this.state.countPerLoad,
                       isAdding: true,
                      }, function(){
          
                    fetch('http://real-note.co.kr/app/getSoldOutOffering.php',{
                      method:'post',
                      header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                      },
                      body:JSON.stringify({
                        memberID: this.state.memberID,
                        memberName: this.state.memberName,
                        myoffering_from: this.state.myoffering_from,
                        countPerLoad: this.state.countPerLoad,
                        selectedSegment: this.state.selectedSegment,
                        boss: this.state.boss,
                        level: this.state.level,
                      })
                    })
                    .then((res)=>{
                      var parsedRes = JSON.parse(res._bodyText);
                      console.log(parsedRes);
                      for(var i =0; i<=parsedRes.length-1; i++){
                        parsedRes[i].level = this.state.level;
                    }
                      this.setState({
                                     myoffering : [...this.state.myoffering,...parsedRes],
                                     myoffering_all:[...this.state.myoffering_all,...parsedRes],
                                     isAdding: false,
                                    });
                    
                      // this.setState({isLoaded: true}, function(){console.log(this.state)});
                      
                    })
          
                  });

      }
      else{
        
                this.setState({myoffering_from : this.state.myoffering_from + this.state.countPerLoad,
                  isAdding: true,
                 }, function(){
        
               fetch('http://real-note.co.kr/app/searchByFilter_soldout.php',{
                 method:'post',
                 header:{
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
                 },
                 body:JSON.stringify({
                   memberID: this.state.memberID,
                   memberName: this.state.memberName,
                   myoffering_from: this.state.myoffering_from,
                   countPerLoad: this.state.countPerLoad,
                   selectedSegment: this.state.selectedSegment,
                   level: this.state.level,
                   boss: this.state.boss,
                 })
               })
               .then((res)=>{
                 var parsedRes = JSON.parse(res._bodyText);
                 
                 for(var i =0; i<=parsedRes.length-1; i++){
                  parsedRes[i].level = this.state.level;
              }
                 this.setState({
                                myoffering : [...this.state.myoffering,...parsedRes],
                                myoffering_all:[...this.state.myoffering_all,...parsedRes],
                                isAdding: false,
                               });
               
                 
               })
        
             });
        
              }
    
  }
  _renderFooter(){
    if (!this.state.isAdding) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"

            }}
          >
            <ActivityIndicator/>
          </View>
        );
  }

	render(){
    // const {params} = this.props.navigation.state;

    if(!this.state.isLoaded){
      return(
          <View>
            <View style={{alignItems: 'center'}}>
            <ActivityIndicator style ={{position: 'absolute', marginTop: 250}}/>
            </View>
          </View>
      )
    }
    else{
      return(
  	     <View style={styles.container}>

            <View>
              <Header
                outerContainerStyles={{height: 52, backgroundColor: '#3b4db7'}}
                innerContainerStyles={{ alignItems:'center'}}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={ <Image
                  source={require('./rnote_header.png')}
                  resizeMode="contain"
                  style={{width: 70, padding: 10}}
              />}
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View>

           <View style={styles.buttonWrapper}>

              {/* 임대, 매매 탭 */}
                        
              <SegmentedControls
              options={ options }
              onSelection={ this.setSelectedOption.bind(this) }
              selectedOption={ this.state.selectedSegment }
              containerStyle={{width:180, height: 40, marginLeft: 15,}}
              optionContainerStyle={{justifyContent:'center',}}
              optionStyle ={{fontSize: 16,}}
              separatorWidth= {1}
              containerBorderWidth= {1}
              tint={'#3b4db7'}
              selectedTint= {'white'}
              
            />
          {/* 임대, 매매 탭 */}

             <Button
              buttonStyle={{width: 100, height: 40, backgroundColor: '#3b4db7', borderRadius: 5,}}
              title={this.state.filterText}
              onPress={()=>{
                if(this.state.isFiltered){
                  this.setState({filterText:'통합검색', isFiltered:false, myoffering:this.state.myoffering_all })
                 
                }
                else{
                  this.setState({modalVisible: true})
                }
                              
              }}  
             />
            </View>
            
             {/* 필터 모달창 */}
                  <Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={()=>{}}
                      >
                     <TouchableOpacity
                       style={{backgroundColor:'#e1e1e1', padding:10, alignItems:'center'}}
                       onPress={()=>this.setState({modalVisible:false})}>
                       <Text style={{color: '#555', fontSize: 17, fontWeight:'bold'}}>X 닫기</Text>
                      </TouchableOpacity>
                        <ScrollView
                         keyboardShouldPersistTaps="always">
                          <KeyboardAvoidingView style={{marginBottom:100}}>
                                <FormLabel labelStyle={styles.formLabel}>매물명</FormLabel>
                                <FormInput
                                inputStyle={styles.formInput_str} 
                                value={this.state.nameFilter} 
                                onChangeText= {nameFilter => this.setState({nameFilter})}
                                />

                                <FormLabel labelStyle={styles.formLabel}>상권명</FormLabel>
                                <FormInput
                                inputStyle={styles.formInput_str}  
                                value={this.state.saleAreaFilter}                
                                onChangeText= {                   
                                    saleAreaFilter => this.setState({saleAreaFilter})
                                  }                 
                                />

                                <FormLabel labelStyle={styles.formLabel}>주소</FormLabel>
                                <FormInput
                                inputStyle={styles.formInput_str}  
                                value={this.state.addrFilter}                
                                onChangeText= {                   
                                    addrFilter => this.setState({addrFilter})
                                  }                 
                                />

                                <FormLabel labelStyle={styles.formLabel}>담당자</FormLabel>
                                <FormInput
                                inputStyle={styles.formInput_str} 
                                value={this.state.writerFilter}                
                                onChangeText= {                   
                                    writerFilter => this.setState({writerFilter})
                                  }                 
                                />

                                <FormLabel labelStyle={styles.formLabel}>층수</FormLabel>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    
                                    <FormInput
                                    inputStyle={styles.formInput}   
                                    placeholder=''    
                                    value={this.state.floorMinFilter}       
                                    onChangeText= {                   
                                        floorMinFilter => this.setState({floorMinFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10,fontSize: 17}}> ~ </Text>
                                    <FormInput
                                    inputStyle={styles.formInput}    
                                    placeholder=''
                                    value={this.state.floorMaxFilter}             
                                    onChangeText= {                   
                                        floorMaxFilter => this.setState({floorMaxFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10, fontSize: 17}}>층</Text>
                                  
                                </View>

                                <FormLabel labelStyle={styles.formLabel}>면적</FormLabel>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    
                                    <FormInput
                                    inputStyle={styles.formInput}  
                                    placeholder='' 
                                    value={this.state.areaMinFilter}              
                                    onChangeText= {                   
                                        areaMinFilter => this.setState({areaMinFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10,fontSize: 17}}> ~ </Text>
                                    <FormInput
                                    inputStyle={styles.formInput}   
                                    placeholder=''
                                    value={this.state.areaMaxFilter}             
                                    onChangeText= {                   
                                        areaMaxFilter => this.setState({areaMaxFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10, fontSize: 17}}>평</Text>
                                  
                                </View>            

                                <FormLabel labelStyle={styles.formLabel}>보증금</FormLabel>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    
                                    <FormInput
                                    inputStyle={styles.formInput} 
                                    placeholder='' 
                                    value={this.state.depositMinFilter}         
                                    onChangeText= {                   
                                        depositMinFilter => this.setState({depositMinFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10,fontSize: 17}}> ~ </Text>
                                    <FormInput
                                    inputStyle={styles.formInput} 
                                    placeholder=''
                                    value={this.state.depositMaxFilter}              
                                    onChangeText= {                   
                                        depositMaxFilter => this.setState({depositMaxFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10, fontSize: 17}}>만원</Text>
                                  
                                </View>

                                <FormLabel labelStyle={styles.formLabel}>임대료</FormLabel>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    
                                    <FormInput
                                    inputStyle={styles.formInput}   
                                    placeholder=''
                                    value={this.state.mrateMinFilter}           
                                    onChangeText= {                   
                                        mrateMinFilter => this.setState({mrateMinFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10,fontSize: 17}}> ~ </Text>
                                    <FormInput
                                    inputStyle={styles.formInput}   
                                    placeholder=''            
                                    value={this.state.mrateMaxFilter}
                                    onChangeText= {                   
                                        mrateMaxFilter => this.setState({mrateMaxFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10, fontSize: 17}}>만원</Text>
                                  
                                </View>

                                <FormLabel labelStyle={styles.formLabel}>권리금</FormLabel>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    
                                    <FormInput
                                    inputStyle={styles.formInput} 
                                    placeholder=''
                                    value={this.state.premoMinFilter}          
                                    onChangeText= {                   
                                        premoMinFilter => this.setState({premoMinFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10,fontSize: 17}}> ~ </Text>
                                    <FormInput
                                    inputStyle={styles.formInput}  
                                    placeholder=''
                                    value={this.state.premoMaxFilter}              
                                    onChangeText= {                   
                                      premoMaxFilter => this.setState({premoMaxFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10, fontSize: 17}}>만원</Text>
                                  
                                </View>

                                <FormLabel labelStyle={styles.formLabel}>합예산</FormLabel>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    
                                    <FormInput
                                    inputStyle={styles.formInput} 
                                    placeholder=''       
                                    value={this.state.sumMinFilter}   
                                    onChangeText= {                   
                                        sumMinFilter => this.setState({sumMinFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10,fontSize: 17}}> ~ </Text>
                                    <FormInput
                                    inputStyle={styles.formInput}   
                                    placeholder=''    
                                    value={this.state.sumMaxFilter}           
                                    onChangeText= {                   
                                        sumMaxFilter => this.setState({sumMaxFilter})
                                      }                 
                                    />
                                    <Text style={{marginTop:10, fontSize: 17}}>만원</Text>
                                  
                                </View>            



                          </KeyboardAvoidingView>
                        </ScrollView>           
                      <TouchableOpacity style={{
                        position: 'absolute', width:'100%', height:60, bottom:0, backgroundColor:'#3b4db7', alignItems:'center',justifyContent:'center'}}
                        onPress={()=>{
                          fetch('http://real-note.co.kr/app/searchByFilter_soldout.php', {
                            method: 'POST',
                            headers:{
                              'Accept': 'application/json',
                              "Accept-Encoding": "gzip, deflate",
                              'Content-type': 'application/json',
                            },
                            body:JSON.stringify({
                              
                              memberID: this.state.memberID,
                              memberName: this.state.memberName,
                              level: this.state.level,
                              boss: this.state.boss,
                              selectedSegment: this.state.selectedSegment,
                              myoffering_from: 0,
                              countPerLoad: this.state.countPerLoad,                              

                              name: this.state.nameFilter,
                              addr: this.state.addrFilter,
                              writer: this.state.writerFilter,
                              saleArea: this.state.saleAreaFilter,
                              floorMin: this.state.floorMinFilter,
                              floorMax: this.state.floorMaxFilter,
                              areaMin: this.state.areaMinFilter,
                              areaMax: this.state.areaMaxFilter,                               
                              depositMin: this.state.depositMinFilter,
                              depositMax: this.state.depositMaxFilter,
                              mrateMin: this.state.mrateMinFilter,
                              mrateMax: this.state.mrateMaxFilter,
                              premoMin: this.state.premoMinFilter,
                              premoMax: this.state.premoMaxFilter,
                              sumMin: this.state.sumMinFilter,
                              sumMax: this.state.sumMaxFilter,
                              
                            })
                      
                          })
                          .then((res)=>{
                            var parsedRes = JSON.parse(res._bodyText);
                            for(var i =0; i<=parsedRes.length-1; i++){
                              parsedRes[i].level = this.state.level;
                          }
                            this.setState({modalVisible:false, myoffering:parsedRes, isFiltered:true, filterText:'필터해제'})
                          })
                          
                        }}
                        >
                          <Text style={{fontSize: 18, fontWeight:'bold', color: '#fff'}}>필터적용</Text>
                      </TouchableOpacity> 

                  </Modal>
            {/* 필터 모달창 */}             
            {/* <ListView dataSource={this.state.myoffering} renderRow = {(rowData) => this._renderRow(rowData)}>
            </ListView>  */}

            <FlatList data ={this.state.myoffering}
                style={{marginBottom:110, marginTop:15}}
                keyExtractor ={(x,i)=>i}
                extraData={this.state}
                onEndReached = {() =>  this.state.myoffering.length>=this.state.countPerLoad?this._handleEnd():null}
                onEndReachedThreshold ={0.9}
                refreshing = {this.state.isRefreshing}
                onRefresh ={this._onRefresh}
                renderItem = {({item}) => {return this._renderRow({item})}}
                ListFooterComponent = {this._renderFooter()}/> 
                
            
           </View>

       		)
    }

	}
}
const styles = StyleSheet.create({
	container:{
        display:'flex',
        backgroundColor:'#f1f1f1',
	},
  buttonWrapper:{
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent:'space-between',
    marginTop: 10,
  },
  formInput:{
    borderWidth: 1, width: 110,borderColor:'#d1d1d1', marginBottom: 15,
  },
  formInput_str:{
    borderWidth:1, borderColor:'#d1d1d1', marginBottom:15,
  },
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},


});


AppRegistry.registerComponent('soldoutoffering', () =>soldoutoffering);
