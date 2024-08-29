import { Image, Text, View } from "react-native";
import React from "react";
import { formatDateA, formatTime, truncateString } from "@/utils";
import CustomButton from "../CustomButton";

const TabSkm = ({
  images,
  id,
  title,
  time,
  date,
  service,
  no,
  kritik,
}: any) => {
  return (
    <View
      className="bg-neutral-50 rounded-[20px] px-5 py-4 mb-5"
      style={{ elevation: 2 }}
    >
      <View className="flex flex-row items-center space-x-2">
        <Image
          source={{ uri: images }}
          resizeMode="contain"
          className="w-14 h-14"
        />
        <Text className="text-primary-800 font-psemibold text-sm">{title}</Text>
      </View>
      <View className="flex flex-row mt-6 space-x-4">
        <View className="space-y-2">
          <Text className="text-primary-800 font-bold">Layanan</Text>
          <Text className="text-primary-800 font-bold">Nomor SKM</Text>
          <Text className="text-primary-800 font-bold">Tanggal</Text>
          <Text className="text-primary-800 font-bold">Waktu</Text>
          <Text className="text-primary-800 font-bold">Kritik dan Saran</Text>
        </View>
        <View className="space-y-2 ml-2">
          <Text className="text-primary-800">
            : {truncateString(service, 26)}
          </Text>
          <Text className="text-primary-800">: {no || "-"}</Text>
          <Text className="text-primary-800">: {formatDateA(date)}</Text>
          <Text className="text-primary-800">: {formatTime(time)} WIB</Text>
          <Text className="text-primary-800">
            : {truncateString(kritik, 26)}
          </Text>
        </View>
      </View>
      <View className="flex items-end mt-6">
        <CustomButton
          clx2="text-sm text-white font-white"
          route={{ pathname: "/history-skm/[id]", params: { id: id } }}
          clx="bg-primary-700 w-[35%] h-[40px]"
          title="Lihat"
        />
      </View>
    </View>
  );
};

export default TabSkm;
