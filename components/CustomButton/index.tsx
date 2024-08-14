import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import cn from "clsx"; // Impor clsx
import { Link } from "expo-router";
import { CustomButtonProps } from "@/types/type";

const CustomButton = ({
  type,
  title,
  clx,
  clx2,
  route,
  onPress,
  disabled,
  icon,
}: CustomButtonProps) => {
  if (type === "button")
    return (
      <TouchableOpacity
        className={cn(clx, "rounded-[20px] flex items-center justify-center")}
        onPress={onPress}
        disabled={disabled}
      >
        <Text className={cn(clx2)}>{title}</Text>
      </TouchableOpacity>
    );

  if (type === "google")
    return (
      <TouchableOpacity
        className={cn(
          clx,
          "rounded-full flex flex-row items-center px-4 space-x-5"
        )}
        onPress={onPress}
        disabled={disabled}
      >
        <Image source={icon} className="w-[5vh] h-[5vh]" />
        <Text className={cn(clx2)}>{title}</Text>
      </TouchableOpacity>
    );

  return (
    <>
      {route && (
        <Link href={route} asChild>
          <TouchableOpacity
            className={cn(
              clx,
              "rounded-[20px] flex items-center justify-center"
            )}
          >
            <Text className={cn(clx2)}>{title}</Text>
          </TouchableOpacity>
        </Link>
      )}
    </>
  );
};

export default CustomButton;
