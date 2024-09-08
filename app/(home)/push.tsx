import React, { useEffect, useState } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

// Set Notification Handler untuk menampilkan notifikasi
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Push() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );
  }, []);

  // Fungsi untuk meminta izin dan mendapatkan lokasi saat ini
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let currentLocation: any = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    sendPushNotification(currentLocation);
  };

  // Fungsi untuk mengirim notifikasi dengan lokasi
  const sendPushNotification = async (locationData: any) => {
    const { coords } = locationData;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Location Update 📍",
        body: `Current location: (${coords.latitude}, ${coords.longitude})`,
        data: { someData: "location data here" },
      },
      trigger: null, // Null trigger untuk segera mengirim notifikasi
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Your Expo Push Token: {expoPushToken}</Text>
      {location ? (
        <Text>Current Location: {JSON.stringify(location)}</Text>
      ) : (
        <Text>{errorMsg ? errorMsg : "Waiting for location..."}</Text>
      )}
      <Button title="Get Location & Send Notification" onPress={getLocation} />
    </View>
  );
}

// Fungsi untuk meminta izin notifikasi dan mendapatkan token push
async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
