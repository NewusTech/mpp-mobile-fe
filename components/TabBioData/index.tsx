import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BioDataUser from "./bioData";

const TabBioData = (data: any) => {
  const [selectedTab, setSelectedTab] = useState("Data Diri");

  return (
    <View className="w-full pt-4 px-9">
      <View
        className="flex justify-between bg-neutral-50 px-2 py-[8px] h-16 w-full rounded-full flex-row"
        style={{ elevation: 3 }}
      >
        <TouchableOpacity
          className={`h-full flex justify-center w-[32%] rounded-full ${
            selectedTab === "Data Diri" ? "bg-primary-700" : "bg-transparent"
          } py-1 items-center`}
          onPress={() => setSelectedTab("Data Diri")}
        >
          <Text
            className={`text-xs
              ${
                selectedTab === "Data Diri"
                  ? "text-neutral-50"
                  : "text-primary-700"
              }`}
          >
            Data Diri
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-full flex justify-center w-[32%] rounded-full ${
            selectedTab === "Dokumen Pendukung"
              ? "bg-primary-700"
              : "bg-transparent"
          } rounded-full py-1 items-center`}
          onPress={() => setSelectedTab("Dokumen Pendukung")}
        >
          <Text
            className={`text-center text-xs
              ${
                selectedTab === "Dokumen Pendukung"
                  ? "text-neutral-50"
                  : "text-primary-700"
              }
            `}
          >
            Dokumen Pendukung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-full flex justify-center w-[32%] rounded-full ${
            selectedTab === "Dokumen Terbit"
              ? "bg-primary-700"
              : "bg-transparent"
          } py-1 items-center`}
          onPress={() => setSelectedTab("Dokumen Terbit")}
        >
          <Text
            className={`text-center text-xs
              ${
                selectedTab === "Dokumen Terbit"
                  ? "text-neutral-50"
                  : "text-primary-700"
              }
            `}
          >
            Dokumen Terbit
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "Data Diri" && <BioDataUser data={data} />}
      {selectedTab === "Dokumen Pendukung" && (
        <View className="px-2 py-4">{/* <Text>{law || "-"}</Text> */}</View>
      )}
      {selectedTab === "Dokumen Terbit" && (
        <View className="px-2 py-4">
          {/* <Text>{requirement || "-"}</Text> */}
        </View>
      )}
    </View>
  );
};

export default TabBioData;
