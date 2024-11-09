"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Location } from "@/types/Location";
import { H1, PageWithHeaderAndSidebar } from "@/components";
import { useParams, useRouter } from "next/navigation";
import { RentForm } from "../components/RentForm";
import { rentSchema } from "../schema";
import { z } from "zod";
import { Rent } from "@/types/Rent";
import { Renter } from "@/types/Renter";

function EditRent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [rent, setRent] = useState<Rent>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [renters, setRenters] = useState<Renter[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    try {
      // Executa todas as chamadas em paralelo
      const [rentResponse, locationsResponse, rentersResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/rents/${params.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
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
      const [rentData, locationsData, rentersData] = await Promise.all([
        rentResponse.json(),
        locationsResponse.json(),
        rentersResponse.json(),
      ]);

      // Verifica se as respostas foram bem-sucedidas antes de definir o estado
      if (rentResponse.ok) setRent(rentData);
      else alert("Erro ao carregar Aluguel");

      if (locationsResponse.ok) setLocations(locationsData);
      else alert("Erro ao carregar Imóveis");

      if (rentersResponse.ok) setRenters(rentersData);
      else alert("Erro ao carregar Locatários");
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      alert("Erro ao carregar dados");
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (values: z.infer<typeof rentSchema>) => {
    const token = localStorage.getItem("access_token");


    const response = await fetch(`${API_BASE_URL}/rents/${rent?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Aluguel atualizado com sucesso!");
      router.push("/rents");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Editar Aluguel</H1>

        {rent && (
          <RentForm
            rent={rent}
            locations={locations}
            renters={renters}
            onSubmit={onSubmit}
            buttonText="Editar Aluguel"
          />
        )}
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(EditRent);
