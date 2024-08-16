import { useHistoryDocument } from "@/service/api";
import { Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";

const PublishedDocument = (id: any) => {
  const { data } = useHistoryDocument(id);
  const result = data?.data;

  return (
    <View className="mt-6">
      <View>
        <Text className="text-sm text-neutral-800 font-psemibold">
          Dokumen Terbit
        </Text>
        {result?.map((item: any, index: number) => (
          <View
            key={index}
            className="mt-4 w-full flex-row rounded-lg h-28 flex border items-center justify-between space-x-3 border-neutral-400 p-3"
          >
            <View className="flex flex-col space-y-2 w-2/12">
              <Image
                source={{ uri: item?.instansi_image }}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Text>{item?.instansi_name}</Text>
            </View>
            <View className="flex items-center flex-row justify-between w-10/12 pr-4">
              <View>
                <Text>Layanan</Text>
                <Text>{item?.dokumen[0]?.layanan_name}</Text>
              </View>
              <View className="flex flow-row justify-end">
                <CustomButton
                  clx2="text-sm text-primary-700 font-white"
                  // route="/edit-profile"
                  onPress={() => console.log("edit")}
                  title="Edit"
                  clx="bg-neutral-50 w-[10vh] border border-neutral-500 h-[5vh] mt-2"
                  type="button"
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PublishedDocument;
