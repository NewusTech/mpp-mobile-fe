import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { icons } from "@/constants";
import { Link } from "expo-router";

const Notification = () => {
  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
      <View className="flex flex-row space-x-1">
        <Link href="/home" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">
          Notification
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
