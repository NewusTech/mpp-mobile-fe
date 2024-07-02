import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SurveyLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="skm" options={{ headerShown: false }} />
        <Stack.Screen name="fill-skm" options={{ headerShown: false }} />
        <Stack.Screen name="success" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default SurveyLayout;
