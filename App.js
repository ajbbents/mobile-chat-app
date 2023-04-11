import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import navigation screens
import Start from './components/Start';
import Chat from './components/Chat';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// construct the app
const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDee2HVReF4Btlz-4VzWW7EOKTffEj2JwU",
    authDomain: "mobilechatapp-5cc6d.firebaseapp.com",
    projectId: "mobilechatapp-5cc6d",
    storageBucket: "mobilechatapp-5cc6d.appspot.com",
    messagingSenderId: "681227909795",
    appId: "1:681227909795:web:3a81a356242e0c511a1d16"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to service
  const db = getFirestore(app);

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
};

export default App;