import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/user";
import { Message } from "@/model/user";

export async function POST(request: Request) {
    await dbConnect();

    
        const { username,content } = await request.json();
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return Response.json({
                    success: false,
                    message: "User not found",
                }, { status: 404 });
            }

            // Check if the user is accepting messages
        if (!user.isAcceptingMessage) {
                return Response.json({
                    success: false,
                    message: "User is not accepting messages",
                }, { status: 403 });
            }   
        // Create a new message object
        const newMessage={content, createdAt: new Date()};
        user.messages.push(newMessage as Message); // Add the new message to the user's messages array
        // Save the updated user with the new message
        await user.save();


        return Response.json({
            success: true,
            message: "Message sent successfully",
            
        }, { status: 200 });

    } catch (error) {
        console.error("An Unexpected Error sending message:", error);
        return Response.json({
            success: false,
            message: "Internal server error while sending message",
        }, { status: 500 });
    }
}