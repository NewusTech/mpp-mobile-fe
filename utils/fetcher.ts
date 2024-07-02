import AsyncStorage from "@react-native-async-storage/async-storage";
import Cookies from "js-cookie";

export const fetcherAuth = async (url: string) => {
  const token = await AsyncStorage.getItem("token");
  // Atau ambil dari state/context
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetcher = (url: string) => {
  // Atau ambil dari state/context
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};
