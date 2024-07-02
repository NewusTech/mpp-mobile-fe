import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";

const DetailInstanceScreen = () => {
  const [selected, setSelected] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateNow, setSelectedDateNow] = useState("");

  const data = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
  ];

  const togglePickerDate = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        togglePickerDate();
        setSelectedDateNow(currentDate.toDateString());
      }
    } else {
      togglePickerDate();
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 py-[56px] px-1">
        <View className="flex flex-row space-x-2 items-start">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Image source={images.logoLamtim} className="w-10 h-14 mr-4" />
          <Text className="text-primary-900 text-[16px] font-pbold w-[230px]">
            Dinas Kependudukan dan Catatan Sipil
          </Text>
        </View>
        <View className="flex gap-y-3 px-10 py-8">
          <Text className="text-[16px] text-primary-800 font-psemibold">
            Booking Antrian
          </Text>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )}
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
          {!showPicker && (
            <Pressable onPress={togglePickerDate}>
              <TextInput
                className="border-b px-5 border-neutral-800 py-2"
                placeholder="Tanggal"
                value={selectedDateNow}
                onChangeText={setSelectedDateNow}
                editable={false}
              />
            </Pressable>
          )}
          <TextInput
            className="border-b px-5 border-neutral-800 py-2"
            placeholder="Jam"
          />
          <View className="flex flex-row justify-end py-2">
            <CustomButton
              title="Pilih"
              route="/home"
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

export default DetailInstanceScreen;
