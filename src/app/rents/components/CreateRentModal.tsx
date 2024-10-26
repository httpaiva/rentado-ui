import { API_BASE_URL } from "@/constants";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from "@/components";
import { z } from "zod";
import { RentForm } from "./RentForm";
import { rentSchema } from "../schema";
import { Renter } from "@/types/Renter";
import { Location } from "@/types/Location";

type Props = {
  locations: Location[];
  renters: Renter[];
};

export const CreateRentModal = ({ locations, renters }: Props) => {
  const onSubmit = async (values: z.infer<typeof rentSchema>) => {
    const token = localStorage.getItem("access_token");
    const newValues = {
      ...values,
      initialDate: values.initialDate.toISOString(),
      endDate: values.endDate.toISOString(),
      paymentDate: values.paymentDate.toISOString(),
      active: true,
    }

    const response = await fetch(`${API_BASE_URL}/rents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newValues),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Aluguél cadastrado com sucesso!");
      window.location.reload();
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <DialogContent>
      <ScrollArea className="max-h-[80vh] p-6">
        <DialogHeader>
          <DialogTitle>Novo Aluguél</DialogTitle>
        </DialogHeader>
        <RentForm
          rent={{
            initialDate: new Date(),
            endDate: new Date(),
            paymentDate: new Date(),
            renter: undefined,
            location: undefined,
            price: 0,
          }}
          locations={locations}
          renters={renters}
          onSubmit={onSubmit}
          buttonText="Criar Aluguél"
        />
      </ScrollArea>
    </DialogContent>
  );
};
