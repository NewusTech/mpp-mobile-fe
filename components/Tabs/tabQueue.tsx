import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TabQueueProps } from "@/types/type";
import { Link } from "expo-router";

const TabQueue = ({ images, time, title, date }: TabQueueProps) => {
  return (
    <Link href="/history-queue" asChild>
      <TouchableOpacity
        className="bg-neutral-50 rounded-[20px] px-5 py-4 flex flex-row items-center space-x-3"
        style={{ elevation: 4 }}
      >
        <Image source={images} resizeMode="contain" />
        <View>
          <Text className="text-primary-800 font-psemibold text-[10px]">
            {title}
          </Text>
          <View className="flex flex-row justify-between pt-1 items-center">
            <Text className="text-[10px] text-secondary-700">{time}</Text>
            <Text className="text-[10px] text-secondary-700">{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TabQueue;
