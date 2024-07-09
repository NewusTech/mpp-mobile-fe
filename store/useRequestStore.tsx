// useAuthStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RequestStore {
  instanceId: number;
  setInstanceId: (id: number) => void;
  serviceId: number;
  setServiceId: (id: number) => void;
}

export const useReqeustStore = create<RequestStore>((set) => ({
  instanceId: 0,
  setInstanceId: (id: number) => {
    set({ instanceId: id });
  },
  serviceId: 0,
  setServiceId: (id: number) => {
    set({ serviceId: id });
  },
}));
