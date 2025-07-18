import { VerificationEmail } from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {



    
  try {
    // ✅ Send email using Resend
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'App SHREYAS - Verify Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    // ✅ Return success response
    return {
      success: true,
      message: "Successfully sent verification email",
    };
  }
  
  
  
  catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
