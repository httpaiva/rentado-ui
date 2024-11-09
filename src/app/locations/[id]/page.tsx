"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Location } from "@/types/Location";
import { H1, PageWithHeaderAndSidebar } from "@/components";
import { useParams } from "next/navigation";
import { LocationForm } from "../components/LocationForm";
import { locationsSchema } from "../schema";
import { z } from "zod";

function EditLocation() {
  const [location, setLocation] = useState<Location>();
  const params = useParams<{ id: string }>();

  

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/locations/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
      setLocation(responseData);
    } else {
      alert("Erro ao carregar imóvel");
    }
  }, [params.id]);

  useEffect(() => {
    console.log("Location useEffect");

    fetchData();
  }, [fetchData]);

  const onSubmit = async (values: z.infer<typeof locationsSchema>) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/locations/${location?.id}`, {
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
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Editar imóvel</H1>

        {location && (
          <LocationForm
            location={location}
            onSubmit={onSubmit}
            buttonText="Editar Imóvel"
          />
        )}
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(EditLocation);
