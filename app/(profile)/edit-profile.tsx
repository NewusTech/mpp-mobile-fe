import { icons } from "@/constants";
import { Link, router } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCurrentUser } from "@/service/api";
import { WithAuth } from "@/components/ProtectedRoute";
import TabEditProfile from "@/components/TabEditProfile";

const EditProfile = () => {
  const { data, isLoading } = useCurrentUser();
  const result = data?.data;
  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <ScrollView>
        <View className=" py-[56px]">
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
          <TabEditProfile data={result} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithAuth(EditProfile);
