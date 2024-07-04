// withAuth.tsx
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";

export function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const router = useRouter();

    useEffect(() => {
      checkAuth().then(() => {
        if (!isAuthenticated) {
          router.replace("/login");
        }
      });
    }, [isAuthenticated, checkAuth, router]);

    console.log(isAuthenticated);

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
