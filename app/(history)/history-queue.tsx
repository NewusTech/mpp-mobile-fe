import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";

const HistorQueue = () => {
  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
      <View className="flex flex-row space-x-1">
        <Link href="/history" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">
          Nama Instansi
        </Text>
      </View>
      <Text className="px-9">Jenis Layanan Permohonan</Text>
      <View className="px-9 mt-8 mb-4">
        <View className="w-full h-[300px] rounded-[20px] border border-primary-500 items-center justify-center">
          <View className="flex flex-row justify-between space-x-10">
            <Text className="text-primary-800">HH/BB/TTTT</Text>
            <Text className="text-primary-800">00:00</Text>
          </View>
          <View className="p-3 my-2 items-center" style={{ elevation: 1 }}>
            <Image source={images.QRCode} className="w-[135px] h-[128px]" />
            <Text className="text-sm font-semibold text-neutral-900 mt-2">
              Nomor Antrian
            </Text>
            <Text className="text-sm text-neutral-900">Loket</Text>
          </View>
          <CustomButton
            route="/home"
            clx="bg-primary-700 w-[20.5vh] h-[5vh]"
            clx2="text-sm text-neutral-50 font-psemibold"
            title="Print"
          />
        </View>
        <View className="mt-3 space-y-2">
          <Text className="text-sm text-neutral-900 font-pbold">
            Persyaratan yang harus dibawah
          </Text>
          <Text className="text-xs text-neutral-900 text-justify">
            Lorem ipsum dolor sit amet consectetur. Aliquet sed morbi sem
            aliquam nisl mattis at. Duis enim at aliquam molestie at vulputate
            rhoncus sed. Gravida adipiscing consectetur enim ac. Pellentesque
            malesuada sem pharetra dapibus ultricies ut.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistorQueue;
