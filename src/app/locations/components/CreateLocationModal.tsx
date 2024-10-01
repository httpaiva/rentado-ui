import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@/constants";
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "This field has to be filled." }),
  country: z.string().min(1, { message: "This field has to be filled." }),
  state: z.string().min(1, { message: "This field has to be filled." }),
  city: z.string().min(1, { message: "This field has to be filled." }),
  neighborhood: z.string().min(1, { message: "This field has to be filled." }),
  street: z.string().min(1, { message: "This field has to be filled." }),
  number: z.number().min(1, { message: "This field has to be filled." }),
  postalCode: z.number().min(1, { message: "This field has to be filled." }),
  complement: z.string().optional(),
});

export default function CreateLocationModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: 0,
      postalCode: 0,
      complement: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Imóvel cadastrado com sucesso!");
      window.location.reload();
    } else {
      const { error, message } = responseData;
      alert(message);
    }
  };

  return (
    <DialogContent>
      <ScrollArea className="max-h-[80vh] p-6">
        <DialogHeader>
          <DialogTitle>Novo Imóvel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center items-center"
          >
            <FormField
              control={form.control}
              name="name"
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o país" {...field} />
                  </FormControl>
                  <FormDescription>Insira o país</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o Estado" {...field} />
                  </FormControl>
                  <FormDescription>Insira o Estado</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira a cidade" {...field} />
                  </FormControl>
                  <FormDescription>Insira a cidade</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o Bairro" {...field} />
                  </FormControl>
                  <FormDescription>Insira o Bairro</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira a rua" {...field} />
                  </FormControl>
                  <FormDescription>Insira a rua</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o Número" {...field} />
                  </FormControl>
                  <FormDescription>Insira o Número</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o CEP" {...field} />
                  </FormControl>
                  <FormDescription>Insira o CEP</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o Complemento" {...field} />
                  </FormControl>
                  <FormDescription>Insira o Complemento</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Criar imóvel</Button>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
}
