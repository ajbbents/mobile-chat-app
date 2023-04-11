import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

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

export default function Chat({ route, navigation, db }) {
  //inherit props from start page
  const [messages, setMessages] = useState([]);
  const { name, userID } = route.params;

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

    //get messages from firebase
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    //unsubscribe
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);


  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  };

  //return chat screen with messaging and bubble
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
      />
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