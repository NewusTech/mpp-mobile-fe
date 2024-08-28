import { FormDataUpdateStepTwo, LoginType, RegisterType } from "@/types/type";
import { fetcher, fetcherAuth } from "@/utils/fetcher";
import useSWR from "swr";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// get

export function useDetailService(limit?: number, id: any) {
  const baseUrl = `${apiUrl}/layanan/dinas/get/${id}?limit=${limit}`;
  const url = `${baseUrl}`;

  const { data, isLoading } = useSWR(url, fetcherAuth);

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

export function useAdminService(id?: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/alluserinfo/get?layanan=${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useAppInstance(id?: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/apkinstansi/get/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useInfoInstance(id?: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/infoinstansi/get/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useSopInstance(id?: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/sopinstansi/get/${id}`,
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

export function useGenerateDocs(id: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/layanan/docs/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useHistoryDocument(id: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/historydokumen?userId=${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useQueueService(id: undefined | string[] | string) {
  const { data, isLoading } = useSWR(
    `https://backend-mpp.newus.id/api/antrian/check/${id}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useFacility(limit: number | undefined | number[]) {
  const { data, isLoading } = useSWR(
    `${apiUrl}/facilities/get?limit=${limit}`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useVisiMisi() {
  const { data, isLoading } = useSWR(`${apiUrl}/visimisi/get`, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useSOP() {
  const { data, isLoading } = useSWR(`${apiUrl}/sop/get`, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useManualBook() {
  const { data, isLoading } = useSWR(
    `${apiUrl}/manualbook/get?search=User`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useMaklumat() {
  const { data, isLoading } = useSWR(`${apiUrl}/maklumat/get`, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useComplaint({ start, end, status, search }: any) {
  const baseUrl = `${apiUrl}/pengaduan/get`;
  const startParam = start ? `?start_date=${encodeURIComponent(start)}` : "";
  const searchParam = start ? `&search=${encodeURIComponent(search)}` : "";
  const endParam = end ? `&end_date=${encodeURIComponent(end)}` : "";
  const statusParam = status
    ? `&status=${encodeURIComponent(status.toString())}`
    : "";
  const url = `${baseUrl}${startParam}${endParam}${statusParam}${searchParam}`;
  const { data, isLoading } = useSWR(url, fetcherAuth);

  return {
    data,
    isLoading,
  };
}

export function useHistoryQueue({ start, end, status, search }: any) {
  const baseUrl = `${apiUrl}/bookingantrian/getforuser`;
  const startParam = start ? `?start_date=${encodeURIComponent(start)}` : "";
  const searchParam = start ? `&search=${encodeURIComponent(search)}` : "";
  const endParam = end ? `&end_date=${encodeURIComponent(end)}` : "";

  const url = `${baseUrl}${startParam}${endParam}${searchParam}`;
  const { data, isLoading } = useSWR(url, fetcherAuth);

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

export const complaint = async ({ formData }: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${apiUrl}/pengaduan/create`, {
      method: "POST",
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

export const requestStepFour = async (data: any, serviceId: number) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${apiUrl}/inputform/create/${serviceId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
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

export const changePasswordApi = async (data: any, slug: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${apiUrl}/changepassword/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
