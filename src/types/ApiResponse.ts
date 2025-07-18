

import { Message } from "@/model/user";

export interface ApiResponse{
    success:boolean;
    message:string;
    isAccesptingMessage?:boolean;
    messages?:Array<Message>
}