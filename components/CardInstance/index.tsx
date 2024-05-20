import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { CardInstanceProps } from "@/types/type";

const CardInstance = ({ icon, title }: CardInstanceProps) => {
  return (
    <TouchableOpacity
      style={{ elevation: 5 }}
      className="w-[9.5vh] h-[10vh] rounded-[10px] py-3 px-3 bg-white mt-3"
    >
      <View className="flex gap-2 items-center justify-center">
        <Image source={icon} className="w-[4vh] h-[4vh]" resizeMode="contain" />
        <Text className="text-[7px] text-center">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardInstance;
