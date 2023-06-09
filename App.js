import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import navigation screens
import Start from './components/Start';
import Chat from './components/Chat';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import offline functionality
import { useNetInfo } from "@react-native-community/netinfo";
import { LogBox, Alert } from 'react-native';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["Cannot connect to Metro"]);

// construct the app
const App = () => {
  // determine and direct connection status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost :(");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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

  // Initialize storage handler with Firestore
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat">
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;