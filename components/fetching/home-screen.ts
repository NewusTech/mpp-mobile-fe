import { fetcherAuth } from "@/utils/fetcher";
import useSWR from "swr";

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
