import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const SelectValueSurvey = ({ title }: { title: string }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <Text className="text-center text-primary-800">{title}</Text>
      <View className="flex mt-4 space-y-2 mb-6">
        <View className="flex flex-row justify-between items-center gap-2">
          <Text className="w-[50px] text-center text-black">Tidak Sesuai</Text>
          <Text className="w-[50px] text-center text-black">Kurang Sesuai</Text>
          <Text className="w-[50px] text-center text-black">Sesuai</Text>
          <Text className="w-[50px] text-center text-black">Sangat Sesuai</Text>
        </View>
        <View className="flex flex-row justify-between">
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setSelected(item)}
              className={`rounded-full h-[50px] w-[50px] items-center justify-center ${
                selected === item
                  ? "bg-primary-700"
                  : "border border-primary-700"
              }`}
            >
              <Text
                className={`font-psemibold text-xs ${
                  selected === item ? "text-neutral-50" : "text-neutral-900"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default SelectValueSurvey;
