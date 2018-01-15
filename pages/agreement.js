import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { CheckBox, Button } from 'react-native-elements';




export default class agreement extends Component{

  static navigationOptions= ({navigation}) =>(
    {
      title:'약관',
      headerTitleStyle: {color:'white',fontSize:18, fontWeight:'bold'},
      headerStyle: {
        backgroundColor: '#3b4db7',
        elevation:0,
        height: 52,          
      },
      headerTintColor: 'white',
      }
  );
  constructor(props){
		super(props)
		this.state={
agreementText1: `
제1장 총 칙

제1조(목적)

이 약관은 (주)리차드막스(이하 “회사”라 함)가 운영하는 “RNote” 및 “RNote몰” 인터넷 오픈마켓 사이트 (RNote.kr, 이하 “RNote몰”이라 함)를 통해서 제공하는 전자상거래 관련 서비스 및 기타 서비스 (이하 “서비스”라 함)를 이용하는 자 간의 권리, 의무를 확정하고 이를 이행함으로써 상호 발전을 도모하는 것을 그 목적으로 합니다.

제2조(용어의 정의)

이 약관에서 사용하는 용어의 정의는 다음과 같습니다. 

1) 회원: 회사에 개인정보를 제공하여 회원등록을 한 개인 또는 법인으로서, 다음과 같이 일반회원과 판매자로 구분이 됩니다. 

① 일반회원(구매자): 회사에서 제공하는 구매서비스를 이용할 수 있는 14세 이상의 개인이나 법인

② 판매자: 회사에서 제공하는 구매서비스 및 판매서비스를 이용할 수 있는 14세 이상의 개인이나 법인

2) 아이디(ID): 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인하여 등록된 문자와 숫자의 조합을 말합니다.

3) 비밀번호: 회원의 동일성 확인과 회원의 권익 및 비밀보호를 위하여 회원 스스로가 설정하여 회사에 등록한 영문과 숫자의 조합을 말합니다.

4) 운영자: 회사가 제공하는 서비스의 전반적인 관리와 원활한 운영을 위하여 회사에서 선정한 자를 말합니다.

5) 에누리쿠폰(구매쿠폰): 회원이 회사의 서비스를 통하여 물품을 구매할 때 표시된 금액 또는 비율만큼 물품대금에서 할인 받을 수 있는 회사 전용의 사이버 또는 오프라인 쿠폰을 말합니다. 회사는 판매자의 동의(승인을 포함하며 이하 같다)가 있는 경우에 한하여 에누리쿠폰(구매쿠폰)이 적용된 물품판매거래를 중개할 수 있으며, 판매자의 동의가 없는 경우에는 당해 거래를 신속히 취소 처리합니다.

제1항에서 정의되지 않은 이 약관상의 용어의 의미는 일반적인 거래관행에 의합니다.

제3조(준용규정)

이 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법 및 기타 관련법령의 규정에 따릅니다.

제4조(약관의 명시, 효력과 개정)

`,
agreementText2:`
1. 수집하는 개인정보 항목

회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.

개인정보 수집방법 : 홈페이지(회원가입, 게시판, 신청서)

1. 로그인ID

2. 패스워드

3. 별명

4. 이메일

5. 서비스 이용기록

6. 접속 로그

7. 쿠키

8. 접속 IP 정보

9. 결제기록

2. 개인정보의 수집 및 이용목적

`,
      agreement_1_checked: false,
      agreement_2_checked: false,
      touchable:false,
	 	}
	}

  componentDidMount(){
    
  }

  _registerButtonTextStyle(){
    if(this.state.agreement_1_checked && this.state.agreement_2_checked){
       return (
        {color:'#fff', fontSize:15, fontWeight:'bold'}
       )
    }
    else{
       return (
        {color:'rgba(255,255,255,0.35)', fontSize:15, fontWeight:'bold'}
       )
    }
  }
  _containerStyle(checked){
    if(checked){

        return(

          {
            backgroundColor: 'rgba(0,0,0,0)',
            height:40,
            width:'100%',
            borderWidth: 1,
            borderColor:'#3b4db7',
            borderRadius:0,
            marginTop:10,
            marginBottom:20,
          }

        )

    }
    else{

        return(
          {
            backgroundColor: 'rgba(0,0,0,0)',
            height:40,
            width:'100%',
            borderWidth: 1,
            borderColor:'#ddd',
            borderRadius:0,
            marginTop:10,
            marginBottom:20,
          }
        )

    }

  }
  _textStyle(checked){

    if(checked){
      
        return(

          {
            fontSize: 13,
            color: '#3b4db7',
            marginBottom: 4,
            marginLeft: 10 
          }

        )

    }
    else{

        return(
          {
            fontSize: 13,
            color: '#aaa',
            marginBottom: 4,
            marginLeft: 10 
          }
        )

    }
 
  }

	render(){
		const { navigate } = this.props.navigation;
		return(
	  <ScrollView style={styles.container}>
       <Text style={{fontWeight:'bold', marginBottom:10, fontSize: 14,}}>개인정보 처리방침 안내</Text>
       <View>
          <View style={styles.agreementTextContainer}>
              <Text style={styles.contentText}>{this.state.agreementText1}</Text>
              
          </View>
          
          <TouchableOpacity
                style={styles.detailButton}
                onPress = {()=>{this.props.navigation.navigate('Agreement_text_1')}}>
                <Text style={{color:'#fff', fontSize:12}}>전문보기</Text>
          </TouchableOpacity>
       
       </View>

       
        <View style={styles.check}>
           <CheckBox
              center
              uncheckedIcon={null}
              checkedIcon={null}
              uncheckedColor = '#3b4db7'
              checkedColor ='#3b4db7'
              containerStyle = {this._containerStyle(this.state.agreement_1_checked)}
              textStyle ={this._textStyle(this.state.agreement_1_checked)}
              title='개인정보 처리방침 안내의 내용에 동의합니다.'
              checked={this.state.agreement_1_checked}
              onPress = {() => this.setState({agreement_1_checked: !this.state.agreement_1_checked})}
           />
       </View>

           
      
       <Text style={{fontWeight:'bold', marginBottom:10, fontSize: 14,}}>회원가입 약관</Text>
       <View>
          <View style={styles.agreementTextContainer}>
              <Text style={styles.contentText}>{this.state.agreementText2}</Text>
          </View>
          <TouchableOpacity
                style={styles.detailButton}
                onPress={()=>{this.props.navigation.navigate('Agreement_text_2')}}>
                <Text style={{color:'#fff', fontSize:12,}}>전문보기</Text>
          </TouchableOpacity>
       </View>

      
      <View style={styles.check}>
        <CheckBox
          center
          uncheckedIcon={null}
          checkedIcon={null}
          uncheckedColor = '#3b4db7'
          checkedColor ='#3b4db7'
          containerStyle = {this._containerStyle(this.state.agreement_2_checked)}
          textStyle ={this._textStyle(this.state.agreement_2_checked)}
          title='회원가입약관의 내용에 동의합니다.'
          checked={this.state.agreement_2_checked}
          onPress = {() => this.setState({agreement_2_checked: !this.state.agreement_2_checked})}
        />
      </View>

           
       

       <View style = {styles.buttonWrapper}>
               <TouchableOpacity style={[styles.button,{marginRight:20}]}
                 onPress = {() => this.state.agreement_1_checked&&this.state.agreement_2_checked?this.props.navigation.navigate('Register_emp'):null}
               >
                  <Text style={this._registerButtonTextStyle()}>직원 회원가입</Text>
               </TouchableOpacity>

               <TouchableOpacity style= {styles.button}
                //  onPress = {}
               >
                  <Text style={this._registerButtonTextStyle()}>중개사 회원가입</Text>
               </TouchableOpacity>
        </View>

    </ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
    flexDirection: 'column',
    padding: 25,
    backgroundColor:'#f1f1f1',
    
  },
  agreementTextContainer: {
    height:300,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop:0,
    borderWidth:1,
    borderColor:'#ddd',
    
  },
  contentText:{
    marginTop:-5,
    fontSize:13,
  },
  detailButton:{
    position:'absolute',
    top:0, right:1,
    padding:7,
    paddingRight:10, paddingLeft:10,
    backgroundColor:'#3b4db7',
    justifyContent:'center',
    alignItems:'center',
   
  },
  wrapper: {
   
    // backgroundColor: '#3b4db7',
    flexDirection: 'column',
    alignItems:'center',
		// justifyContent:'space-around',
  },
  check:{
    
    flexDirection: 'row',
    justifyContent:'center',
    
  },

  buttonWrapper:{
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent:'space-between',
    marginBottom:50,
    marginTop:10,
  },
  button:{
    
    flex:1,
    padding:15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#3b4db7',

  },
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},


});


AppRegistry.registerComponent('agreement', () => agreement);
