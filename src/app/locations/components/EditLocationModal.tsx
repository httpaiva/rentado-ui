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
import { Location } from "@/types/Location";

type Props = {
  location: Location;
};

const formSchema = z.object({
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

export default function CreateLocationModal({ location }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: location.name,
      country: location.country,
      state: location.state,
      city: location.city,
      neighborhood: location.neighborhood,
      street: location.street,
      number: location.number,
      postalCode: location.postalCode,
      complement: location.complement,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/locations/${location.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Imóvel atualizado com sucesso!");
      window.location.reload();
    } else {
      const { error, message } = responseData;
      alert(message);
    }
  };

  const onDelete = async () => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse imóvel?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/locations/${location.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Imóvel deletado com sucesso!");
        window.location.reload();
      } else {
        const responseData = await response.json();
        const { error, message } = responseData;
        alert(message);
      }
    }
  };

  return (
    <DialogContent>
      <ScrollArea className="max-h-[80vh] p-6">
        <DialogHeader>
          <DialogTitle>Editar Imóvel</DialogTitle>
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

            <Button type="submit">Editar imóvel</Button>
          </form>
        </Form>

        <Button onClick={onDelete} variant="destructive">
          Deletar Imóvel
        </Button>
      </ScrollArea>
    </DialogContent>
  );
}
