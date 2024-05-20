import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { CustomButtonProps } from "@/types/type";

const CustomButton = ({ title, type }: CustomButtonProps) => {
  if (type === "link")
    return (
      <Link href="/home" asChild>
        <TouchableOpacity className="bg-neutral-50 w-[14.5vh] h-[4.8vh] rounded-[20px] flex items-center justify-center">
          <Text className="text-sm text-primary-800 font-psemibold">
            {title}
          </Text>
        </TouchableOpacity>
      </Link>
    );

  return (
    <View className="flex items-center justify-center mt-8">
      <TouchableOpacity className="bg-neutral-50 w-[14.5vh] h-[4.8vh] rounded-[20px] flex items-center justify-center">
        <Text className="text-sm text-primary-800 font-psemibold">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
