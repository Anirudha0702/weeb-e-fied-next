"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { token } = useParams();
  useEffect(() => {
    (async function verifyEmail() {
      try {
        const res = await fetch(`/api/verification/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to verify email");
        }
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    })();
  }, []);

  return <div>pagedfgdgdg</div>;
};

export default page;
