import { View } from "react-native";
import React from "react";
import MenuBottomBar from "../MenuBottomBar";
import { icons } from "@/constants";

const Bottombar = () => {
  return (
    <View className="absolute h-[70px] bottom-3 flex flex-row left-5 right-5 items-start justify-between pt-2 px-8 bg-primary-700 z-20 rounded-[40px]">
      <MenuBottomBar route="/skm" icon={icons.clipboard} title="SKM" />
      <MenuBottomBar route="/history" icon={icons.history} title="Riwayat" />
      <MenuBottomBar
        route="/booking-queue"
        icon={icons.ticket}
        title="Booking Antrian"
      />
      <MenuBottomBar
        route="/service-request"
        icon={icons.landmark}
        title="Permohonan Layanan"
      />
      <MenuBottomBar route="/chat" icon={icons.message} title="Chat" />
    </View>
  );
};

export default Bottombar;
