import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components";
import { rentFilterSchema } from "../schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectField } from "@/components/ui/select-field";

type Props = {
  onSubmit: (values: z.infer<typeof rentFilterSchema>) => void;
  buttonText?: string;
};

export const RentFilterForm = ({ onSubmit, buttonText = "submit" }: Props) => {
  const form = useForm<z.infer<typeof rentFilterSchema>>({
    resolver: zodResolver(rentFilterSchema),
    defaultValues: { status: "all" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Status do aluguél</FormLabel>
              <SelectField
                {...field}
                defaultValue={field.value}
                onValueChange={field.onChange}
                items={[
                  { label: "Todos", value: "all" },
                  { label: "Ativos", value: "active" },
                  { label: "Finalizados", value: "inactive" },
                ]}
                placeholder="Selecione um status"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-5">
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};
