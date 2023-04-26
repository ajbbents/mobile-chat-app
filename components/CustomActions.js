import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = ['Choose from library', 'Take a photo', 'Send location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      },
    );

    const generateReference = (uri) => {
      const timeStamp = (new Date()).getTime();
      const imageName = uri.split("/")[uri.split("/").length - 1];
      return `${userID}-${timeStamp}-${imageName}`;
    }

    const uploadAndSendImage = async (imageURI) => {
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
      const response = await fetch(imageURI);
      const blob = await response.blob();
      uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        const imageURL = await getDownloadURL(snapshot.ref)
        onSend({ image: imageURL })
      });
    }

    const pickImage = async () => {
      let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissions?.granted) {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
        else Alert.alert("sorry, cannot do that");
      }
    }

    const takePhoto = async () => {
      console.log('takephoto');
      try {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
          let result = await ImagePicker.launchCameraAsync();

          if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
          else Alert.alert("no permisson, sorry");
        }
      } catch (e) { Alert.alert('sorry, camera not available'); }
    };

    const getLocation = async () => {
      let permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions?.granted) {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          onSend({
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            },
          });
        } else Alert.alert("error occurred while fetching location");
      } else Alert.alert("permission hasn't been given");
    };
  };

  return (
    <Pressable
      style={styles.container}
      accessible={true}
      accessibilityLabel="more options"
      accessibilityHint="lets you choose to send an image, take a photo with your camera or get your location"
      accessibilityRole="button"
      onPress={onActionPress}
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    marginLeft: 12,
    marginBottom: 12,
  },
  wrapper: {
    borderRadius: 15,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'transparent',
    textAlign: 'center',
    // marginTop: 2,
    // marginBottom: 2,
  },
});
export default CustomActions;