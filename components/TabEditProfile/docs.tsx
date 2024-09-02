import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ShowToast from "../Toast";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../CustomButton";
import Gap from "../Gap";
import { router } from "expo-router";

const Docs = ({
  label,
  image,
  setSelectedImage,
}: {
  label: string;
  image: string;
  setSelectedImage: (image: any) => void;
}) => {
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

  return (
    <View className="py-1">
      <Text className="text-sm font-psemibold text-neutral-900 mt-4 mb-2">
        {label}
      </Text>
      <TouchableOpacity
        className="w-full border border-neutral-700 h-20 rounded-lg flex items-center justify-center"
        onPress={pickDocument}
      >
        <Text className="text-neutral-700">Klik untuk memilih</Text>
      </TouchableOpacity>
      {image && (
        <View className="mt-5 space-y-2">
          <Image
            source={{ uri: image }}
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
    </View>
  );
};

const DocsTab = (data: any) => {
  const result = data?.data;
  const [ktp, setKtp] = useState<any>({ uri: result?.filektp });
  const [kk, setKk] = useState<any>({ uri: result?.filekk });
  const [foto, setFoto] = useState<any>({ uri: result?.foto });
  const [aktaLahir, setAktaLahir] = useState<any>({ uri: result?.aktalahir });
  const [ijazah, setIjazah] = useState<any>({ uri: result?.fileijazahlain });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const formDataObj = new FormData();

    const appendImageToFormIfChanged = (
      fieldName: string,
      originalImageUri: string,
      newImage: any
    ) => {
      if (newImage && newImage.uri && newImage.uri.startsWith("file://")) {
        const imageFile: any = {
          name: newImage.name.split(".")[0], // Menggunakan nama default jika `name` tidak ada
          uri: newImage.uri,
          type: newImage.mimeType,
          size: newImage.size,
        };
        formDataObj.append(fieldName, imageFile);
      }
    };

    // Append hanya jika gambar telah diubah
    appendImageToFormIfChanged("filektp", result?.filektp?.uri, ktp);
    appendImageToFormIfChanged("filekk", result?.filekk?.uri, kk);
    appendImageToFormIfChanged("foto", result?.foto?.uri, foto);
    appendImageToFormIfChanged("aktalahir", result?.aktalahir?.uri, aktaLahir);
    appendImageToFormIfChanged(
      "fileijazahlainfoto",
      result?.fileijazahlain?.uri,
      ijazah
    );

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/userinfo/updatedocs/${result?.slug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.ok) {
        ShowToast(res.message);
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("result", kk);

  return (
    <View>
      <Docs label="KTP" image={ktp.uri} setSelectedImage={setKtp} />
      <Docs label="Kartu Keluarga" image={kk.uri} setSelectedImage={setKk} />
      <Docs label="Foto" image={foto.uri} setSelectedImage={setFoto} />
      <Docs
        label="Akta Lahir"
        image={aktaLahir.uri}
        setSelectedImage={setAktaLahir}
      />
      <Docs
        label="Ijazah Terakhir"
        image={ijazah.uri}
        setSelectedImage={setIjazah}
      />

      <Gap height={10} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#3568C0" />
      ) : (
        <CustomButton
          clx2="text-sm text-white font-white"
          clx="bg-primary-700 w-full h-[5.5vh] my-[2vh] -mb-14"
          title="Simpan"
          type="button"
          onPress={handleSubmit}
        />
      )}
      <Gap height={10} />
    </View>
  );
};

export default DocsTab;
