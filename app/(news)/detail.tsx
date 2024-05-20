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

const NewsDetailScreen = () => {
  return (
    <SafeAreaView className="flex-1 py-[56px] px-1">
      <Link href="/home" asChild>
        <TouchableOpacity>
          <Image source={icons.chevronLeft2} className="w-8 h-8" />
        </TouchableOpacity>
      </Link>
      <View className="px-9 mt-6 flex items-center space-y-4">
        <Text className="text-neutral-900 text-[16px] font-pbold">
          Judul Berita
        </Text>
        <Image
          source={images.news1}
          className="w-full h-[204px] object-cover"
        />
        <Text className="text-justify text-sm">
          Lorem ipsum dolor sit amet consectetur. Id pellentesque feugiat
          pellentesque nibh justo at aliquam sapien. Metus egestas vitae elit
          sed ullamcorper venenatis commodo rhoncus morbi. Morbi arcu vestibulum
          viverra nunc scelerisque in magna purus in. Mauris mi nec aliquam
          maecenas sit tempor turpis cras. Bibendum vitae consequat dui tellus
          lacus nec lorem adipiscing. Scelerisque odio diam feugiat quam.
          Maecenas nunc condimentum sit tellus nisl cursus lacus vulputate.
          Aliquam elit augue mattis scelerisque.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
