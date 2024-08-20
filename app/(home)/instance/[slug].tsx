import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, router, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import Accordion from "@/components/Accordion";
import TabService from "@/components/TabService";
import { useReqeustStore } from "@/store/useRequestStore";
import { useDetailInstance } from "@/service/api";
import { useBookingStore } from "@/store/useBookingStore";

const CardSop = ({ icon, name, desc }: any) => {
  return (
    <View
      className="bg-primary-100 p-2 rounded w-[47%] ml-2 mb-2"
      style={{ elevation: 1 }}
    >
      <View className="flex flex-row items-center space-x-2">
        <Image source={icon} className="w-10 h-10 mt-2" resizeMode="contain" />
        <View>
          <Text className="text-sm text-primary-700 font-psemibold">
            {name}
          </Text>
          <Text className="text-xs text-primary-700">{desc}</Text>
        </View>
      </View>
    </View>
  );
};

const DetailInstanceScreen = () => {
  const { setInstanceId, setSlug } = useReqeustStore((state) => ({
    setInstanceId: state.setInstanceId,
    setSlug: state.setSlug,
  }));
  const { setInstansiId, setImage, setName } = useBookingStore((state) => ({
    setInstansiId: state.setInstansiId,
    setImage: state.setImage,
    setName: state.setName,
  }));
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { slug } = useLocalSearchParams();
  const { data, isLoading } = useDetailInstance(slug);

  const handlePress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const result = data?.data;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color="#3568C0" />
      </View>
    );
  }

  const handlePassInstanceId = () => {
    setInstanceId(result?.id);
    setSlug(result?.slug);
    router.push("/service-req-1");
  };

  const handlePassInstanceIdToBooking = () => {
    setInstansiId(result?.id);
    setImage(result?.image);
    setName(result?.name);
    router.push("/booking");
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-primary-50 pb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="py-[56px]">
            <View className="flex flex-row space-x-2 items-start">
              <Link href="/home" asChild>
                <TouchableOpacity>
                  <Image source={icons.chevronLeft2} className="w-8 h-8 " />
                </TouchableOpacity>
              </Link>
              <View className="items-center flex flex-row space-x-4">
                <View className="w-16 h-16">
                  <Image
                    source={{ uri: result?.image }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-primary-900 text-[16px] font-pbold w-[230px]">
                  {result?.name}
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-between px-10 pt-8">
              <CustomButton
                clx2="text-xs w-[69px] text-center text-white font-white"
                // route="/booking"
                clx="bg-secondary-700 min-w-[18vh] h-[5.5vh]"
                title="Booking Antrian"
                type="button"
                onPress={handlePassInstanceIdToBooking}
              />
              <CustomButton
                clx2="text-xs w-[69px] text-center text-white font-white"
                // route="/service-req-1"
                clx="bg-primary-700 min-w-[18vh] h-[5.5vh]"
                title="Permohonan Layanan"
                type="button"
                onPress={handlePassInstanceId}
              />
            </View>
            <View className="px-9">
              <View className="my-[26px] w-full justify-between p-4 bg-primary-100 h-[248px] rounded-[20px]">
                <View className="flex flex-row">
                  <Text className="w-1/2 font-pmedium text-primary-700 text-xs">
                    Alamat
                  </Text>
                  <Text className="w-1/2 text-xs">{result?.alamat}</Text>
                </View>
                <View className="flex flex-row">
                  <Text className="w-1/2 font-pmedium text-primary-700 text-xs">
                    Kontak
                  </Text>
                  <Text className="w-1/2 text-xs">{result?.telp || "-"}</Text>
                </View>
                <View className="flex flex-row">
                  <Text className="w-1/2 font-pmedium text-primary-700 text-xs">
                    Email
                  </Text>
                  <Text className="text-xs w-1/2">{result?.email || "-"}</Text>
                </View>
                <View className="flex flex-row">
                  <Text className="w-1/2 font-pmedium text-primary-700 text-xs">
                    Website
                  </Text>
                  <Text className="text-xs w-1/2">
                    {result?.website || "-"}
                  </Text>
                </View>
                <View className="flex flex-row">
                  <Text className="w-1/2 font-pmedium text-primary-700 text-xs">
                    Maps
                  </Text>
                  <View className="flex flex-row items-center space-x-2">
                    <Image source={icons.maps} className="w-5 h-5" />
                    <Text className="text-xs w-1/2 underline text-primary-600">
                      {result?.linkmaps || "-"}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row">
                  <Text className="w-1/2 font-pmedium text-primary-700 text-xs">
                    Jam Operasional
                  </Text>
                  <Text className="w-1/2 text-xs">{`${result?.jam_buka} - ${result?.jam_tutup}`}</Text>
                </View>
                <View className="flex flex-row">
                  <Text className="w-1/2 font-pmedium text-primary-700 text-xs">
                    Jumlah Layanan
                  </Text>
                  <Text className="w-1/2 text-xs">
                    {result?.Layanans?.length}
                  </Text>
                </View>
              </View>
            </View>
            <View className="px-10 pb-2">
              <View className="flex items-center justify-center rounded-full py-2 px-16 bg-primary-700">
                <Text className="text-sm font-psemibold text-neutral-50">
                  Standar Layanan (SOP)
                </Text>
              </View>
              <View className="flex flex-row flex-wrap my-5">
                <CardSop name="Nama Doc" icon={icons.word} desc="Deskripsi" />
                <CardSop name="Nama Doc" icon={icons.pdf} desc="Deskripsi" />
                <CardSop name="Nama Doc" icon={icons.excel} desc="Deskripsi" />
                <CardSop name="Nama Doc" icon={icons.excel} desc="Deskripsi" />
              </View>
            </View>
            <View className="flex space-y-2 px-10">
              <Text className="text-primary-800 font-psemibold text-sm">
                Informasi Layanan {result?.name}
              </Text>
              {result?.Layanans?.map((v: any) => (
                <Accordion
                  key={v.id}
                  title={v.name}
                  isExpanded={expandedIndex === v.id}
                  onPress={() => handlePress(v.id)}
                >
                  <TabService
                    service={v?.desc}
                    law={v?.dasarhukum}
                    requirement={v?.syarat}
                  />
                </Accordion>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" backgroundColor="#FEFEFE" />
    </>
  );
};

export default DetailInstanceScreen;
