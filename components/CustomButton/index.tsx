import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
}

const CustomButton = ({ title }: CustomButtonProps) => {
  return (
    <View className="flex items-center justify-center mt-8">
      <TouchableOpacity className="bg-neutral-50 w-[14.5vh] h-[4.8vh] rounded-[20px] flex items-center justify-center">
        <Text className="text-sm text-primary-800 font-psemibold">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
