import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import SelectValueSurvey from "@/components/SelectValueSurvey";
import { useSkmStore } from "@/store/useSkmStore";
import { apiUrl, useSkmDetail } from "@/service/api";
import ShowToast from "@/components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateToString } from "@/utils";
import { WithAuth } from "@/components/ProtectedRoute";

const FillSurveyScreen = () => {
  const { selectedInstance, selectedService, selectedDate } = useSkmStore(
    (state) => ({
      selectedInstance: state.selectedInstance,
      selectedService: state.selectedService,
      selectedDate: state.selectedDate,
    })
  );
  const [kritikSaran, setKritikSaran] = useState<string>("");

  const [dataInput, setDataInput] = useState<
    { [key: string]: number | null }[]
  >([]);

  const handleSelect = (id: number, value: number) => {
    setDataInput((prev) => {
      const updatedData = [...prev];
      const index = updatedData.findIndex((item) => item.surveyform_id === id);

      if (index !== -1) {
        updatedData[index] = { surveyform_id: id, nilai: value };
      } else {
        updatedData.push({ surveyform_id: id, nilai: value });
      }

      return updatedData;
    });
  };

  const { data } = useSkmDetail(selectedInstance);

  const result = data?.data?.Surveyforms;

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");

    const dateSelected = new Date(selectedDate);

    const formData = {
      datainput: dataInput,
      date: formatDateToString(dateSelected),
      kritiksaran: kritikSaran,
    };

    try {
      const response = await fetch(
        `${apiUrl}/inputsurvey/create/${selectedService}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const json = await response.json();

      console.log("Response:", json);

      if (response.ok) {
        ShowToast(json.message);
        console.log("Response:", json);
        router.replace("/success");
      } else {
        ShowToast(json.message);
        console.error("Error response:", json);
      }
    } catch (error: any) {
      ShowToast(error.message);
      console.error("Catch error:", error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 pt-[56px] px-1">
        <View className="flex flex-row space-x-2 items-start">
          <Link href="/skm" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="flex px-9 -mt-7">
          {result?.map((v: any) => (
            <SelectValueSurvey
              title={v.field}
              key={v.id}
              id={v.id}
              onSelect={handleSelect}
            />
          ))}
        </View>
        <View className="px-9 my-2">
          <Text className="text-primary-700 font-pmedium">
            Kritik dan Saran
          </Text>
          <TextInput
            multiline
            className="px-3 py-3 rounded-lg border border-neutral-700 h-40 text-start"
            placeholder="Masukkan disini"
            style={{ textAlignVertical: "top" }}
            value={kritikSaran}
            onChangeText={(text) => setKritikSaran(text)}
          />
        </View>
        <View className="flex gap-y-3 px-10 py-8">
          <View className="flex flex-row justify-center py-2">
            <CustomButton
              title="Selesai"
              type="button"
              onPress={handleSubmit}
              clx="bg-primary-700 w-[15vh] h-[4.5vh]"
              clx2="text-neutral-50"
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default WithAuth(FillSurveyScreen);
