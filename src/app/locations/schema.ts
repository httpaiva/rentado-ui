import { z } from "zod";

export const locationsSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  country: z.string().min(1, { message: "This field has to be filled." }),
  state: z.string().min(1, { message: "This field has to be filled." }),
  city: z.string().min(1, { message: "This field has to be filled." }),
  neighborhood: z.string().min(1, { message: "This field has to be filled." }),
  street: z.string().min(1, { message: "This field has to be filled." }),
  number: z.string().min(1, { message: "This field has to be filled." }),
  postalCode: z.string().min(1, { message: "This field has to be filled." }),
  complement: z.string().optional(),
});
