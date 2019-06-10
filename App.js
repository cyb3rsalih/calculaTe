import React, { Component } from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  TextInput,
  Keyboard, 
  TouchableWithoutFeedback, 
  Button,
  KeyboardAvoidingView, } from 'react-native';
 
export default class App extends Component {

    state = {
        n1:null, n2:null,
        mean1:null, mean2:null,
        std1:null, std2:null,
        result:null,
        hideResult:false,
        disabled:true
    }


  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    )
  }
  
  disable(){
    const {n1,n2,mean1,mean2,std1,std2} = this.state
     if( n1 !== null && n2 !== null && mean1 !== null && mean2 !== null && std1 !== null && std2 !== null){
      this.setState({disabled:false})
    }
  }
 
  _keyboardDidShow = () => {
    this.setState({hideResult:true})
  }

  _keyboardDidHide = () => {
    this.setState({hideResult:false})
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  
  hesapla(){
    const {n1,n2,mean1,mean2,std1,std2} = this.state

    let n1x = parseFloat(n1.replace(',','.'))
    let n2x = parseFloat(n2.replace(',','.'))

    let mean1x = parseFloat(mean1.replace(',','.'))
    let mean2x = parseFloat(mean2.replace(',','.'))

    let meanx = Math.abs(mean1x-mean2x)

    let std1x = parseFloat(std1.replace(',','.'))
    let std2x = parseFloat(std2.replace(',','.'))

    let result = meanx / (std1x**2/n1x + std2x**2/n2x)**(0.5)

    this.setState({result})
  }
 
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:20}} >

            { !this.state.hideResult ? (<Text style={{fontSize:35,padding:10}}>Result: {this.state.disabled == true ? 'Fill all the gaps' : this.state.result }</Text>) : <View></View>  } 
            { !this.state.hideResult ? ( <Button disabled={ this.state.disabled } onPress={ () => this.hesapla() } title={'Calculate'} ></Button>) : <View></View>  } 

          </View> 
        <KeyboardAvoidingView behavior='padding' style={styles.container2}>

          {/* Sample 1 Inputs */}
          <View style={styles.kutu}>

            <Text>Sample 1</Text>

            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({n1:''})} 
                onChangeText={ (t) => {this.setState({n1:t}) ; this.disable() }  }  
                placeholder='N1 Value' >

                  {this.state.n1}

              </TextInput>
            </View>

            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({mean1:''})} 
                onChangeText={ (t) => {this.setState({mean1:t}) ; this.disable()}  }  
                placeholder='N1 Mean' >

                  {this.state.mean1}

              </TextInput>
            </View>
      
            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({std1:''})} 
                onChangeText={ (t) => {this.setState({std1:t}) ; this.disable()} }  
                placeholder='N1 Std' >

                  {this.state.std1}

              </TextInput>
            </View>
          </View>
          
          {/* Sample 2 Inputs */}
          <View style={styles.kutu}>

            <Text>Sample 2</Text>

            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({n2:''})} 
                onChangeText={ (t) => {this.setState({n2:t}) ; this.disable() }  }  
                placeholder='N2 Value' >

                  {this.state.n2}

              </TextInput>
            </View>

            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({mean2:''})} 
                onChangeText={ (t) => {this.setState({mean2:t}) ; this.disable()}  }  
                placeholder='N2 Mean' >

                  {this.state.mean2}

              </TextInput>
            </View>
            
      
            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({std2:''})} 
                onChangeText={ (t) => {this.setState({std2:t}) ; this.disable() }}  
                placeholder='N2 Std' >

                  {this.state.std2}

              </TextInput>
            </View>
          </View>

        </KeyboardAvoidingView>
        <Text style={{marginBottom:20}}>This app calculates T value of given data</Text>        
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
    flex: 5, 
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
    padding:10,
    borderRadius:60,
    margin:5
  }
});