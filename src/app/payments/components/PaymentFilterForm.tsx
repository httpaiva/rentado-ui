import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
  } from "@/components";
  import { Rent } from "@/types/Rent";
  import { paymentFilterSchema } from "../schema";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { SelectField } from "@/components/ui/select-field";
  import { useMemo } from "react";
  
  type Props = {
    onSubmit: (values: z.infer<typeof paymentFilterSchema>) => Promise<void>;
    buttonText?: string;
    rents: Rent[];
    defaultValues?: z.infer<typeof paymentFilterSchema>;
  };
  
  export const PaymentFilterForm = ({
    onSubmit,
    buttonText = "submit",
    rents,
    defaultValues,
  }: Props) => {
    const form = useForm<z.infer<typeof paymentFilterSchema>>({
      resolver: zodResolver(paymentFilterSchema),
      defaultValues,
    });
  
    const mappedRents = useMemo(() => {
      return rents?.map((rent) => ({
        value: `${rent.id}`,
        label: `${rent.location?.name} -  ${rent.renter?.firstName}`,
      }));
    }, [rents]);
  
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem className="flex flex-col"> 
                <FormLabel>Aluguél</FormLabel>
                <SelectField
                  {...field}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  items={mappedRents || []}
                  placeholder="Selecione um aluguél"
                />
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="referedMonth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Mês Referente</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Insira o Mês Referente"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="referedYear"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ano Referente</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Insira o Ano Referente"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type="submit" className="mt-5">{buttonText}</Button>
        </form>
      </Form>
    );
  };
  