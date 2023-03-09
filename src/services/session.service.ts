import Session, { SessionDocument } from "../models/session.model";
import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: Types.ObjectId, userAgent: string) {
  try {
    const session = await Session.create({
      user: userId,
      userAgent: userAgent,
    });
    return session.toJSON();
  } catch (error) {}
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const decoded = verifyJWT(refreshToken);
  if (!decoded || get(decoded, "session")) return false;

  const session = await Session.findById(get(decoded, "session"));
  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;

  const accessToken = signJWT(
    { ...user, session: session?._id },
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );

  return accessToken;
}
