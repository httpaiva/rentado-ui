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
import { Location } from "@/types/Location";
import { Renter } from "@/types/Renter";
import { rentSchema } from "../schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rent } from "@/types/Rent";
import { SelectField } from "@/components/ui/select-field";
import { useMemo } from "react";

type Props = {
  rent: Omit<Rent, "id">;
  onSubmit: (values: z.infer<typeof rentSchema>) => Promise<void>;
  buttonText?: string;
  locations: Location[];
  renters: Renter[];
};

export const RentForm = ({
  onSubmit,
  buttonText = "submit",
  locations,
  renters,
  rent,
}: Props) => {
  const form = useForm<z.infer<typeof rentSchema>>({
    resolver: zodResolver(rentSchema),
    defaultValues: {
      initialDate: rent.initialDate,
      endDate: rent.endDate,
      price: rent.price,
      paymentDate: rent.paymentDate,
      renter: `${rent?.renter?.id}`,
      location: `${rent?.location?.id}`,
    },
  });

  const mappedRenters = useMemo(() => {
    console.log({ renters });
    return renters?.map((renter) => ({
      value: `${renter.id}`,
      label: `${renter.firstName} ${renter.lastName}`,
    }));
  }, [renters]);

  const mappedLocations = useMemo(() => {
    console.log({ locations });
    return locations?.map((location) => ({
      value: `${location.id}`,
      label: location.name,
    }));
  }, [locations]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imóvel</FormLabel>
              <SelectField
                {...field}
                defaultValue={field.value}
                onValueChange={field.onChange}
                items={mappedLocations || []}
                placeholder="Selecione um imóvel"
              />
              <FormDescription>Selecione um imóvel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="renter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locatário</FormLabel>
              <SelectField
                {...field}
                defaultValue={field.value}
                onValueChange={field.onChange}
                items={mappedRenters || []}
                placeholder="Selecione um locatário"
              />
              <FormDescription>Selecione um locatário</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Inicio</FormLabel>
              {/* <FormControl> */}
              <DatePicker field={field} placeholder="Insira a Data de Inicio" />
              {/* </FormControl> */}
              <FormDescription>Insira uma Data de Inicio</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Fim</FormLabel>
              {/* <FormControl> */}
              <DatePicker field={field} placeholder="Insira a Data de Fim" />
              {/* </FormControl> */}
              <FormDescription>Insira uma Data de Fim</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Insira o Preço" />
              </FormControl>
              <FormDescription>Insira o Preço</FormDescription>
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
              {/* <FormControl> */}
              <DatePicker
                field={field}
                placeholder="Insira a Data de Pagamento"
              />
              {/* </FormControl> */}
              <FormDescription>Insira uma Data de Pagamento</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{buttonText}</Button>
      </form>
    </Form>
  );
};
