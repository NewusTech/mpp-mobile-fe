import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TabRequestProps } from "@/types/type";
import { Link } from "expo-router";

const TabRequest = ({ images, id, title, status, route }: TabRequestProps) => {
  if (status === 3)
    return (
      <Link
        href={{
          pathname: "/history-request/[id]",
          params: {
            id: route,
          },
        }}
        asChild
      >
        <TouchableOpacity
          className="bg-neutral-50 rounded-[20px] px-5 py-4 flex flex-row items-center space-x-3"
          style={{ elevation: 4 }}
        >
          <View className="w-10 h-10">
            <Image
              source={{ uri: images }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="text-primary-800 font-psemibold text-xs">
              {title}
            </Text>
            <View className="flex flex-row justify-between pt-1 items-center w-[94%]">
              <Text className="text-xs text-secondary-700">{id}</Text>
              <View
                className={`w-[85px] h-7 items-center ${
                  status === 3
                    ? "bg-success-700"
                    : status === 0
                    ? "bg-neutral-700"
                    : status === 4
                    ? "bg-error-700"
                    : "bg-primary-700"
                } justify-center rounded-full`}
              >
                <Text className="text-xs text-neutral-50">
                  {status === 3
                    ? "Selesai"
                    : status === 0
                    ? "Menunggu"
                    : status === 4
                    ? "Ditolak"
                    : "Sedang diproses"}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );

  return (
    <View
      className="bg-neutral-50 rounded-[20px] px-5 py-4 flex flex-row items-center space-x-3"
      style={{ elevation: 4 }}
    >
      <View className="w-10 h-10">
        <Image
          source={{ uri: images }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View>
        <Text className="text-primary-800 font-psemibold text-xs">{title}</Text>
        <View className="flex flex-row justify-between pt-1 items-center w-[94%]">
          <Text className="text-xs text-secondary-700">{id}</Text>
          <View
            className={`w-[85px] h-7 items-center ${
              status === 3
                ? "bg-success-700"
                : status === 0
                ? "bg-neutral-700"
                : status === 4
                ? "bg-error-700"
                : "bg-primary-700"
            } justify-center rounded-full`}
          >
            <Text className="text-xs text-neutral-50">
              {status === 0
                ? "Menunggu"
                : status === 3
                ? "Selesai"
                : status === 2
                ? "Sedang diproses"
                : "Ditolak"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TabRequest;
