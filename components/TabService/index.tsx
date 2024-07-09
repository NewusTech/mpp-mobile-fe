import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TabServiceProps {
  service: string;
  law: string;
  requirement: string;
}

const TabService = ({ service, law, requirement }: TabServiceProps) => {
  const [selectedTab, setSelectedTab] = useState("Pelayanan");

  return (
    <View className="w-full pb-4">
      <View className="flex justify-between bg-neutral-50 px-2 py-[6px] w-full rounded-full flex-row space-x-2">
        <TouchableOpacity
          className={`h-[30px] px-3 ${
            selectedTab === "Pelayanan" ? "bg-primary-700" : "bg-transparent"
          } rounded-full py-1 items-center`}
          onPress={() => setSelectedTab("Pelayanan")}
        >
          <Text
            className={
              selectedTab === "Pelayanan"
                ? "text-neutral-50"
                : "text-primary-700"
            }
          >
            Pelayanan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-[30px] px-3 ${
            selectedTab === "Dasar Hukum" ? "bg-primary-700" : "bg-transparent"
          } rounded-full py-1 items-center`}
          onPress={() => setSelectedTab("Dasar Hukum")}
        >
          <Text
            className={
              selectedTab === "Dasar Hukum"
                ? "text-neutral-50"
                : "text-primary-700"
            }
          >
            Dasar Hukum
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-[30px] px-3 ${
            selectedTab === "Persyaratan" ? "bg-primary-700" : "bg-transparent"
          } rounded-full py-1 items-center`}
          onPress={() => setSelectedTab("Persyaratan")}
        >
          <Text
            className={
              selectedTab === "Persyaratan"
                ? "text-neutral-50"
                : "text-primary-700"
            }
          >
            Persyaratan
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "Pelayanan" && (
        <View className="px-2 py-4">
          <Text>{service || "-"}</Text>
        </View>
      )}
      {selectedTab === "Dasar Hukum" && (
        <View className="px-2 py-4">
          <Text>{law || "-"}</Text>
        </View>
      )}
      {selectedTab === "Persyaratan" && (
        <View className="px-2 py-4">
          <Text>{requirement || "-"}</Text>
        </View>
      )}
    </View>
  );
};

export default TabService;
