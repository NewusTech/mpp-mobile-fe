import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons, images } from "@/constants";
import CardNews from "@/components/CardNews";
import { useNews } from "@/service/api";

const NewsScreen = () => {
  const { data, isLoading } = useNews(10000);

  const resultNews = data?.data;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator color="#3568C0" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 py-[56px] px-1">
      <View className="flex flex-row space-x-1">
        <Link href="/home" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">Berita</Text>
      </View>
      <View className="px-9 flex flex-row flex-wrap justify-between gap-x-2 mt-6">
        {resultNews?.map((v: any) => (
          <CardNews
            route={v.slug}
            key={v.id}
            icon={{ uri: v.image }}
            title={v.title}
            date={v.createdAt}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
