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

type Props = {
  form: any;
  onSubmit: (values: any) => Promise<void>;
  buttonText?: string;
};

export const RenterForm = ({
  form,
  onSubmit,
  buttonText = "submit",
}: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Insira um nome" {...field} />
              </FormControl>
              <FormDescription>Insira um nome</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input placeholder="Insira um sobrenome" {...field} />
              </FormControl>
              <FormDescription>Insira um sobrenome</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document_cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="Insira um CPF" {...field} />
              </FormControl>
              <FormDescription>Insira um CPF</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document_rg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl>
                <Input placeholder="Insira um RG" {...field} />
              </FormControl>
              <FormDescription>Insira um RG</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidade</FormLabel>
              <FormControl>
                <Input placeholder="Insira uma nacionalidade" {...field} />
              </FormControl>
              <FormDescription>Insira um nacionalidade</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento</FormLabel>
              {/* <FormControl> */}
              <DatePicker
                field={field}
                placeholder="Insira a Data de Nascimento"
              />
              {/* </FormControl> */}
              <FormDescription>Insira uma Data de Nascimento</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Civil</FormLabel>
              <FormControl>
                <Input placeholder="Insira um Estado Civil" {...field} />
              </FormControl>
              <FormDescription>Insira um Estado Civil</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ocupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ocupação</FormLabel>
              <FormControl>
                <Input placeholder="Insira uma ocupação" {...field} />
              </FormControl>
              <FormDescription>Insira uma ocupação</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{buttonText}</Button>
      </form>
    </Form>
  );
};
