import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import Step from "@/components/Step";
import { icons } from "@/constants";
import {
  educations,
  genders,
  marriedStatus,
  religions,
} from "@/constants/select";
import {
  requestStepTwo,
  useCurrentUser,
  useDistrict,
  useTermAndCondition,
  useVillage,
} from "@/service/api";
import { FormDataUser } from "@/types/type";
import { formatDateToIndo, formatDateToString } from "@/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SelectList } from "react-native-dropdown-select-list";
import { set } from "date-fns";
import ShowToast from "@/components/Toast";

const steps = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
];
const currentStep = 2;

const { width } = Dimensions.get("window");

const ServiceRequestTwo = () => {
  const [defaultDistrict, setDefaultDistrict] = useState(null);
  const [defaultVillage, setDefaultVillage] = useState(null);
  const [defaultEdcuation, setDefaultEdcuation] = useState(null);
  const [defaultGender, setDefaultGender] = useState(null);
  const [defaultReligion, setDefaultReligion] = useState(null);
  const [defaultMarriedStatues, setDefaultMarriedStatues] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateNow, setSelectedDateNow] = useState(date.toDateString());
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoadingStep2, setIsLoadingStep2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const { data, isLoading } = useCurrentUser();
  const result = data?.data;

  const { data: TnC, isLoading: tncIsLoad } = useTermAndCondition();
  const resultTnc = TnC?.data;

  const convertToDate = (dateString: any) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  const [formData, setFormData] = useState<FormDataUser>({
    name: "",
    nik: "",
    telepon: "",
    email: "",
    pendidikan: "",
    agama: "",
    gender: "",
    tempatLahir: "",
    goldar: "",
    statusKawin: "",
    pekerjaan: "",
    kecamatan: "",
    desa: "",
    rt: "",
    rw: "",
    alamat: "",
  });

  useEffect(() => {
    if (result) {
      const defaultDate = convertToDate(result.tgl_lahir);
      setDate(defaultDate);
      setSelectedDateNow(defaultDate.toDateString());

      setFormData({
        name: result.name || "",
        nik: result.nik || "",
        telepon: result.telepon || "",
        email: result.email || "",
        pendidikan: result.pendidikan || "",
        agama: result.agama || "",
        gender: result.gender || "",
        tempatLahir: result.tempat_lahir || "",
        goldar: result.goldar || "",
        statusKawin: result.status_kawin || "",
        pekerjaan: result.pekerjaan || "",
        kecamatan: result.kecamatan_id?.toString() || "",
        desa: result.desa_id || "",
        rt: result.rt || "",
        rw: result.rw || "",
        alamat: result.alamat || "",
      });
      setDefaultDistrict(result.kecamatan_id?.toString() || null);
      setDefaultVillage(result.desa_id?.toString() || null);
      setDefaultEdcuation(result.pendidikan || null);
      setDefaultReligion(result.agama || null);
      setDefaultGender(result.gender || null);
      setDefaultMarriedStatues(result.status_kawin || null);
    }
  }, [result]);

  const [selectedDistrict, setSelectedDistrict] = useState<
    number | string | null
  >(defaultDistrict);
  const { data: dataDistrict } = useDistrict();
  const { data: dataVillage } = useVillage(Number(selectedDistrict));

  console.log("selectedDistrict", selectedDistrict);

  const handleChange = (name: keyof FormDataUser, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resultDistrict = dataDistrict?.data;
  const resultVillage = dataVillage?.data;

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    handleChange("kecamatan", value);
  };

  const handleVillageChange = (value: string) => {
    handleChange("desa", value);
  };

  const selectListDataDistrict = resultDistrict?.map((item: any) => ({
    key: item?.id.toString(),
    value: item?.name,
  }));

  const selectListDataVillage = resultVillage?.map((item: any) => ({
    key: item?.id.toString(),
    value: item?.name,
  }));

  const togglePickerDate = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: { type: string }, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        togglePickerDate();
        setSelectedDateNow(currentDate.toDateString());
      }
    } else {
      togglePickerDate();
    }
  };

  const format = new Date(selectedDateNow);

  const handleSubmit = async () => {
    setIsLoadingStep2(true);
    const formattedDate = formatDateToString(format);

    // Update formData to include formattedDate
    const updatedFormData = {
      ...formData,
      selectedDateNow: formattedDate,
    };

    const slug = result?.slug;

    // Log formData to the console
    try {
      const data = await requestStepTwo({
        formData: updatedFormData,
        slug: slug,
      });
      if (data.status === 200) {
        ShowToast("Berhasil update data");
        setModalVisible(false);
        router.push("/service-req-3");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoadingStep2(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color="#3568C0" />
      </View>
    );
  }

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
                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                  />
                )}
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Nama Lengkap
                </Text>
                <InputForm
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChangeText={(value: any) => handleChange("name", value)}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">NIK</Text>
                <InputForm
                  placeholder="NIK"
                  value={formData.nik}
                  onChangeText={(value: any) => handleChange("nik", value)}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Nomor Telepon
                </Text>
                <InputForm
                  placeholder="Nomor Telepon"
                  value={formData.telepon}
                  onChangeText={(value: any) => handleChange("telepon", value)}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Email
                </Text>
                <InputForm
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(value: any) => handleChange("email", value)}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Pendidikan
                </Text>
                <SelectList
                  setSelected={(value: any) =>
                    handleChange("pendidikan", value)
                  }
                  data={educations}
                  save="key"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  defaultOption={educations?.find(
                    (education: any) => education.key === defaultEdcuation
                  )}
                  placeholder="Pilih Pendidikan"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#000" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Agama
                </Text>
                <SelectList
                  setSelected={(value: any) => handleChange("agama", value)}
                  data={religions}
                  save="key"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  defaultOption={religions?.find(
                    (religion: any) => religion.key === defaultReligion
                  )}
                  placeholder="Pilih Agama"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#000" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Jenis Kelamin
                </Text>
                <SelectList
                  setSelected={(value: any) => handleChange("gender", value)}
                  data={genders}
                  save="key"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  defaultOption={genders?.find(
                    (gender: any) => gender.key === defaultGender
                  )}
                  placeholder="Pilih Jenis Kelamin"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#000" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Tempat Lahir
                </Text>
                <InputForm
                  placeholder="Tempat lahir"
                  value={formData.tempatLahir}
                  onChangeText={(value: any) =>
                    handleChange("tempatLahir", value)
                  }
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Tanggal Lahir
                </Text>
                {!showPicker && (
                  <Pressable onPress={togglePickerDate}>
                    <TextInput
                      className="bg-neutral-50 text-black w-full px-4 h-[5vh] py-[10px] rounded-[20px] pr-4 border border-neutral-700"
                      placeholder="Tanggal Lahir"
                      value={formatDateToIndo(selectedDateNow)}
                      onChangeText={setSelectedDateNow}
                      editable={false}
                    />
                  </Pressable>
                )}
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Status Perkawinan
                </Text>
                <SelectList
                  setSelected={(value: any) =>
                    handleChange("statusKawin", value)
                  }
                  data={marriedStatus}
                  save="key"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  defaultOption={marriedStatus?.find(
                    (married: any) => married.key === defaultMarriedStatues
                  )}
                  placeholder="Pilih Status Perkawinan"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={false}
                  inputStyles={{ color: "#000" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Pekerjaan
                </Text>
                <InputForm
                  placeholder="Pekerjaan"
                  value={formData.pekerjaan}
                  onChangeText={(value: any) =>
                    handleChange("pekerjaan", value)
                  }
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Kecamatan
                </Text>
                <SelectList
                  setSelected={handleDistrictChange}
                  data={selectListDataDistrict}
                  searchPlaceholder="Cari Kecamatan"
                  save="key"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  defaultOption={selectListDataDistrict?.find(
                    (district: any) => district.key === defaultDistrict
                  )}
                  placeholder="Pilih Kecamatan"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={true}
                  inputStyles={{ color: "#000" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">Desa</Text>
                <SelectList
                  setSelected={handleVillageChange}
                  data={selectListDataVillage}
                  searchPlaceholder="Cari Desa"
                  save="key"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  defaultOption={selectListDataVillage?.find(
                    (village: any) => village.key === defaultVillage
                  )}
                  placeholder="Pilih Desa"
                  boxStyles={{ borderRadius: 20, borderColor: "#C4C4C4" }}
                  search={true}
                  inputStyles={{ color: "#000" }}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">RT</Text>
                <InputForm
                  placeholder="RT"
                  value={formData.rt}
                  onChangeText={(value: any) => handleChange("rt", value)}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">RW</Text>
                <InputForm
                  placeholder="RW"
                  value={formData.rw}
                  onChangeText={(value: any) => handleChange("rw", value)}
                />
                <Gap height={4} />
                <Text className="text-xs text-neutral-900 mt-4 mb-2">
                  Alamat
                </Text>
                <InputForm
                  type="address"
                  placeholder="Alamat"
                  value={formData.alamat}
                  onChangeText={(value: any) => handleChange("alamat", value)}
                />
              </View>
            </View>
            <CustomButton
              clx2="text-sm text-white font-white"
              // route="/service-req-3"
              clx="bg-primary-700 w-[14vh] h-[5.5vh] mt-[10vh]"
              title="Lanjut"
              type="button"
              onPress={toggleModal}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={toggleModal}
            >
              <View>
                <View style={styles.overlay} />
                <View style={styles.modalView}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="pr-11 pl-5 ">
                      <RenderHtml
                        contentWidth={width}
                        source={{ html: resultTnc?.privasi_text }}
                        baseStyle={{ color: "black" }}
                      />
                      {isLoadingStep2 ? (
                        <ActivityIndicator size="large" color="#3568C0" />
                      ) : (
                        <CustomButton
                          clx2="text-sm text-white font-white"
                          // route="/service-req-3"
                          clx="bg-primary-700 w-full h-[5.5vh] my-[2vh] -mb-14"
                          title="Lanjut"
                          type="button"
                          onPress={handleSubmit}
                        />
                      )}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
};

export default ServiceRequestTwo;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
