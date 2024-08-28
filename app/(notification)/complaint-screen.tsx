import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "expo-router";
import { icons } from "@/constants";
import Queue from "@/components/Tabs/queue";
import Request from "@/components/Tabs/request";
import CustomButton from "@/components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  debounce,
  formatDate,
  formatDateA,
  formatDateToString,
  formatTime,
  truncateString,
} from "@/utils";
import { useComplaint } from "@/service/api";

const status = [
  {
    key: 0,
    value: "Belum diproses",
  },
  {
    key: 4,
    value: "Selesai",
  },
];

const ComplaintScreenHistory = () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);

  const [selectedStartDate, setSelectedStartDate] = useState<any>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState(0);
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

  const handleSelectChange = (val: any) => {
    setSelectedStatus(val);
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

  const { data } = useComplaint({
    start: startDateFormatted,
    end: endDateFormatted,
    status: selectedStatus,
    search: debouncedSearch,
  });

  const result = data?.data;
  console.log(selectedStatus, startDateFormatted);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
        <View className="flex flex-row space-x-1">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-xl font-pbold">
            Pengaduan Layanan
          </Text>
        </View>
        <View className="px-9 py-10">
          <TextInput
            className="border rounded-full py-2 px-5 border-neutral-600"
            placeholder="Cari ..."
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
          <View className="flex flex-row mt-3 items-center justify-between">
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
          <View className="flex flex-row justify-between mt-3">
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
                width: 170,
              }}
              search={false}
              inputStyles={{ color: "#000" }}
            />
            <CustomButton
              clx2="text-sm text-white font-white"
              route="/complaint"
              clx="bg-primary-700 w-[47%] h-[40px]"
              title="Ajukan Pengaduan"
            />
          </View>
          {isDebouncing ? (
            <View className="justify-center">
              <ActivityIndicator color="#3568C0" size="large" />
            </View>
          ) : (
            result?.map((v: any) => (
              <CardComplaint
                key={v?.id}
                name={v?.Instansi?.name}
                aduan={v?.judul}
                date={v?.createdAt}
                time={v?.createdAt}
                status={v?.status}
                service={v?.Layanan?.name}
              />
            ))
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const CardComplaint = ({ name, service, date, time, status, aduan }: any) => {
  const statusComplaint = ({ status }: { status: number }) => {
    if (status === 4) {
      return "Selesai";
    } else {
      return "Belum diproses";
    }
  };

  return (
    <View
      className="w-full rounded-lg bg-neutral-50 p-4 mt-5"
      style={{ elevation: 2 }}
    >
      <View className="flex">
        {/* <Image source={icons.search} className="w-10 h-10" /> */}
        <Text className="text-primary-800 text-[20px] font-pbold w-full">
          {name}
        </Text>
      </View>
      <View className="flex-row mt-6">
        <View className="space-y-2">
          <Text className="text-primary-800 font-bold">Layanan</Text>
          <Text className="text-primary-800 font-bold">Judul Pengaduan</Text>
          <Text className="text-primary-800 font-bold">Tanggal</Text>
          <Text className="text-primary-800 font-bold">Waktu</Text>
          <Text className="text-primary-800 font-bold">Status</Text>
        </View>
        <View className="space-y-2 ml-2">
          <Text className="text-primary-800 ">
            : {truncateString(service, 26)}
          </Text>
          <Text className="text-primary-800 ">
            : {truncateString(aduan, 26)}
          </Text>
          <Text className="text-primary-800">: {formatDate(date)}</Text>
          <Text className="text-primary-800">: {formatTime(time)} WIB</Text>
          <Text className="text-primary-700">
            : {statusComplaint({ status })}
          </Text>
        </View>
      </View>
      <View className="flex items-end mt-6">
        <CustomButton
          clx2="text-sm text-white font-white"
          route="/complaint"
          clx="bg-primary-700 w-[35%] h-[40px]"
          title="Lihat"
          type="button"
        />
      </View>
    </View>
  );
};

export default ComplaintScreenHistory;
