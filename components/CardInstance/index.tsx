import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { CardInstanceProps } from "@/types/type";
import { Link } from "expo-router";
import { truncateString } from "@/utils";

const CardInstance = ({ icon, title, route }: CardInstanceProps) => {
  return (
    <Link
      href={{
        pathname: "/instance/[slug]",
        params: {
          slug: route,
        },
      }}
      asChild
    >
      <TouchableOpacity
        style={{ elevation: 5 }}
        className="w-[22%] h-[10vh] rounded-[10px] py-3 px-3 bg-white mt-3 mr-[6.5px]"
      >
        <View className="flex gap-2 items-center justify-center">
          <Image
            source={icon}
            className="w-[4vh] h-[4vh]"
            resizeMode="contain"
          />
          <Text className="text-[0.9vh] text-center">
            {truncateString(title, 22)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CardInstance;
