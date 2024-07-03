import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Gap from "../Gap";
import { BottombarProps } from "@/types/type";
import { Link } from "expo-router";

const MenuBottomBar = ({ icon, title, route }: BottombarProps) => {
  return (
    <Link href={route} asChild>
      <TouchableOpacity className="flex items-center justify-center">
        <Image source={icon} className="w-[25px] h-[25px]" />
        <Gap height={8} />
        <Text className="text-[10px] text-neutral-50 w-[56px] text-center">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MenuBottomBar;
