import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import log from "../utils/Logger";
import { createUserInput } from "../schemas/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error: any) {
    log.error(error);
    res.status(409).send(error.message);
  }
}
