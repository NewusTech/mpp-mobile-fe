import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { icons } from "@/constants";
import { Link } from "expo-router";
import { useMaklumat } from "@/service/api";
import RenderHTML from "react-native-render-html";

const MaklumatScreen = () => {
  const { data, isLoading } = useMaklumat();
  const { width } = useWindowDimensions();

  const result = data?.data;

  console.log(result);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 py-[56px] bg-primary-100">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 py-[56px] bg-primary-100">
        <View className="flex flex-row space-x-1">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-xl font-pbold">
            Maklumat MPP
          </Text>
        </View>
        <View className="px-9 mt-5">
          <View
            className="bg-neutral-50 rounded-lg relative p-5"
            style={{ elevation: 2 }}
          >
            <RenderHTML
              source={{ html: result?.maklumat?.desc }}
              contentWidth={width}
              baseStyle={{ color: "black", marginTop: -15 }}
            />
            <Image
              source={{ uri: result?.logo?.logo_lamtim }}
              className="w-14 h-14 absolute mt-5 ml-2"
              resizeMode="contain"
            />
            <Image
              source={{ uri: result?.logo?.logo_mpp }}
              className="w-14 h-14 absolute right-2 mt-5"
              resizeMode="contain"
            />
            <View className="flex flex-row flex-wrap space-x-2">
              {result?.instansi?.map((v: any, index: any) => (
                <Image
                  key={index}
                  source={{ uri: v?.image }}
                  className="w-7 h-7 mt-5"
                  resizeMode="contain"
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MaklumatScreen;
