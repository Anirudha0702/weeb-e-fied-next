import { ThemeProvider } from "@/providers/ThemeProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
const RootLayout = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Outlet />
    {/* <TanStackRouterDevtools /> */}
  </ThemeProvider>
);

export const Route = createRootRoute({ component: RootLayout });
