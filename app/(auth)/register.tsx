import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import InputForm from "@/components/InputForm";
import Gap from "@/components/Gap";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { SelectList } from "react-native-dropdown-select-list";
import {
  register,
  useDistrict,
  useTermAndCondition,
  useVillage,
} from "@/service/api";
import ShowToast from "@/components/Toast";
import Checkbox from "expo-checkbox";

interface FormValues {
  name: string;
  nik: string;
  phoneNumber: string;
  email: string;
  password: string;
  neighborhoodAssociation: string;
  communityAssociation: string;
  address: string;
}

const RegisterScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [selectedVillage, setSelectedVillage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    nik: "",
    phoneNumber: "",
    email: "",
    password: "",
    neighborhoodAssociation: "",
    communityAssociation: "",
    address: "",
  });
  const [isChecked, setIsChecked] = useState<any>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading } = useDistrict();
  const { data: dataVillage, isLoading: villageLoading } =
    useVillage(selectedDistrict);
  const { data: termCond, isLoading: isLoadingTermCond } =
    useTermAndCondition();

  const resultDistrict = data?.data;
  const resultVillage = dataVillage?.data;
  const resultTermCond = termCond?.data?.desc;

  const selectListDataDistrict = resultDistrict?.map((item: any) => ({
    key: item?.id.toString(),
    value: item?.name,
  }));

  const selectListDataVillage = resultVillage?.map((item: any) => ({
    key: item?.id.toString(),
    value: item?.name,
  }));

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = {
      ...formValues,
      districtId: selectedDistrict,
      villageId: selectedVillage,
    };
    try {
      const response = await register(formData);
      if (response.status === 201) {
        ShowToast("Berhasil Daftar");
        router.push("/login");
      }
    } catch (e: any) {
      ShowToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (newValue: boolean) => {
    setIsChecked(newValue);
    if (newValue) {
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-700 justify-center px-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="uppercase text-neutral-50 font-pbold text-[20px]">
          daftar
        </Text>
        <View className="flex flex-row gap-1">
          <Text className="text-neutral-50 text-xs">
            Sudah punya akun? silakan
          </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="underline text-primary-50 text-xs font-pmedium">
                Masuk
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Text className="text-sm text-primary-50 font-psemibold mt-6 mb-4">
          Data Diri
        </Text>
        <InputForm
          placeholder="Nama Lengkap"
          value={formValues.name}
          onChangeText={(value: string) => handleChange("name", value)}
        />
        <Gap height={8} />
        <InputForm
          placeholder="NIK"
          value={formValues.nik}
          onChangeText={(value: string) => handleChange("nik", value)}
        />
        <Gap height={8} />
        <InputForm
          placeholder="Nomor Telepon"
          value={formValues.phoneNumber}
          onChangeText={(value: string) => handleChange("phoneNumber", value)}
        />
        <Gap height={8} />
        <InputForm
          placeholder="Email@gmail.com"
          value={formValues.email}
          onChangeText={(value: string) => handleChange("email", value)}
        />
        <Gap height={8} />
        <InputForm
          icon={isPasswordVisible ? icons.eyeOff : icons.eye}
          type="password"
          placeholder="Kata Sandi"
          secureTextEntry={!isPasswordVisible}
          value={formValues.password}
          onChangeText={(value: string) => handleChange("password", value)}
          onPress={togglePasswordVisibility}
        />
        <Text className="text-sm text-primary-50 font-psemibold mt-4 mb-6">
          Alamat
        </Text>
        <View className="w-full">
          <SelectList
            setSelected={setSelectedDistrict}
            data={selectListDataDistrict}
            searchPlaceholder="Cari Kecamatan"
            dropdownTextStyles={{ color: "#ACACAC" }}
            dropdownStyles={{ backgroundColor: "#FEFEFE" }}
            save="key"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
            }
            placeholder="Pilih Kecamatan"
            boxStyles={{
              borderRadius: 100,
              backgroundColor: "#FEFEFE",
            }}
            search={true}
            inputStyles={{ color: "#acacac" }}
          />
          <Gap height={8} />
          <SelectList
            setSelected={setSelectedVillage}
            data={selectListDataVillage}
            searchPlaceholder="Cari Desa"
            dropdownTextStyles={{ color: "#ACACAC" }}
            dropdownStyles={{ backgroundColor: "#FEFEFE" }}
            save="key"
            arrowicon={
              <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
            }
            placeholder="Pilih Desa"
            boxStyles={{
              borderRadius: 100,
              backgroundColor: "#FEFEFE",
            }}
            search={true}
            inputStyles={{ color: "#acacac" }}
          />
          <Gap height={8} />
          <View className="flex flex-row w-full">
            <InputForm
              type="alamat"
              placeholder="RT"
              value={formValues.neighborhoodAssociation}
              onChangeText={(value: string) =>
                handleChange("neighborhoodAssociation", value)
              }
            />
            <Gap width={16} />
            <InputForm
              type="alamat"
              placeholder="RW"
              value={formValues.communityAssociation}
              onChangeText={(value: string) =>
                handleChange("communityAssociation", value)
              }
            />
          </View>
        </View>
        <Gap height={8} />
        <InputForm
          type="address"
          placeholder="Alamat"
          value={formValues.address}
          onChangeText={(value: string) => handleChange("address", value)}
        />
        <Gap height={13} />
        <View className="flex flex-row space-x-3 items-center">
          <Checkbox
            value={isChecked}
            onValueChange={handleCheckboxChange}
            className="bg-neutral-50 border"
          />
          <Text className="text-neutral-50 text-[13px] w-[285px]">
            Saya telah membaca dan menyetujui{" "}
            <Text className="font-pmedium">Syarat & Ketentuan </Text>
            serta <Text className="font-pmedium">Kebijakan Privasi.</Text>
          </Text>
        </View>
        <Gap height={23} />
        <View className="flex items-center justify-center">
          {loading ? (
            <ActivityIndicator size="large" color="#FEFEFE" />
          ) : (
            <CustomButton
              type="button"
              onPress={handleSubmit}
              clx2="text-sm text-primary-800 font-psemibold"
              clx={`${
                !isChecked ? "opacity-80" : "opacity-100"
              } bg-neutral-50 w-[14.5vh] h-[4.8vh] text-sm text-primary-800 font-psemibold`}
              title="Daftar"
              disabled={!isChecked}
            />
          )}
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Syarat & Ketentuan</Text>
            <Text style={styles.modalContent}>{resultTermCond}</Text>
            <Gap height={10} />
            <CustomButton
              type="button"
              onPress={() => {
                setModalVisible(false);
              }}
              clx2="text-sm text-neutral-50 font-pmedium"
              clx={"bg-primary-700 w-[14.5vh] h-[4.8vh]"}
              title="Setuju"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    fontSize: 14,
    marginVertical: 10,
  },
});
