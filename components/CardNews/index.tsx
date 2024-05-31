import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CardNewsProps } from "@/types/type";
import { Link } from "expo-router";

const CardNews = ({ icon, title, date }: CardNewsProps) => {
  return (
    <Link href="/detail" asChild>
      <TouchableOpacity
        style={{ elevation: 4 }}
        className="w-[20vh] h-[20vh] bg-white rounded-[10px] mt-2"
      >
        <View className="p-2 w-[20vh] h-[16vh]">
          <Image
            source={icon}
            className="w-full h-full rounded-[10px]"
            resizeMode="cover"
          />
          <Text className="text-xs pt-1">{title}</Text>
          <Text className="text-[10px]">{date}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CardNews;
