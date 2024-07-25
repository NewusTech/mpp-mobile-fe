import { FormDataUpdateStepTwo, LoginType, RegisterType } from "@/types/type";
import { fetcher, fetcherAuth } from "@/utils/fetcher";
import useSWR from "swr";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// get

export function useDetailService(id: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/layanan/dinas/get/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useDetailArticle(slug: string | undefined | string[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/artikel/get/${slug}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useDetailInstance(slug: string | undefined | string[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/instansi/get/${slug}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useCarousel() {
  const { data, isLoading } = useSWR(`${apiUrl}/carousel/get`, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useInstance(limit: number, search?: string) {
  const baseUrl = `${apiUrl}/instansi/get?limit=${limit}`;
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const url = `${baseUrl}${searchParam}`;

  const { data, isLoading } = useSWR(url, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useNews(limit: number) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/artikel/get?limit=${limit}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useDistrict() {
  const { data, isLoading } = useSWR(
    `${apiUrl}/kecamatan/get?limit=30`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useVillage(id: number) {
  const baseUrl = `${apiUrl}/desa/get?limit=300`;
  const searchParam = id ? `&kecamatan_id=${encodeURIComponent(id)}` : "";
  const url = `${baseUrl}${searchParam}`;
  const { data, isLoading } = useSWR(url, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useTermAndCondition() {
  const { data, isLoading } = useSWR(`${apiUrl}/termcond/get`, fetcher);

  return {
    data,
    isLoading,
  };
}

export function useHistoryRequest() {
  const { data, isLoading } = useSWR(`${apiUrl}/historyform`, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useHistoryRequestId(id: string | undefined | string[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/historyform/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useCurrentUser() {
  const { data, isLoading } = useSWR(`${apiUrl}/getforuser`, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useGenerateForm(id: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/layanan/form/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

// post

export const loginUser = async ({ nik, password }: LoginType) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nik, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async ({
  name,
  nik,
  phoneNumber,
  email,
  password,
  districtId,
  villageId,
  neighborhoodAssociation,
  communityAssociation,
  address,
}: RegisterType) => {
  const formData = {
    name: name,
    nik: nik,
    telepon: phoneNumber,
    email: email,
    kecamatan_id: districtId,
    desa_id: villageId,
    alamat: address,
    password: password,
    rt: neighborhoodAssociation,
    rw: communityAssociation,
  };
  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const requestStepTwo = async ({
  formData,
  slug,
}: FormDataUpdateStepTwo) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${apiUrl}/userinfo/update/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};