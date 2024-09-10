import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { NotificationCardtProps } from "@/types/type";

const NotificationCard = ({ desc, hour, onPress }: NotificationCardtProps) => {
  return (
    <View className="bg-neutral-100">
      <View className="px-10 py-5 flex flex-row justify-between items-center">
        <Image source={icons.bell2} className="w-8 h-8" />
        <View className="flex flex-col space-y-2">
          <Text className="text-xs w-[227px]">{desc}</Text>
          <Text className="text-xs text-neutral-700">{hour}</Text>
        </View>
        <TouchableOpacity onPress={onPress} className="flex justify-center">
          <Text>Read</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationCard;
