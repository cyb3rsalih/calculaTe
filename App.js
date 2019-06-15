import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";

import { Appbar, TextInput as PTextInput, Colors } from "react-native-paper";

export default class App extends Component {
  state = {
    n1: null,
    n2: null,
    mean1: null,
    mean2: null,
    std1: null,
    std2: null,
    result: null,
    hideResult: false,
    disabled: true,
    text: ""
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  disable() {
    const { n1, n2, mean1, mean2, std1, std2 } = this.state;
    if (
      n1 !== null &&
      n2 !== null &&
      mean1 !== null &&
      mean2 !== null &&
      std1 !== null &&
      std2 !== null
    ) {
      this.setState({ disabled: false });
    }
  }

  _keyboardDidShow = () => {
    this.setState({ hideResult: true });
  };

  _keyboardDidHide = () => {
    this.setState({ hideResult: false });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  hesapla() {
    const { n1, n2, mean1, mean2, std1, std2 } = this.state;

    let n1x = parseFloat(n1.replace(",", "."));
    let n2x = parseFloat(n2.replace(",", "."));

    let mean1x = parseFloat(mean1.replace(",", "."));
    let mean2x = parseFloat(mean2.replace(",", "."));

    let meanx = Math.abs(mean1x - mean2x);

    let std1x = parseFloat(std1.replace(",", "."));
    let std2x = parseFloat(std2.replace(",", "."));

    let result = meanx / (std1x ** 2 / n1x + std2x ** 2 / n2x) ** 0.5;
    result = result.toFixed(3);
    this.setState({ result });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar
            translucent={false}
            barStyle={"light-content"}
            backgroundColor={"#17c0eb"}
          />
          <Appbar style={styles.appbar}>
            <Appbar.Action
              color={"#fff"}
              style={{ paddingTop: 15 }}
              icon="info-outline"
              onPress={() =>
                alert(
                  "This app calculates T value of given data. Please fill all the gaps to activate Calculate button"
                )
              }
            />
          </Appbar>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60
            }}
          >
            {!this.state.hideResult ? (
              <Text style={{ fontSize: 35, padding: 10 }}>
                Result:{" "}
                {this.state.disabled == true
                  ? "Fill all the gaps"
                  : this.state.result}
              </Text>
            ) : (
              <View />
            )}
            {!this.state.hideResult ? (
              <Button
                disabled={this.state.disabled}
                onPress={() => this.hesapla()}
                title={"Calculate"}
              />
            ) : (
              <View />
            )}
          </View>
          <KeyboardAvoidingView behavior="height" style={styles.container2}>
            {/* Sample 1 Inputs */}
            <View style={styles.kutu}>
              <Text>Sample 1</Text>

              <PTextInput
                key={6}
                label="N1 Value"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.n1}
                onChangeText={t => {
                  this.setState({ n1: t });
                  this.disable();
                }}
                theme={{ roundness: 10, colors: { primary: "#ff0000" } }}
              />

              <PTextInput
                key={5}
                label="N1 Mean"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.mean1}
                onChangeText={t => {
                  this.setState({ mean1: t });
                  this.disable();
                }}
                theme={{ roundness: 10, colors: { primary: "#ff0000" } }}
              />

              <PTextInput
                key={4}
                label="N1 Std"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.std1}
                onChangeText={t => {
                  this.setState({ std1: t });
                  this.disable();
                }}
                theme={{ roundness: 10, colors: { primary: "#ff0000" } }}
              />
            </View>

            {/* Sample 2 Inputs */}
            <View style={styles.kutu}>
              <Text>Sample 2</Text>

              <PTextInput
                key={3}
                label="N2 Value"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.n2}
                onChangeText={t => {
                  this.setState({ n2: t });
                  this.disable();
                }}
                theme={{ roundness: 10, colors: { primary: "#ff0000" } }}
              />

              <PTextInput
                key={2}
                label="N2 Mean"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.mean2}
                onChangeText={t => {
                  this.setState({ mean2: t });
                  this.disable();
                }}
                theme={{ roundness: 10, colors: { primary: "#ff0000" } }}
              />

              <PTextInput
                key={1}
                label="N2 Std"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.std2}
                onChangeText={x => {
                  this.setState({ std2: x });
                  this.disable();
                }}
                theme={{ roundness: 10, colors: { primary: "#ff0000" } }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //flexDirection:'row'
  },
  container2: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  kutu: {
    borderColor: "black",
    //borderWidth:1,
    height: 300,
    width: 150,
    margin: 10
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    width: 100,
    height: 40,
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  ptextInput: {
    width: 100
  },
  appbar: {
    backgroundColor: "#17c0eb",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "flex-end"
  }
});
