import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import Carousel from "pinar";
import CardInstance from "@/components/CardInstance";
import CardNews from "@/components/CardNews";
import Bottombar from "@/components/Bottombar";
import { Link } from "expo-router";
import {
  useCarousel,
  useInstance,
  useNews,
} from "@/components/Fetching/home-screen";

const HomeScreen = () => {
  const { data, isLoading } = useCarousel();
  const { data: instance, isLoading: instanceLoading } = useInstance();
  const { data: news, isLoading: instanceNews } = useNews();

  const resultCarousel = data?.data;
  const resultInstance = instance?.data;
  const resultNews = news?.data;

  console.log(resultNews);

  return (
    <SafeAreaView className="flex-1 bg-primary-50 relative z-10">
      <Bottombar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-primary-700 w-full h-[12vh] py-6 px-5">
          <View className="flex flex-row justify-between items-start px-4">
            <Text className="text-[16px] w-[156px] text-neutral-50 font-pbold">
              Selamat Datang, User
            </Text>
            <View className="flex flex-row gap-4 -mt-2">
              <Link href="/notification" asChild>
                <TouchableOpacity>
                  <Image source={icons.bell} className="w-[2.8vh] h-[2.8vh]" />
                </TouchableOpacity>
              </Link>
              <Link href="/profile" asChild>
                <TouchableOpacity>
                  <Image
                    source={icons.circleUser}
                    className="w-[2.8vh] h-[2.8vh]"
                  />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
        <View className="py-4 px-6 h-[20vh] rounded-lg">
          <Carousel
            style={{ height: "100%", width: "100%", borderRadius: 20 }}
            showsControls={false}
            loop={true}
            autoplay={true}
            dotStyle={styles.dotStyle}
            activeDotStyle={[styles.dotStyle, { backgroundColor: "white" }]}
          >
            {resultCarousel?.map((img: any) => (
              <Image
                className="w-full h-full rounded-lg mr-10 object-cover"
                source={{ uri: img.image }}
                key={img.name}
              />
            ))}
          </Carousel>
        </View>
        <View className="px-8 mt-3">
          <View className="flex items-end">
            <Link href="/instance">
              <Text className="font-psemibold text-[10px] text-primary-900">
                Lihat Semua
              </Text>
            </Link>
          </View>
          <View className="flex flex-row flex-wrap justify-start -mt-2">
            {resultInstance?.map((v: any) => (
              <CardInstance key={v.id} icon={{ uri: v.image }} title={v.name} />
            ))}
          </View>
        </View>
        <View className="px-8 mt-4">
          <Text className="text-neutral-900 text-[16px] font-psemibold">
            Berita
          </Text>
          <View className="flex items-end">
            <Link href="/news">
              <Text className="font-psemibold text-[10px] text-primary-900">
                Lihat Semua
              </Text>
            </Link>
          </View>
        </View>
        <View className="px-9 flex flex-row flex-wrap justify-between -mt-1 mb-24">
          {resultNews?.map((v: any) => (
            <CardNews
              key={v.id}
              icon={{ uri: v.image }}
              title={v.title}
              date={v.createdAt}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: "silver",
    marginHorizontal: 3,
    borderRadius: 3,
  },
});
