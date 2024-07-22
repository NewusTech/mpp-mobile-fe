import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import Step from "@/components/Step";
import { icons } from "@/constants";
import {
  bloodTypes,
  educations,
  genders,
  marriedStatus,
  religions,
} from "@/constants/select";
import { useReqeustStore } from "@/store/useRequestStore";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 2;

const ServiceRequestTwo = () => {
  const { serviceId } = useReqeustStore((state) => ({
    serviceId: state.serviceId,
  }));

  console.log(serviceId);

  return (
    <>
      <SafeAreaView className="flex-1 pt-[56px] px-1 bg-primary-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row space-x-2 items-start">
            <Link href="/service-req-1" asChild>
              <TouchableOpacity>
                <Image source={icons.chevronLeft2} className="w-8 h-8" />
              </TouchableOpacity>
            </Link>
            <Text className="text-primary-800 text-[20px] font-pbold w-[260px]">
              Permohonan Layanan
            </Text>
          </View>
          <View className="px-9 py-6 flex flex-row">
            {steps.map((step, index) => (
              <Step
                key={step.id}
                title={step.title}
                isLastStep={index === steps.length - 1}
                isActive={step.id === currentStep}
              />
            ))}
          </View>
          <View className="px-9 py-4 flex items-center">
            <View className="w-full rounded-[20px] border border-neutral-700">
              <View className="px-5 py-6">
                <Text className="text-sm text-primary-800 font-psemibold">
                  Data Diri
                </Text>
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Nama Lengkap
                </Text>
                <InputForm placeholder="Nama Lengkap" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">NIK</Text>
                <InputForm placeholder="NIK" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Nomor Telfon
                </Text>
                <InputForm placeholder="Nomor Telepon" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Email
                </Text>
                <InputForm placeholder="Email" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Pendidikan
                </Text>
                <SelectList
                  // setSelected={handleSelectChange}
                  data={educations}
                  save="value"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Pendidikan"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#C4C4C4" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Agama
                </Text>
                <SelectList
                  // setSelected={handleSelectChange}
                  data={religions}
                  save="value"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Agama"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#C4C4C4" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Jenis Kelamin
                </Text>
                <SelectList
                  // setSelected={handleSelectChange}
                  data={genders}
                  save="value"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Jenis Kelamin"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#C4C4C4" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Tempat Lahir
                </Text>
                <InputForm placeholder="Tempat lahir" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Tanggal Lahir
                </Text>
                <InputForm placeholder="Tempat lahir" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Golongan Darah
                </Text>
                <SelectList
                  // setSelected={handleSelectChange}
                  data={bloodTypes}
                  save="value"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Golongan Darah"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#C4C4C4" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Status Perkawinan
                </Text>
                <SelectList
                  // setSelected={handleSelectChange}
                  data={marriedStatus}
                  save="value"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Status Perkawinan"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#C4C4C4" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Pekerjaan
                </Text>
                <InputForm placeholder="Tempat lahir" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Kecamatan
                </Text>
                <SelectList
                  // setSelected={handleSelectChange}
                  data={educations}
                  searchPlaceholder="Cari Layanan Permohonan"
                  save="value"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Layanan Permohonan"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={true}
                  inputStyles={{ color: "#C4C4C4" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">Desa</Text>
                <SelectList
                  // setSelected={handleSelectChange}
                  data={educations}
                  searchPlaceholder="Cari Layanan Permohonan"
                  save="value"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Layanan Permohonan"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={true}
                  inputStyles={{ color: "#C4C4C4" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">RT</Text>
                <InputForm placeholder="Tempat lahir" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">RW</Text>
                <InputForm placeholder="Tempat lahir" />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Alamat
                </Text>
                <InputForm type="address" placeholder="Alamat" />
              </View>
            </View>
            <CustomButton
              clx2="text-sm text-white font-white"
              route="/service-req-3"
              clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[10vh]"
              title="Lanjut"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default ServiceRequestTwo;
