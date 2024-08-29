import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { icons } from "@/constants";
import Queue from "@/components/Tabs/queue";
import Request from "@/components/Tabs/request";
import SKM from "@/components/Tabs/skm";

const HistoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Antrian");

  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
      <View className="flex flex-row space-x-1">
        <Link href="/home" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">Riwayat</Text>
      </View>
      <View className="px-9 py-10">
        <View className="flex flex-row space-x-2 w-full">
          <TouchableOpacity
            className={`w-[31.5%] h-[30px] border border-primary-700 ${
              selectedTab === "Antrian" ? "bg-primary-700" : "bg-transparent"
            } rounded-full py-1 items-center`}
            onPress={() => setSelectedTab("Antrian")}
          >
            <Text
              className={
                selectedTab === "Antrian"
                  ? "text-neutral-50"
                  : "text-primary-700"
              }
            >
              Antrian
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-[31.5%] h-[30px] border border-primary-700 ${
              selectedTab === "Permohonan" ? "bg-primary-700" : "bg-transparent"
            } rounded-full py-1 items-center`}
            onPress={() => setSelectedTab("Permohonan")}
          >
            <Text
              className={
                selectedTab === "Permohonan"
                  ? "text-neutral-50"
                  : "text-primary-700"
              }
            >
              Permohonan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-[31.5%] h-[30px] border border-primary-700 ${
              selectedTab === "SKM" ? "bg-primary-700" : "bg-transparent"
            } rounded-full py-1 items-center`}
            onPress={() => setSelectedTab("SKM")}
          >
            <Text
              className={
                selectedTab === "SKM" ? "text-neutral-50" : "text-primary-700"
              }
            >
              SKM
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "Antrian" && <Queue />}
        {selectedTab === "Permohonan" && <Request />}
        {selectedTab === "SKM" && <SKM />}
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
