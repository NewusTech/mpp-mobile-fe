import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const SplashScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Link href="/login">
        <Text>Login</Text>
      </Link>
    </View>
  );
};

export default SplashScreen;
