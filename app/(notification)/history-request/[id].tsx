import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useHistoryRequestId } from "@/service/api";
import { formatDate } from "@/utils";

const HistorRequest = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useHistoryRequestId(id);
  const result = data?.data;

  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
      <View className="flex flex-row space-x-1">
        <Link href="/history" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">
          {result?.instansi_name}
        </Text>
      </View>
      <Text className="px-9">{result?.layanan_name}</Text>
      <View className="px-9 mt-8 mb-4">
        <View className="w-full h-[330px] rounded-[20px] border border-primary-500 py-[18px]">
          <View className="flex flex-row justify-between items-center gap-20 px-[18px]">
            <Text>Nomor Permohonan</Text>
            <View
              className={`w-[60px] h-5 items-center bg-success-700 justify-center rounded-full`}
            >
              <Text className="text-[10px] text-neutral-50">
                {result?.status === 3 ? "Selesai" : ""}
              </Text>
            </View>
          </View>
          <View className="w-full h-[1px] bg-primary-500 mt-4 mb-1"></View>
          <Text className="text-secondary-700 font-psemibold text-sm mb-4 px-[18px]">
            Detail :
          </Text>
          <View className="mb-2 px-[18px]">
            <Text className="text-primary-900 font-psemibold text-[10px]">
              Tgl dibuat permohonan
            </Text>
            <Text className="text-neutral-900 text-[10px]">
              {formatDate(result?.createdAt)}
            </Text>
          </View>
          <View className="mb-2 px-[18px]">
            <Text className="text-primary-900 font-psemibold text-[10px]">
              Tgl permohonan selesai
            </Text>
            <Text className="text-neutral-900 text-[10px]">HH/BB/TTTT</Text>
          </View>
          <View className="mb-2 px-[18px]">
            <Text className="text-primary-900 font-psemibold text-[10px]">
              Pesan
            </Text>
            <Text className="text-neutral-900 text-[10px]">
              Lorem impsum dolor sit amet
            </Text>
          </View>
          <Text className="text-warning-700 text-[10px] underline px-[18px]">
            Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu
            agar dapat mengunduh hasil permohonan.
          </Text>
          <View className="flex items-center mt-8">
            <CustomButton
              route="/home"
              clx="bg-primary-700 w-[20.5vh] h-[5vh]"
              clx2="text-sm text-neutral-50 font-psemibold"
              title="Download"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistorRequest;
