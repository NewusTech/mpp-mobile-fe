import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Bottombar from "@/components/Bottombar";

const HistoryLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="history" options={{ headerShown: false }} />
        <Stack.Screen name="history-queue" options={{ headerShown: false }} />
        <Stack.Screen
          name="history-request/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="dark" backgroundColor="#FEFEFE" />
      <Bottombar />
    </>
  );
};

export default HistoryLayout;
