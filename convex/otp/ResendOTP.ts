import { Email } from "@convex-dev/auth/providers/Email";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Resend as ResendAPI } from "resend";
import { VerificationCodeEmail } from "./VerificationCodeEmail";
import { internal } from "../_generated/api";
// You need to implement this query in your Convex backend
// Example: internal.users.getByEmail
// It should return the user document by email

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 20,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  // @ts-expect-error: ctx is an undocumented second param
  async sendVerificationRequest(
    { identifier: email, provider, token, expires },
    ctx
  ) {
    // Query the user by email
    const user = await ctx.runQuery(internal.users.getByEmail, { email });
    if (!user || user.role !== "admin") {
      throw new Error("OTP can only be sent to admin users.");
    }

    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: process.env.AUTH_EMAIL ?? "PrimeTechAdmin <contact@tigerbingogame.com>",
      to: [email],
      subject: `Sign in to PrimeTechAdmin Dashboard`,
      react: VerificationCodeEmail({ code: token, expires }),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});