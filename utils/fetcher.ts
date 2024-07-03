import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetcherAuth = async (url: string) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.error("Fetcher auth error:", e);
    throw e; // Lempar kesalahan agar SWR bisa menangani
  }
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
