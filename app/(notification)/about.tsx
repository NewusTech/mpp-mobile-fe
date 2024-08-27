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

const AboutUs = () => {
  const { data, isLoading } = useVisiMisi();
  const { width } = useWindowDimensions();

  const result = data?.data;

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
            Tentang MPP
          </Text>
        </View>
        <View className="px-9">
          <View>
            <Text className="mt-[27px] text-lg text-primary-800 font-pbold">
              Motto
            </Text>
            <RenderHTML
              source={{ html: result?.motto }}
              contentWidth={width}
              baseStyle={{ color: "black", marginTop: -15 }}
            />
          </View>
          <View>
            <Text className="mt-[27px] text-lg text-primary-800 font-pbold">
              Visi
            </Text>
            <RenderHTML
              source={{ html: result?.visi }}
              contentWidth={width}
              baseStyle={{ color: "black", marginTop: -15 }}
            />
          </View>
          <View>
            <Text className="mt-[27px] text-lg text-primary-800 font-pbold">
              Misi
            </Text>
            <RenderHTML
              source={{ html: result?.misi }}
              contentWidth={width}
              baseStyle={{ color: "black", marginTop: -15 }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AboutUs;
