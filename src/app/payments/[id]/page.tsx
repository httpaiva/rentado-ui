"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import {
  PageWithHeaderAndSidebar,
  H2,
} from "@/components";
import { useParams, useRouter } from "next/navigation";
import { paymentSchema } from "../schema";
import { z } from "zod";
import { PaymentForm } from "../components/PaymentForm";
import { Rent } from "@/types/Rent";
import { Payment } from "@/types/Payment";


function EditPayment() {
  const router = useRouter();

  const [payment, setPayment] = useState<Payment>();
  const [rents, setRents] = useState<Rent[]>([]);
  const params = useParams<{ id: string }>();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    try {
    const [rentsResponse, paymentResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/rents`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        }),
        fetch(`${API_BASE_URL}/payment/${params.id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        }),
    ])
    
    
    // Extrai o JSON das respostas
    const [rentsData, paymentData] = await Promise.all([
        rentsResponse.json(),
        paymentResponse.json(),
      ]);

      // Verifica se as respostas foram bem-sucedidas antes de definir o estado
      if (rentsResponse.ok) setRents(rentsData);
      else alert("Erro ao carregar Aluguéis");

      if (paymentResponse.ok) setPayment(paymentData);
      else alert("Erro ao carregar Pagamento");

    } catch (error) {
      console.error("Erro ao carregar dados", error);
      alert("Erro ao carregar dados");
    }
  }, [params.id]);

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
    }

    const response = await fetch(`${API_BASE_URL}/payment/${payment?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newValues),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Pagamento editado com sucesso!");
      router.push("/payments");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };
  
  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Editar Pagamento</H2>

        {payment && <PaymentForm
          payment={payment}
          rents={rents}
          onSubmit={onSubmit}
          buttonText="Editar Pagamento"
        />}
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(EditPayment);
