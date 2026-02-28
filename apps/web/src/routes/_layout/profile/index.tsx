import ProfilePage from "@/app/(pages)/ProfilePage";
import useAuthStore from "@/app/store/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/profile/")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();

    if (!user) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: ProfilePage,
});
