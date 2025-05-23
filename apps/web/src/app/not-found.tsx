import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/anime/home"); // Redirect to home or any custom route
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
