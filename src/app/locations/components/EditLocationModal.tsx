import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@/constants";
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Location } from "@/types/Location";
import { LocationForm } from "./LocationForm";

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

export const EditLocationModal = ({ location }: Props) => {
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
        <LocationForm
          form={form}
          onSubmit={onSubmit}
          buttonText="Editar Imóvel"
        />

        <div className="w-full flex justify-center align-center mt-2">
          <Button onClick={onDelete} variant="destructive">
            Deletar Imóvel
          </Button>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
