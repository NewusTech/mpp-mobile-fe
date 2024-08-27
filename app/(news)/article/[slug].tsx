import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants";
import { formatDate } from "@/utils";
import { useDetailArticle } from "@/service/api";
import RenderHTML from "react-native-render-html";
import { SvgUri } from "react-native-svg";

const NewsDetailScreen = () => {
  // Mendapatkan nilai slug dari params
  const { slug } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const { data, isLoading } = useDetailArticle(slug);

  const result = data?.data;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator color="#3568C0" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 py-[56px] px-1 mb-7">
        <Link href="/home" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <View className="px-9 mt-6 flex space-y-4">
          <Text className="text-neutral-900 text-center text-[16px] font-pbold">
            {result.title}
          </Text>
          <Image
            source={{ uri: result.image }}
            className="w-full h-[204px] object-cover"
          />
          <View className="flex flex-row items-center space-x-2 mb-5">
            <Text>{result?.Instansi?.name || "PTSP"}</Text>
            <View className="w-1 h-1 bg-black rounded-full"></View>
            <Text>{formatDate(result.createdAt)}</Text>
          </View>
          <RenderHTML
            contentWidth={width}
            source={{ html: result.desc }}
            baseStyle={{ color: "black", marginTop: -15 }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default NewsDetailScreen;
