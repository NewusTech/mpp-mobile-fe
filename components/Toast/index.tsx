import { Alert, Platform, ToastAndroid } from "react-native";

const ShowToast = (message: any) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
};

export default ShowToast;
