import { Text, TouchableOpacity } from "react-native";
import React from "react";
import cn from "clsx"; // Impor clsx
import { Link } from "expo-router";
import { CustomButtonProps } from "@/types/type";

const CustomButton = ({ title, clx, clx2, route }: CustomButtonProps) => {
  return (
    <Link href={route} asChild>
      <TouchableOpacity
        className={cn(clx, "rounded-[20px] flex items-center justify-center")}
      >
        <Text className={cn(clx2)}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CustomButton;
