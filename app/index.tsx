import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/login">Login</Link>
    </View>
  );
}
