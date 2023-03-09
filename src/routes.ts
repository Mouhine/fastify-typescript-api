import { Express, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import { requireUser } from "./middleware/requireUser";
import validate from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schemas/product.schema";
import { createSessionSchema } from "./schemas/session.schema";
import { createUserSchema } from "./schemas/user.schema";
function routes(app: Express) {
  app.get("/helthcare", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  //user routes
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createSessionHandler
  );

  // session routes
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // product routes
  app.post(
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    updateProductHandler
  );
  app.get(
    "/api/products/:productId",
    [requireUser, validate(getProductSchema)],
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validate(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
