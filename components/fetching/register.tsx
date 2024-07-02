import React from "react";

export default async function fetchRegister() {
  const response = await fetch(
    `${process.env.NATIVE_PUBLIK_URL_MPP}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
}
