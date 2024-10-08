import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="booking" options={{ headerShown: false }} />
      <Stack.Screen name="service-req-1" options={{ headerShown: false }} />
      <Stack.Screen name="service-req-2" options={{ headerShown: false }} />
      <Stack.Screen name="service-req-3" options={{ headerShown: false }} />
      <Stack.Screen name="service-req-4" options={{ headerShown: false }} />
      <Stack.Screen name="success-request" options={{ headerShown: false }} />
      <Stack.Screen
        name="booking-result/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="update-service/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default HomeLayout;
