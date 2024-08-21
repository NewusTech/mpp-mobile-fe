import { useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import WebView from "react-native-webview";

const DocumentWebView = () => {
  const params = useLocalSearchParams<{ link: string | any }>();
  const uri =
    Platform.OS === "android"
      ? `https://docs.google.com/gview?embedded=true&url=${params.link}`
      : params.link;
  return (
    <WebView
      source={{ uri }}
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      useWebKit={true}
    />
  );
};

export default DocumentWebView;
