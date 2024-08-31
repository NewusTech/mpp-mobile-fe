// useAuthStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (token: string) => {
    await AsyncStorage.setItem("token", token);
    set({ isAuthenticated: true });
  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
    set({ isAuthenticated: false });
  },
  checkAuth: async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      set({ isAuthenticated: true });
    }
  },
}));
