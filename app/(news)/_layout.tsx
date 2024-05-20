import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const NewsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="news" options={{ headerShown: false }} />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default NewsLayout;
