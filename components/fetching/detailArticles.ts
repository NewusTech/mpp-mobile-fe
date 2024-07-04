import { fetcherAuth } from "@/utils/fetcher";
import useSWR from "swr";

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
