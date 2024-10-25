import { useForm } from "react-hook-form";
import { API_BASE_URL } from "@/constants";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LocationForm } from "./LocationForm";

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

export const CreateLocationModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      postalCode: "",
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
        <LocationForm
          form={form}
          onSubmit={onSubmit}
          buttonText="Criar Imóvel"
        />
      </ScrollArea>
    </DialogContent>
  );
};
