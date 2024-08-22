import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Bottombar from "@/components/Bottombar";

const NewsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="news" options={{ headerShown: false }} />
        <Stack.Screen name="facilities" options={{ headerShown: false }} />
        <Stack.Screen name="article/[slug]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
      <Bottombar />
    </>
  );
};

export default NewsLayout;
