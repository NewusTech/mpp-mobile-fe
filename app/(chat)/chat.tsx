import ChatList from "@/components/Chat";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  return (
    <SafeAreaView className="flex-1 pt-[26px] px-1 bg-primary-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row space-x-2 items-start">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-[20px] font-pbold w-[260px]">
            Chat
          </Text>
        </View>
        <View className="px-9 pb-10">
          <Text>
            Silahkan pilih kontak layanan, percakapan akan dialihkan ke petugas
            layanan yang dipilih
          </Text>
          <ChatList
            title="Dinas Kependudukan dan Catatan Sipil"
            img={images.logoLamtim}
          />
          <ChatList title="Polres Lampung Timur" img={images.polda} />
          <ChatList title="BPJS Kesehatan" img={images.bpjs} />
          <ChatList title="PLN Lampung Timur" img={images.pln} />
          <ChatList title="BNN Lampung Timur" img={images.bnn} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ChatScreen;
