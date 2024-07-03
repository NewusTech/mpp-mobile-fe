import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { loginUser } from "@/components/Fetching/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowToast from "@/components/Toast";

const LoginScreen = () => {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser({ nik, password });
      if (data.status === 200) {
        await AsyncStorage.setItem("token", data.data.token);
        ShowToast("Login Berhasil");
        router.push("/home");
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100 justify-center px-10">
      <View className="flex items-center mb-10">
        <View className="flex items-center">
          <View className="w-[137px] h-[110px] mb-1">
            <Image
              source={images.maps}
              className="w-full h-full object-cover"
            />
          </View>
          <View className="flex items-center">
            <Text className="text-[18px] font-psemibold uppercase text-primary-700">
              Mal Pelayana Publik
            </Text>
            <Text className="text-sm uppercase text-primary-700">
              kabupaten lampung timur
            </Text>
          </View>
        </View>
      </View>
      <View className="flex">
        <Text className="text-primary-800 text-sm font-psemibold mb-4">
          Silakan Masuk
        </Text>
        <View className="gap-2 flex">
          <InputForm
            icon={icons.user}
            type="nik"
            placeholder="NIK"
            value={nik}
            onChangeText={setNik}
          />
          <View className="mt-12"></View>
          <InputForm
            icon={isPasswordVisible ? icons.eyeOff : icons.eye}
            type="password"
            placeholder="Kata Sandi"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            onPress={togglePasswordVisibility}
          />
        </View>
      </View>
      <View className="flex flex-row gap-1 my-2 justify-end">
        <Text className="text-primary-700 text-sm">
          Belum Punya akun? silakan
        </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text className="underline text-primary-800 text-sm">Daftar</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className="flex items-center justify-center mt-8">
        {loading ? (
          <ActivityIndicator size="large" color="#3568C0" />
        ) : (
          <CustomButton
            onPress={handleLogin}
            clx="bg-primary-700 w-[14.5vh] h-[4.8vh]"
            clx2="text-sm text-neutral-50 font-psemibold"
            title="Masuk"
            type="button"
          />
        )}
        {error && <Text className="text-error-700 pt-4">{error}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
