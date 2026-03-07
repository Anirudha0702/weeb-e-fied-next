import { ThemeProvider } from "@/providers/ThemeProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      <Toaster />
    </ThemeProvider>
  );
}

export const Route = createRootRoute({ component: RootLayout });
