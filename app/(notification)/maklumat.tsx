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
import { useVisiMisi } from "@/service/api";
import RenderHTML from "react-native-render-html";

const MaklumatScreen = () => {
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
        <View className="px-9 bg-neutral-50 rounded-md">
          <View></View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MaklumatScreen;
