import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CardNewsProps } from "@/types/type";
import { Link } from "expo-router";
import { formatDate, truncateString } from "@/utils";
import { SvgUri } from "react-native-svg";

const CardNews = ({ icon, title, date, route }: CardNewsProps) => {
  const truncate = truncateString(title, 15);
  const dateFormat = formatDate(date);
  return (
    <Link
      href={{
        pathname: "/article/[slug]",
        params: {
          slug: route,
        },
      }}
      asChild
    >
      <TouchableOpacity
        style={{ elevation: 4 }}
        className="w-[19vh] h-[20vh] bg-white rounded-[10px] mt-3"
      >
        <View className="p-2 w-[19vh] h-[16vh]">
          <SvgUri
            width="100%"
            height="100%"
            uri={icon}
            style={{ borderRadius: 10 }}
          />
          <Text className="text-xs pt-1 truncate font-pmedium">{truncate}</Text>
          <Text className="text-[10px]">{dateFormat}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CardNews;
