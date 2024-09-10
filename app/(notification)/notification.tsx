import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Link } from "expo-router";
import NotificationCard from "@/components/Notification";
import { WithAuth } from "@/components/ProtectedRoute";
import { useNotificationAll } from "@/service/api";
import Gap from "@/components/Gap";
import CustomButton from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowToast from "@/components/Toast";

const Notification = () => {
  const { data, mutate } = useNotificationAll();
  const resultNotification = data?.data;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle download click
  const openModal = () => {
    // Show modal when download is clicked
    setModalVisible(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://backend.newus.id/api/notifications`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        ShowToast(data.message);
      }
    } catch (error: any) {
      console.error("Delete notification failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="flex-1 py-[56px] bg-primary-100">
        <View className="flex flex-row space-x-1">
          <Link href="/home" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-xl font-pbold">
            Notification
          </Text>
        </View>
        <View className="px-8 flex items-end">
          <TouchableOpacity onPress={openModal}>
            <Image source={icons.trash} className="w-8 h-8" />
          </TouchableOpacity>
        </View>
        <Gap height={60} />
        {resultNotification.length != 0 ? (
          resultNotification?.map((v: any) => (
            <>
              <NotificationCard
                onPress={openModal}
                key={v.id}
                desc={v.description}
                hour={v.date}
              />
              <Gap height={20} />
              <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={handleCloseModal} // Android back button handling
              >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                  <View className="bg-white p-6 rounded-lg">
                    <Text className="text-lg font-semibold mb-4">
                      Hapus Notifikasi
                    </Text>
                    <Text className="text-gray-600 mb-6">
                      Apakah Anda yakin ingin menghapus semua notifikasi?
                    </Text>
                    <View className="flex flex-row justify-between">
                      {isLoading ? (
                        <View className="min-w-[17.5vh] flex items-center justify-center">
                          <ActivityIndicator color="#3568C0" size="large" />
                        </View>
                      ) : (
                        <CustomButton
                          clx2="text-xs w-[69px] text-center text-white font-white"
                          // route="/service-req-1"
                          clx="bg-primary-700 min-w-[17.5vh] h-[5.5vh]"
                          title="Hapus"
                          type="button"
                          onPress={handleDelete}
                        />
                      )}
                      <CustomButton
                        clx2="text-xs w-[69px] text-center text-white font-white"
                        // route="/service-req-1"
                        clx="bg-neutral-700 min-w-[17.5vh] h-[5.5vh]"
                        title="Batal"
                        type="button"
                        onPress={handleCloseModal}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          ))
        ) : (
          <View className="flex items-center justify-center py-72 bg-primary-100">
            <Text className="pb-10">Tidak notifikasi</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default WithAuth(Notification);
