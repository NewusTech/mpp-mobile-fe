import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";

const DetailInstanceScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 py-[56px] px-1">
        <View className="flex flex-row space-x-2 items-start">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Image source={images.logoLamtim} className="w-10 h-14 mr-4" />
          <Text className="text-primary-900 text-[16px] font-pbold w-[230px]">
            Dinas Kependudukan dan Catatan Sipil
          </Text>
        </View>
        <View className="flex gap-y-3 px-10 py-8">
          <Text className="text-[16px] text-primary-800 font-psemibold">
            Booking Antrian
          </Text>
          <TextInput
            className="border-b border-neutral-800 py-2"
            placeholder="Pilih Jenis Layanan"
          />
          <TextInput
            className="border-b border-neutral-800 py-2"
            placeholder="Tanggal"
          />
          <TextInput
            className="border-b border-neutral-800 py-2"
            placeholder="Jam"
          />
          <View className="flex flex-row justify-end py-2">
            <CustomButton
              title="Pilih"
              route="/home"
              clx="bg-primary-700 w-[90px] h-[30px]"
              clx2="text-neutral-50"
            />
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default DetailInstanceScreen;
