import { Image, Text, View } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { NotificationCardtProps } from "@/types/type";

const NotificationCard = ({ desc, hour }: NotificationCardtProps) => {
  return (
    <View className="bg-neutral-100">
      <View className="px-10 py-5 flex flex-row justify-between">
        <Image source={icons.bell2} className="w-8 h-8" />
        <Text className="text-xs w-[227px]">{desc}</Text>
        <View className="flex justify-end">
          <Text className="text-xs">{hour}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
