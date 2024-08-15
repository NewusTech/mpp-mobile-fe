import InputForm from "@/components/InputForm";
import { icons } from "@/constants";
import { Link } from "expo-router";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChangePasswordScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FCFDFE]">
      <View className="py-[56px]">
        <View className="flex flex-row space-x-1">
          <Link href="/profile" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-xl font-pbold">
            Ubah Kata Sandi
          </Text>
        </View>
        <View className="px-9">
          <View className="mt-10">
            <Text className="mb-2">Kata sandi lama</Text>
            <InputForm placeholder="Nomor Telepon" value="" />
          </View>
          <View className="mt-10">
            <Text className="mb-2">Kata sandi baru</Text>
            <InputForm placeholder="Nomor Telepon" value="" />
          </View>
          <View className="mt-10">
            <Text className="mb-2">Ulangi kata sandi baru</Text>
            <InputForm placeholder="Nomor Telepon" value="" type="password" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
