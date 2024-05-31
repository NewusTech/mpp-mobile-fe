import { View } from "react-native";
import React from "react";
import { images } from "@/constants";
import TabQueue from "./tabQueue";

const Queue = () => {
  return (
    <View className="py-8">
      <TabQueue
        images={images.logoLamtim}
        title="Dinas Pendudukan dan Catatan Sipil"
        time="08:00"
        date="12/12/2021"
      />
    </View>
  );
};

export default Queue;
