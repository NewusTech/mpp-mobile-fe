import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

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
          <InputForm icon={icons.user} type="nik" placeholder="NIK" />
          <View className="mt-12"></View>
          <InputForm
            icon={isPasswordVisible ? icons.eyeOff : icons.eye}
            type="password"
            placeholder="Kata Sandi"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            onPress={togglePasswordVisibility}
          />
        </View>
      </View>
      <View className="flex flex-row gap-1 my-2 justify-end">
        <Text className="text-neutral-50 text-[10px]">
          Belum Punya akun? silakan
        </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text className="underline text-primary-800 text-[10px]">
              Daftar
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="flex items-center justify-center mt-8">
        <CustomButton title="Masuk" type="link" />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
