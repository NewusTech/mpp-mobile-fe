import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/CustomButton";
import ShowToast from "@/components/Toast";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "expo-router";
import { loginUser } from "@/service/api";

const LoginScreen = () => {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = useAuthStore((state) => state.login);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser({ nik, password });
      if (data.status === 200) {
        login(data.data.token);
        ShowToast("Login Berhasil");
      }
      if (data.status === 403) {
        ShowToast("Password dan email tidak valid");
      }
      console.log(data);
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async () => {
    const url = "https://mpp.lampungtimurkab.go.id/forgot-password";

    // Cek apakah URL dapat dibuka
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Buka URL di browser
      await Linking.openURL(url);
    } else {
      ShowToast(`Can't open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-100 justify-center px-10">
      <View className="flex items-center mb-10">
        <View className="flex items-center">
          <View className="w-[300px] h-[300px]">
            <Image
              source={images.maps}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          {/* <View className="flex items-center mt-4">
            <Text className="text-lg font-psemibold uppercase text-primary-700">
              Mal Pelayana Publik
            </Text>
            <Text className="text-lg uppercase text-primary-700 -mt-2">
              kabupaten lampung timur
            </Text>
          </View> */}
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
      <View className="flex flex-row my-2 justify-between">
        <TouchableOpacity onPress={handlePress}>
          <Text className="underline text-primary-700 text-sm">
            Lupa Kata Sandi?
          </Text>
        </TouchableOpacity>
        <View>
          <Text className="text-primary-700 text-sm">
            Belum Punya akun? silakan
          </Text>
          <Link href="/register" asChild>
            <TouchableOpacity className="flex flex-row justify-end">
              <Text className="underline text-primary-800 text-xs font-psemibold">
                Daftar
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <View className="flex items-center justify-center mt-4">
        {loading ? (
          <ActivityIndicator size="large" color="#3568C0" />
        ) : (
          <CustomButton
            onPress={handleLogin}
            clx="bg-primary-700 w-[14.5vh] h-[5.8vh]"
            clx2="text-sm text-neutral-50 font-psemibold"
            title="Masuk"
            type="button"
          />
        )}
        {error && <Text className="text-error-700 pt-4">{error}</Text>}
      </View>

      <View className="mt-5">
        <Text className="text-primary-700 text-xs text-center">
          Dengan mendaftar, Anda menyetujui{" "}
          <Text className="font-psemibold">Syarat & Ketentuan</Text> kami dan
          Anda telah membaca{" "}
          <Text className="font-psemibold">Kebijakan Privasi </Text>
          kami.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
