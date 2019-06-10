import React, { Component } from 'react';
import { StyleSheet, View,Text,TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
 
export default class App extends Component {

  state = { 
    n1:null,
    mean1:null,
    stdDev1:null,
    n2:null,
    mean2:null,
    stdDev2:null,
    result:null
  } 

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }




  calculate = () => {

    const { n1,n2,mean1,mean2,stdDev1,stdDev2 } = this.state    

    const abs = Math.abs(mean1 - mean2)
    const alt1 = Math.pow(stdDev1,2)/n1
    const alt2 = Math.pow(stdDev2,2)/n2
    const result = Math.sqrt(abs/(alt1+alt2))
    this.setState({result})
  }
 
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
          
        
      <View style={styles.container2}>

         {/* Variable */}
         <View style={styles.kutu}>
          
          <View style={styles.innerContainer}>
            <Text> N Values </Text>
          </View>

          <View style={styles.innerContainer}>
          <Text> Mean Values </Text>
          </View>

          <View style={styles.innerContainer}>
          <Text> Standard Deviations </Text>
          </View>
    
        </View>

        {/* Sample 1 Inputs */}
        <View style={styles.kutu}>
          <Text>Sample 1</Text>
          <View style={styles.innerContainer}>
            <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss} onChangeText={() => {this.calculate();this.setState({n1:parseFloat(this.state.n1)})}} style={styles.textInput} value={this.state.n1} placeholder='N1 Value' >{this.state.n1}</TextInput>
          </View>

          <View style={styles.innerContainer}>
          <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss} onChangeText={() => {this.calculate();this.setState({mean1:parseFloat(this.state.mean1)})}} style={styles.textInput} value={this.state.mean1} placeholder='N1 Mean' >{this.state.mean1}</TextInput>
          </View>

          <View style={styles.innerContainer}>
          <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss} onChangeText={() => {this.calculate();this.setState({stdDev1:parseFloat(this.state.stdDev1)})}}  style={styles.textInput} value={this.state.stdDev1} placeholder='N1 Std Dev.' >{this.state.stdDev1}</TextInput>
          </View>
    
        </View>
      {/* Sample 2 Inputs */}
        <View style={styles.kutu}>
          <Text>Sample 2</Text>
          <View style={styles.innerContainer}>
            <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss} onChangeText={() => {this.calculate();this.setState({n1:parseFloat(this.state.n2)})}} style={styles.textInput} value={this.state.n2} placeholder='N2 Value' >{this.state.n2}</TextInput>
          </View>

          <View style={styles.innerContainer}>
          <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss} onChangeText={() => {this.calculate();this.setState({mean1:parseFloat(this.state.mean2)})}} style={styles.textInput} value={this.state.mean2} placeholder='N2 Mean' >{this.state.mean2}</TextInput>
          </View>

          <View style={styles.innerContainer}>
          <TextInput keyboardType='numeric' onSubmitEditing={Keyboard.dismiss} onChangeText={() => {this.calculate();this.setState({stdDev1:parseFloat(this.state.stdDev2)})}}  style={styles.textInput} value={this.state.stdDev2} placeholder='N2 Std Dev.' >{this.state.stdDev2}</TextInput>
          </View>
    
        </View>

         

        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <Text style={{fontSize:40,paddingBottom:100}}>Result : {this.state.result}</Text>
        </View> 
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent:'center',
    alignItems:'center',
    //flexDirection:'row'
  },
  container2: { 
    flex: 4, 
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  kutu: {
    borderColor:'black',
    //borderWidth:1,
    height:150,
    width:100,
    margin:10
  },
  innerContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  textInput: {
    borderWidth:1, 
    borderColor:'black',
    width:100,
    padding:5,
    borderRadius:60,
    margin:5
  }
  
});