import { View, Image } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync } from "@/utils";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    async function initPushNotification() {
      try {
        await registerForPushNotificationsAsync();
        setTimeout(() => {
          router.replace("/home");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }

    initPushNotification();
  }, [router]);

  return (
    <View className="flex-1 justify-center bg-primary-100 items-center">
      <Image
        source={images.maps}
        className="w-[300px] h-[300px]"
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
