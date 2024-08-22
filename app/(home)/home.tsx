import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import Carousel from "pinar";
import CardInstance from "@/components/CardInstance";
import CardNews from "@/components/CardNews";
import Bottombar from "@/components/Bottombar";
import { Link } from "expo-router";
import { withAuth } from "@/components/ProtectedRoute";
import { useCarousel, useFacility, useInstance, useNews } from "@/service/api";
import { useState } from "react";

const CardFacility = ({ image, title, route }: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
        className="w-[48%] h-[132px] bg-neutral-50 rounded"
      >
        <Image
          source={image}
          resizeMode="cover"
          className="w-full h-[99px] rounded-t"
        />
        <Text className="px-2 py-1 text-primary-700 font-psemibold text-xs">
          {title}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={image}
              style={styles.enlargedImage}
              resizeMode="cover"
            />
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const HomeScreen = () => {
  const { data, isLoading } = useCarousel();
  const { data: instance, isLoading: instanceLoading } = useInstance(4);
  const { data: news, isLoading: instanceNews } = useNews(2);
  const { data: facilities, isLoading: facilitiesLoading } = useFacility(2);

  const resultCarousel = data?.data;
  const resultInstance = instance?.data;
  const resultNews = news?.data;
  const resultFacility = facilities?.data;

  return (
    <SafeAreaView className="flex-1 z-10">
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
        <View className="h-[25vh] rounded-lg">
          <Carousel
            style={{ height: "100%", width: "100%" }}
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
                key={img.id}
              />
            ))}
          </Carousel>
        </View>
        <View className="bg-primary-100 w-full -mt-16 rounded-t-[40px]">
          <View className="px-8 mt-8">
            <View className="flex items-end">
              <Link href="/instances">
                <Text className="font-psemibold text-xs text-primary-900">
                  Lihat Semua
                </Text>
              </Link>
            </View>
            <View className="flex flex-row flex-wrap justify-start">
              {resultInstance?.map((v: any) => (
                <CardInstance
                  key={v.id}
                  route={v.slug}
                  icon={{ uri: v.image }}
                  title={v.name}
                />
              ))}
            </View>
          </View>
          <View className="px-8 mt-4">
            <Text className="text-neutral-900 text-[16px] font-psemibold">
              Berita
            </Text>
            <View className="flex items-end">
              <Link href="/news">
                <Text className="font-psemibold text-xs text-primary-900">
                  Lihat Semua
                </Text>
              </Link>
            </View>
          </View>
          <View className="px-9 flex flex-row flex-wrap justify-between">
            {resultNews?.map((v: any) => (
              <CardNews
                route={v.slug}
                key={v.id}
                icon={{ uri: v.image }}
                title={v.title}
                date={v.createdAt}
              />
            ))}
          </View>
          <View className="px-8 mt-4">
            <Text className="text-neutral-900 text-[16px] font-psemibold">
              Fasilitas
            </Text>
            <View className="flex items-end">
              <Link href="/facilities">
                <Text className="font-psemibold text-xs text-primary-900">
                  Lihat Semua
                </Text>
              </Link>
            </View>
          </View>
          <View className="px-9 flex flex-row flex-wrap justify-between mb-24">
            {resultFacility?.map((v: any) => (
              <CardFacility
                route={v.slug}
                key={v.id}
                image={{ uri: v.image }}
                title={v.title}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withAuth(HomeScreen);

const styles = StyleSheet.create({
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: "silver",
    marginHorizontal: 3,
    borderRadius: 3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  enlargedImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
