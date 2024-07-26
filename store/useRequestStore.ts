// useAuthStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RequestStore {
  slug: string;
  setSlug: (slug: string) => void;
  instanceId: number;
  setInstanceId: (id: number) => void;
  serviceId: number;
  setServiceId: (id: number) => void;
  datainput: { [key: string]: any }[];
  setDatainput: (index: number, formId: number, value: any) => void;
  saveToAsyncStorage: () => Promise<void>;
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
  slug: "",
  setSlug: (slug: string) => {
    set({ slug });
  },
  datainput: [],
  setDatainput: (index, formId, value) =>
    set((state) => {
      const updatedDatainput = [...state.datainput];
      updatedDatainput[index] = {
        layananform_id: formId,
        data: value,
      };
      return { datainput: updatedDatainput };
    }),
  saveToAsyncStorage: async () => {
    const { datainput } = useReqeustStore.getState();
    try {
      await AsyncStorage.setItem("datainput", JSON.stringify(datainput));
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  },
}));
