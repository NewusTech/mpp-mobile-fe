import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="instance" options={{ headerShown: false }} />
      <Stack.Screen name="detail-instance" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
