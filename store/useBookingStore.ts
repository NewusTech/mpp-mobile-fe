// useAuthStore.ts
import { create } from "zustand";

interface BookingStore {
  // slug: string;
  // setSlug: (slug: string) => void;
  instansiId: number;
  setInstansiId: (id: number) => void;
  name: string;
  setName: (name: string) => void;
  image: string;
  setImage: (image: string) => void;
  layananId: string;
  setLayananId: (id: string) => void;
  tanggal: string;
  setTanggal: (date: string) => void;
  waktu: string;
  setWaktu: (time: string) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  instansiId: 0,
  setInstansiId: (id: number) => {
    set({ instansiId: id });
  },
  name: "",
  setName: (name: string) => {
    set({ name });
  },
  image: "",
  setImage: (image: string) => {
    set({ image });
  },
  layananId: "",
  setLayananId: (id: string) => {
    set({ layananId: id });
  },
  tanggal: "",
  setTanggal: (date: string) => {
    set({ tanggal: date });
  },
  waktu: "",
  setWaktu: (time: string) => {
    set({ waktu: time });
  },
}));
