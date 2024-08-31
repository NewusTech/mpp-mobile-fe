import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Platform,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDetailService, useQueueService } from "@/service/api";
import { useBookingStore } from "@/store/useBookingStore";
import { WithAuth } from "@/components/ProtectedRoute";
import { formatDateToIndo } from "@/utils";

const Queue = ({
  title,
  number,
  color,
}: {
  title: string;
  number: number;
  color: string;
}) => {
  return (
    <View className="flex items-center justify-center space-y-2">
      <Text className={`w-16 text-center text-${color}-700`}>{title}</Text>
      <View
        className={`bg-${color}-700 w-[80px] h-[80px] flex items-center justify-center rounded-full`}
      >
        <Text className="text-neutral-50 text-2xl font-pbold">{number}</Text>
      </View>
    </View>
  );
};

const DetailInstanceScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPickerTime, setShowPickerTime] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    instansiId,
    name,
    image,
    setLayananId,
    layananId,
    waktu,
    tanggal,
    setWaktu,
    setTanggal,
  } = useBookingStore((state) => ({
    instansiId: state.instansiId,
    name: state.name,
    image: state.image,
    setLayananId: state.setLayananId,
    setWaktu: state.setWaktu,
    setTanggal: state.setTanggal,
    waktu: state.waktu,
    tanggal: state.tanggal,
    layananId: state.layananId,
  }));
  const { data: service } = useDetailService(10000, instansiId);

  const result = service?.data;

  // Mengambil data dan memformatnya menjadi array objek dengan properti yang diperlukan
  const formattedData =
    result?.map((item: any) => ({
      id: item.id,
      name: item.name,
      service: item.desc,
      law: item.dasarhukum,
      requirement: item.syarat,
    })) || [];

  // Data untuk SelectList
  const selectListData = formattedData?.map((item: any) => ({
    key: item.id.toString(),
    value: item.name,
  }));

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectChange = (val: any) => {
    setLayananId(val);
  };

  const togglePickerDate = () => {
    setShowPicker(!showPicker);
  };

  const togglePickerTime = () => {
    setShowPickerTime(!showPickerTime);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        togglePickerDate();
        setTanggal(currentDate.toDateString());
      }
    } else {
      togglePickerDate();
    }
  };

  const onChangeTime = ({ type }: { type: string }, selectedTime: any) => {
    if (type == "set") {
      const currentTime = selectedTime;
      setTime(currentTime);
      if (Platform.OS === "android") {
        togglePickerTime();
        setWaktu(currentTime.toTimeString());
      }
    } else {
      togglePickerTime();
    }
  };

  const { data } = useQueueService(layananId);

  const queue = data?.data;

  return (
    <>
      <SafeAreaView className="flex-1 py-[56px] px-1">
        <View className="flex flex-row space-x-2 items-start">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>

          <Image source={{ uri: image }} className="w-10 h-14 mr-4" />
          <Text className="text-primary-900 text-[16px] font-pbold w-[230px]">
            {name}
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

          {showPickerTime && (
            <DateTimePicker
              mode="time"
              display="spinner"
              value={time}
              onChange={onChangeTime}
            />
          )}
          <SelectList
            setSelected={handleSelectChange}
            data={selectListData}
            searchPlaceholder="Cari Layanan Permohonan"
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
            inputStyles={{ color: "#000" }}
          />
          <Pressable onPress={togglePickerDate}>
            <TextInput
              className="border-b px-5 text-neutral-900 border-neutral-800 py-2"
              placeholder="Tanggal"
              value={formatDateToIndo(tanggal)}
              onChangeText={setTanggal}
              editable={false}
            />
          </Pressable>

          <Pressable onPress={togglePickerTime}>
            <TextInput
              className="border-b px-5 text-neutral-900 border-neutral-800 py-2"
              placeholder="Jam"
              value={waktu}
              onChangeText={setWaktu}
              editable={false}
            />
          </Pressable>
          <View className="flex flex-row justify-between w-full py-2">
            <CustomButton
              clx2="text-sm text-white font-white"
              // route="/service-req-3"
              clx="bg-secondary-700 w-[47%] h-[40px]"
              title="Cek Antrian"
              type="button"
              onPress={toggleModal}
            />
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={toggleModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View className="flex flex-row justify-between">
                    <Text className="font-bold text-primary-700 text-lg">
                      {name}
                    </Text>
                    <TouchableOpacity onPress={toggleModal}>
                      <Text className="text-neutral-700 text-3xl -mt-7">x</Text>
                    </TouchableOpacity>
                  </View>
                  {layananId === "" ? (
                    <View className="flex-1 justify-center items-center">
                      <Text>Pilih Layanan Terlebih Dahulu</Text>
                    </View>
                  ) : (
                    <View className="flex flex-row justify-around mt-10">
                      <Queue
                        title="Total Antrian"
                        number={queue?.AntrianCount}
                        color="primary"
                      />
                      <Queue
                        title="Antrian Ke-"
                        number={queue?.AntrianNumber}
                        color="secondary"
                      />
                      <Queue
                        title="Antrian Selesai"
                        number={queue?.AntrianClear}
                        color="success"
                      />
                    </View>
                  )}
                </View>
              </View>
            </Modal>
            <CustomButton
              title="Pilih"
              route="/home"
              clx="bg-primary-700 w-[47%] h-[40px]"
              clx2="text-neutral-50"
            />
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "35%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    paddingVertical: 32,
    paddingHorizontal: 18,
  },
  enlargedImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default WithAuth(DetailInstanceScreen);
