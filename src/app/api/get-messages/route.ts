import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession({ req: { headers: headers(), cookies: cookies() }, ...authOptions });

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized access" },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(session.user.id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          isAcceptingMessages: { $first: "$isAcceptingMessages" },
          messages: { $push: "$messages" },
        },
      },
      {
        $project: {
          isAcceptingMessages: 1,
          messages: 1,
        },
      },
    ]);

    if (!user || user.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: user[0].messages, data: user[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
