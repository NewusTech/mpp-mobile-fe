import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-700 justify-center px-10">
      <Text className="uppercase text-neutral-50 font-pbold text-[20px]">
        daftar
      </Text>
      <View>
        <Text>Sudah punya akun? silakan </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
