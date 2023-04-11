import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const backgroundColors = {
  black: { backgroundColor: '#090c08' },
  purple: { backgroundColor: '#474056' },
  grey: { backgroundColor: '#8A95A5' },
  green: { backgroundColor: '#B9C6AE' }
};

const SelectedColorOverlay = () => <View style={styles.selectedColorOverlay} />;

const Start = ({ navigation }) => {
  //declare state variables
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  //firebase auth anonymous signin
  const handleSignIn = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Chat", {
          name,
          color,
          userID: user.uid,
        });
        Alert.alert("you are now signed in");
      })
      .catch((error) => {
        Alert.alert("not able to sign in, try back later");
      });
  };

  // background color option mapping
  const { black, purple, grey, green } = backgroundColors;
  const colorOptions = Object.entries(backgroundColors).map(([key, value]) => (
    <TouchableOpacity
      key={key}
      style={[
        styles.color,
        value,
        color === value.backgroundColor && styles.colorSelected,
      ]}
      onPress={() => setColor(value.backgroundColor)}
    >
      {color === value.backgroundColor && <SelectedColorOverlay />}
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background-image.png')} style={styles.image}>
        <Text style={styles.title}>let's chat</Text>
        {/* user input portion of page */}
        <View style={styles.inputBox}>
          {/* user name box */}
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          {/* background color chooser */}
          <View>
            <Text style={styles.colorText}>Choose your background:</Text>
            <View style={styles.colorWrapper}>
              <View style={styles.colorOptions}>{colorOptions}</View>
            </View>
          </View>
          {/* enter chat button */}
          <TouchableOpacity
            style={[styles.chatButton]}
            onPress={handleSignIn}>
            <Text style={styles.chatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
          {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>
      </ImageBackground>
    </View>
  );
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
  inputImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 10,
    opacity: 0.6,
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
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  selectedColorOverlay: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    top: -4,
    bottom: -4,
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
export default Start;

//() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })