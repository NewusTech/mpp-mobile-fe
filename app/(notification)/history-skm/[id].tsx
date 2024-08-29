import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { icons, images } from "@/constants";
import { useHistorySkmDetail } from "@/service/api";
import RenderHTML from "react-native-render-html";

const answer = (jawaban: any) => {
  switch (jawaban) {
    case 1:
      return "Tidak Sesuai";
    case 2:
      return "Kurang Sesuai";
    case 3:
      return "Sesuai";
    case 4:
      return "Sangat Sesuai";
    default:
      return jawaban;
  }
};

const HistorSkm = () => {
  const { id } = useLocalSearchParams();
  const { data } = useHistorySkmDetail(Number(id));
  const { width } = useWindowDimensions();

  const result = data?.data;
  const resultSkm = result?.formatteddata;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
        <View className="flex flex-row space-x-1">
          <Link href="/history" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 w-[95%] text-xl font-pbold">
            Detail Survei Kepuasan Masyarakat
          </Text>
        </View>
        <View className="flex flex-row mt-6 space-x-10 px-9">
          <View className="space-y-2">
            <Text className="font-bold">Nama Instansi</Text>
            <Text className="font-bold">Nomor SKM</Text>
            <Text className="font-bold">Nama Layanan</Text>
            <Text className="font-bold">Tanggal</Text>
          </View>
          <View className="space-y-2 ml-2">
            <Text className="text-primary-800">: {result?.instansi_name}</Text>
            <Text className="text-primary-800">: {result?.no_skm}</Text>
            <Text className="text-primary-800">: {result?.layanan_name}</Text>
            <Text className="text-primary-800">: {result?.date}</Text>
          </View>
        </View>
        <View className="px-9">
          <View
            className="mt-7 p-4 bg-neutral-50 rounded-lg w-full space-y-3"
            style={{ elevation: 2 }}
          >
            {resultSkm?.map((v: any, index: number) => (
              <View key={v.id} className="space-y-1">
                <Text className="text-primary-700 font-psemibold">
                  Pertanyaan {index + 1}
                </Text>
                <Text>{v.surveyform_name}</Text>
                <Text>
                  <Text className="font-psemibold">Jawaban:</Text>{" "}
                  {answer(v.nilai)}
                </Text>
              </View>
            ))}
            <View>
              <Text className="text-primary-700 font-psemibold">
                Kritik dan Saran
              </Text>
              <Text>{result?.kritiksaran}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HistorSkm;
