import { Image, Text, View } from "react-native";
import React from "react";
import { TabRequestProps } from "@/types/type";
import { Link } from "expo-router";
import { formatDateA, formatTime, truncateString } from "@/utils";
import CustomButton from "../CustomButton";

const statusRequest = ({ status }: { status: number }) => {
  switch (status) {
    case 0:
      return "Belum Diproses";
    case 1:
      return "Sedang diproses";
    case 2:
      return "Sedang diproses";
    case 3:
      return "Selesai";
    case 4:
      return "Ditolak";
    case 5:
      return "Butuh Revisi";
    case 6:
      return "Menunggu Validasi";
    default:
      return "Belum Diproses";
  }
};

const TabRequest = ({
  images,
  id,
  title,
  status,
  time,
  date,
  service,
  no,
}: TabRequestProps) => {
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
          <Text className="text-primary-800 font-bold">Nomor Permohonan</Text>
          <Text className="text-primary-800 font-bold">Tanggal</Text>
          <Text className="text-primary-800 font-bold">Waktu</Text>
          <Text className="text-primary-800 font-bold">Status</Text>
        </View>
        <View className="space-y-2 ml-2">
          <Text className="text-primary-800">
            : {truncateString(service, 23)}
          </Text>
          <Text className="text-primary-800">: {no}</Text>
          <Text className="text-primary-800">: {formatDateA(date)}</Text>
          <Text className="text-primary-800">: {formatTime(time)} WIB</Text>
          <Text
            className={`${
              status === 3
                ? "text-success-700"
                : status === 4
                ? "text-error-700"
                : status === 5
                ? "text-warning-700"
                : "text-primary-700"
            }`}
          >
            : {statusRequest({ status })}
          </Text>
        </View>
      </View>
      <View className="flex items-end mt-6">
        {status === 0 || status === 1 || status === 2 ? (
          <CustomButton
            clx2="text-sm text-white font-white"
            clx="bg-primary-700 opacity-50 w-[35%] h-[40px]"
            title="Lihat"
            type="button"
          />
        ) : (
          <CustomButton
            clx2="text-sm text-white font-white"
            route={{ pathname: "/history-request/[id]", params: { id: id } }}
            clx="bg-primary-700 w-[35%] h-[40px]"
            title="Lihat"
          />
        )}
      </View>
    </View>
  );
};

export default TabRequest;
