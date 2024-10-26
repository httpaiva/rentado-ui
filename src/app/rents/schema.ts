import { z } from "zod";

export const rentSchema = z.object({
  initialDate: z.coerce.date(),
  endDate: z.coerce.date(),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive(),
  ),
  paymentDate: z.coerce.date(),
  renter: z.string().min(1, { message: "This field has to be filled." }),
  location: z.string().min(1, { message: "This field has to be filled." }),
});
