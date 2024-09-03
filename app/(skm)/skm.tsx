import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
import { apiUrl, useDetailService, useInstance } from "@/service/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSkmStore } from "@/store/useSkmStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowToast from "@/components/Toast";
import { formatDateToIndo } from "@/utils";
import { WithAuth } from "@/components/ProtectedRoute";

const SurveyScreen = () => {
  const {
    selectedInstance,
    setSelectedInstance,
    setSelectedService,
    setSelectedDate,
    selectedService,
    selectedDate,
  } = useSkmStore((state) => ({
    selectedInstance: state.selectedInstance,
    setSelectedInstance: state.setSelectedInstance,
    setSelectedDate: state.setSelectedDate,
    setSelectedService: state.setSelectedService,
    selectedDate: state.selectedDate,
    selectedService: state.selectedService,
  }));
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateNow, setSelectedDateNow] = useState(date.toDateString());

  const { data } = useInstance(10000);
  const { data: services } = useDetailService(1000, selectedInstance);

  const result = data?.data;
  const resultService = services?.data;

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        togglePicker();
        setSelectedDateNow(currentDate.toDateString());
      }
    } else {
      togglePicker();
    }
  };

  // Data untuk SelectList
  const selectListData = result?.map((item: any) => ({
    key: item.id,
    value: item.name,
  }));

  const selectListDataService = resultService?.map((item: any) => ({
    key: item.id,
    value: item.name,
  }));

  const handleButtonClick = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res: any = await fetch(
        `${apiUrl}/getCheckUserSKM/${selectedService}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);

      if (res.ok) {
        router.push("/fill-skm");
      } else {
        ShowToast("Sudah mengisi survey");
        console.log("Sudah mengisi survey");
      }
    } catch (error) {
      console.error(error);
      ShowToast("Sudah mengisi survey");
    }
  };

  const handleDate = (val: any) => {
    setSelectedDateNow(val);
  };

  useEffect(() => {
    setSelectedDate(selectedDateNow);
  }, [selectedDateNow]);

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
            setSelected={(val: any) => setSelectedInstance(val)}
            data={selectListData}
            save="key"
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
            search={true}
          />
          <SelectList
            setSelected={(val: any) => setSelectedService(val)}
            data={selectListDataService}
            save="key"
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
            search={true}
          />
          <Pressable onPress={togglePicker}>
            <TextInput
              className="border-b px-5 text-neutral-800 border-neutral-800 py-2"
              placeholder="Tanggal"
              value={formatDateToIndo(selectedDateNow)}
              onChangeText={handleDate}
              editable={false}
            />
          </Pressable>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )}
          <View className="flex flex-row justify-end py-2">
            {selectedInstance && selectedService && selectedDateNow ? (
              <CustomButton
                title="Isi SKM"
                type="button"
                onPress={handleButtonClick}
                clx="bg-primary-700 w-[13vh] h-[4vh]"
                clx2="text-neutral-50"
              />
            ) : (
              <CustomButton
                title="Isi SKM"
                type="button"
                clx="bg-primary-400 w-[13vh] h-[4vh]"
                clx2="text-neutral-50"
              />
            )}
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default WithAuth(SurveyScreen);
