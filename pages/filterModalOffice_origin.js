import React, {Component} from 'react';
import {View, TouchableOpacity, Text,Modal, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SegmentedControls } from 'react-native-radio-buttons';

var options = ['임대', '매매', '거래종료'];
var previous;

class FilterModalOffice extends Component{

constructor(props){
    super(props);
    this.state={
        selectedSegment: '임대',
        isSearching:false,
        
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
        
            <View style = {[styles.row, {marginTop:10}]}>    
        
                <Text style={styles.itemName}>맴맴맴</Text>
        
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
                  
                  this.scroll.props.scrollToPosition(0, 60)
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
                  
                  this.scroll.props.scrollToPosition(0, 120)
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
                 
                  this.scroll.props.scrollToPosition(0, 180)
                }}
                />
        
            </View>
        
            <View style={{flexDirection: 'row',}}>
            
                        <View style = {[styles.row, {marginTop:6,}]}>    
                
                            <Text style={styles.itemName}>층수</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('floorMinFilter')}
                            onChangeText= {input => this.props.inputHandler('floorMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 240)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>
                        
                        </View>
                
                        <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
        
                        <View style = {[styles.row, {marginTop:6}]}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('floorMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('floorMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 240)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>층</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row',}}>
            
                        <View style = {[styles.row, {marginTop:6,}]}>    
                
                            <Text style={styles.itemName}>면적</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('areaMinFilter')}
                            onChangeText= {input => this.props.inputHandler('areaMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 300)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                        
                        </View>
                
                        <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
        
                        <View style = {[styles.row, {marginTop:6}]}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('areaMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('areaMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 300)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>평</Text>
                        
                        </View>
        
                        
            </View>
        
              
        
          <View style={{flexDirection: 'row',}}>
            
                        <View style = {[styles.row, {marginTop:6,}]}>    
                
                            <Text style={styles.itemName}>보증금</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('depositMinFilter')}
                            onChangeText= {input => this.props.inputHandler('depositMinFilter',input)}
                            onFocus={(event: Event) => {
                               
                                this.scroll.props.scrollToPosition(0, 360)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
                
                        <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
        
                        <View style = {[styles.row, {marginTop:6}]}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('depositMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('depositMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 360)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row',}}>
            
                        <View style = {[styles.row, {marginTop:6,}]}>    
                
                            <Text style={styles.itemName}>임대료</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('mrateMinFilter')}
                            onChangeText= {input => this.props.inputHandler('mrateMinFilter',input)}
                            onFocus={(event: Event) => {
                            
                                this.scroll.props.scrollToPosition(0, 420)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
                
                        <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
        
                        <View style = {[styles.row, {marginTop:6}]}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('mrateMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('mrateMaxFilter',input)}
                                onFocus={(event: Event) => {
                               
                                this.scroll.props.scrollToPosition(0, 420)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row',}}>
            
                        <View style = {[styles.row, {marginTop:6,}]}>    
                
                            <Text style={styles.itemName}>권리금</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('premoMinFilter')}
                            onChangeText= {input => this.props.inputHandler('premoMinFilter',input)}
                            onFocus={(event: Event) => {
                              
                                this.scroll.props.scrollToPosition(0, 480)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
                
                        <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
        
                        <View style = {[styles.row, {marginTop:6}]}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('premoMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('premoMaxFilter',input)}
                                onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 480)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
        
                        
            </View>
        
            <View style={{flexDirection: 'row', marginBottom: 60}}>
            
                        <View style = {[styles.row, {marginTop:6,}]}>    
                
                            <Text style={styles.itemName}>합예산</Text>
                
                            <TextInput
                            placeholder=""
                            placeholderTextColor='#aaa'
                            style={[styles.itemInput, {position:'relative'}]}
                            keyboardType='phone-pad'
                            underlineColorAndroid="transparent"
                            value={ this.props.getFilterValue('sumMinFilter')}
                            onChangeText= {input => this.props.inputHandler('sumMinFilter',input)}
                            onFocus={(event: Event) => {
                                
                                this.scroll.props.scrollToPosition(0, 540)
                            }}
                            />
                            <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
                
                        <Text style={{marginTop:30,fontSize: 16, marginLeft:10, marginRight:10,}}> ~ </Text>
        
                        <View style = {[styles.row, {marginTop:6}]}>    
                
                                <Text style={styles.itemName}> </Text>
                
                            
                                <TextInput
                                placeholder=""
                                placeholderTextColor='#aaa'
                                style={[styles.itemInput, {}]}
                                keyboardType='phone-pad'
                                underlineColorAndroid="transparent"
                                value={ this.props.getFilterValue('sumMaxFilter')}
                                onChangeText= {input => this.props.inputHandler('sumMaxFilter',input)}
                                onFocus={(event: Event) => {
                          
                                this.scroll.props.scrollToPosition(0, 540)
                                }}
                                />                      
                            
                                <Text style={{ marginTop: 37, marginLeft: 3, fontSize:12, position: 'absolute', top:-3, right:15}}>만원</Text>
                        
                        </View>
        
                        
                </View> 
        
           </View>

    )
}
_renderForm_rent(){
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
        
            <View style={{flexDirection: 'row', marginBottom: 60}}>

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

_closeModalAndSetState(){
    this.props.closeModal();
    this.setState({isSearching:false});
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
            onPress={this.props.resetHandler}
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
            /> 
    <View style={styles.inputContainer}>
      
         

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
    // fetch('http://real-note.co.kr/app2/searchByFilter_officeCount.php',{
    //   method:'post',
    //   header:{
    //     'Accept': 'application/json',
    //     'Content-type': 'application/json'
    //   },
    //   body:JSON.stringify({
    //     memberID: this.props.memberID,
    //     level:this.props.level,
    //     memberName: this.props.memberName,
    //     boss: this.props.boss,
    //     selectedSegment: this.props.selectedSegment,

    //     name: this.props.getFilterValue('nameFilter'),
    //     addr: this.props.getFilterValue('addrFilter'),
    //     writer: this.props.getFilterValue('writerFilter'),
    //     saleArea: this.props.getFilterValue('saleAreaFilter'),
    //     floorMin: this.props.getFilterValue('floorMinFilter'),
    //     floorMax: this.props.getFilterValue('floorMaxFilter'),
    //     areaMin: this.props.getFilterValue('areaMinFilter'),
    //     areaMax: this.props.getFilterValue('areaMaxFilter'),                               
    //     depositMin: this.props.getFilterValue('depositMinFilter'),
    //     depositMax: this.props.getFilterValue('depositMaxFilter'),
    //     mrateMin: this.props.getFilterValue('mrateMinFilter'),
    //     mrateMax: this.props.getFilterValue('mrateMaxFilter'),
    //     premoMin: this.props.getFilterValue('premoMinFilter'),
    //     premoMax: this.props.getFilterValue('premoMaxFilter'),
    //     sumMin: this.props.getFilterValue('sumMinFilter'),
    //     sumMax: this.props.getFilterValue('sumMaxFilter'),
              
    //   })}).then((res)=>{
    //     var parsedRes = JSON.parse(res._bodyText);      
    //     this.props.offeringCountHandler(parsedRes[0].count);

    //   }); 


    fetch('http://real-note.co.kr/app3/searchByFilter_officeMerged.php', {
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
        depositMin: this.props.getFilterValue('depositMinFilter'),
        depositMax: this.props.getFilterValue('depositMaxFilter'),
        mrateMin: this.props.getFilterValue('mrateMinFilter'),
        mrateMax: this.props.getFilterValue('mrateMaxFilter'),
        premoMin: this.props.getFilterValue('premoMinFilter'),
        premoMax: this.props.getFilterValue('premoMaxFilter'),
        sumMin: this.props.getFilterValue('sumMinFilter'),
        sumMax: this.props.getFilterValue('sumMaxFilter'),
      })

    })
    .then((res)=>{
      var parsedRes = JSON.parse(res._bodyText).data;
      var parsedRes_count = JSON.parse(res._bodyText).count.count;
      for(var i =0; i<=parsedRes.length-1; i++){
        parsedRes[i].level = this.props.level;
    }
    //   console.log(JSON.parse(res._bodyText));
     this.setState({isSearching:false})
      this.props.offeringHandler(parsedRes, parsedRes_count)
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
    backgroundColor: '#fbfbfb',
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
    flexDirection:'row',
    
  },
  row2:{    
    flex:3.625,
    flexDirection:'row',
    marginTop: 18,
    
  },
  itemName:{
    // marginTop:5,
    marginBottom:5,
    fontSize: 12,
    fontWeight: '100',
    color: '#666',
    flex:2.75,    
    
    
  },
  itemInput:{
    flex:7.25,
    height:40,    
    fontSize: 13,
    borderColor:"#e6e6e6",
    backgroundColor: "#fff",
    // borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 10,
    // borderWidth:1
  },
})

export default FilterModalOffice;