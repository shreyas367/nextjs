import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/user";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpires) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
        user.verifyCode = ''; // Clear the verification code after successful verification
      user.verifyCodeExpires = null; // Clear the expiration date

      await user.save();

      return Response.json({
        success: true,
        message: "Account successfully verified",
      }, { status: 200 });
    } 
    else if (!isCodeNotExpired) {
      return Response.json({
        success: false,
        message: "Verification code expired. Please request a new one.",
      }, { status: 400 });
    } 
    else {
      return Response.json({
        success: false,
        message: "Invalid verification code.",
      }, { status: 400 });
    }

  } catch (error) {
    console.error("Error during verification:", error);
    return Response.json({
      success: false,
      message: "Verification failed",
    }, { status: 500 });
  }
}
