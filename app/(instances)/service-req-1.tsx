import CustomButton from "@/components/CustomButton";
import Step from "@/components/Step";
import { icons } from "@/constants";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
  ];
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
              setSelected={(val: any) => setSelected(val)}
              data={data}
              save="value"
              arrowicon={
                <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
              }
              placeholder="Pilih Layanan Permohonan"
              boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
              search={false}
              inputStyles={{ color: "#C4C4C4" }}
            />
          </View>
          <View
            className="px-9 py-8"
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View className="space-y-2">
              <Text className="text-lg font-psemibold">Informasi Layanan</Text>
              <Text className="text-sm text-neutral-900 text-justify">
                Lorem ipsum dolor sit amet consectetur. Pellentesque mattis sed
                vitae odio quam. Orci luctus proin ut elit. Ut pulvinar semper
                convallis sit elementum. Porta adipiscing integer id pharetra
                vestibulum odio. Ut sodales quis vel quis integer massa sapien
                leo risus. Sed scelerisque risus at sit. Lectus odio arcu
                lacinia eget risus leo enim nibh. Vestibulum nisl eget eget
                platea venenatis purus turpis a. Magnis non penatibus eu
                ultrices blandit in tristique eget. Sed quisque purus morbi
                convallis cras proin sit odio ut. Pulvinar dolor maecenas
                consectetur dictum. Pharetra lectus pretium urna quisque egestas
                ultricies condimentum a leo.
              </Text>
            </View>
            <CustomButton
              clx2="text-sm text-white font-white"
              route="/service-req-2"
              clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[25vh]"
              title="Lanjut"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default ServiceRequestOne;
