"use client";

import withAuth from "@/hooks/withAuth";
import { API_BASE_URL } from "@/constants";
import { PageWithHeaderAndSidebar, H2 } from "@/components";
import { useRouter } from "next/navigation";
import { renterSchema } from "../schema";
import { z } from "zod";
import { RenterForm } from "../components/RenterForm";

function NewRenter() {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof renterSchema>) => {
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
      router.push("/renters");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Novo Locatário</H2>

        <RenterForm
          renter={{
            firstName: "",
            lastName: "",
            document_cpf: "",
            document_rg: "",
            nationality: "",
            birthDate: undefined,
            maritalStatus: "",
            ocupation: "",
          }}
          onSubmit={onSubmit}
          buttonText="Criar Locatário"
        />
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(NewRenter);
