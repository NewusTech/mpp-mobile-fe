import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";

interface InputFormProps {
  type?: string;
  placeholder: string;
  icon?: any;
  value?: string;
  onChangeText?: any;
  onPress?: () => void;
  secureTextEntry?: boolean;
}

const InputForm = ({
  icon,
  type,
  placeholder,
  value,
  onChangeText,
  onPress,
  secureTextEntry,
}: InputFormProps) => {
  if (type === "password")
    return (
      <View className="flex flex-row items-center bg-white rounded-[20px]">
        <TextInput
          placeholder={placeholder}
          className="bg-white w-[34vh] h-[5vh] py-[10px] rounded-[20px] pl-4"
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onPress}>
          <Image source={icon} className="w-[2.5vh] h-[2.5vh] ml-[10px] pr-4" />
        </TouchableOpacity>
      </View>
    );

  if (type === "nik")
    return (
      <View className="flex flex-row items-center bg-white rounded-[20px] px-4">
        <Image source={icon} className="w-[2.5vh] h-[2.5vh] mr-[10px]" />
        <TextInput
          placeholder={placeholder}
          className="bg-white w-[34vh] h-[5vh] py-[10px] rounded-[20px] pr-4"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );

  if (type === "alamat")
    return (
      <View className="flex flex-row items-center bg-white rounded-[20px] px-4">
        <TextInput
          placeholder={placeholder}
          className="bg-white w-[15vh] h-[5vh] py-[10px] rounded-[20px] pr-4"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );

  if (type === "address")
    return (
      <View className="flex flex-row items-start bg-white rounded-[20px] px-4">
        <TextInput
          placeholder={placeholder}
          className="bg-white w-[34vh] h-[94px] py-[10px] rounded-[20px] pr-4"
          style={{ textAlignVertical: "top" }}
          value={value}
          onChangeText={onChangeText}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    );

  return (
    <View className="flex flex-row items-center bg-white rounded-[20px] px-4">
      <TextInput
        placeholder={placeholder}
        className="bg-white w-[34vh] h-[5vh] py-[10px] rounded-[20px] pr-4"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputForm;
