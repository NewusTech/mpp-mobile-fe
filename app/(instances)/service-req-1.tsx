import Accordion from "@/components/Accordion";
import CustomButton from "@/components/CustomButton";
import Step from "@/components/Step";
import { icons } from "@/constants";
import { useDetailService } from "@/service/api";
import { useReqeustStore } from "@/store/useRequestStore";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 1;

const ServiceRequestOne = () => {
  const [selected, setSelected] = useState<any>(null);
  const instanceId = useReqeustStore((state) => state.instanceId);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // To manage expanded accordion state

  const { data, isLoading } = useDetailService(instanceId);

  const result = data?.data;

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

  // Menangani perubahan pilihan
  const handleSelectChange = (val: any) => {
    const selectedItem = formattedData?.find((item: any) => item.name === val);
    setSelected(selectedItem);
  };

  const handlePress = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <SafeAreaView className="flex-1 pt-[56px] px-1 bg-primary-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row space-x-2 items-start">
            <Link href="/home" asChild>
              <TouchableOpacity>
                <Image source={icons.chevronLeft2} className="w-8 h-8" />
              </TouchableOpacity>
            </Link>
            <Text className="text-primary-800 text-[20px] font-pbold w-[260px]">
              Permohonan Layanan
            </Text>
          </View>
          <View className="px-9 py-6 flex flex-row">
            {steps.map((step, index) => (
              <Step
                key={step.id}
                title={step.title}
                isLastStep={index === steps.length - 1}
                isActive={step.id === currentStep}
              />
            ))}
          </View>
          <View className="px-9 py-4">
            <SelectList
              setSelected={handleSelectChange}
              data={selectListData}
              searchPlaceholder="Cari Layanan Permohonan"
              save="value"
              arrowicon={
                <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
              }
              placeholder="Pilih Layanan Permohonan"
              boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
              search={true}
              inputStyles={{ color: "#C4C4C4" }}
            />
          </View>
          <View className="px-9">
            <View className="space-y-2">
              <Text className="text-lg text-primary-800 font-psemibold">
                Informasi Layanan
              </Text>
              <View className="mt-4">
                <Accordion
                  title="Pelayanan"
                  isExpanded={expandedIndex === 0}
                  onPress={() => handlePress(0)}
                >
                  <View className="w-full h-40">
                    <Text>{selected?.service || "-"}</Text>
                  </View>
                </Accordion>
                <Accordion
                  title="Dasar Hukum"
                  isExpanded={expandedIndex === 1}
                  onPress={() => handlePress(1)}
                >
                  <View className="h-40">
                    <Text>{selected?.law || "-"}</Text>
                  </View>
                </Accordion>
                <Accordion
                  title="Persyaratan"
                  isExpanded={expandedIndex === 2}
                  onPress={() => handlePress(2)}
                >
                  <View className="h-40">
                    <Text>{selected?.requirement || "="}</Text>
                  </View>
                </Accordion>
              </View>
            </View>
            <View className="mt-6 flex justify-center items-center">
              <CustomButton
                clx2="text-sm text-white font-white"
                route="/service-req-2"
                clx="bg-primary-700 w-[14vh] h-[5.5vh]"
                title="Lanjut"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default ServiceRequestOne;
