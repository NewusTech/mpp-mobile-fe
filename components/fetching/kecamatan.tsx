export default async function kecamatanFetch(search: string, limit = 1000000) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIK_API_URL}/user/kecamatan/get?search=${search}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return response.json();
}
