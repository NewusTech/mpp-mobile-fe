import { LoginType, RegisterType } from "@/types/type";
import { fetcher, fetcherAuth } from "@/utils/fetcher";
import useSWR from "swr";

// get

export function useDetailService(id: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/layanan/dinas/get/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useDetailArticle(slug: string | undefined | string[]) {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/artikel/get/${slug}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useDetailInstance(slug: string | undefined | string[]) {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/instansi/get/${slug}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useCarousel() {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/carousel/get`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useInstance(limit: number, search?: string) {
  const baseUrl = `${process.env.EXPO_PUBLIC_API_URL}/instansi/get?limit=${limit}`;
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
    `${process.env.EXPO_PUBLIC_API_URL}/artikel/get?limit=${limit}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useDistrict() {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/kecamatan/get?limit=30`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useVillage(id: number) {
  const baseUrl = `${process.env.EXPO_PUBLIC_API_URL}/desa/get?limit=300`;
  const searchParam = id ? `&kecamatan_id=${encodeURIComponent(id)}` : "";
  const url = `${baseUrl}${searchParam}`;
  const { data, isLoading } = useSWR(url, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useTermAndCondition() {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/termcond/get`,
    fetcher
  );

  return {
    data,
    isLoading,
  };
}

// post

export const loginUser = async ({ nik, password }: LoginType) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
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
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
