import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import TabBioData from "@/components/TabBioData";
import { useCurrentUser } from "@/service/api";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

const Profile = () => {
  const { data } = useCurrentUser();
  const user = data?.data;

  return (
    <SafeAreaView className="flex-1 justify-center bg-primary-50">
      <ScrollView>
        <View className="py-14">
          <View className="flex px-9 space-y-1">
            <View className="flex flex-row">
              <Image
                source={{ uri: user?.fotoprofil }}
                className="w-[10vh] h-[10vh] rounded-full"
              />
              <Gap width={10} />
              <View className="w-full">
                <View className="space-y-1">
                  <Text className="text-neutral-900">{user?.name}</Text>
                  <Text className="text-neutral-700">{user?.nik}</Text>
                </View>
                <View className="flex flex-row">
                  <CustomButton
                    clx2="text-sm text-primary-700 font-white"
                    route="/edit-profile"
                    clx="bg-neutral-50 w-[12vh] border border-neutral-500 h-[5vh] mt-2"
                    title="Edit"
                  />
                  <Gap width={10} />
                  <CustomButton
                    clx2="text-sm text-primary-700 font-white"
                    route="/change-password"
                    clx="bg-neutral-50 w-[15vh] border border-neutral-500 h-[5vh] mt-2"
                    title="Ganti Kata Sandi"
                  />
                </View>
              </View>
            </View>
          </View>
          <Gap height={10} />
          <TabBioData data={user} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
