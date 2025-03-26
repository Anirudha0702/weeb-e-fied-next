import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/anime/home"); // Redirect to home or any custom route
  return null; // This won't render since redirect() is immediate
}
