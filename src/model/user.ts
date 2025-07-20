import mongoose, { Schema, Document, models, model } from "mongoose";

// --- Message Interface + Schema ---
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema = new Schema<Message>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// ✅ Fix: Use models.Message check
export const Message =
  models.Message || model<Message>("Message", MessageSchema);

// --- User Interface + Schema ---
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string | null;
  verifyCodeExpires: Date | null;
  isVerified?: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema = new Schema<User>(
  {
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
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 100,
      trim: true,
    },
    verifyCode: {
      type: String,
      trim: true,
      default: null,
    },
    verifyCodeExpires: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true, versionKey: false }
);

// ✅ Fix: Use models.User check
export const User = models.User || model<User>("User", UserSchema);

// Optional: Default export
const UserModel = User;
export default UserModel;
