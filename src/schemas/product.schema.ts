import { z } from "zod";

const payload = {
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    description: z
      .string({
        required_error: "description is required",
      })
      .min(200, "description should be at least 200 charachter long "),
    image: z.string({
      required_error: "image is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),
  }),
};

const params = {
  params: z.object({
    productId: z.string({
      required_error: "product is is required",
    }),
  }),
};

export const createProductSchema = z.object({
  ...payload,
});

export const updateProductSchema = z.object({
  ...payload,
  ...params,
});

export const deleteProductSchema = z.object({
  ...params,
});

export const getProductSchema = z.object({
  ...params,
});

export type createProductInput = z.TypeOf<typeof createProductSchema>;
export type updateProductInput = z.TypeOf<typeof updateProductSchema>;
export type readProductInput = z.TypeOf<typeof getProductSchema>;
export type deleteProductInput = z.TypeOf<typeof deleteProductSchema>;
