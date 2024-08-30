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
import { useHistoryRequest } from "@/service/api";
import { debounce, formatDateA, formatDateToString } from "@/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";

const status = [
  { key: "", value: "Semua" },
  { key: 0, value: "Belum diproses" },
  { key: 1, value: "Sedang Diproses" },
  { key: 2, value: "Sedang Diproses" },
  { key: 3, value: "Selesai" },
  { key: 4, value: "Ditolak" },
  { key: 5, value: "Revisi" },
  { key: 6, value: "Menunggu Validasi" },
];

const Request = () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);

  const [selectedStartDate, setSelectedStartDate] = useState<any>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(0);

  const togglePickerDate = () => {
    setShowPicker(!showPicker);
  };

  const togglePickerEndDate = () => {
    setShowPickerEnd(!showPickerEnd);
  };
  const handleSelectChange = (val: any) => {
    setSelectedStatus(val);
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

  const { data, isLoading } = useHistoryRequest({
    start: startDateFormatted,
    end: endDateFormatted,
    status: selectedStatus,
  });
  const result = data?.data;
  console.log(result);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="py-8">
        <View>
          <SelectList
            setSelected={handleSelectChange}
            data={status}
            save="key"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
            }
            placeholder="Pilih Status"
            boxStyles={{
              borderRadius: 20,
              borderColor: "#C4C4C4",
              height: 45,
              width: 340,
            }}
            search={false}
            inputStyles={{ color: "#000" }}
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
            <TabRequest
              key={v.id}
              title={v.instansi_name}
              time={v.createdAt}
              images={v.instansi_image}
              date={v.createdAt}
              no={v.no_request}
              service={v.layanan_name}
              id={v.id}
              status={v.status}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Request;
