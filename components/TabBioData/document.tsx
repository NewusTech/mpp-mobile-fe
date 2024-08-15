import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowToast from "../Toast";

interface DocumentInfo {
  name: string;
  size: number | undefined;
  uri: string;
  mimeType: any;
}

interface FileUploadProps {
  label: string;
  imgUrl: { uri: string } | null;
}

const FileUploadComponent = ({ label, imgUrl }: FileUploadProps) => {
  const [file, setFile] = useState<DocumentInfo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (imgUrl) {
      setFile({
        name: imgUrl.uri.split("/").pop() || "default",
        size: undefined,
        uri: imgUrl.uri,
        mimeType: "image/*",
      });
    }
  }, [imgUrl]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View className="flex mt-6 space-y-3">
      <Text className="text-sm text-neutral-800 font-psemibold">{label}</Text>
      {file && (
        <View
          className="relative bg-white p-2 rounded-lg w-full h-44"
          style={{ elevation: 2 }}
        >
          {file.mimeType.startsWith("image/") && (
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={{ uri: file?.uri }}
                className="w-full h-40"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={{ uri: file?.uri }}
                  style={styles.enlargedImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const MultipleFileUpload = (data: any) => {
  const user = data?.data?.data;

  return (
    <View>
      <FileUploadComponent
        imgUrl={{ uri: user?.filektp }}
        label="Kartu Tanda Penduduk"
      />
      <FileUploadComponent
        imgUrl={{ uri: user?.filekk }}
        label="Kartu Keluarga"
      />
      <FileUploadComponent imgUrl={{ uri: user?.foto }} label="Pas Foto" />
      <FileUploadComponent
        imgUrl={{ uri: user?.fileijazahlain }}
        label="Ijazah Terakhir"
      />
      <FileUploadComponent
        imgUrl={{ uri: user?.aktalahir }}
        label="Akta Kelahiran"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MultipleFileUpload;
