import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { icons } from "@/constants";
import { Link } from "expo-router";
import NotificationCard from "@/components/Notification";

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-100">
      <View className="flex flex-row space-x-1">
        <Link href="/home" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">
          Notification
        </Text>
      </View>
      <Text className="px-9 mt-[27px] mb-2 text-xs text-primary-800 font-psemibold">
        Hari ini
      </Text>
      <NotificationCard
        desc="Permohonan layanan anda sudah selesai, silahkan download sekarang."
        hour="1j"
      />
      <Text className="px-9 mt-[27px] mb-2 text-xs text-primary-800 font-psemibold">
        Kemarin
      </Text>
      <NotificationCard
        desc="Permohonan layanan anda telah dibuat, silahkan tunggu dan cek secara berkala."
        hour="2h"
      />
    </SafeAreaView>
  );
};

export default Notification;
