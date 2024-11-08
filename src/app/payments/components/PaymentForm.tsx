import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { DatePicker } from "@/components/ui/datepicker";
import { Payment } from "@/types/Payment";
import { Rent } from "@/types/Rent";
import { paymentSchema } from "../schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectField } from "@/components/ui/select-field";
import { useMemo } from "react";

type Props = {
  payment: Payment;
  onSubmit: (values: z.infer<typeof paymentSchema>) => Promise<void>;
  buttonText?: string;
  rents: Rent[];
};

export const PaymentForm = ({
  onSubmit,
  buttonText = "submit",
  rents,
  payment,
}: Props) => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentDate: payment?.paymentDate,
      referedMonth: payment?.referedMonth,
      referedYear: payment?.referedYear,
      value: payment?.value,
      rent: `${payment?.rent?.id}`,
    },
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
        className="space-y-8 flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="rent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aluguél</FormLabel>
              <SelectField
                {...field}
                defaultValue={field.value}
                onValueChange={field.onChange}
                items={mappedRents || []}
                placeholder="Selecione um aluguél"
              />
              <FormDescription>Selecione um aluguél</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Pagamento</FormLabel>
              <DatePicker
                field={field}
                placeholder="Insira a Data de Pagamento"
              />
              <FormDescription>Insira uma Data de Pagamento</FormDescription>
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
              <FormDescription>Insira o Mês Referente</FormDescription>
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
              <FormDescription>Insira o Ano Referente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Insira o Valor" />
              </FormControl>
              <FormDescription>Insira o Valor</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{buttonText}</Button>
      </form>
    </Form>
  );
};
