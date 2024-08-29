import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Gap from "../Gap";
import TabRequest from "./tabRequest";
import { icons, images } from "@/constants";
import { useHistoryRequest, useHistorySkm } from "@/service/api";
import { debounce, formatDateA, formatDateToString } from "@/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import TabSkm from "./tabSkm";

const SKM = () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);

  const [selectedStartDate, setSelectedStartDate] = useState<any>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  const togglePickerDate = () => {
    setShowPicker(!showPicker);
  };

  const togglePickerEndDate = () => {
    setShowPickerEnd(!showPickerEnd);
  };

  const startDateFormatted = selectedStartDate
    ? formatDateToString(new Date(selectedStartDate))
    : undefined;
  const endDateFormatted = selectedEndDate
    ? formatDateToString(new Date(selectedEndDate))
    : undefined;

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        togglePickerDate();
        setSelectedStartDate(currentDate.toDateString());
      }
    } else {
      togglePickerDate();
    }
  };

  const onChangeEnd = ({ type }: { type: string }, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDateEnd(currentDate);
      if (Platform.OS === "android") {
        togglePickerEndDate();
        setSelectedEndDate(currentDate.toDateString());
      }
    } else {
      togglePickerEndDate();
    }
  };

  const debouncedSetSearch = useCallback(
    debounce((text: string) => {
      setDebouncedSearch(text);
      setIsDebouncing(false);
    }, 500),
    []
  );

  useEffect(() => {
    setIsDebouncing(true);
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);
  const { data, isLoading } = useHistorySkm({
    start: startDateFormatted,
    end: endDateFormatted,
    search: debouncedSearch,
  });
  const result = data?.data;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="py-8">
        <View>
          <TextInput
            className="border rounded-full py-2 px-5 border-neutral-600"
            placeholder="Cari ..."
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
          <View className="mb-6 flex flex-row mt-3 items-center justify-between">
            <Pressable
              onPress={togglePickerDate}
              className="flex flex-row border rounded-full border-neutral-600 pr-4 items-center"
            >
              <TextInput
                className="text-black px-4 h-[5vh] py-[10px]"
                placeholder="Tanggal Awal"
                value={formatDateA(selectedStartDate)}
                onChangeText={setSelectedStartDate}
                editable={false}
              />
              <Image source={icons.calendar} className="w-6 h-6" />
            </Pressable>
            <Text className="text-lg">to</Text>
            <Pressable
              onPress={togglePickerEndDate}
              className="flex flex-row border rounded-full border-neutral-600 pr-4 items-center"
            >
              <TextInput
                className="text-black px-4 h-[5vh] py-[10px]"
                placeholder="Tanggal Akhir"
                value={formatDateA(selectedEndDate)}
                onChangeText={setSelectedEndDate}
                editable={false}
              />
              <Image source={icons.calendar} className="w-6 h-6" />
            </Pressable>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
              />
            )}
            {showPickerEnd && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={dateEnd}
                onChange={onChangeEnd}
              />
            )}
          </View>
          {result?.map((v: any) => (
            <TabSkm
              key={v.id}
              title={v.instansi_name}
              time={v.createdAt}
              images={v.instansi_image}
              date={v.date}
              no={v.no_skm}
              service={v.layanan_name}
              id={v.id}
              kritik={v.kritiksaran}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SKM;
