import { z } from "zod";

export const templateSchema = z.object({
  title: z.string().min(1, { message: "This field has to be filled." }),
  content: z.any(),
});
