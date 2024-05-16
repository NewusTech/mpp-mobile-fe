import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons, images } from "@/constants";

const LoginScreen = () => {
  return (
    <View className="flex-1 bg-primary-700 justify-center px-10">
      <View className="flex items-center mb-10">
        <View className="flex flex-row">
          <View className="w-[100px] h-[90px] mt-1">
            <Image
              source={images.maps}
              className="w-full h-full object-cover"
            />
          </View>
          <View className="-mt-1">
            <Text className="text-[20px] font-pbold text-primary-800 uppercase">
              mpp
            </Text>
            <Text className="text-[12px] font-psemibold text-neutral-50">
              Mal Pelayana Publik
            </Text>
            <Text className="text-[10px] font-pmedium text-secondary-700">
              Lampung Timur
            </Text>
          </View>
        </View>
      </View>
      <View className="flex">
        <Text className="text-primary-800 text-xs font-psemibold mb-4">
          Silakan Masuk
        </Text>
        <View className="gap-2 flex">
          <View className="flex flex-row items-center bg-white rounded-[20px] px-4">
            <Image
              source={icons.user}
              className="w-[20px] h-[20px] mr-[10px]"
            />
            <TextInput
              placeholder="NIK"
              className="bg-white w-[280px] h-[40px] py-[10px] rounded-[20px] pr-4"
            />
          </View>
          <View className="flex flex-row items-center bg-white rounded-[20px] px-4">
            <TextInput
              placeholder="Kata Sandi"
              className="bg-white w-[280px] h-[40px] py-[10px] rounded-[20px] pr-4"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
