import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import CustomRadioButton from "@/components/RadioInput";
import { icons } from "@/constants";
import { apiUrl, useRequestDetailById } from "@/service/api";
import { formatDateToIndo, formatDateToString, truncateString } from "@/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
import ShowToast from "@/components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateService = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useRequestDetailById(id);

  const result = data?.data;
  const [inputs, setInputs] = useState(result?.Layananforminputs || []);
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);

  // Tambahkan state untuk DateTimePicker
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDateNow, setSelectedDateNow] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePickerDate = () => {
    setShowPicker(!showPicker);
  };

  const pickDocuments = async (layananform_id: number) => {
    try {
      const docs: any = await DocumentPicker.getDocumentAsync({
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!docs.canceled && docs.assets && docs.assets.length > 0) {
        const newDocuments = docs.assets.map((doc: any) => ({
          name: doc.name,
          uri: doc.uri,
          type: doc.mimeType,
          size: doc.size,
          layananform_id, // Menyimpan layananform_id dari parameter
        }));

        setSelectedDocuments((prevSelectedDocuments) => {
          // Filter out any documents with the same layananform_id
          const filteredDocuments = prevSelectedDocuments.filter(
            (doc) => doc.layananform_id !== layananform_id
          );

          // Combine filtered documents with the new one(s)
          return [...filteredDocuments, ...newDocuments];
        });
      }
    } catch (error) {
      console.log("Error picking documents:", error);
    }
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setSelectedDateNow(currentDate.toDateString()); // Mengatur tanggal yang diformat
    // Temukan input terkait dan update
    const index = inputs.findIndex(
      (input: any) => input.layananform_tipedata === "date"
    );
    if (index !== -1) {
      handleInputChange(index, formatDateToString(currentDate));
    }
  };

  // Sync the state with the result when the data changes
  useEffect(() => {
    if (result?.Layananforminputs) {
      setInputs(result.Layananforminputs);
    }
  }, [result]);

  const handleInputChange = (
    index: number,
    value: string | number,
    key = "data",
    type?: string
  ) => {
    const newInputs = [...inputs];

    if (type === "radio") {
      newInputs[index][key] = value;
      setInputs(newInputs);
    } else if (type === "checkbox") {
      const currentValues = (newInputs[index][key] as Array<number>) || [];

      if (currentValues.includes(value as number)) {
        newInputs[index][key] = currentValues.filter((item) => item !== value);
      } else {
        newInputs[index][key] = [...currentValues, value as number];
      }

      setInputs(newInputs);
    } else {
      newInputs[index][key] = value;
      setInputs(newInputs);
    }
  };

  const handleSubmit = async () => {
    // setIsSubmitting(true);
    const formData = new FormData();

    // Menambahkan selectedDocuments ke formData
    // selectedDocuments.forEach((doc: any, index: any) => {
    //   const file: any = {
    //     uri: doc.uri,
    //     type: doc.type,
    //     name: doc.name.split(".")[0],
    //     size: doc.size,
    //   };
    //   // Append layananform_id sebagai ID untuk dokumen ini
    //   formData.append(
    //     `datafile[${index}][layananform_id]`,
    //     doc.layananform_id.toString()
    //   );

    //   // Append file dokumen ke FormData
    //   formData.append(`datafile[${index}][data]`, file);
    // });

    // Tambahkan input data lainnya ke formData
    inputs.forEach((item: any, index: any) => {
      if (item.layananform_tipedata !== "file") {
        formData.append(
          `datainput[${index}][layananform_id]`,
          item.layananform_id
        );

        const dataValue =
          Array.isArray(item.data) || typeof item.data === "object"
            ? JSON.stringify(item.data)
            : item.data;

        formData.append(`datainput[${index}][data]`, dataValue);
      }
    });
    formData.append("status", "6");

    console.log("formData", formData);

    // Kirim formData ke server
    // try {
    //   const token = await AsyncStorage.getItem("token");
    //   const response = await fetch(`${apiUrl}/inputform/update/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     const errorBody = await response.text();
    //     console.error(
    //       `HTTP error! Status: ${response.status}, Body: ${errorBody}`
    //     );
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   if (response.ok) {
    //     ShowToast(data.message);
    //     // Navigate to the next screen or show success message

    //     router.push("/history");
    //   }
    // } catch (error: any) {
    //   console.error("Error:", error.message);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <ScrollView>
      <SafeAreaView className="py-10 bg-neutral-50">
        <View className="flex flex-row space-x-1">
          <Link
            href={{ pathname: "/history-request/[id]", params: { id: id } }}
            asChild
          >
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <View className="space-y-1">
            <Text className="text-primary-800 text-xl font-pbold">
              Perbaikan Permohonan
            </Text>
            <Text className="text-neutral-900 text-sm">
              {result?.layanan?.name}
            </Text>
          </View>
        </View>
        <View className="px-9 py-6">
          <View className="w-full rounded-[20px] border border-neutral-700">
            <View className="px-5 py-6">
              <Text className="text-xl text-primary-800 font-psemibold">
                Formulir
              </Text>
              {inputs?.map((v: any, index: any) => {
                switch (v.layananform_tipedata) {
                  case "text":
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.layananform_name}
                        </Text>
                        <InputForm
                          placeholder={`Masukkan ${v.layananform_name}`}
                          value={v.data}
                          onChangeText={(value: any) =>
                            handleInputChange(index, value)
                          }
                        />
                        <Gap height={8} />
                      </View>
                    );
                  case "number":
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.layananform_name}
                        </Text>
                        <InputForm
                          placeholder={`Masukkan ${v.layananform_name}`}
                          type="number"
                          value={v.data}
                          onChangeText={(value: any) =>
                            handleInputChange(index, value)
                          }
                        />
                        <Gap height={8} />
                      </View>
                    );
                  case "date":
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.layananform_name}
                        </Text>
                        {showPicker && (
                          <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChangeDate}
                          />
                        )}
                        <InputForm
                          onPress={togglePickerDate}
                          placeholder={`Masukkan ${v.layananform_name}`}
                          type="date"
                          value={selectedDateNow || v.data}
                          onChangeText={() => {}}
                        />
                        <Gap height={8} />
                      </View>
                    );
                  case "checkbox":
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.layananform_name}
                        </Text>
                        {v.layananform_datajson.map((z: any) => (
                          <View
                            key={z.id}
                            className="flex flex-row space-x-2 mb-2"
                          >
                            <Checkbox
                              value={v.data_key.includes(z.key)}
                              onValueChange={() => {
                                console.log(v.data_key);
                                const newDataKey = v.data_key.includes(z.key)
                                  ? v.data_key.filter(
                                      (key: any) => key !== z.key
                                    )
                                  : [...v.data_key, z.key];
                                handleInputChange(
                                  index,
                                  newDataKey,
                                  "data_key"
                                );
                              }}
                              className="bg-neutral-50 border"
                            />
                            <Text>{z.key}</Text>
                          </View>
                        ))}
                        <Gap height={8} />
                      </View>
                    );
                  case "radio":
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.layananform_name}
                        </Text>
                        {v.layananform_datajson?.map((z: any) => (
                          <CustomRadioButton
                            key={z.id}
                            label={z.key}
                            isSelected={v.data_key === z.key}
                            onPress={() =>
                              handleInputChange(index, z.key, "data_key")
                            }
                          />
                        ))}
                        <Gap height={8} />
                      </View>
                    );
                  case "textarea":
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.layananform_name}
                        </Text>
                        <InputForm
                          placeholder={`Masukkan ${v.layananform_name}`}
                          type="textarea"
                          value={v.data}
                          onChangeText={(value: any) =>
                            handleInputChange(index, value)
                          }
                        />
                        <Gap height={8} />
                      </View>
                    );
                  case "file":
                    return (
                      <View className="mt-6" key={v.id}>
                        <View className="w-full rounded-[20px] border border-neutral-700 px-4 py-[14px] flex flex-row items-center justify-between">
                          <View className="space-y-1">
                            <Text className="text-sm text-primary-800 font-psemibold">
                              {v.layananform_name}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => pickDocuments(v.layananform_id)}
                            className="px-4 py-2 border rounded-[20px] border-neutral-500"
                          >
                            <Text className="text-primary-700">
                              {truncateString(
                                selectedDocuments.find(
                                  (doc) => doc.layananform_id === v.id
                                )?.name || "Upload",
                                10
                              )}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Link
                          href={{
                            pathname: "/documentWebView",
                            params: { link: v.data },
                          }}
                          asChild
                          className="flex items-end pr-2 pt-1"
                        >
                          <TouchableOpacity>
                            <Text className="text-primary-700 underline">
                              Preview
                            </Text>
                          </TouchableOpacity>
                        </Link>
                      </View>
                    );
                  default:
                    return null;
                }
              })}
            </View>
          </View>
          <View className="px-9 py-4 flex items-center">
            {/* {isSubmitting ? (
              <ActivityIndicator
                size="large"
                color="#3568C0"
                className="mt-[5vh]"
              />
            ) : ( */}
            <CustomButton
              clx2="text-sm text-white font-white"
              type="button"
              clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[2vh]"
              title="Perbaiki"
              onPress={handleSubmit}
            />
            {/* )} */}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default UpdateService;
