import { z } from "zod";

export const paymentSchema = z.object({
  paymentDate: z.any(),
  referedMonth: z.any(),
  referedYear: z.any(),
  value: z.any(),
  rent: z.any(),
});

export const paymentFilterSchema = z.object({
  referedMonth: z.any(),
  referedYear: z.any(),
  rent: z.any(),
});
