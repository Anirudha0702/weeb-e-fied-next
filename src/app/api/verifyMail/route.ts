import { Resend } from "resend";
import { EmailTemplate } from "@/app/components/EmailTemplate";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "OTAKU <otaku_supportTeam@anirudhapradhan.in>",
      to: ["anurudhapradhan403@gmail.com"],
      subject: "Verification Email",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
