import WatchPage from "@/app/(pages)/WatchPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/watch/$id")({
  component: WatchPage,
});
