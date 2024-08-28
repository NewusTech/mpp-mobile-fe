import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TabQueueProps } from "@/types/type";
import { formatDate, formatTime, truncateString } from "@/utils";
import CustomButton from "../CustomButton";

const TabQueue = ({
  images,
  time,
  title,
  date,
  no,
  service,
  id,
}: TabQueueProps) => {
  return (
    <View
      className="bg-neutral-50 rounded-[20px] px-5 py-4 mb-5"
      style={{ elevation: 4 }}
    >
      <View className="flex flex-row items-center space-x-2">
        <Image source={images} resizeMode="contain" />
        <Text className="text-primary-800 font-psemibold text-sm">{title}</Text>
      </View>
      <View className="flex flex-row mt-6 space-x-4">
        <View className="space-y-2">
          <Text className="text-primary-800 font-bold">Layanan</Text>
          <Text className="text-primary-800 font-bold">Nomor Antrian</Text>
          <Text className="text-primary-800 font-bold">Tanggal</Text>
          <Text className="text-primary-800 font-bold">Waktu</Text>
        </View>
        <View className="space-y-2 ml-2">
          <Text className="text-primary-800 ">
            : {truncateString(service, 26)}
          </Text>
          <Text className="text-primary-800">: {no}</Text>
          <Text className="text-primary-800">: {date}</Text>
          <Text className="text-primary-800">: {time} WIB</Text>
        </View>
      </View>
      <View className="flex items-end mt-6">
        <CustomButton
          clx2="text-sm text-white font-white"
          route={{ pathname: "/history-queue/[id]", params: { id: id } }}
          clx="bg-primary-700 w-[35%] h-[40px]"
          title="Lihat"
        />
      </View>
    </View>
  );
};

export default TabQueue;
