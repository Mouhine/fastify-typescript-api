import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { Request, Response } from "express";
import { validatPassword } from "../services/user.service";
import { signJWT } from "../utils/jwt.utils";
import config from "config";
export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatPassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  // create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // create access token
  const accessToken = signJWT(
    { ...user, session: session?._id },
    {
      expiresIn: config.get("accessTokenTtl"),
    }
  );
  // create refreshToken
  const refreshToken = signJWT(
    { ...user, session: session?._id },
    {
      expiresIn: config.get("refreshTokenTtl"),
    }
  );

  // return access and refresh token

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
