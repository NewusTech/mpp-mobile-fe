import { View } from "react-native";
import React from "react";
import MenuBottomBar from "../MenuBottomBar";
import { icons } from "@/constants";

const Bottombar = () => {
  return (
    <View className="absolute h-[65px] bottom-0 flex flex-row left-0 right-0 items-start justify-between pt-2 px-5 bg-neutral-50 z-20 ">
      <MenuBottomBar route="/skm" icon={icons.clipboard} title="SKM" />
      <MenuBottomBar route="/history" icon={icons.history} title="Riwayat" />
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
      <MenuBottomBar route="/chat" icon={icons.complain} title="Pengaduan" />
    </View>
  );
};

export default Bottombar;
