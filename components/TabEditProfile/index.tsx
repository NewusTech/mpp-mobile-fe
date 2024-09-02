import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BioDataTab from "./bio";
import DocsTab from "./docs";
// import BioDataUser from "./bioData";
// import FileUpload from "./document";
// import MultipleFileUpload from "./document";
// import PublishedDocument from "./published";

const TabEditProfile = (data: any) => {
  const [selectedTab, setSelectedTab] = useState("Data Diri");
  const result = data?.data;

  return (
    <View className="w-full pt-4 px-9">
      <View
        className="flex justify-between bg-neutral-50 px-2 py-[8px] h-16 w-full rounded-full flex-row"
        style={{ elevation: 3 }}
      >
        <TouchableOpacity
          className={`h-full flex justify-center w-1/2 rounded-full ${
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
          className={`h-full flex justify-center w-1/2 rounded-full ${
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
      </View>
      {selectedTab === "Data Diri" && <BioDataTab data={result} />}
      {selectedTab === "Dokumen Pendukung" && <DocsTab data={result} />}
    </View>
  );
};

export default TabEditProfile;
