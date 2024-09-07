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
import { SvgUri } from "react-native-svg";
import { Link } from "expo-router";
import {
  useCarousel,
  useFacility,
  useInstance,
  useManualBook,
  useNews,
  useSOP,
} from "@/service/api";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/store/useAuthStore";
import { authentication } from "@/utils";

const CardFacility = ({ image, title }: any) => {
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
  const [currenUser, setCurrentUser] = useState<any>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await authentication(); // Memanggil fungsi untuk mendapatkan token
      setToken(token); // Simpan token di dalam state
    };

    fetchToken();
  }, []);

  const { data, isLoading } = useCarousel();
  const { data: instance, isLoading: instanceLoading } = useInstance(8);
  const { data: news, isLoading: instanceNews } = useNews(2);
  const { data: facilities, isLoading: facilitiesLoading } = useFacility(2);
  const { data: sop, isLoading: sopLoading } = useSOP();
  const { data: manual, isLoading: manualLoading } = useManualBook();
  const { data: maklumat, isLoading: maklumatLoading } = useManualBook();
  const { logout } = useAuthStore();

  const resultCarousel = data?.data;
  const resultInstance = instance?.data;
  const resultNews = news?.data;
  const resultFacility = facilities?.data;
  const resultSop = sop?.data;
  const resultManual = manual?.data;
  const resultMaklumat = maklumat?.data;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleLogout = async () => {
    logout();
  };

  return (
    <SafeAreaView className="flex-1 z-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-primary-700 w-full h-[12vh] py-6 px-5">
          <View className="flex flex-row justify-between items-start px-4">
            <Text className="text-[16px] w-[156px] text-neutral-50 font-pbold">
              Selamat Datang
            </Text>
            <View className="flex flex-row gap-4 -mt-2">
              {token && (
                <Link href="/notification" asChild>
                  <TouchableOpacity>
                    <Image
                      source={icons.bell}
                      className="w-[2.8vh] h-[2.8vh]"
                    />
                  </TouchableOpacity>
                </Link>
              )}
              <TouchableOpacity onPress={toggleDropdown}>
                <Image source={icons.ellipis} className="w-[2.8vh] h-[2.8vh]" />
              </TouchableOpacity>
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
              <SvgUri
                width="100%"
                height="100%"
                uri={img?.image}
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
            <View className="flex flex-row flex-wrap justify-between">
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
                icon={v.image}
                title={v.title}
                date={v.createdAt}
              />
            ))}
          </View>
          <View className="px-8 mt-4">
            <Text className="text-neutral-900 text-[16px] font-psemibold">
              Fasilitas
            </Text>
            <View className="flex items-end mb-2">
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
        {isDropdownVisible && (
          <View
            style={{
              position: "absolute",
              top: 70,
              right: 30,
              width: 155,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Link href="/about" asChild>
              <TouchableOpacity>
                <Text style={{ padding: 10 }}>Tentang MPP</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/maklumat" asChild>
              <TouchableOpacity>
                <Text style={{ padding: 10 }}>Maklumat MPP</Text>
              </TouchableOpacity>
            </Link>
            <Link
              href={{
                pathname: "/documentWebView", // Nama path sesuai dengan file Anda
                params: { link: resultSop?.file },
              }}
              asChild
            >
              <TouchableOpacity>
                <Text style={{ padding: 10 }}>SOP MPP</Text>
              </TouchableOpacity>
            </Link>
            <Link
              href={{
                pathname: "/documentWebView", // Nama path sesuai dengan file Anda
                params: { link: resultManual[0]?.dokumen },
              }}
              asChild
            >
              <TouchableOpacity>
                <Text style={{ padding: 10 }}>Manual MPP</Text>
              </TouchableOpacity>
            </Link>
            {token && (
              <TouchableOpacity
                className="px-[10px] my-2 flex flex-row items-center space-x-3"
                onPress={handleLogout}
              >
                <Text>Logout</Text>
                <Image source={icons.logout} className="w-4 h-4" />
              </TouchableOpacity>
            )}
          </View>
        )}
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
