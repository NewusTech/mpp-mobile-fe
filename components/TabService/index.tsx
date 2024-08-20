import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";

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
          <RenderHTML
            source={{ html: service }}
            baseStyle={{ color: "black" }}
          />
        </View>
      )}
      {selectedTab === "Dasar Hukum" && (
        <View className="px-2 py-4">
          <RenderHTML source={{ html: law }} baseStyle={{ color: "black" }} />
        </View>
      )}
      {selectedTab === "Persyaratan" && (
        <View className="px-2 py-4">
          <RenderHTML
            source={{ html: requirement }}
            baseStyle={{ color: "black" }}
          />
        </View>
      )}
    </View>
  );
};

export default TabService;
