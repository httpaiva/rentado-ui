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
import { RenterForm } from "./RenterForm";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "This field has to be filled." }),
  lastName: z.string().min(1, { message: "This field has to be filled." }),
  document_cpf: z.string().min(1, { message: "This field has to be filled." }),
  document_rg: z.string().min(1, { message: "This field has to be filled." }),
  nationality: z.string().optional(),
  birthDate: z.string().optional(),
  maritalStatus: z.string().optional(),
  ocupation: z.string().optional(),
});

export const CreateRenterModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      document_cpf: "",
      document_rg: "",
      nationality: "",
      birthDate: undefined,
      maritalStatus: "",
      ocupation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/renters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Locatário cadastrado com sucesso!");
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
          <DialogTitle>Novo Locatário</DialogTitle>
        </DialogHeader>
        <RenterForm
          form={form}
          onSubmit={onSubmit}
          buttonText="Criar Locatário"
        />
      </ScrollArea>
    </DialogContent>
  );
};
