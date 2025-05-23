interface EmailTemplateProps {
  firstName: string;
  verificationLink: string;
}
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  verificationLink,
}) => (
  <div>
    <h1>Verify Your Email, {firstName}</h1>
    <p>
      Thank you for signing up for Weeb-E-Fied! Please verify your email by
      clicking the link below:
    </p>
    <p>
      <a href={verificationLink} target="_blank" rel="noopener noreferrer">
        Verify Email
      </a>
    </p>
    <p>If you didn't sign up, you can ignore this email.</p>
  </div>
);
