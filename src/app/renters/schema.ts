import { z } from "zod";

export const renterSchema = z.object({
  firstName: z.string().min(1, { message: "This field has to be filled." }),
  lastName: z.string().min(1, { message: "This field has to be filled." }),
  document_cpf: z.string().min(1, { message: "This field has to be filled." }),
  document_rg: z.string().min(1, { message: "This field has to be filled." }),
  nationality: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  maritalStatus: z.string().optional(),
  ocupation: z.string().optional(),
});
