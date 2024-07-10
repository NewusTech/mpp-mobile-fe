import { Text, View } from "react-native";
import React from "react";
import Gap from "../Gap";
import TabRequest from "./tabRequest";
import { images } from "@/constants";
import { useHistoryRequest } from "@/service/api";

const Request = () => {
  const { data, isLoading } = useHistoryRequest();
  const result = data?.data;
  return (
    <View className="py-8">
      {result?.map((v: any) => (
        <TabRequest
          route={v?.id}
          key={v?.id}
          images={v?.instansi_image}
          id={v.id}
          title={v?.instansi_name}
          status={v?.status}
        />
      ))}
    </View>
  );
};

export default Request;
