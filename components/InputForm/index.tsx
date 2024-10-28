import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { InputFormProps } from "@/types/type";
import Checkbox from "expo-checkbox";

const InputForm = ({
  icon,
  type,
  placeholder,
  value,
  onChangeText,
  onPress,
  placeholderColor,
  secureTextEntry,
}: InputFormProps) => {
  if (type === "password")
    return (
      <View className="flex flex-row items-center bg-neutral-50 rounded-[20px] border border-neutral-700">
        <TextInput
          placeholder={placeholder}
          className="bg-neutral-50 w-[34vh] h-[5vh] py-[10px] rounded-[20px] pl-4 "
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderColor}
        />
        <TouchableOpacity onPress={onPress}>
          <Image source={icon} className="w-[2.5vh] h-[2.5vh] ml-[10px] pr-4" />
        </TouchableOpacity>
      </View>
    );

  if (type === "nik")
    return (
      <View className="flex flex-row items-center bg-neutral-50 rounded-[20px] px-4 border">
        <Image source={icon} className="w-[2.5vh] h-[2.5vh] mr-[10px]" />
        <TextInput
          placeholder={placeholder}
          className="bg-neutral-50 w-[34vh] h-[5vh] py-[10px] rounded-[20px] pr-4 "
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );

  if (type === "alamat")
    return (
      <TextInput
        placeholder={placeholder}
        className="bg-neutral-50 w-[18.5vh] h-[5vh] py-[10px] rounded-[20px] pr-4 border border-neutral-700 px-4"
        value={value}
        onChangeText={onChangeText}
      />
    );

  if (type === "address")
    return (
      <View className="flex flex-row items-start bg-neutral-50 rounded-[20px]">
        <TextInput
          placeholder={placeholder}
          className="bg-neutral-50 w-full h-[94px] py-[10px] rounded-[20px] border border-neutral-700 px-4"
          style={{ textAlignVertical: "top" }}
          value={value}
          onChangeText={onChangeText}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    );

  if (type === "date")
    return (
      <Pressable onPress={onPress}>
        <TextInput
          className="bg-neutral-50 text-black w-full px-4 h-[5vh] py-[10px] rounded-[20px] pr-4 border border-neutral-700"
          placeholder="Tanggal Lahir"
          value={value}
          onChangeText={onChangeText}
          editable={false}
        />
      </Pressable>
    );

  if (type === "textarea")
    return (
      <View className="flex flex-row items-start bg-neutral-50 rounded-[20px]">
        <TextInput
          placeholder={placeholder}
          className="bg-neutral-50 w-full h-[94px] py-[10px] rounded-[20px] border border-neutral-700 px-4"
          style={{ textAlignVertical: "top" }}
          value={value}
          onChangeText={onChangeText}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    );

  if (type === "number")
    return (
      <View className="flex flex-row items-start bg-neutral-50 rounded-[20px]">
        <TextInput
          placeholder={placeholder}
          className="bg-neutral-50 w-full px-4 h-[5vh] py-[10px] rounded-[20px] pr-4 border border-neutral-700"
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
        />
      </View>
    );

  if (type === "search")
    return (
      <View
        style={{ elevation: 5 }}
        className="flex flex-row items-center bg-neutral-50 rounded-[20px] z-20 px-4"
      >
        <Image source={icon} className="w-[2.5vh] h-[2.5vh] mr-[10px]" />
        <TextInput
          placeholder={placeholder}
          className="bg-neutral-50 w-[34vh] h-[5vh] py-[10px] rounded-[20px] pr-4"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );

  return (
    <View className="flex flex-row items-center bg-neutral-50 rounded-[20px]">
      <TextInput
        placeholder={placeholder}
        className="bg-neutral-50 w-full px-4 h-[5vh] py-[10px] rounded-[20px] pr-4 border border-neutral-700"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputForm;
