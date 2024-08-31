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
  dataInput: { [key: string]: any }[];
  setDataInput: (
    index: number,
    formId: number,
    value: any,
    type?: string
  ) => void;
  setDataInputFromValues: (inputValues: { [key: string]: any }) => void;

  saveToAsyncStorage: () => Promise<void>;
  resetDataInput: () => void; // Added resetDataInput method
  clearAsyncStorage: () => Promise<void>;
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
  dataInput: [],
  setDataInput: (index, formId, value, type) =>
    set((state) => {
      const updatedDataInput = [...state.dataInput];
      const existingEntry = updatedDataInput[index];

      if (type === "checkbox") {
        const currentValues = (existingEntry?.data || []) as Array<any>;
        if (currentValues.includes(value)) {
          updatedDataInput[index] = {
            layananform_id: formId,
            data: currentValues.filter((item) => item !== value),
          };
        } else {
          updatedDataInput[index] = {
            layananform_id: formId,
            data: [...currentValues, value],
          };
        }
      } else {
        updatedDataInput[index] = {
          layananform_id: formId,
          data: value,
        };
      }

      return { dataInput: updatedDataInput };
    }),
  saveToAsyncStorage: async () => {
    const { dataInput } = useReqeustStore.getState();
    try {
      await AsyncStorage.setItem("dataInput", JSON.stringify(dataInput));
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  },
  setDataInputFromValues: (inputValues: { [key: string]: any }) =>
    set(() => {
      const dataInput = Object.entries(inputValues).map(([key, value]) => ({
        layananform_id: Number(key),
        data: value,
      }));
      return { dataInput };
    }),
  resetDataInput: () => set({ dataInput: [] }), // Reset dataInput to empty array
  clearAsyncStorage: async () => {
    try {
      await AsyncStorage.removeItem("dataInput");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  },
}));
