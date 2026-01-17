import HomePage from "@/app/(pages)/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/home/")({
  component: HomePage,
});
