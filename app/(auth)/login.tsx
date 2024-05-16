import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-700 justify-center px-10">
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
              className="w-[2.5vh] h-[2.5vh] mr-[10px]"
            />
            <TextInput
              placeholder="NIK"
              className="bg-white w-[34vh] h-[5vh] py-[10px] rounded-[20px] pr-4"
            />
          </View>
          <View className="flex flex-row items-center bg-white rounded-[20px]">
            <TextInput
              placeholder="Kata Sandi"
              className="bg-white w-[34vh] h-[5vh] py-[10px] rounded-[20px] pl-4"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={isPasswordVisible ? icons.eyeOff : icons.eye}
                className="w-[2.5vh] h-[2.5vh] ml-[10px] pr-4"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex flex-row gap-1 my-2 justify-end">
        <Text className="text-neutral-50 text-[10px]">
          Belum Punya akun? silakan
        </Text>
        <Link href="/register" className="text-primary-800 text-[10px]">
          Daftar
        </Link>
      </View>
      <View className="flex items-center justify-center mt-8">
        <TouchableOpacity className="bg-neutral-50 w-[14.5vh] h-[4.8vh] rounded-[20px] flex items-center justify-center">
          <Text className="text-sm text-primary-700 font-psemibold">Masuk</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
