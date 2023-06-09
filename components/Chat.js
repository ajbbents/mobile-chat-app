import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Platform, Text, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

//create chat component
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  //inherit props from start page
  const [messages, setMessages] = useState([]);
  const { name, userID, color } = route.params;
  let unsubMessages;

  // navigation inheritance of name and background color
  useEffect(() => {
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
            id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else { loadCachedMessages() };

    //unsubscribe
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  //async function sets messages as cached
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  };

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

  // render add photos.maps circle button
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  //return chat screen with messaging and bubble
  return (
    <View style={styles.container}>
      {
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar(isConnected)}
          onSend={messages => onSend(messages)}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{
            _id: userID,
            name,
          }}
        />
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

export default Chat;