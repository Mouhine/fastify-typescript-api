import { omit } from "lodash";
import { FilterQuery, HydratedDocument } from "mongoose";
import User, { userDocumment } from "../models/user.model";
interface Input {
  name: string;
  password: string;
  email: string;
}
export async function createUser(input: Input) {
  try {
    const user = await User.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function validatPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return false;
    }

    const isValid = await user?.comparePassword(password);
    if (!isValid) {
      return false;
    }

    return omit(user.toJSON(), "password");
  } catch (error) {}
}

export async function findUser(query: FilterQuery<userDocumment>) {
  return User.find(query);
}
