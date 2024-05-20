import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Gap from "../Gap";
import { BottombarProps } from "@/types/type";

const MenuBottomBar = ({ icon, title }: BottombarProps) => {
  return (
    <TouchableOpacity className="flex items-center justify-center">
      <Image source={icon} className="w-[25px] h-[25px]" />
      <Gap height={8} />
      <Text className="text-[8px] text-neutral-50 w-[48px] text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuBottomBar;
