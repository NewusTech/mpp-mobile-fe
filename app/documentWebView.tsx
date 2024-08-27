import { useLocalSearchParams } from "expo-router";
import WebView from "react-native-webview";

const DocumentWebView = () => {
  const params = useLocalSearchParams<{ link: string | any }>();
  const uri = `https://drive.google.com/viewer?url=${params.link}`;
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
