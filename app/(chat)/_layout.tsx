import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ChatLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="chat" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default ChatLayout;
