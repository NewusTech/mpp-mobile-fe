import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Kata sandi lama harus memiliki minimal 6 karakter"),
    newPassword: z
      .string()
      .min(6, "Kata sandi baru harus memiliki minimal 6 karakter"),
    confirmNewPassword: z
      .string()
      .min(6, "Ulangi kata sandi baru harus memiliki minimal 6 karakter"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Kata sandi baru dan konfirmasi kata sandi tidak cocok",
    path: ["confirmNewPassword"], // Menentukan path di mana kesalahan harus ditampilkan
  });
