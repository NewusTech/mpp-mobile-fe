import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import InputForm from "@/components/InputForm";
import Gap from "@/components/Gap";
import CustomButton from "@/components/CustomButton";
// import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { DesaType, KecamatanType } from "@/types/type";
import kecamatanFetch from "@/components/fetching/kecamatan";
import desaFetch from "@/components/fetching/desa";
import Cookies from "js-cookie";

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
  const [kecamatan, setKecamatan] = useState<KecamatanType[]>();
  const [desa, setDesa] = useState<DesaType[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const [searchKecamatan, setSearchKecamatan] = useState<string>("");
  const [searchDesa, setSearchDesa] = useState<string>("");
  const debounceSearchKecamatan = useDebounce(searchKecamatan);
  const debounceSearchDesa = useDebounce(searchDesa);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDatakecamatan = async (search: string, limit: number) => {
    try {
      const kecamatans = await kecamatanFetch(search, limit);

      setKecamatan(kecamatans.data);
    } catch (error) {
      // toast("Gagal Memuat Data!");
    }
  };

  const fetchDataDesa = async (search: string, limit: number, id: number) => {
    try {
      const desa = await desaFetch(search, limit, id);
      setDesa(desa.data);
    } catch (error) {
      // toast("Gagal Memuat Data!");
    }
  };

  useEffect(() => {
    fetchDatakecamatan(debounceSearchKecamatan, 1000000);
  }, [debounceSearchKecamatan]);

  useEffect(() => {
    if (selectedKecamatan) {
      fetchDataDesa(debounceSearchDesa, 1000000, selectedKecamatan);
    }
  }, [selectedKecamatan, debounceSearchDesa]);

  console.log(kecamatan, "ini kecamatan");

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      router.push("/");
    }
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/register`,
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
        // toast.success("Berhasil membuat akun, silahkan login", {
        //   duration: 1000,
        // });
        return router.push("/login");
      } else {
        // toast.error(result.message || "Gagal membuat akun!");
      }
    } catch (error: any) {
      console.log(error);

      // toast(error.message);
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
      <InputForm placeholder="Nama Lengkap" />
      <Gap height={8} />
      <InputForm placeholder="NIK" />
      <Gap height={8} />
      <InputForm placeholder="Nomor Telepon" />
      <Gap height={8} />
      <InputForm placeholder="Email@gmail.com" />
      <Text className="text-sm text-primary-800 font-psemibold mt-4 mb-6">
        Alamat
      </Text>
      <View className="w-full">
        <View className="flex flex-row">
          <InputForm type="alamat" placeholder="Kecamatan" />
          <Gap width={16} />
          <InputForm type="alamat" placeholder="Desa" />
        </View>
        <Gap height={8} />
        <View className="flex flex-row">
          <InputForm type="alamat" placeholder="RT" />
          <Gap width={16} />
          <InputForm type="alamat" placeholder="RW" />
        </View>
      </View>
      <Gap height={8} />
      <InputForm type="address" placeholder="Alamat" />
      <Gap height={43} />
      <View className="flex items-center justify-center">
        <CustomButton
          route="/home"
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
