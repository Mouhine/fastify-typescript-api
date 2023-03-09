import { Request, Response } from "express";
import {
  createProductInput,
  updateProductInput,
} from "../schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  findProduct,
  updateProduct,
} from "../services/product.service";

export async function createProductHandler(
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProduct({ ...body, user: userId });
  return res.send(product);
}

export async function updateProductHandler(
  req: Request<updateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
    }

    if (String(product?.user) !== userId) {
      return res.sendStatus(403);
    }

    const updatedPoduct = await updateProduct({ productId }, update, {
      new: true,
    });
    res.send(updatedPoduct);
  } catch (error) {
    res.sendStatus(500).end();
  }
}

export async function deleteProductHandler(
  req: Request<updateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
    }

    if (String(product?.user) !== userId) {
      return res.sendStatus(403);
    }

    await deleteProduct({ productId });
    res.sendStatus(200);
  } catch (error) {}
}

export async function getProductHandler(
  req: Request<updateProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ productId });
  if (!product) {
    res.sendStatus(404);
  }

  return res.send(product);
}
