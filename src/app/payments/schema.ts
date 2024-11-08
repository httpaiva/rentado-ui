import { z } from "zod";

export const paymentSchema = z.object({
  paymentDate: z.coerce.date(),
  referedMonth: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive(),
  ),
  referedYear: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive(),
  ),
  value: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive(),
  ),
  rent: z.string().min(1, { message: "This field has to be filled." }),
});

export const paymentFilterSchema = z.object({
  referedMonth: z.any(),
  referedYear: z.any(),
  rent: z.any(),
});

