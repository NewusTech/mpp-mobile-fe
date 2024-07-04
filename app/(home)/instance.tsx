import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import InputForm from "@/components/InputForm";
import CardInstance from "@/components/CardInstance";
import { Link } from "expo-router";
import { useInstance } from "@/components/Fetching/home-screen";
import { debounce } from "@/utils";

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
        <View className="bg-primary-700 w-full h-[17vh] py-6 px-1">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft} className="w-10 h-10" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="-mt-5 px-9">
          <InputForm
            placeholder="Cari"
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
