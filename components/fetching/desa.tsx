import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function desaFetch(
  search: string,
  limit = 1000000,
  kecamatan_id: number
) {
  const { data, isLoading, error } = useSWR(
    `${process.env.EXPO_PUBLIC_API_URL}/user/desa/get?search=${search}&limit=${limit}&kecamatan_id=${kecamatan_id}`,
    fetcher
  );

  return { data, isLoading, error };
}
