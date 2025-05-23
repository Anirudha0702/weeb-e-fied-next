import prisma from "@/app/libs/prisma";
import jwt from "jsonwebtoken";
export async function POST(req: Request, context: any) {
  const { params } = context;
  const { token } = await params;
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
    if (!decoded) {
      return new Response("Invalid token", { status: 400 });
    }
    const { email } = decoded as { email: string };
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verified: true,
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return new Response("User verified successfully", { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
