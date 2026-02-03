import useAuthStore from "@/app/store/authStore";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
function RootLayout() {
  const { setAuth } = useAuthStore();
  useEffect(() => {
    (async () => {
      const refreshRes = await fetch(`/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      if (refreshRes.ok) {
        const { data } = await refreshRes.json();
        setAuth(data);
      }
    })();
  }, [setAuth]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </ThemeProvider>
  );
}

export const Route = createRootRoute({ component: RootLayout });
