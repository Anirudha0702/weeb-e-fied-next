import { Resend } from "resend";
import { EmailTemplate } from "@/app/components/EmailTemplate";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendVerificationLink(
  email: string,
  fullName: string,
  link: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Weeb-E-Fied <weebefied@anirudhapradhan.in>",
      to: [`${email}`],
      subject: "Verification Email",
      react: EmailTemplate({
        firstName: fullName,
        verificationLink: `weeb-e-fied.vercel.app/verification/${link}`,
      }),
    });
    if (error) {
      console.log("Error sending email:", error);
      return {
        error: true,
      };
    }
    console.log("Email sent successfully:", data);
    return {
      error: false,
    };
  } catch (error) {
    console.log("Error sending email:", error);
    return {
      error: true,
    };
  }
}
