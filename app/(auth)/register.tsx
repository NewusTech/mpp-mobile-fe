import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import InputForm from "@/components/InputForm";
import Gap from "@/components/Gap";
import CustomButton from "@/components/CustomButton";

const RegisterScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-700 justify-center px-10">
      <Text className="uppercase text-neutral-50 font-pbold text-[20px]">
        daftar
      </Text>
      <View className="flex flex-row gap-1">
        <Text className="text-neutral-50 text-[10px]">
          Sudah punya akun? silakan
        </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text className="underline text-primary-800 text-[10px]">
              Masuk
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Text className="text-sm text-primary-800 font-psemibold mt-6 mb-4">
        Data Diri
      </Text>
      <InputForm placeholder="Nama Lengkap" />
      <Gap height={8} />
      <InputForm placeholder="NIK" />
      <Gap height={8} />
      <InputForm placeholder="Nomor Telepon" />
      <Gap height={8} />
      <InputForm placeholder="Email@gmail.com" />
      <Text className="text-sm text-primary-800 font-psemibold mt-4 mb-6">
        Alamat
      </Text>
      <View className="flex flex-row">
        <InputForm type="alamat" placeholder="Kecamatan" />
        <Gap width={16} />
        <InputForm type="alamat" placeholder="Desa" />
      </View>
      <Gap height={8} />
      <View className="flex flex-row">
        <InputForm type="alamat" placeholder="RT" />
        <Gap width={16} />
        <InputForm type="alamat" placeholder="RW" />
      </View>
      <Gap height={8} />
      <InputForm type="address" placeholder="Alamat" />
      <Gap height={43} />
      <View className="flex items-center justify-center">
        <CustomButton
          route="/home"
          clx2="text-sm text-primary-800 font-psemibold"
          clx="bg-neutral-50 w-[14.5vh] h-[4.8vh] text-sm text-primary-800 font-psemibold"
          title="Daftar"
          type="link"
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
