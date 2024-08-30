import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import Step from "@/components/Step";
import { icons } from "@/constants";
import { requestStepFour, useGenerateDocs } from "@/service/api";
import { useReqeustStore } from "@/store/useRequestStore";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { truncateString } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowToast from "@/components/Toast";
import { WithAuth } from "@/components/ProtectedRoute";

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
  const [selectedDocuments, setSelectedDocuments] = useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickDocuments = async () => {
    try {
      const docs = await DocumentPicker.getDocumentAsync();

      if (!docs.canceled) {
        const successResult =
          docs as DocumentPicker.DocumentPickerSuccessResult;

        // To limit the amount of documents that are added to the array "selectedDocuments"
        if (
          selectedDocuments.length + successResult.assets.length <=
          result?.length
        ) {
          setSelectedDocuments((prevSelectedDocuments) => [
            ...prevSelectedDocuments,
            ...successResult.assets,
          ]);
        } else {
          console.log(`Maximum of ${result?.length} documents allowed.`);
        }
      } else {
        console.log("Document selection cancelled.");
      }
    } catch (error) {
      console.log("Error picking documents:", error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Menambahkan selectedDocuments ke formData
    // for (const [key, value] of Object.entries(selectedDocuments)) {
    //   if (value) {
    //     const documentFile = {
    //       name: value.name.split(".")[0],
    //       uri: value.uri,
    //       type: value.mimeType || "application/octet-stream", // Berikan tipe default jika mimeType tidak ada
    //       size: value.size,
    //     };

    //     formData.append(`datafile[${key}][layananform_id]`, key);
    //     formData.append(`datafile[${key}][data]`, documentFile as any);
    //   } else {
    //     console.warn(`Value for key ${key} is undefined or null`);
    //   }
    // }

    for (const [key, value] of Object.entries(selectedDocuments)) {
      if (value) {
        try {
          const response = await fetch(value.uri);
          if (!response.ok) {
            throw new Error(`Failed to fetch document at ${value.uri}`);
          }
          const blob = await response.blob();

          // Log Blob untuk memastikan bahwa Blob benar-benar ada
          console.log(`Blob for document ${key}:`, blob);

          formData.append(`datafile[${key}][layananform_id]`, key);
          formData.append(`datafile[${key}][data]`, blob, value.name);
        } catch (fetchError) {
          console.error(`Error fetching document ${key}:`, fetchError);
        }
      } else {
        console.warn(`Value for key ${key} is undefined or null`);
      }
    }

    // dataInput.forEach((item: any, index: any) => {
    //   formData.append(
    //     `datainput[${index}][layananform_id]`,
    //     item.layananform_id.toString()
    //   );

    //   // Memastikan nilai tidak diubah ke string jika tidak perlu
    //   const dataValue =
    //     Array.isArray(item.data) || typeof item.data === "object"
    //       ? JSON.stringify(item.data)
    //       : item.data;

    //   formData.append(`datainput[${index}][data]`, dataValue);
    // });
    // Log FormData untuk memastikan isinya
    console.log("FormData:", formData);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/inputform/create/${serviceId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Body: ${errorBody}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === 201) {
        ShowToast(data.message);
        // router.push("/service-req-5");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setIsSubmitting(false);
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
                  </View>
                  <TouchableOpacity
                    onPress={() => pickDocuments()}
                    className="px-4 py-2 border rounded-[20px] border-neutral-500"
                  >
                    {selectedDocuments[index] ? (
                      <Text className="text-xs text-primary-700">
                        {truncateString(selectedDocuments[index].name, 10)}
                      </Text>
                    ) : (
                      <Text className="text-primary-700">Upload</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {isSubmitting ? (
              <ActivityIndicator
                size="large"
                color="#3568C0"
                className="mt-[5vh]"
              />
            ) : (
              <CustomButton
                clx2="text-sm text-white font-white"
                type="button"
                clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[5vh]"
                title="Ajukan"
                onPress={handleSubmit}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default WithAuth(ServiceRequestFour);
