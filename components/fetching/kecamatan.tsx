import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function kecamatanFetch(search: string, limit = 1000000) {
  const { data, isLoading, error } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/user/kecamatan/get?search=${search}&limit=${limit}`,
    fetcher
  );

  return { data, isLoading, error };
}
