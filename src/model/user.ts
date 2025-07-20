import mongoose from "mongoose";

import { Schema,Document } from "mongoose";







export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MesssageSchema = new Schema({
  
  content: {
    type: String,
    required: true,
    trim: true,
  },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, { timestamps: true, versionKey: false });


export const Message = mongoose.model<Message>("Message", MesssageSchema);







export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: {
  type: String,
  default: null};

  verifyCodeExpires: {
  type: Date;
  default: null,
  };

  isVerified?: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}


const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username must be at most 30 characters long"],
    trim: true,
    unique: true,
  },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill a valid email address"],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [100, "Password must be at most 100 characters long"],
        trim: true,
    },
    verifyCode: {
        type: String,
        trim: true,
      
    },
    verifyCodeExpires: {
        type: Date,
        required: [true, "Verification code expiration date is required"],
      
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    messages: [MesssageSchema]
}, { timestamps: true, versionKey: false });

export const User = mongoose.model<User>("User", UserSchema);



const UserModel = (mongoose.models.User as mongoose.Model<User>)|| 
 mongoose.model<User>("User", UserSchema)


export default UserModel ;