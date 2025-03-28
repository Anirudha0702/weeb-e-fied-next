import { Resend } from "resend";
import { EmailTemplate } from "@/app/components/EmailTemplate";

import crypto from "crypto";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const hash = crypto.randomBytes(32).toString("hex");
  try {
    const { data, error } = await resend.emails.send({
      from: "Weeb-E-Fied <weebefied@anirudhapradhan.in>",
      to: [`${body.email}`],
      subject: "Verification Email",
      react: EmailTemplate({
        firstName: body.fullName,
        verificationLink: `weeb-e-fied.vercel.app/verification/${hash}`,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
