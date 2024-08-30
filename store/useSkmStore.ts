import { create } from "zustand";

interface SkmStore {
  selectedInstance: number;
  setSelectedInstance: (id: number) => void;
  selectedService: number;
  setSelectedService: (id: number) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const useSkmStore = create<SkmStore>((set) => ({
  selectedInstance: 0,
  setSelectedInstance: (id: number) => {
    set({ selectedInstance: id });
  },
  selectedService: 0,
  setSelectedService: (id: number) => {
    set({ selectedService: id });
  },
  selectedDate: "",
  setSelectedDate: (date: string) => {
    set({ selectedDate: date });
  },
}));
