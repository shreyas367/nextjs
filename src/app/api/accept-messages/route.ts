import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();

    const session = await getServerSession(authOptions);
    const user:User = session?.user as User;

    if(!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized access",
        },
        { status: 401 });
    }
    const userId = user.id;
    const {acceptMessages}= await request.json();

    try{

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Messages acceptance updated successfully",
            data: updatedUser,
        }, { status: 200 });

    }
    catch(error) {
        console.error("Error accepting messages:", error);
        return Response.json({
            success: false,
            message: "Failed to accept messages",
        }, { status: 500 });
    }



  
  }


export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      success: false,
      message: "Unauthorized access",
    }, { status: 401 });
  }

  const userId = user.id;

  try {
    const foundUser = await UserModel.findById(userId).select("isAcceptingMessages");

    if (!foundUser) {
      return Response.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    return Response.json({
      success: true,
     isAcceptingMessages: foundUser.isAcceptingMessage
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching acceptance status:", error);
    return Response.json({
      success: false,
      message: "Failed to fetch acceptance status",
    }, { status: 500 });
  }
}  

