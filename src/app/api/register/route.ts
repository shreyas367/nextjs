import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/user";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // 1. Check if username is already taken by a verified user
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: "Username already taken",
      });
    }

    // 2. Generate OTP and expiry
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // 3. Check if user exists by email
    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      // 3a. If user exists but not verified, update their data
      if (!existingUserByEmail.isVerified) {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpires = verifyCodeExpires;
        await existingUserByEmail.save();
      } else {
        return Response.json({
          success: false,
          message: "Email already registered",
        });
      }
    } else {
      // 3b. Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpires,
      });
      await newUser.save();
    }

    // 4. Send verification email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }

    // 5. Done
    return Response.json({
      success: true,
      message: "User registered. Verification email sent.",
    });

  } catch (error) {
    console.error("Signup error:", error);
    return Response.json(
      { success: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}
