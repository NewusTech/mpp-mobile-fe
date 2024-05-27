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
const currentStep = 3;

const ServiceRequestThree = () => {
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
            <View className="w-full rounded-[20px] border border-neutral-700">
              <View className="px-5 py-6">
                <Text className="text-sm text-primary-800 font-psemibold">
                  Formulir
                </Text>
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Pertanyaan
                </Text>
                <InputForm placeholder="Jawaban" />
                <Gap height={8} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">NIK</Text>
                <InputForm placeholder="NIK" />
                <Gap height={8} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Nomor Telfon
                </Text>
                <InputForm placeholder="Nomor Telepon" />
                <Gap height={8} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Alamat
                </Text>
                <InputForm placeholder="Alamat" />
              </View>
            </View>
            <CustomButton
              clx2="text-sm text-white font-white"
              route="/service-req-4"
              clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[10vh]"
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
