"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { PageWithHeaderAndSidebar, H2 } from "@/components";
import { useRouter } from "next/navigation";
import { locationsSchema } from "../schema";
import { z } from "zod";
import { LocationForm } from "../components/LocationForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function NewLocation() {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof locationsSchema>) => {
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
      router.push("/locations");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Novo Imóvel</H2>

        <LocationForm
          location={{
            name: "",
            country: "",
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            number: "",
            postalCode: "",
            complement: "",
          }}
          onSubmit={onSubmit}
          buttonText="Criar Imóvel"
        />
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(NewLocation);
