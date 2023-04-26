#<h1>Mobile Chat App</h1>
<h2>React Native Mobile Chat App</h2>
<p>A native chat app built with React Native for both Android and iOS devices, providing its users with a chat interface along with the option to take and share images, and location data and to store chat data both on and offline.</p>

#<h2>Built using</h2>
<ul>
  <li>React Native</li>
  <li>Gifted Chat</li>
  <li>Expo</li>
  <li>Android Studio</li>
  <li>Google Firestore Database</li>
  <li>JavaScript Mobile Development</li>
</ul>

#<h2>My Role</h2>
Full-Stack Web Developer

#<h2>Objective</h2>
To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

#<h2>Dependencies</h2>
  <p>"@expo/react-native-action-sheet": "^4.0.1",<br>
    "@react-native-async-storage/async-storage": "1.17.11",<br>
    "@react-native-community/netinfo": "9.3.7",<br>
    "@react-navigation/native": "^6.1.6",<br>
    "@react-navigation/native-stack": "^6.9.12",<br>
    "expo": "^48.0.0",<br>
    "expo-image-picker": "~14.1.1",<br>
    "expo-location": "~15.1.1",<br>
    "expo-media-library": "~15.2.3",<br>
    "expo-status-bar": "~1.4.4",<br>
    "firebase": "^9.13.0",<br>
    "react": "18.2.0",<br>
    "react-native": "0.71.3",<br>
    "react-native-gifted-chat": "^2.0.1",<br>
    "react-native-maps": "1.3.2",<br>
    "react-native-safe-area-context": "4.5.0",<br>
    "react-native-screens": "~3.20.0"</p>

#<h2>Setting up the development environment:</h2>
<p>Clone the respoitory: git clone <a href="https://github.com/ajbbents/mobile-chat-app">https://github.com/ajbbents/mobile-chat-app</a><br>
Install Expo CLI as a global npm package: npm install -g expo-cli<br>
Create an Expo account at <a href="https://expo.dev/">https://expo.dev/</a><br>
Using the terminal, login to expo, then follow Expo's instructions based on your preferred emulator/device.</p>

#<h2>Database configuration:</h2>
<p>Sign in with Google Firebase<br>
Create a new project in test mode<br>
Create a Firestore Database within Firebase<br>
At 'Settings' -> 'General' -> 'Your Apps' -> 'Firestore for Web' generate your configuration object<br>
In your App.js, replace the firebaseConfig variable with the configuration from your own Firestore database:<br><br>
firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-authdomain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
});<br><br>
To start the Mobile Chat App: expo start<br>
Launch with your emulator or device either with the provided QR code or using a for Android or i for iOS.</p>
