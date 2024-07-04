import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Bottombar from "@/components/Bottombar";

const HomeLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="instance" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#3568C0" />
      <Bottombar />
    </>
  );
};

export default HomeLayout;
