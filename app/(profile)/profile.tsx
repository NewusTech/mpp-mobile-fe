import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { Image, SafeAreaView, Text, View } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="flex items-center justify-center space-y-1">
        <Image source={images.userCircle} className="w-[10vh] h-[10vh]" />
        <Text>Qurrota Aini</Text>
        <Text>12810871781</Text>
        <CustomButton
          clx2="text-sm text-white font-white"
          route="/edit-profile"
          clx="bg-primary-700 w-[12vh] h-[5vh] mt-2"
          title="Edit"
        />
      </View>
      <View className="px-9 py-4">
        <View className="py-2">
          <Text className="text-sm font-psemibold text-neutral-900">
            Nama Lengkap
          </Text>
          <Text className="text-xs text-neutral-900">Qurrota Aini</Text>
        </View>
        <View className="py-2">
          <Text className="text-sm font-psemibold text-neutral-900">NIK</Text>
          <Text className="text-xs text-neutral-900">12810871781</Text>
        </View>
        <View className="py-2">
          <Text className="text-sm font-psemibold text-neutral-900">
            Nomor Telepon
          </Text>
          <Text className="text-xs text-neutral-900">0791829131</Text>
        </View>
        <View className="py-2">
          <Text className="text-sm font-psemibold text-neutral-900">Email</Text>
          <Text className="text-xs text-neutral-900">
            Qurrotaaini@gmail.com
          </Text>
        </View>
        <View className="flex flex-row">
          <View className="flex flex-row w-1/2">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                Kecamatan
              </Text>
              <Text className="text-xs text-neutral-900">Way Halim</Text>
            </View>
          </View>
          <View className="flex flex-row w-1/2">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                Kecamatan
              </Text>
              <Text className="text-xs text-neutral-900">Way Halim</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row">
          <View className="flex flex-row w-1/2">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                RT
              </Text>
              <Text className="text-xs text-neutral-900">08</Text>
            </View>
          </View>
          <View className="flex flex-row w-1/2">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                RW
              </Text>
              <Text className="text-xs text-neutral-900">09</Text>
            </View>
          </View>
        </View>
        <View className="py-2">
          <Text className="text-sm font-psemibold text-neutral-900">
            Alamat
          </Text>
          <Text className="text-xs text-neutral-900">
            Jl. Pangeran Antasari
          </Text>
        </View>
        <View className="flex items-center">
          <CustomButton
            clx2="text-sm text-primary-700 font-white"
            route="/login"
            clx="border border-neutral-500 w-[14vh] h-[5.5vh] mt-[10vh]"
            title="Keluar"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
