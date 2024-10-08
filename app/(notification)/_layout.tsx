import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const NotificationLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="maklumat" options={{ headerShown: false }} />
        <Stack.Screen name="complaint" options={{ headerShown: false }} />
        <Stack.Screen
          name="history-queue/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="complaint-screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="history-request/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="history-skm/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default NotificationLayout;
