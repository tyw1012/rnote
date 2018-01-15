import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,FlatList, TouchableOpacity, TextInput } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';
export default class employee extends Component{
static navigationOptions= ({navigation}) =>({
	
        title:'직원관리',
        headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
        headerStyle: {
          backgroundColor: '#3b4db7',
          elevation:0,
          height: 52,          
        },
        headerTintColor: 'white',
        
	});
constructor(props){
    super(props);
    this.state = {};

}
componentWillMount(){
    const {params} = this.props.navigation.state;
    this.setState(params, function(){
      
    })
    
}
    
componentDidMount(){

  this._onRefresh();

}

_onRefresh(){

    fetch('http://real-note.co.kr/app3/getEmployee.php',{
    method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body:JSON.stringify({
        
        memberID: this.state.memberID,
        level:this.state.level,
                    
    })
    })
    .then((res)=>{
        
    var parsedRes = JSON.parse(res._bodyText);
    this.setState({employee:parsedRes, employee_all: parsedRes});
    

    })

}

_renderRow({item}){

    swipeSettings = {
      autoClose: true,
      right:[
        {
          onPress: ()=>{

            if(item.gm_block==0){
                fetch('http://real-note.co.kr/app3/blockEmployee.php',{
                    method:'post',
                    header:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body:JSON.stringify({
                        
                        memberID: this.state.memberID,
                        empID: item.mb_id,
                                                          
                    })
                    })
                    .then((res)=>{console.log(res); return res.json()})
                    .then((json) =>{
                      if (json.success){
                        
                        alert(`'${item.mb_name}'님이 차단되었습니다.`)
                        this._onRefresh();
    
                      }
                      else{

                        alert("일시적인 오류가 발생했습니다. ")
                        
                      }
                      
                    })
                 
            }
        else{

            fetch('http://real-note.co.kr/app3/unBlockEmployee.php',{
                method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    
                    memberID: this.state.memberID,
                    empID: item.mb_id,                    
                                
                })
                })
                .then((res)=>{console.log(res); return res.json()})
                .then((json) =>{
                    if (json.success){
                      
                      alert(`'${item.mb_name}'님이 차단해제 되었습니다.`)
                      this._onRefresh();
                    }
                    else{

                      alert("일시적인 오류가 발생했습니다. ")
                      
                    }
                    
                 })

        }
          
            
         },
          
          component: <View style={{flex:1,backgroundColor:'#e23f34', marginBottom:4, justifyContent:'center', alignItems:'center',}}>
          <Text style={{color:'#fff', fontSize:12, textAlign:'center'}}>{item.gm_block == 0?`오피스노트${"\n"}접근 차단`: '차단해제'}</Text>
          
          </View>,
          backgroundColor:'transparent'
        },
       
      ]        
    }
  return(
    <Swipeout {...swipeSettings}
    backgroundColor='#f1f1f1'>
    
    <View style={{ flexDirection: 'row', borderBottomWidth:1, borderTopWidth:1,borderColor:'#ddd',
   padding: 12, marginBottom: 4, backgroundColor:'#fff', justifyContent:'space-between' }}
   
    >

        <View>
            <Text style={{fontWeight:'bold', fontSize:15}}>{item.mb_name} <Text style={{fontWeight:'100', fontSize:13, }}>( {item.mb_id} )</Text></Text>
            <Text style={{fontSize:13}}>{item.mb_hp}</Text>
        </View>   

        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:13}}>오피스노트: </Text>
            <Text style={item.gm_block =="1"?{fontSize:13,fontWeight:'bold',color:'#e23f34'}:parseInt(item.count)<this.state.minWrite?{fontSize:13,fontWeight:'bold',color:'#dd8e1f'}:{fontSize:13,fontWeight:'bold',color:'#3b4db7'}}>
            {item.gm_block =="1"?'차단됨': parseInt(item.count)<this.state.minWrite?'조회불가':'조회가능'}
            </Text>
        </View>

        {/* <View style={{flexDirection:'row',}}>
            <TouchableOpacity style={{backgroundColor:'#f4c93d', justifyContent:'center', alignItems:'center', padding:10, borderRadius:5,  marginRight:10}}>
                <Text style={{color:'#fff'}}>차단</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#e23f34', justifyContent:'center', alignItems:'center', padding:10, borderRadius:5}}>
                <Text style={{color:'#fff'}}>탈퇴</Text>
            </TouchableOpacity>
        </View>
        */}

    </View>
   
    </Swipeout>
  )
}


render(){
   let filtered;
    return(
        <View style={styles.container}>
            <View style={{padding:10,paddingLeft:15, paddingRight:15, flexDirection:'row', justifyContent:'space-between', backgroundColor:'#fff', borderBottomWidth:1.5, borderColor:'#e1e1e1'}}>
                <View style={{flexDirection:'row', }}>
                <Text style={{fontWeight:'bold', marginTop:3, fontSize: 13}}>총 </Text>
                <Text style={{color:'#3b4db7', fontWeight:'bold', marginTop:3, fontSize: 13}}>{this.state.employee==undefined?0:this.state.employee.length}</Text>
                <Text style={{fontWeight:'bold', marginTop:3, fontSize: 13}}>명 </Text>
                </View>

                <View>
                    <TextInput
                    style={{borderBottomWidth:1, width:150, height:30, padding:5, fontSize:13, marginTop:-5, borderColor:'#e1e1e1'}}
                    placeholder="직원명 검색"
                    onChangeText= {input => {
                        
                        filtered = this.state.employee_all.filter(function(val){return val.mb_name.includes(input)});
                        this.setState({
                            employee:filtered
                        })
                        if (input==''){

                            this.setState({
                                employee:this.state.employee_all
                            })

                        }
                    }}
                    />
                    <Icon
                     name="ios-search-outline"
                     size={18}
                     style={{color:'#aaa', position:'absolute', right:3, top:0,}}
                    />
                </View>
            </View>

            <FlatList data ={this.state.employee}
            ref={(ref) => { this.flatListRef = ref; }}
            style={{ marginTop:0}}
            contentContainerStyle={{paddingTop:10,}}
            keyExtractor ={(x,i)=>i}
            extraData={this.state}
            renderItem = {({item}) => {return this._renderRow({item})}}
            /> 
       </View>
    );
}

}
const styles = StyleSheet.create({
	container:{
        flex:1,
        backgroundColor:'#f1f1f1'
	},

	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},


});


AppRegistry.registerComponent('employee', () => employee);
