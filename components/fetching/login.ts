import { LoginType } from "@/types/type";

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
