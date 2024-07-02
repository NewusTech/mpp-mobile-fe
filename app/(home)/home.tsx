import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputForm from "@/components/InputForm";
import CardInstance from "@/components/CardInstance";
import CardNews from "@/components/CardNews";
import Bottombar from "@/components/Bottombar";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  useEffect(() => {
    getToken(); // Panggil getToken saat komponen dimuat
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token retrieved:", token); // Pastikan token tidak null
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-50 relative z-10">
      <Bottombar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-primary-700 w-full h-[17vh] py-6 px-5">
          <View className="flex flex-row justify-between items-start px-4">
            <Text className="text-[16px] w-[156px] text-neutral-50 font-pbold">
              Selamat Datang, User
            </Text>
            <View className="flex flex-row gap-4 -mt-2">
              <Link href="/notification" asChild>
                <TouchableOpacity>
                  <Image source={icons.bell} className="w-[2.8vh] h-[2.8vh]" />
                </TouchableOpacity>
              </Link>
              <Link href="/profile" asChild>
                <TouchableOpacity>
                  <Image
                    source={icons.circleUser}
                    className="w-[2.8vh] h-[2.8vh]"
                  />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
        <View className="-mt-5 px-9">
          <InputForm placeholder="Cari" icon={icons.search} type="search" />
        </View>
        <View className="px-8 mt-4">
          <View className="flex items-end">
            <Link href="/instance">
              <Text className="font-psemibold text-[10px] text-primary-900">
                Lihat Semua
              </Text>
            </Link>
          </View>
          <View className="flex flex-row flex-wrap justify-between -mt-2">
            <CardInstance icon={images.bnn} title="BNN Lampung Timur" />
            <CardInstance
              icon={images.logoLamtim}
              title="Dinas Kependudukan dan Catatan Sipil"
            />
            <CardInstance icon={images.pln} title="PLN Lampung Timur" />
            <CardInstance icon={images.mandiri} title="Bank Mandiri" />
            <CardInstance icon={images.polda} title="Polres Lampung Timur" />
            <CardInstance icon={images.bpjs} title="BPJS Kesehatan" />
            <CardInstance icon={images.taspen} title="Taspen" />
            <CardInstance icon={images.bri} title="Bank BRI" />
          </View>
        </View>
        <View className="px-8 mt-4">
          <Text className="text-neutral-900 text-[16px] font-psemibold">
            Berita
          </Text>
          <View className="flex items-end">
            <Link href="/news">
              <Text className="font-psemibold text-[10px] text-primary-900">
                Lihat Semua
              </Text>
            </Link>
          </View>
        </View>
        <View className="px-9 flex flex-row flex-wrap justify-between -mt-1 mb-24">
          <CardNews
            icon={images.news1}
            title="Kegiatan pada saat ..."
            date="12 April 2022"
          />
          <CardNews
            icon={images.news2}
            title="Kegiatan pada saat ..."
            date="12 April 2022"
          />
          <CardNews
            icon={images.news1}
            title="Kegiatan pada saat ..."
            date="12 April 2022"
          />
          <CardNews
            icon={images.news2}
            title="Kegiatan pada saat ..."
            date="12 April 2022"
          />
          <CardNews
            icon={images.news1}
            title="Kegiatan pada saat ..."
            date="12 April 2022"
          />
          <CardNews
            icon={images.news2}
            title="Kegiatan pada saat ..."
            date="12 April 2022"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
