import mongoose, { Types, Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface SessionDocument extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
