import {
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { apiUrl, useHistoryQueueDetail } from "@/service/api";
import RenderHTML from "react-native-render-html";
import * as FileSystem from "expo-file-system";
import ShowToast from "@/components/Toast";
import downloadFile from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistorQueue = () => {
  const { id } = useLocalSearchParams();
  const { data } = useHistoryQueueDetail(id);
  const { width } = useWindowDimensions();

  const result = data?.data;

  const handleDownload = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await downloadFile(
        `${apiUrl}/bookingantrian/pdf/${id}`,
        `Booking Antrian`,
        token
      );
      ShowToast("Berhasil Mendownload File");
    } catch (error) {
      console.error(error);
      ShowToast("Gagal Mendownload File");
    }
  };

  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
      <View className="flex flex-row space-x-1">
        <Link href="/history" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">
          {result?.Instansi?.name}
        </Text>
      </View>
      <Text className="px-9">{result?.Layanan?.name}</Text>
      <View className="px-9 mt-8 mb-4">
        <View className="w-full h-[400px] rounded-[20px] border border-primary-500 items-center justify-center">
          <View className="flex flex-row justify-between space-x-10">
            <Text className="text-primary-800">{result?.tanggal}</Text>
            <Text className="text-primary-800">{result?.waktu}</Text>
          </View>
          <View className="p-3 my-2 items-center" style={{ elevation: 1 }}>
            <Image
              source={{ uri: result?.qrcode }}
              className="w-[155px] h-[178px]"
            />
            <Text className="text-sm font-semibold text-neutral-900 mt-2">
              Nomor Antrian
            </Text>
            <Text className="text-sm text-neutral-900">
              {result?.Layanan?.code}
            </Text>
          </View>
          <CustomButton
            onPress={handleDownload}
            clx="bg-primary-700 w-[20.5vh] h-[5vh]"
            clx2="text-sm text-neutral-50 font-psemibold"
            title="Print"
            type="button"
          />
        </View>
        <View className="mt-3 space-y-2">
          <Text className="text-sm text-neutral-900 font-pbold mb-1">
            Persyaratan yang harus dibawa
          </Text>
          <RenderHTML
            source={{ html: result?.Layanan?.syarat }}
            contentWidth={width}
            baseStyle={{ color: "black", marginTop: -15 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistorQueue;
