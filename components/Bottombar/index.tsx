import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import MenuBottomBar from "../MenuBottomBar";
import { icons } from "@/constants";

const Bottombar = () => {
  return (
    <View className="absolute h-[70px] bottom-3 flex flex-row left-5 right-5 items-start justify-between pt-2 px-8 bg-primary-700 z-20 rounded-[40px]">
      <MenuBottomBar icon={icons.clipboard} title="SKM" />
      <MenuBottomBar icon={icons.history} title="Riwayat" />
      <MenuBottomBar icon={icons.ticket} title="Booking Antrian" />
      <MenuBottomBar icon={icons.landmark} title="Permohonan Layanan" />
      <MenuBottomBar icon={icons.message} title="Chat" />
    </View>
  );
};

export default Bottombar;
