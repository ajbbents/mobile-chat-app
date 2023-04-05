import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import navigation screens
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

// construct the app
const App = () => {
  const [text, setText] = useState('');
  // const onPress = () => setCount(prevCount => prevCount + 1);
  const alertMyText = () => {
    Alert.alert(text);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  textInput: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10,
    backgroundColor: 'white'
  },
  textDisplay: {
    height: 50,
    lineHeight: 50
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15
  },
});

export default App;