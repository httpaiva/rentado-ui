"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { H1, PageWithHeaderAndSidebar } from "@/components";
import { useParams, useRouter } from "next/navigation";
import { RenterForm } from "../components/RenterForm";
import { renterSchema } from "../schema";
import { z } from "zod";
import { Renter } from "@/types/Renter";

function EditRenter() {
  const [renter, setRenter] = useState<Renter>();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/renters/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
        setRenter(responseData);
    } else {
      alert("Erro ao carregar locatário");
    }
  }, [params.id]);

  useEffect(() => {
    console.log("Renter useEffect");

    fetchData();
  }, [fetchData]);

  const onSubmit = async (values: z.infer<typeof renterSchema>) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/renters/${renter?.id}`, {
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
      router.push("/renters");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Editar locatário</H1>

        {renter && (
          <RenterForm
            renter={renter}
            onSubmit={onSubmit}
            buttonText="Editar locatário"
          />
        )}
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(EditRenter);
