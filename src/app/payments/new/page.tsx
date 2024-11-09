"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { PageWithHeaderAndSidebar, H2 } from "@/components";
import { useRouter } from "next/navigation";
import { paymentSchema } from "../schema";
import { z } from "zod";
import { PaymentForm } from "../components/PaymentForm";
import { Rent } from "@/types/Rent";

function NewPayment() {
  const router = useRouter();

  const [rents, setRents] = useState<Rent[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/rents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
      setRents(responseData);
    } else {
      alert("Erro ao carregar Pagamentos");
    }
  }, []);

  useEffect(() => {
    if (!rents.length) {
      console.log("Rents useEffect");

      fetchData();
    }
  }, [fetchData, rents]);

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    const token = localStorage.getItem("access_token");
    const newValues = {
      ...values,
      paymentDate: values.paymentDate.toISOString(),
      rent: { id: values.rent },
    };

    const response = await fetch(`${API_BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newValues),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Pagamento lançado com sucesso!");
      router.push("/payments");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Novo Pagamento</H2>

        <PaymentForm
          payment={{
            paymentDate: new Date(),
            referedMonth: new Date().getMonth() + 1,
            referedYear: new Date().getFullYear(),
            value: 0,
            rent: undefined,
          }}
          rents={rents}
          onSubmit={onSubmit}
          buttonText="Lançar Pagamento"
        />
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(NewPayment);
