import { loginSchema } from "@/app/types/Api/request";
import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/app/helpers/tokenGenerator";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }
    const { password: _, ...userWithoutPassword } = user;
    const authToken = generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ id: user.id });
    const userData = {
      ...userWithoutPassword,
      authToken: authToken,
      refreshToken: refreshToken,
    };
    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: {
        "Set-Cookie": [
          `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`,
          `authToken=${authToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict; Secure`,
        ].join(", "),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in login route:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
