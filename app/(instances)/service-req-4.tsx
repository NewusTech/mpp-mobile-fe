import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import Step from "@/components/Step";
import { icons } from "@/constants";
import { useGenerateDocs } from "@/service/api";
import { useReqeustStore } from "@/store/useRequestStore";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 4;

const ServiceRequestFour = () => {
  const { dataInput, serviceId } = useReqeustStore((state: any) => ({
    dataInput: state.dataInput,
    serviceId: state.serviceId,
  }));
  const { data, isLoading } = useGenerateDocs(serviceId);
  const result = data?.data?.Layananforms;
  const [documents, setDocuments] = useState<{ [key: number]: any }>({});

  const pickDocument = async (index: any) => {
    let result: any = await DocumentPicker.getDocumentAsync({});
    if (
      result.type === "success" &&
      result.assets &&
      result.assets.length > 0
    ) {
      const selectedDocument = result.assets[0];
      setDocuments((prevDocuments) => ({
        ...prevDocuments,
        [index]: selectedDocument, // Save the document correctly
      }));
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 pt-[56px] px-1 bg-primary-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row space-x-2 items-start">
            <Link href="/service-req-3" asChild>
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
          <View className="px-9 py-4 flex items-center">
            <View className="space-y-3">
              {result?.map((v: any, index: number) => (
                <View
                  key={v.id}
                  className="w-full rounded-[20px] border border-neutral-700 px-4 py-[14px] flex flex-row items-center justify-between"
                >
                  <View className="space-y-1">
                    <Text className="text-sm text-primary-800 font-psemibold">
                      {v.field}
                    </Text>
                    <Text className="text-xs">
                      {v.isrequired ? "Wajib diisi" : "Tidak Wajib"}
                    </Text>
                    {documents[index] && (
                      <Text className="text-xs text-primary-700">
                        {documents[index].name}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => pickDocument(index)}
                    className="px-4 py-2 border rounded-[20px] border-neutral-500"
                  >
                    {documents[index] ? (
                      <Text className="text-xs text-primary-700">
                        {documents[index].name}
                      </Text>
                    ) : (
                      <Text className="text-primary-700">Upload</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <CustomButton
              clx2="text-sm text-white font-white"
              route="/home"
              clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[10vh]"
              title="Ajukan"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default ServiceRequestFour;
