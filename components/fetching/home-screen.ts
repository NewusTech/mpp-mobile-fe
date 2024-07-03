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

export function useInstance() {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/instansi/get?limit=4`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}

export function useNews() {
  const { data, isLoading } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/artikel/get?limit=6`,
    fetcherAuth
  );

  return {
    data,
    isLoading,
  };
}
