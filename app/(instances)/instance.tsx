import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputForm from "@/components/InputForm";
import CardInstance from "@/components/CardInstance";
import CardNews from "@/components/CardNews";
import Bottombar from "@/components/Bottombar";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const InstanceScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 bg-primary-50 relative z-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="bg-primary-700 w-full h-[17vh] py-6 px-1">
            <Link href="/home" asChild>
              <TouchableOpacity>
                <Image source={icons.chevronLeft} className="w-10 h-10" />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="-mt-5 px-9">
            <InputForm placeholder="Cari" icon={icons.search} type="search" />
          </View>
          <View className="px-8 mt-4 h-screen">
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
              <CardInstance icon={images.pln} title="PLN Lampung Timur" />
              <CardInstance icon={images.mandiri} title="Bank Mandiri" />
              <CardInstance icon={images.polda} title="Polres Lampung Timur" />
              <CardInstance icon={images.bpjs} title="BPJS Kesehatan" />
              <CardInstance icon={images.taspen} title="Taspen" />
              <CardInstance icon={images.bri} title="Bank BRI" />
              <CardInstance icon={images.pln} title="PLN Lampung Timur" />
              <CardInstance icon={images.mandiri} title="Bank Mandiri" />
              <CardInstance icon={images.polda} title="Polres Lampung Timur" />
              <CardInstance icon={images.bpjs} title="BPJS Kesehatan" />
              <CardInstance icon={images.taspen} title="Taspen" />
              <CardInstance icon={images.bri} title="Bank BRI" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#7BBA78" />
    </>
  );
};

export default InstanceScreen;
