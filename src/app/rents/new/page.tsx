"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Location } from "@/types/Location";
import { H1, PageWithHeaderAndSidebar } from "@/components";
import { useRouter } from "next/navigation";
import { RentForm } from "../components/RentForm";
import { rentSchema } from "../schema";
import { z } from "zod";
import { Renter } from "@/types/Renter";

function NewRent() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [renters, setRenters] = useState<Renter[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    try {
      // Executa todas as chamadas em paralelo
      const [locationsResponse, rentersResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/locations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${API_BASE_URL}/renters`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // Extrai o JSON das respostas
      const [locationsData, rentersData] = await Promise.all([
        locationsResponse.json(),
        rentersResponse.json(),
      ]);

      if (locationsResponse.ok) setLocations(locationsData);
      else alert("Erro ao carregar Imóveis");

      if (rentersResponse.ok) setRenters(rentersData);
      else alert("Erro ao carregar Locatários");
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      alert("Erro ao carregar dados");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      alert("Aluguel criado com sucesso!");
      router.push("/rents");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Novo aluguel</H1>

        {
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
            buttonText="Criar Aluguel"
          />
        }
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(NewRent);
