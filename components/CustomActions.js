import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
// import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
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
            console.log('wants to pick an image');
            return;
          case 1:
            takePhoto();
            console.log('wants to take a photo');
            return;
          case 2:
            getLocation();
            console.log('wants to get location');
          default:
        }
      },
    );

    const pickImage = async () => {
      let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissions?.granted) {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
          console.log('uploading image here');
        } else Alert.alert("sorry, cannot do that");
      }
    };

    const takePhoto = async () => {
      let permissions = await ImagePicker.requestCameraPermissionsAsync();
      if (permissions?.granted) {
        let result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
          console.log('image taken loads here');
        } else Alert.alert("no permisson, sorry");
      }
    };

    const getLocation = async () => {
      let permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions?.granted) {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          console.log('sending location here');
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
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
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
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
export default CustomActions;