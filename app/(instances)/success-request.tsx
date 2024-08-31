import { WithAuth } from "@/components/ProtectedRoute";
import { images } from "@/constants";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

const SuccessRequest = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home"); // ganti 'Home' dengan nama rute yang sesuai untuk layar home Anda
    }, 2000);

    return () => clearTimeout(timer); // Membersihkan timer jika komponen di-unmount sebelum timeout selesai
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary-700">
      <View className="bg-neutral-50 w-[150px] h-[150px] rounded-full items-center justify-center mb-5">
        <Image source={images.Check} className="w-[96px] h-[96px]" />
      </View>
      <Text className="text-success-700  font-semibold text-[16px] mb-2">
        Selesai!
      </Text>
      <Text className="text-center w-[289px] text-sm text-neutral-50">
        Terima kasih telah mengajukan permohonan layanan online.
      </Text>
    </SafeAreaView>
  );
};

export default WithAuth(SuccessRequest);
