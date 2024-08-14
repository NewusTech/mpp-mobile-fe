import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputForm from "@/components/InputForm";
import CardInstance from "@/components/CardInstance";
import { Link } from "expo-router";
import { debounce } from "@/utils";
import { useInstance } from "@/service/api";

const InstanceScreen = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const { data } = useInstance(10000, debouncedSearch);
  const result = data?.data;

  const debouncedSetSearch = useCallback(
    debounce((text: string) => {
      setDebouncedSearch(text);
      setIsDebouncing(false);
    }, 500),
    []
  );

  useEffect(() => {
    setIsDebouncing(true);
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-50 relative z-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative w-full h-[20vh]">
          <Image source={images.Banner} className="w-full h-full" />
          <Link href="/home" asChild className="absolute mt-4">
            <TouchableOpacity>
              <Image source={icons.chevronLeft} className="w-10 h-10" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="-mt-5 px-9">
          <InputForm
            placeholder="Cari Instansi"
            icon={icons.search}
            type="search"
            value={search}
            onChangeText={handleSearchChange}
          />
        </View>
        <View className="px-8 mt-4 h-screen">
          {isDebouncing ? (
            <View className="justify-center">
              <ActivityIndicator color="#3568C0" size="large" />
            </View>
          ) : (
            <View className="flex flex-row flex-wrap justify-start">
              {result?.map((v: any) => (
                <CardInstance
                  route={v.slug}
                  key={v.id}
                  icon={{ uri: v.image }}
                  title={v.name}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InstanceScreen;
