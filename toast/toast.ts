import { ToastAndroid } from "react-native";

export const showToastWithGravity = (pesan: string) => {
  ToastAndroid.showWithGravity(pesan, ToastAndroid.SHORT, ToastAndroid.CENTER);
};
