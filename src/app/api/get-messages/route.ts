import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose, { mongo } from "mongoose";


export default async function GET(request: Request) {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    
    if (!session || !session.user) {
        return Response.json({
        success: false,
        message: "Unauthorized access",
        }, { status: 401 });
    }
    const userId = new mongoose.Types.ObjectId(user.id);
    
    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            {
                $sort: { "messages.createdAt": -1 } // Sort messages by createdAt in descending order
            },
            {
                $group: {
                    _id: "$_id",
                    isAcceptingMessages: { $first: "$isAcceptingMessages" },
                    messages: { $push: "$messages" } // Collect all messages in an array
                }
            },

            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    isAcceptingMessages: 1,
                    messages: 1
                }
            }
        ])

        if (!user || user.length === 0) {
            return Response.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: user[0].messages,
            data: user[0], // Return the first user object with messages
        }, { status: 200 });




      



    } catch (error) {
        console.error("Error fetching messages:", error);
        return Response.json({
        success: false,
        message: "Failed to fetch messages",
        }, { status: 500 });
    }




}