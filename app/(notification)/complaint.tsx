import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Link, router } from "expo-router";
import {
  useAdminService,
  useDetailService,
  useInstance,
  useMaklumat,
} from "@/service/api";
import RenderHTML from "react-native-render-html";
import { SelectList } from "react-native-dropdown-select-list";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import * as DocumentPicker from "expo-document-picker";
import ShowToast from "@/components/Toast";
import { FormDataPengaduan } from "@/types/type";
import CustomButton from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WithAuth } from "@/components/ProtectedRoute";

const MaklumatScreen = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [selectedAdmin, setSelectedAdmin] = useState(0);
  const [formData, setFormData] = useState<FormDataPengaduan>({
    instansi_id: 0,
    layanan_id: 0,
    status: 0,
    aduan: "",
    judul: "",
    image: "",
    admin_id: 0,
  });
  const { data } = useInstance(100000);

  const { data: service } = useDetailService(100000, selectedInstance);
  const { data: admin } = useAdminService(selectedService);

  const resultInstance = data?.data;
  const resultService = service?.data;
  const resultAdmin = admin?.data;

  const selectListDataInstance = resultInstance?.map((item: any) => ({
    key: item?.id.toString(),
    value: item?.name,
  }));
  const selectListDataService = resultService?.map((item: any) => ({
    key: item?.id.toString(),
    value: item?.name,
  }));
  const selectListDataAdmin = resultAdmin?.map((item: any) => ({
    key: item?.id.toString(),
    value: item?.name,
  }));

  const handleChange = (name: keyof FormDataPengaduan, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInstanceChange = (value: any) => {
    setSelectedInstance(value);
    handleChange("instansi_id", value);
  };

  const handleServiceChange = (value: any) => {
    setSelectedService(value);
    handleChange("layanan_id", value);
  };
  const handleAdminChange = (value: any) => {
    handleChange("admin_id", value);
  };

  const pickDocument = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Hanya memilih file gambar
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelectedImage(image); // Menyimpan gambar yang dipilih
      }
    } catch (err) {
      ShowToast("Error");
      console.error(err);
    }
  };

  const removeImage = () => {
    setSelectedImage(null); // Menghapus gambar dari state
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const formDataObj = new FormData();

    // Append each form data field to FormData object
    formDataObj.append("instansi_id", formData.instansi_id.toString());
    formDataObj.append("layanan_id", formData.layanan_id.toString());
    formDataObj.append("status", formData.status.toString());
    formDataObj.append("aduan", formData.aduan);
    formDataObj.append("judul", formData.judul);
    formDataObj.append("admin_id", formData.admin_id.toString());

    const file = selectedImage;

    const imageFile: any = {
      name: file.name.split(".")[0],
      uri: file.uri,
      type: file.mimeType,
      size: file.size,
    };

    formDataObj.append("image", imageFile);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/pengaduan/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (response.ok) {
        ShowToast(data.message);
        setFormData({
          instansi_id: 0,
          layanan_id: 0,
          status: 0,
          aduan: "",
          judul: "",
          image: "",
          admin_id: 0,
        });
        setSelectedImage(null);
        setSelectedAdmin(0);
        setSelectedInstance(0);
        setSelectedService(0);
        router.push("/home");
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 py-[56px] bg-primary-100">
        <View className="flex flex-row space-x-1">
          <Link href="/complaint-screen" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-xl font-pbold">
            Form Pengaduan
          </Text>
        </View>
        <View className="px-9 mt-5">
          <Text className="text-sm font-psemibold text-neutral-900 mt-4 mb-2">
            Instansi
          </Text>
          <SelectList
            setSelected={handleInstanceChange}
            data={selectListDataInstance}
            searchPlaceholder="Cari Instansi"
            save="key"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh] " />
            }
            placeholder="Pilih Instansi"
            boxStyles={{ borderRadius: 100, borderColor: "#C4C4C4" }}
            search={true}
            inputStyles={{ color: "#000" }}
          />
          <Gap height={10} />
          <Text className="text-sm font-psemibold text-neutral-900 mt-4 mb-2">
            Layanan
          </Text>
          <SelectList
            setSelected={handleServiceChange}
            data={selectListDataService}
            searchPlaceholder="Cari Layanan"
            save="key"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh] " />
            }
            placeholder="Pilih Layanan"
            boxStyles={{
              borderRadius: 100,
              borderColor: "#C4C4C4",
            }}
            search={true}
            inputStyles={{ color: "#000" }}
          />
          <Gap height={10} />
          <Text className="text-sm font-psemibold text-neutral-900 mt-4 mb-2">
            Layanan
          </Text>
          <SelectList
            setSelected={handleAdminChange}
            data={selectListDataAdmin}
            searchPlaceholder="Cari Admin"
            save="key"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh] " />
            }
            placeholder="Pilih Admin"
            boxStyles={{
              borderRadius: 100,
              borderColor: "#C4C4C4",
            }}
            search={true}
            inputStyles={{ color: "#000" }}
          />
          <Gap height={10} />
          <Text className="text-sm font-psemibold text-neutral-900 mt-4 mb-2">
            Judul Pengaduan
          </Text>
          <TextInput
            value={formData.judul}
            onChangeText={(value: any) => handleChange("judul", value)}
            placeholder="Judul Pengaduan"
            className="rounded-full border border-neutral-700 px-5 py-2"
          />
          <Gap height={10} />
          <Text className="text-sm font-psemibold text-neutral-900 mt-4 mb-2">
            Aduan
          </Text>
          <TextInput
            value={formData.aduan}
            onChangeText={(value: any) => handleChange("aduan", value)}
            multiline={true}
            style={{ textAlignVertical: "top" }}
            placeholder="Aduan"
            className="rounded-lg border border-neutral-700 px-5 py-2 h-40"
          />
          <Gap height={10} />
          <Text className="text-sm font-psemibold text-neutral-900 mt-4 mb-2">
            Dokumen
          </Text>
          <TouchableOpacity
            className="w-full border border-neutral-700 h-20 rounded-lg flex items-center justify-center"
            onPress={pickDocument}
          >
            <Text className="text-neutral-700">Klik untuk memilih</Text>
          </TouchableOpacity>
          {selectedImage && (
            <View className="mt-5 space-y-2">
              <Image
                source={{ uri: selectedImage.uri }}
                className="w-full h-40"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={removeImage}
                className="px-5 py-2 bg-error-700 w-20 rounded-full"
              >
                <Text className="text-neutral-50">Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
          {isLoading ? (
            <ActivityIndicator size="large" color="#3568C0" />
          ) : (
            <CustomButton
              clx2="text-sm text-white font-white"
              clx="bg-primary-700 w-full h-[5.5vh] my-[2vh] -mb-14"
              title="Lanjut"
              type="button"
              onPress={handleSubmit}
            />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default WithAuth(MaklumatScreen);
