import { fetcherAuth } from "@/utils/fetcher";
import useSWR from "swr";

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
