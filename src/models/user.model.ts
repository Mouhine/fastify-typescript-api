import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { TypeOf } from "zod";
import { HydratedDocument } from "mongoose";

export interface userDocumment extends Document {
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: HookNextFunction) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<userDocumment>("User", userSchema);

export default User;
