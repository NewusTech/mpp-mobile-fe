import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";

const SurveyScreen = () => {
  const [selected, setSelected] = useState("");

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
          <Text className="text-primary-800 text-xl font-pbold">SKM</Text>
        </View>
        <View className="flex gap-y-3 px-10 py-8">
          <Text className="text-[16px] text-primary-800 font-psemibold">
            Survey Kepuasan Masyarakat
          </Text>
          <SelectList
            setSelected={(val: any) => setSelected(val)}
            data={data}
            save="value"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
            }
            placeholder="Pilih Layanan Permohonan"
            boxStyles={{
              backgroundColor: "transparent",
              borderBottomWidth: 1,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderRadius: 0,
              marginTop: 10,
            }}
            search={false}
          />
          <SelectList
            setSelected={(val: any) => setSelected(val)}
            data={data}
            save="value"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
            }
            placeholder="Pilih Layanan Permohonan"
            boxStyles={{
              backgroundColor: "transparent",
              borderBottomWidth: 1,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderRadius: 0,
              marginTop: 10,
            }}
            search={false}
          />
          <TextInput
            className="border-b border-neutral-800 py-2 px-5"
            placeholder="Tanggal"
          />
          <View className="flex flex-row justify-end py-2">
            <CustomButton
              title="Isi SKM"
              route="/fill-skm"
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

export default SurveyScreen;
