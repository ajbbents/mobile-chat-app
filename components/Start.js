import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

const backgroundColors = {
  black: { backgroundColor: '#090c08' },
  purple: { backgroundColor: '#474056' },
  grey: { backgroundColor: '#8A95A5' },
  green: { backgroundColor: '#B9C6AE' }
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', color: '' }
  }
  render() {
    const { black, purple, grey, green } = backgroundColors
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background-image.png')} style={styles.image}>
          <Text style={styles.title}>Hello from start</Text>
          {/* user input portion of page */}
          <View style={styles.inputBox}>
            {/* user name box */}
            <TextInput
              style={styles.nameInput}
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
              placeholder='Your Name'
            />
            {/* background color chooser */}
            <View>
              <Text style={styles.colorText}>Choose your background:</Text>
              <View style={styles.colorWrapper}>
                <TouchableOpacity
                  style={[styles.color, black]}
                  onPress={() => this.setState({ color: black.backgroundColor })}
                />
                <TouchableOpacity
                  style={[styles.color, purple]}
                  onPress={() => this.setState({ color: purple.backgroundColor })}
                />
                <TouchableOpacity
                  style={[styles.color, grey]}
                  onPress={() => this.setState({ color: grey.backgroundColor })}
                />
                <TouchableOpacity
                  style={[styles.color, green]}
                  onPress={() => this.setState({ color: green.backgroundColor })}
                />
              </View>
            </View>
            {/* enter chat button */}
            <TouchableOpacity
              style={[styles.chatButton]}
              onPress={() => this.props.navigation.navigate('Chat',
                { name: this.state.name, color: this.state.color })}>
              <Text style={styles.chatButtonText}>Start Chatting</Text>
            </TouchableOpacity>
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginTop: 60,
    fontSize: 45,
    fontWeight: '600',
    color: "#FFFFFF",
  },
  inputBox: {
    backgroundColor: '#FFFFFF',
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 20,
  },
  nameInput: {
    height: 50,
    width: "88%",
    padding: 15,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 2,
    fontSize: 16,
    fontWeight: '300',
    marginTop: 15,
    marginBottom: 15,
    color: '#757083',
    opacity: 50,
  },
  colorText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 300,
    color: '#757083',
    opacity: 100,
  },
  colorWrapper: {
    flexDirection: 'row',
  },
  color: {
    width: 42,
    height: 42,
    borderRadius: 22,
    margin: 10,
  },
  chatButton: {
    height: 50,
    width: '88%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 2,
    backgroundColor: '#757083',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonText: {
    fontWeight: 600,
    color: '#ffffff',
    fontSize: 16,
  },
});
