// File: /src/app/api/accept-message/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/user";
import { NextResponse } from "next/server";
import { User } from "next-auth";

// POST: Toggle accept messages
export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { acceptMessage } = await request.json(); // must match client

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user.id,
      { isAcceptingMessages: acceptMessage },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Messages acceptance updated successfully",
        isAcceptingMessages: updatedUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting messages:", error);
    return NextResponse.json(
      { success: false, message: "Failed to accept messages" },
      { status: 500 }
    );
  }
}

// GET: Return toggle value
export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    const foundUser = await UserModel.findById(user.id).select("isAcceptingMessages");

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching acceptance status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch acceptance status" },
      { status: 500 }
    );
  }
}
