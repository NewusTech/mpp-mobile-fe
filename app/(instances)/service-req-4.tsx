import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import Step from "@/components/Step";
import { icons } from "@/constants";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 4;

const ServiceRequestFour = () => {
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
          <View className="px-9 py-4 flex items-center">
            <View className="space-y-3">
              <View className="w-full rounded-[20px] border border-neutral-700 px-4 py-[14px] flex flex-row items-center justify-between">
                <View className="space-y-1">
                  <Text className="text-sm text-primary-800 font-psemibold">
                    Nama Dokumen
                  </Text>
                  <Text className="text-xs">
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </View>
                <TouchableOpacity className="px-4 py-2 border rounded-[20px] border-neutral-500">
                  <Text className="text-primary-700">Upload</Text>
                </TouchableOpacity>
              </View>
              <View className="w-full rounded-[20px] border border-neutral-700 px-4 py-[14px] flex flex-row items-center justify-between">
                <View className="space-y-1">
                  <Text className="text-sm text-primary-800 font-psemibold">
                    Nama Dokumen
                  </Text>
                  <Text className="text-xs">
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </View>
                <TouchableOpacity className="px-4 py-2 border rounded-[20px] border-neutral-500">
                  <Text className="text-primary-700">Upload</Text>
                </TouchableOpacity>
              </View>
              <View className="w-full rounded-[20px] border border-neutral-700 px-4 py-[14px] flex flex-row items-center justify-between">
                <View className="space-y-1">
                  <Text className="text-sm text-primary-800 font-psemibold">
                    Nama Dokumen
                  </Text>
                  <Text className="text-xs">
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </View>
                <TouchableOpacity className="px-4 py-2 border rounded-[20px] border-neutral-500">
                  <Text className="text-primary-700">Upload</Text>
                </TouchableOpacity>
              </View>
              <View className="w-full rounded-[20px] border border-neutral-700 px-4 py-[14px] flex flex-row items-center justify-between">
                <View className="space-y-1">
                  <Text className="text-sm text-primary-800 font-psemibold">
                    Nama Dokumen
                  </Text>
                  <Text className="text-xs">
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </View>
                <TouchableOpacity className="px-4 py-2 border rounded-[20px] border-neutral-500">
                  <Text className="text-primary-700">Upload</Text>
                </TouchableOpacity>
              </View>
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
