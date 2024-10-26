import { API_BASE_URL } from "@/constants";
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/components";
import { z } from "zod";
import { RentForm } from "./RentForm";
import { Rent } from "@/types/Rent";
import { rentSchema } from "../schema";
import { Location } from "@/types/Location";
import { Renter } from "@/types/Renter";

type Props = {
  rent: Rent;
  locations: Location[];
  renters: Renter[];
};

export const EditRentModal = ({ rent, locations, renters }: Props) => {
  const onSubmit = async (values: z.infer<typeof rentSchema>) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/rents/${rent.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Aluguél atualizado com sucesso!");
      window.location.reload();
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  const onDelete = async () => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse aluguél?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/rents/${rent.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Aluguél deletado com sucesso!");
        window.location.reload();
      } else {
        const responseData = await response.json();
        const { _error, message } = responseData;
        alert(message);
      }
    }
  };

  return (
    <DialogContent>
      <ScrollArea className="max-h-[80vh] p-6">
        <DialogHeader>
          <DialogTitle>Editar Aluguél</DialogTitle>
        </DialogHeader>
        <RentForm
          rent={rent}
          locations={locations}
          renters={renters}
          onSubmit={onSubmit}
          buttonText="Editar Aluguél"
        />
        <div className="w-full flex justify-center align-center mt-2">
          <Button type="button" onClick={onDelete} variant="destructive">
            Deletar Aluguél
          </Button>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};
