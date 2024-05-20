import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons, images } from "@/constants";
import CardNews from "@/components/CardNews";

const NewsScreen = () => {
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
        <CardNews
          icon={images.news1}
          title="Kegiatan pada saat ..."
          date="12 April 2022"
        />
        <CardNews
          icon={images.news2}
          title="Kegiatan pada saat ..."
          date="12 April 2022"
        />
        <CardNews
          icon={images.news1}
          title="Kegiatan pada saat ..."
          date="12 April 2022"
        />
        <CardNews
          icon={images.news2}
          title="Kegiatan pada saat ..."
          date="12 April 2022"
        />
        <CardNews
          icon={images.news1}
          title="Kegiatan pada saat ..."
          date="12 April 2022"
        />
        <CardNews
          icon={images.news2}
          title="Kegiatan pada saat ..."
          date="12 April 2022"
        />
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
