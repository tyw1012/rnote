import { CheckBox } from 'react-native-elements'
import React, {Component} from 'react';

class RecCheckBox extends Component{


shouldComponentUpdate(nextProps, nextState) {

    if(this.props.checked === nextProps.checked){
        return false   ;
        }
        return true
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

    render(){
        console.log('renderingCheckBox')
        const {item} = this.props;
        return(
            <CheckBox
                uncheckedIcon={null}
                checkedIcon={null}
                
                title={item}
                containerStyle={this._checkBoxStyle(this.props.wr_rec_full_bool[this.props.wr_rec_full.indexOf(item)])}
                textStyle={this._checkBoxTextStyle(this.props.wr_rec_full_bool[this.props.wr_rec_full.indexOf(item)])}
                checked={this.props.wr_rec_full_bool[this.props.wr_rec_full.indexOf(item)]}
                onPress={()=>{
                                       
                    if(!this.include(this.props.wr_rec_sectors,item)){
                        this.props.recCheckHandler({wr_rec_sectors : [...this.props.wr_rec_sectors,item]})
                    }else{ 
                        var index = this.props.wr_rec_sectors.indexOf(item);
                        var temp = this.props.wr_rec_sectors.slice(0);
                        temp.splice(index,1);                       
                        this.props.recCheckHandler({wr_rec_sectors : temp})
                    }
                    var temp2 = this.props.wr_rec_full_bool.slice(0);
                    var index_full = this.props.wr_rec_full.indexOf(item);
                    temp2[index_full] = !temp2[index_full];
                    this.props.recCheckHandler({wr_rec_full_bool : temp2})
                
            
                }}/>
        )
    }
}

export default RecCheckBox;