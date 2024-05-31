import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TabRequestProps } from "@/types/type";
import { Link } from "expo-router";

const TabRequest = ({ images, id, title, status }: TabRequestProps) => {
  return (
    <Link href="/history-request" asChild>
      <TouchableOpacity
        className="bg-neutral-50 rounded-[20px] px-5 py-4 flex flex-row items-center space-x-3"
        style={{ elevation: 4 }}
      >
        <Image source={images} />
        <View>
          <Text className="text-primary-800 font-psemibold text-[10px]">
            {title}
          </Text>
          <View className="flex flex-row justify-between pt-1 items-center">
            <Text className="text-[10px] text-secondary-700">{id}</Text>
            <View
              className={`w-[60px] h-5 items-center ${
                status === "Selesai"
                  ? "bg-success-700"
                  : status === "Menunggu"
                  ? "bg-neutral-700"
                  : "bg-error-700"
              } justify-center rounded-full`}
            >
              <Text className="text-[10px] text-neutral-50">{status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TabRequest;
