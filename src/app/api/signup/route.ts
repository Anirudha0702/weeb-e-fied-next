import { sendVerificationLink } from "@/app/helpers/verificationLink";
import prisma from "@/app/libs/prisma";
import { signupSchema } from "@/app/types/Api/request";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { email, fullname, password } = signupSchema.parse(body);
    const doesUserAlreadyExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (doesUserAlreadyExist) {
      return new Response("User already exists", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        name: fullname,
        password: hashedPassword,
      },
    });
    if (!user) {
      return new Response("User creation failed", { status: 500 });
    }
    const token = jwt.sign({ email }, process.env.NEXT_PUBLIC_JWT_SECRET!, {
      expiresIn: "1h",
    });
    const link = `${process.env.NEXT_PUBLIC_ENDPOINT}/verification/${token}`;
    const { error } = await sendVerificationLink(email, fullname, link);
    if (error) {
      return new Response("Error sending verification email", { status: 500 });
    }

    return new Response("User created successfully", { status: 201 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
