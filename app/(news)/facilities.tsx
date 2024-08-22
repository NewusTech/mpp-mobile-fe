import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { icons } from "@/constants";
import { useFacility } from "@/service/api";

const CardFacility = ({ image, title }: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
        className="w-full h-[199px] bg-neutral-50 rounded mb-5"
      >
        <Image
          source={image}
          resizeMode="cover"
          className="w-full h-[159px] rounded-t"
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

const FacilitiesScreen = () => {
  const { data, isLoading } = useFacility(10000);

  const resultNews = data?.data;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator color="#3568C0" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 py-[56px] px-1">
        <View className="flex flex-row space-x-1">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-xl font-pbold">Fasilitas</Text>
        </View>
        <View className="px-9 flex flex-row flex-wrap justify-between gap-x-2 mt-6">
          {resultNews?.map((v: any) => (
            <CardFacility
              route={v.slug}
              key={v.id}
              image={{ uri: v.image }}
              title={v.title}
            />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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

export default FacilitiesScreen;
