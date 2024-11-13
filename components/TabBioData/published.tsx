import { useHistoryDocument } from "@/service/api";
import { Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import { truncateString } from "@/utils";
import Accordion from "../Accordion";
import { useState } from "react";

const PublishedDocument = (id: any) => {
  const { data } = useHistoryDocument(id);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const result = data?.data;

  const handlePress = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View className="mt-6">
      <View>
        <Text className="text-sm text-neutral-800 font-psemibold">
          Dokumen Terbit
        </Text>
        {result.length !== 0 ? (
          <View>
            <Text>Tidak ada dokumen terbit</Text>
          </View>
        ) : (
          result?.map((v: any) => (
            <Accordion
              key={v.instansi_id}
              title={v.instansi_name}
              isExpanded={expandedIndex === v.instansi_id}
              onPress={() => handlePress(v.instansi_id)}
            >
              <View className="h-96 space-y-2">
                {v.dokumen.map((z: any) => (
                  <View
                    key={z?.id}
                    className="py-2 px-5 bg-neutral-50 rounded flex flex-row justify-between items-center"
                  >
                    <Text>{z?.layanan_name}</Text>
                    <CustomButton
                      clx2="text-xs text-primary-700 font-white"
                      route={{
                        pathname: "/documentWebView", // Nama path sesuai dengan file Anda
                        params: { link: z?.fileoutput },
                      }}
                      title="Lihat"
                      clx="bg-neutral-50 w-[8vh] border border-neutral-500 h-[3vh]"
                    />
                  </View>
                ))}
              </View>
            </Accordion>
          ))
        )}
      </View>
    </View>
  );
};

export default PublishedDocument;

// <View
//   key={index}
//   className="mt-4 w-full flex-row rounded-lg h-28 flex border items-center justify-between space-x-3 border-neutral-400 p-3"
// >
//   <View className="flex flex-col space-y-2 w-2/12">
//     <Image
//       source={{ uri: item?.instansi_image }}
//       className="w-10 h-10"
//       resizeMode="contain"
//     />
//     <Text>{truncateString(item?.instansi_name, 6)}</Text>
//   </View>
//   <View className="flex items-center flex-row justify-between w-10/12 pr-4">
//     <View>
//       <Text>Layanan</Text>
//       <Text>{truncateString(item?.dokumen[0]?.layanan_name, 22)}</Text>
//     </View>
//     <View className="flex flow-row justify-end">
//     </View>
//   </View>
// </View>;
