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
import { Renter } from "@/types/Renter";
import { RenterForm } from "./RenterForm";

type Props = {
  renter: Renter;
};

const formSchema = z.object({
  firstName: z.string().min(1, { message: "This field has to be filled." }),
  lastName: z.string().min(1, { message: "This field has to be filled." }),
  document_cpf: z.string().min(1, { message: "This field has to be filled." }),
  document_rg: z.string().min(1, { message: "This field has to be filled." }),
  nationality: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  maritalStatus: z.string().optional(),
  ocupation: z.string().optional(),
});

export const EditRenterModal = ({ renter }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: renter.firstName,
      lastName: renter.lastName,
      document_cpf: renter.document_cpf,
      document_rg: renter.document_rg,
      nationality: renter.nationality,
      birthDate: renter.birthDate,
      maritalStatus: renter.maritalStatus,
      ocupation: renter.ocupation,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/renters/${renter.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Locatário atualizado com sucesso!");
      window.location.reload();
    } else {
      const { error, message } = responseData;
      alert(message);
    }
  };

  const onDelete = async () => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse locatário?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/renters/${renter.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Locatário deletado com sucesso!");
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
          <DialogTitle>Editar Locatário</DialogTitle>
        </DialogHeader>
        <RenterForm
          form={form}
          onSubmit={onSubmit}
          buttonText="Editar Locatário"
        />
        <div className="w-full flex justify-center align-center mt-2">
          <Button type="button" onClick={onDelete} variant="destructive">
            Deletar Locatário
          </Button>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};
