import { Text, View } from "react-native";
import React from "react";
import Gap from "../Gap";
import TabRequest from "./tabRequest";
import { images } from "@/constants";

const Request = () => {
  return (
    <View className="py-8">
      <TabRequest
        images={images.logoLamtim}
        id="NP102883749"
        title="Dinas Kependudukan dan Catatan Sipil"
        status="Selesai"
      />
      <Gap height={10} />
      <TabRequest
        images={images.logoLamtim}
        id="NP102883749"
        title="Dinas Kependudukan dan Catatan Sipil"
        status="Gagal"
      />
      <Gap height={10} />
      <TabRequest
        images={images.logoLamtim}
        id="NP102883749"
        title="Dinas Kependudukan dan Catatan Sipil"
        status="Menunggu"
      />
    </View>
  );
};

export default Request;
