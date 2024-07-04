import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/useAuthStore";

const AuthLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) return <Redirect href="/home" />;

  console.log(isAuthenticated);

  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
};

export default AuthLayout;
