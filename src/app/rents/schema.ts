import { z } from "zod";

export const rentSchema = z.object({
  initialDate: z.any(),
  endDate: z.any(),
  price: z.any(),
  paymentDate: z.coerce.date(),
  renter: z.any(),
  location: z.any(),
});

export const rentFilterSchema = z.object({
  status: z.enum(["active", "inactive", "all"]),
});

