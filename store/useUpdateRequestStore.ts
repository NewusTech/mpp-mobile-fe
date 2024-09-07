// useAuthStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RequestStore {
  dataInput: { [key: string]: any }[];
  setDataInput: (
    index: number,
    formId: number,
    value: any,
    type?: string
  ) => void;
  setDataInputFromValues: (inputValues: { [key: string]: any }) => void;

  resetDataInput: () => void; // Added resetDataInput method
}

export const useUpdateRequestStore = create<RequestStore>((set) => ({
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
  setDataInputFromValues: (inputValues: { [key: string]: any }) =>
    set(() => {
      const dataInput = Object.entries(inputValues).map(([key, value]) => ({
        layananform_id: key,
        data: value,
      }));
      return { dataInput };
    }),
  resetDataInput: () => set({ dataInput: [] }), // Reset dataInput to empty array
}));
