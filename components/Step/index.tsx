import { CardServiceProps } from "@/types/type";
import { Text, View } from "react-native";

const Step = ({ title, isLastStep, isActive }: CardServiceProps) => {
  return (
    <View className="flex flex-row items-center">
      <View
        className={`h-10 w-10 rounded-full flex items-center justify-center border border-primary-700 ${
          isActive ? "bg-primary-700" : "bg-transparent"
        }`}
      >
        <Text className={isActive ? "text-neutral-50" : "text-primary-700"}>
          {title}
        </Text>
      </View>
      {!isLastStep && (
        <View className="w-[6.8vh] bg-secondary-700 h-[3px]"></View>
      )}
    </View>
  );
};

export default Step;
