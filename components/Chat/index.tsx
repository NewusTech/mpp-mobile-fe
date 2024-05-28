import { ChatProps } from "@/types/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ChatList = ({ img, title }: ChatProps) => {
  return (
    <TouchableOpacity
      className="bg-neutral-50 w-full h-[60px] flex flex-row mt-4 rounded-[20px] px-4 py-2 items-center space-x-5"
      style={{ elevation: 3 }}
    >
      <View className="w-[29px] h-10 flex items-center justify-center">
        <Image source={img} className="w-full h-full" resizeMode="contain" />
      </View>
      <Text className="text-[11px] font-psemibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default ChatList;
