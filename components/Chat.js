import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Platform, KeyboardAvoidingView, DatePickerIOSComponent } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

//adjusts color and details of text bubbles
const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#535353"
      },
      left: {
        backgroundColor: "#D2D2D2"
      }
    }}
  />
};

//render input bar if connected, not if not
const renderInputToolbar = (isConnected) => (props) => {
  if (isConnected) return <InputToolbar {...props} />;
  else return null;
};

//create chat component
export default function Chat({ route, navigation, db, isConnected }) {
  //inherit props from start page
  const [messages, setMessages] = useState([]);
  const { name, userID } = route.params;
  let unsubMessages;

  // navigation inheritance of name and background color
  useEffect(() => {
    let name = route.params.name;
    let color = route.params.color;
    navigation.setOptions({ title: name });
    navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
    });

    //determine connectivity, get messages from firebase
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          });
        });
        cacheMessages(newMessages)
        setMessages(newMessages);
      });
    } else { loadCachedMessages() };

    //unsubscribe
    return () => {
      if (unsubMessages) unsubMessages();
    };

  }, [isConnected]);

  //async function sets messages as cached

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages_stored') || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages_stored', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  };

  //return chat screen with messaging and bubble
  return (
    <View style={styles.container}>
      {(isConnected === true) ?
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar(isConnected)}
          onSend={messages => onSend(messages)}
          user={{
            _id: userID,
            name,
          }}
        /> : null
      }
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
      <Button title="Leave chat" onPress={() => navigation.navigate("Start")} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});