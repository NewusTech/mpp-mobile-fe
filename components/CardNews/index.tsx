import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CardNewsProps } from "@/types/type";

const CardNews = ({ icon, title, date }: CardNewsProps) => {
  return (
    <TouchableOpacity
      style={{ elevation: 4 }}
      className="w-[165px] h-[160px] bg-white rounded-[10px] mt-2"
    >
      <View className="p-2">
        <Image
          source={icon}
          className="w-[148px] h-[112px] rounded-[10px]"
          resizeMode="cover"
        />
        <Text className="text-xs pt-1">{title}</Text>
        <Text className="text-[10px]">{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardNews;
