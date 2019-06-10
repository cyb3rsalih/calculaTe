import React, { Component } from 'react';
import { StyleSheet, View,Text,TextInput, Keyboard, TouchableWithoutFeedback, Button,KeyboardAvoidingView } from 'react-native';
 
export default class App extends Component {

    state = {
        n1:null,
        n2:null,
        mean1:null,
        mean2:null,
        std1:null,
        std2:null,
        result:null,
        hideResult:false,
        disabled:true
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
    
    if(this.state.n1)
    this.setState({disabled:false})

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
    let n1 = parseFloat(this.state.n1)
    let n2 = parseFloat(this.state.n2)

    let mean1 = parseFloat(this.state.mean1)
    let mean2 = parseFloat(this.state.mean2)

    let mean = Math.abs(mean1-mean2)

    let std1 = parseFloat(this.state.std1)
    let std2 = parseFloat(this.state.std2)

    let result = mean / (std1**2/n1 + std2**2/n2)**(0.5)

    this.setState({result})
  }

 


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >

            { !this.state.hideResult ? ( <Button disabled={ this.state.disabled } onPress={ () => this.hesapla() } title={'Hesapla'} ></Button>) : <View></View>  } 
            { !this.state.hideResult ? (<Text style={{fontSize:40,padding:10}}>Result: {this.state.result == null ? 'Fill all the gaps' : ''}</Text>) : <View></View>  } 

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
                onChangeText={ (t) => this.setState({n1:t})  }  
                placeholder='N1 Value' >

                  {this.state.n1}

              </TextInput>
            </View>

            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({mean1:''})} 
                onChangeText={ (t) => this.setState({mean1:t})  }  
                placeholder='N1 Mean' >

                  {this.state.mean1}

              </TextInput>
            </View>
      
            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({std1:''})} 
                onChangeText={ (t) => this.setState({std1:t}) }  
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
                onChangeText={ (t) => this.setState({n2:t})  }  
                placeholder='N2 Value' >

                  {this.state.n2}

              </TextInput>
            </View>

            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({mean2:''})} 
                onChangeText={ (t) => this.setState({mean2:t})  }  
                placeholder='N2 Mean' >

                  {this.state.mean2}

              </TextInput>
            </View>
            
      
            <View style={styles.innerContainer}>
              <TextInput 
                keyboardType='numeric' 
                style={styles.textInput} 
                onFocus={() => this.setState({std2:''})} 
                onChangeText={ (t) => this.setState({std2:t}) }  
                placeholder='N2 Std' >

                  {this.state.std2}

              </TextInput>
            </View>
          </View>

        </KeyboardAvoidingView>
        
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