import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import InputForm from "@/components/InputForm";
import Gap from "@/components/Gap";
import CustomButton from "@/components/CustomButton";
import { useDebounce } from "@/hooks/useDebounce";
import { DesaType, KecamatanType } from "@/types/type";
import kecamatanFetch from "@/components/fetching/kecamatan";
import desaFetch from "@/components/fetching/desa";
import { SelectList } from "react-native-dropdown-select-list";
import { icons } from "@/constants";
import { showToastWithGravity } from "@/toast/toast";

const RegisterScreen = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    name: "",
    nik: "",
    telepon: "",
    email: "",
    password: "",
    kecamatan_id: "",
    desa_id: "",
    rt: "",
    rw: "",
    alamat: "",
  });
  const [seen, setSeen] = useState(true);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const [searchKecamatan, setSearchKecamatan] = useState<string>("");
  const [searchDesa, setSearchDesa] = useState<string>("");
  const debounceSearchKecamatan = useDebounce(searchKecamatan);
  const debounceSearchDesa = useDebounce(searchDesa);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: kecamatan,
    isLoading: loadingKecamatan,
    error: errorKecamatan,
  } = kecamatanFetch(debounceSearchKecamatan, 1000000);

  const {
    data: desa,
    isLoading: loadingDesa,
    error: errorDesa,
  } = desaFetch(debounceSearchDesa, 10000000, selectedKecamatan ?? 0);

  useEffect(() => {
    if (errorKecamatan) {
      console.error("Error fetching kecamatan:", errorKecamatan);
    }
    if (errorDesa) {
      console.error("Error fetching desa:", errorDesa);
    }
  }, [errorKecamatan, errorDesa]);

  const formatKecamatanData = (data: any) => {
    return data?.map((item: any) => ({
      key: item.id,
      value: item.name,
    }));
  };

  const formatDesaData = (data: any) => {
    return data?.map((item: any) => ({
      key: item.id,
      value: item.name,
    }));
  };

  const formattedKecamatanData = formatKecamatanData(kecamatan?.data);
  const formattedDesaData = formatDesaData(desa?.data);

  const handleSubmitNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newUser, role_id: 5 }),
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (response.ok) {
        showToastWithGravity("Berhasil membuat akun!");
        return router.push("/login");
      } else {
        showToastWithGravity("Gagal mendapatkan data!");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeUser = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (selectedKecamatan !== null) {
      setNewUser((prevUser) => ({
        ...prevUser,
        kecamatan_id: String(selectedKecamatan),
      }));
    }
  }, [selectedKecamatan]);

  useEffect(() => {
    if (selectedDesa !== null) {
      setNewUser((prevUser) => ({
        ...prevUser,
        desa_id: String(selectedDesa),
      }));
    }
  }, [selectedDesa]);

  return (
    <SafeAreaView className="flex-1 bg-primary-700 justify-center px-10">
      <Text className="uppercase text-neutral-50 font-pbold text-[20px]">
        daftar
      </Text>
      <View className="flex flex-row gap-1">
        <Text className="text-neutral-50 text-[10px]">
          Sudah punya akun? silakan
        </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text className="underline text-primary-800 text-[10px]">
              Masuk
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Text className="text-sm text-primary-800 font-psemibold mt-6 mb-4">
        Data Diri
      </Text>
      <InputForm
        placeholder="Nama Lengkap"
        onChangeText={changeUser}
        value={newUser.name}
      />
      <Gap height={8} />
      <InputForm
        placeholder="NIK"
        onChangeText={changeUser}
        value={newUser.nik}
      />
      <Gap height={8} />
      <InputForm
        placeholder="Nomor Telepon"
        onChangeText={changeUser}
        value={newUser.telepon}
      />
      <Gap height={8} />
      <InputForm
        placeholder="Email@gmail.com"
        onChangeText={changeUser}
        value={newUser.email}
      />
      <Gap height={8} />
      <InputForm
        type="password"
        placeholder="Kata Sandi"
        onChangeText={changeUser}
        value={newUser.password}
      />
      <Text className="text-sm text-primary-800 font-psemibold mt-4 mb-6">
        Alamat
      </Text>
      <View className="w-full">
        <View className="flex flex-col w-full">
          {loadingKecamatan ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <SelectList
              setSelected={(val: any) => {
                setSelectedKecamatan(val);
                setSelectedDesa(null);
              }}
              data={formattedKecamatanData}
              save="key"
              arrowicon={
                <Image source={icons.chevronDown} className="w-[3vh] h-[3vh]" />
              }
              placeholder="Pilih Kecamatan ..."
              boxStyles={{
                backgroundColor: "#FEFEFE",
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderRadius: 100,
                marginBottom: 8,
              }}
              search={false}
            />
          )}

          <Gap width={16} />

          {loadingDesa ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              {selectedKecamatan !== 0 ? (
                <SelectList
                  setSelected={(val: any) => setSelectedDesa(val)}
                  data={formattedDesaData}
                  save="key"
                  arrowicon={
                    <Image
                      source={icons.chevronDown}
                      className="w-[3vh] h-[3vh]"
                    />
                  }
                  placeholder="Pilih Desa ..."
                  boxStyles={{
                    backgroundColor: "#FEFEFE",
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderRadius: 100,
                    marginBottom: 8,
                  }}
                  search={false}
                />
              ) : (
                <View>
                  <Text>Please select a Kecamatan first.</Text>
                </View>
              )}
            </>
          )}
        </View>
        <Gap height={8} />
        <View className="flex flex-row">
          <InputForm
            type="alamat"
            placeholder="RT"
            onChangeText={changeUser}
            value={newUser.rt}
          />
          <Gap width={16} />
          <InputForm
            type="alamat"
            placeholder="RW"
            onChangeText={changeUser}
            value={newUser.rw}
          />
        </View>
      </View>
      <Gap height={8} />
      <InputForm
        type="address"
        placeholder="Alamat"
        onChangeText={changeUser}
        value={newUser.alamat}
      />
      <Gap height={43} />
      <View className="flex items-center justify-center">
        <CustomButton
          route="/login"
          clx2="text-sm text-primary-800 font-psemibold"
          clx="bg-neutral-50 w-[14.5vh] h-[4.8vh] text-sm text-primary-800 font-psemibold"
          title="Daftar"
          type="link"
        />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
