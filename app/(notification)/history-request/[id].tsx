import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useHistoryRequestId } from "@/service/api";
import { formatDate } from "@/utils";
import Gap from "@/components/Gap";

const HistorRequest = () => {
  const moveAnim = useRef(new Animated.Value(1)).current;
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useHistoryRequestId(id);
  const result = data?.data;
  useEffect(() => {
    // Fungsi untuk menjalankan animasi bounce berulang
    const startMoving = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim, {
            toValue: 10, // Bergerak ke bawah sebesar 10 unit
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim, {
            toValue: 0, // Kembali ke posisi semula
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startMoving();
  }, [moveAnim]);
  console.log(result);

  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
      <View className="flex flex-row space-x-1">
        <Link href="/history" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">
          Detail Permohonan
        </Text>
      </View>
      <View className="px-9 mt-8 mb-4">
        <View className="w-full rounded-[20px] border border-primary-500 py-[18px]">
          <View className="flex flex-row justify-between items-center gap-20 px-[18px]">
            <View>
              <Text className="font-psemibold">Nomor Permohonan</Text>
              <Text>{result?.no_request}</Text>
            </View>
            <View
              className={`w-[60px] h-5 items-center ${
                result?.status === 3
                  ? "bg-success-200"
                  : result?.status === 4
                  ? "bg-error-200"
                  : "bg-secondary-200"
              } justify-center rounded`}
            >
              <Text
                className={`text-xs ${
                  result?.status === 3
                    ? "text-success-700"
                    : result?.status === 4
                    ? "text-error-700"
                    : "text-secondary-700"
                }`}
              >
                {result?.status === 3
                  ? "Selesai"
                  : result?.status === 4
                  ? "Ditolak"
                  : "Butuh Perbaikan"}
              </Text>
            </View>
          </View>
          <Gap height={10} />
          <Text className="px-4 text-sm text-secondary-700">
            Layanan : {result?.layanan_name}
          </Text>
          <View className="px-4">
            <View className="w-full h-[1px] border-[0.5px] border-dashed my-4"></View>
          </View>
          <View className="mb-2 px-[18px]">
            <Text className="text-primary-900 font-psemibold text-sm">
              Tgl dibuat permohonan
            </Text>
            <Text className="text-neutral-900 text-sm">
              {formatDate(result?.updatedAt)}
            </Text>
          </View>
          <View className="mb-2 px-[18px]">
            <Text className="text-primary-900 font-psemibold text-sm">
              Tgl permohonan selesai
            </Text>
            <Text className="text-neutral-900 text-sm">
              {formatDate(result?.createdAt)}
            </Text>
          </View>
          <View className="mb-2 px-[18px]">
            <Text className="text-primary-900 font-psemibold text-sm">
              Pesan
            </Text>
            <Text className="text-neutral-900 text-sm">
              {result?.pesan || "-"}
            </Text>
          </View>
          {result?.input_skm === true ? (
            <Text className=" text-xs underline text-justify px-[18px]">
              Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu
              agar dapat mengunduh hasil permohonan.
            </Text>
          ) : (
            <Animated.View style={{ transform: [{ translateY: moveAnim }] }}>
              <Link href="/skm" asChild>
                <TouchableOpacity>
                  <Text className="text-xs underline text-justify px-[18px]">
                    Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih
                    dahulu agar dapat mengunduh hasil permohonan.
                  </Text>
                </TouchableOpacity>
              </Link>
            </Animated.View>
          )}
          {(result?.status === 3 || result?.status === 5) && (
            <View className="flex flex-row items-center justify-center mt-8">
              {result?.status === 3 && result?.input_skm === true ? (
                <CustomButton
                  route="/home"
                  clx="bg-transparent border border-primary-700 w-[15vh] h-[4vh] mr-4"
                  clx2="text-xs text-primary-700 font-psemibold"
                  title="Lihat"
                />
              ) : (
                <CustomButton
                  type="button"
                  clx="bg-transparent border border-neutral-700 w-[15vh] h-[4vh] mr-4"
                  clx2="text-xs text-neutral-700 font-psemibold"
                  title="Lihat"
                />
              )}
              {result?.status === 3 && result?.input_skm === true ? (
                <CustomButton
                  route="/home"
                  clx="bg-primary-700 w-[15vh] h-[4vh]"
                  clx2="text-xs text-neutral-50 font-psemibold"
                  title="Unduh"
                />
              ) : result?.status === 5 ? (
                <CustomButton
                  route="/home"
                  clx="bg-primary-700 w-[15vh] h-[4vh]"
                  clx2="text-xs text-neutral-50 font-psemibold"
                  title="Perbaiki"
                />
              ) : (
                <CustomButton
                  type="button"
                  clx="bg-primary-700 opacity-50 w-[15vh] h-[4vh]"
                  clx2="text-xs text-neutral-50 font-psemibold"
                  title="Unduh"
                />
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistorRequest;
