import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import Step from "@/components/Step";
import { icons } from "@/constants";
import { useGenerateForm } from "@/service/api";
import { useReqeustStore } from "@/store/useRequestStore";
import { formatDateToIndo } from "@/utils";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import CustomRadioButton from "@/components/RadioInput";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 3;

const ServiceRequestThree = () => {
  const { serviceId, setDatainput, saveToAsyncStorage } = useReqeustStore(
    (state: any) => ({
      serviceId: state.serviceId,
      setDatainput: state.setDatainput,
      saveToAsyncStorage: state.saveToAsyncStorage,
    })
  );

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateNow, setSelectedDateNow] = useState(date.toDateString());
  const [inputValues, setInputValues] = useState<{
    [key: number | string]: string | number | Array<number>;
  }>({});

  const convertToDate = (dateString: any) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  console.log(serviceId);

  const { data, isLoading } = useGenerateForm(serviceId);
  const result = data?.data?.Layananforms;
  console.log(result);

  const togglePickerDate = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        togglePickerDate();
        setSelectedDateNow(currentDate.toDateString());
      }
      // Update the inputValues state with the selected date

      handleInputChange(0, 6, currentDate.toDateString());
    } else {
      togglePickerDate();
    }
  };

  const handleInputChange = (
    index: number | null,
    formId: string | number,
    value: string | number,
    type?: string
  ) => {
    if (type === "radio") {
      setInputValues((prevValues) => ({
        ...prevValues,
        [formId]: value,
      }));
    } else if (type === "checkbox") {
      setInputValues((prevValues) => {
        const currentValues = (prevValues[formId] as Array<number>) || [];
        if (currentValues.includes(value as number)) {
          return {
            ...prevValues,
            [formId]: currentValues.filter((item) => item !== value),
          };
        } else {
          return {
            ...prevValues,
            [formId]: [...currentValues, value as number],
          };
        }
      });
    } else {
      if (index !== null) {
        setDatainput(index, formId, value);
      }
      setInputValues((prevValues) => ({
        ...prevValues,
        [formId]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    await saveToAsyncStorage();
    router.push("/service-req-4");
  };

  return (
    <>
      <SafeAreaView className="flex-1 pt-[56px] px-1 bg-primary-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row space-x-2 items-start">
            <Link href="/service-req-2" asChild>
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
            <View className="w-full rounded-[20px] border border-neutral-700">
              <View className="px-5 py-6">
                <Text className="text-xl text-primary-800 font-psemibold">
                  Formulir
                </Text>
                {result?.map((v: any, index: number) => {
                  if (v.tipedata === "text") {
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.field}
                        </Text>
                        <InputForm
                          placeholder={`Masukkan ${v.field}`}
                          value={(inputValues[v.id] as string) || ""}
                          onChangeText={(value: any) =>
                            handleInputChange(index, v.id, value)
                          }
                        />
                        <Gap height={8} />
                      </View>
                    );
                  } else if (v.tipedata === "number") {
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.field}
                        </Text>
                        <InputForm
                          placeholder={`Masukkan ${v.field}`}
                          type="number"
                          value={(inputValues[v.id] as string) || ""}
                          onChangeText={(value: any) =>
                            handleInputChange(index, v.id, value)
                          }
                        />
                        <Gap height={8} />
                      </View>
                    );
                  } else if (v.tipedata === "date") {
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.field}
                        </Text>
                        {showPicker && (
                          <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={(event, selectedDate) =>
                              onChange(event, selectedDate)
                            }
                          />
                        )}
                        <InputForm
                          onPress={togglePickerDate}
                          placeholder={`Masukkan ${v.field}`}
                          type="date"
                          value={formatDateToIndo(selectedDateNow)}
                          onChangeText={selectedDateNow}
                        />
                        <Gap height={8} />
                      </View>
                    );
                  } else if (v.tipedata === "checkbox") {
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.field}
                        </Text>
                        {v.datajson.map((z: any) => (
                          <View
                            key={z.id}
                            className="flex flex-row space-x-2 mb-2"
                          >
                            <Checkbox
                              onValueChange={(value) =>
                                handleInputChange(index, v.id, z.id, "checkbox")
                              }
                              value={(
                                inputValues[v.id] as Array<number>
                              )?.includes(z.id)}
                              className="bg-neutral-50 border"
                            />
                            <Text>{z.key}</Text>
                          </View>
                        ))}
                        <Gap height={8} />
                      </View>
                    );
                  } else if (v.tipedata === "radio") {
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.field}
                        </Text>
                        {v.datajson.map((z: any) => (
                          <CustomRadioButton
                            key={z.id}
                            label={z.key}
                            onPress={() =>
                              handleInputChange(index, v.id, z.id, "radio")
                            }
                            isSelected={inputValues[v.id] === z.id}
                          />
                        ))}
                        <Gap height={8} />
                      </View>
                    );
                  } else if (v.tipedata === "textarea") {
                    return (
                      <View key={v.id}>
                        <Text className="text-neutral-900 mt-4 mb-2">
                          {v.field}
                        </Text>
                        <InputForm
                          placeholder={`Masukkan ${v.field}`}
                          type="textarea"
                          value={(inputValues[v.id] as string) || ""}
                          onChangeText={(value: any) =>
                            handleInputChange(index, v.id, value)
                          }
                        />
                        <Gap height={8} />
                      </View>
                    );
                  } else {
                    return null;
                  }
                })}
              </View>
            </View>
            <CustomButton
              clx2="text-sm text-white font-white"
              type="button"
              onPress={handleSubmit}
              clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[2vh]"
              title="Lanjut"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default ServiceRequestThree;
