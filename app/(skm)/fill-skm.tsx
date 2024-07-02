import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import SelectValueSurvey from "@/components/SelectValueSurvey";

const FillSurveyScreen = () => {
  const data = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
  ];
  return (
    <>
      <SafeAreaView className="flex-1 py-[56px] px-1">
        <View className="flex flex-row space-x-2 items-start">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex px-9 -mt-7">
          <SelectValueSurvey
            title="Bagaimana pendapat Saudara tentang kesesuaian persyaratan pelayanan
        dengan jenis pelayanannya?"
          />
          <SelectValueSurvey
            title="Bagaimana pendapat Saudara tentang kesesuaian persyaratan pelayanan
        dengan jenis pelayanannya?"
          />
          <SelectValueSurvey
            title="Bagaimana pendapat Saudara tentang kesesuaian persyaratan pelayanan
        dengan jenis pelayanannya?"
          />
        </View>
        <View className="flex gap-y-3 px-10 py-8">
          <View className="flex flex-row justify-center py-2">
            <CustomButton
              title="Selesai"
              route="/success"
              clx="bg-primary-700 w-[90px] h-[30px]"
              clx2="text-neutral-50"
            />
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default FillSurveyScreen;
