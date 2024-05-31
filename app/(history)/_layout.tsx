import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const HistoryLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="history" options={{ headerShown: false }} />
        <Stack.Screen name="history-queue" options={{ headerShown: false }} />
        <Stack.Screen name="history-request" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default HistoryLayout;
