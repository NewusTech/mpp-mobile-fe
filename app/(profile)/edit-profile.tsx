import CustomButton from "@/components/CustomButton";
import Gap from "@/components/Gap";
import InputForm from "@/components/InputForm";
import { icons } from "@/constants";
import { Link, router } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
import { useEffect, useState } from "react";
import { FormDataUser } from "@/types/type";
import ShowToast from "@/components/Toast";
import { formatDateToIndo, formatDateToString } from "@/utils";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ActivityIndicator } from "react-native";
import { WithAuth } from "@/components/ProtectedRoute";

const EditProfile = () => {
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

  const { data, isLoading } = useCurrentUser();
  const result = data?.data;

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
        router.push("/profile");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoadingStep2(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <ScrollView>
        <View className=" py-[56px]">
          <View className="flex flex-row space-x-1">
            <Link href="/profile" asChild>
              <TouchableOpacity>
                <Image source={icons.chevronLeft2} className="w-8 h-8" />
              </TouchableOpacity>
            </Link>
            <Text className="text-primary-800 text-xl font-pbold">
              Edit Profile
            </Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithAuth(EditProfile);
