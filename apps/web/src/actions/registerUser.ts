"use server";
import axios from "axios";

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw new Error("Backend is not available");
  }
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
      data
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}
