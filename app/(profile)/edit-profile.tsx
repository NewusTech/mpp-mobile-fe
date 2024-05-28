import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const EditProfile = () => {
  return (
    <SafeAreaView className="flex-1 py-[56px] bg-primary-50">
      <View className="flex flex-row space-x-1">
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <Image source={icons.chevronLeft2} className="w-8 h-8" />
          </TouchableOpacity>
        </Link>
        <Text className="text-primary-800 text-xl font-pbold">
          Edit Profile
        </Text>
      </View>
      <View className="items-end px-9">
        <CustomButton
          clx2="text-sm text-white font-white"
          route="/home"
          clx="bg-primary-700 w-[12vh] h-[5vh] mt-2"
          title="Simpan"
        />
      </View>
      <View className="px-9 mt-2">
        <View>
          <Text className="text-sm font-psemibold text-neutral-900">
            Nama Lengkap
          </Text>
          <Gap height={8} />
          <InputForm placeholder="Nama Lengkap" />
          <Gap height={8} />
        </View>
        <View>
          <Text className="text-sm font-psemibold text-neutral-900">NIK</Text>
          <Gap height={8} />
          <InputForm placeholder="NIK" />
          <Gap height={8} />
        </View>
        <Text className="text-sm font-psemibold text-neutral-900">
          Nomor Telepon
        </Text>
        <Gap height={8} />
        <InputForm placeholder="Nomor Telepon" />
        <Gap height={8} />
        <Text className="text-sm font-psemibold text-neutral-900">Email</Text>
        <Gap height={8} />
        <InputForm placeholder="Email@gmail.com" />
        <Gap height={8} />
        <View className="flex flex-row justify-between">
          <View className="flex flex-row w-5/12">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                Kecamatan
              </Text>
              <InputForm placeholder="Way Halim" />
            </View>
          </View>
          <View className="flex flex-row w-5/12">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                Kecamatan
              </Text>
              <InputForm placeholder="Jagabaya" />
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row w-5/12">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                RT
              </Text>
              <InputForm placeholder="08" />
            </View>
          </View>
          <View className="flex flex-row w-5/12">
            <View className="py-2">
              <Text className="text-sm font-psemibold text-neutral-900">
                RW
              </Text>
              <InputForm placeholder="09" />
            </View>
          </View>
        </View>
        <Text className="text-sm font-psemibold text-neutral-900">
          Kecamatan
        </Text>
        <Gap height={8} />
        <InputForm type="address" placeholder="Alamat" />
        <Gap height={43} />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
