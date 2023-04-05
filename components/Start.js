import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, Button, TextInput } from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background-image.png')} style={styles.image}>
        <Text>Hello from start</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Username'
        />
        <Button
          title="start chatting"
          onPress={() => navigation.navigate('Chat', { name: name })}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdacd1'
  },
  textInput: {
    width: "85%",
    padding: 15,
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 15
  },
  image: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default Start;