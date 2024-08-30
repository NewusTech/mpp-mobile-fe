import { View, Image } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/home");
    }, 3000);
  }, [router]);
  return (
    <View className="flex-1 justify-center bg-primary-100 items-center">
      <Image source={images.maps} />
    </View>
  );
};

export default SplashScreen;
