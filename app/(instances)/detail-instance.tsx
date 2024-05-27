import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";

const DetailInstanceScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 py-[56px] px-1 bg-primary-50">
        <View className="flex flex-row space-x-2 items-start">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Image source={images.logoLamtim} className="w-10 h-14 mr-4" />
          <Text className="text-primary-900 text-[16px] font-pbold w-[230px]">
            Dinas Kependudukan dan Catatan Sipil
          </Text>
        </View>
        <View className="flex flex-row justify-between px-10 py-8">
          <CustomButton
            clx2="text-xs text-white font-white fon"
            route="/booking"
            clx="bg-secondary-700 min-w-[18vh] h-[5.5vh]"
            title="Booking Antrian"
          />
          <CustomButton
            clx2="text-xs w-[69px] text-center text-white font-white fon"
            route="/service-req-1"
            clx="bg-primary-700 min-w-[18vh] h-[5.5vh]"
            title="Permohonan Layanan"
          />
        </View>
        <View className="my-[26px] w-full bg-primary-700 h-[1px]"></View>
        <View className="flex space-y-2 px-10">
          <Text className="text-neutral-900 font-psemibold text-sm">
            Informasi Layanan Instansi
          </Text>
          <Text className="text-justify text-neutral-900">
            Lorem ipsum dolor sit amet consectetur. Pellentesque mattis sed
            vitae odio quam. Orci luctus proin ut elit. Ut pulvinar semper
            convallis sit elementum. Porta adipiscing integer id pharetra
            vestibulum odio. Ut sodales quis vel quis integer massa sapien leo
            risus. Sed scelerisque risus at sit. Lectus odio arcu lacinia eget
            risus leo enim nibh. Vestibulum nisl eget eget platea venenatis
            purus turpis a. Magnis non penatibus eu ultrices blandit in
            tristique eget. Sed quisque purus morbi convallis cras proin sit
            odio ut. Pulvinar dolor maecenas consectetur dictum. Pharetra lectus
            pretium urna quisque egestas ultricies condimentum a leo. Tortor ut
            purus nunc augue fusce iaculis orci. Porttitor morbi purus pharetra
            etiam nunc tincidunt. Arcu arcu nisi elementum urna volutpat. Sem
            venenatis tristique ut est pulvinar in. Quis dolor quisque gravida
            ut. Commodo in sed etiam adipiscing. Fringilla semper purus dictum
            urna elit.
          </Text>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default DetailInstanceScreen;
