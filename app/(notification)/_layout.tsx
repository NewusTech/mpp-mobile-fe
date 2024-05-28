import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const NotificationLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default NotificationLayout;