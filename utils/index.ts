import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import * as FileSystem from "expo-file-system";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

export function truncateString(str: string, num: number): string {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const formatDateToString = (date: any) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Adding leading zero
  return `${year}-${month}-${day}`;
};

export const formatDateToIndo = (date: any) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: id });
};

export const formatDateTimeToIndo = (date: any) => {
  return format(new Date(date), "HH:mm", { locale: id });
};

export function formatDateA(dateString?: any): any | undefined {
  if (!dateString) {
    return undefined; // Jika dateString tidak didefinisikan atau null, kembalikan undefined
  }

  const date = new Date(dateString);

  // Cek apakah objek Date valid
  if (isNaN(date.getTime())) {
    return undefined; // Jika objek Date tidak valid, kembalikan undefined
  }

  const day = String(date.getDate()).padStart(2, "0"); // Mengambil tanggal dan menambahkan nol jika perlu
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mengambil bulan (perhatikan bulan dimulai dari 0) dan menambahkan nol jika perlu
  const year = date.getFullYear(); // Mengambil tahun

  return `${day}-${month}-${year}`; // Menggabungkan semuanya dalam format dd-mm-yyyy
}

export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export default async function downloadFile(
  urlDownload: string,
  fileName: string,
  token?: string | null
) {
  try {
    // Request directory permissions from the user
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
      const pdfUrl = urlDownload;

      // Download the PDF to a temporary location
      const downloadResult = await FileSystem.downloadAsync(
        pdfUrl,
        FileSystem.cacheDirectory + "temp.pdf",
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`, // Menambahkan header otentikasi
              },
            }
          : undefined
      );

      // Read the file content as binary
      const fileContent = await FileSystem.readAsStringAsync(
        downloadResult.uri,
        {
          encoding: FileSystem.EncodingType.Base64, // Base64 for binary content
        }
      );

      // Create a file in the user-selected directory
      const newFileUri =
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          `${fileName}.pdf`,
          "application/pdf"
        );

      // Write the file content to the new location as binary
      await FileSystem.writeAsStringAsync(newFileUri, fileContent, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return `Berhasil Mendowload File`;
    } else {
      return `Gagal Mendownload File, permission error`;
    }
  } catch (error) {
    return `Error downloading the file: ${error}`;
  }
}

export const authentication = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    console.log(finalStatus);
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;

    // Simpan token ke AsyncStorage
    await AsyncStorage.setItem("expoPushToken", token);

    return token;
  } else {
    alert("Must use physical device for Push Notifications");
  }
}
