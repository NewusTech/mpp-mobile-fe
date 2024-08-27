import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MenuBottomBar from "../MenuBottomBar";
import { icons } from "@/constants";
import { Link } from "expo-router";

const Bottombar = () => {
  return (
    <View className="absolute h-[65px] bottom-0 flex flex-row left-0 right-0 items-start justify-between pt-2 px-5 bg-neutral-50 z-20 ">
      <MenuBottomBar route="/home" icon={icons.home} title="Beranda" />
      <MenuBottomBar route="/skm" icon={icons.clipboard} title="SKM" />
      <MenuBottomBar
        route="/booking-queue"
        icon={icons.ticket}
        title="Booking"
      />
      <MenuBottomBar
        route="/service-request"
        icon={icons.landmark}
        title="Permohonan"
      />
      <MenuBottomBar route="/history" icon={icons.history} title="Riwayat" />
      <MenuBottomBar route="/profile" icon={icons.circleUser} title="Profile" />

      <Link href="/complaint" asChild>
        <TouchableOpacity className="rounded-full absolute bg-primary-700 px-4 py-2 -mt-12 right-8 flex flex-row items-center space-x-4">
          <Image source={icons.complain} className="w-6 h-6" />
          <Text className="text-neutral-50">Pengaduan</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Bottombar;
