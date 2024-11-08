"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import {
  Button,
  H1,
  P,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  PageWithHeaderAndSidebar,
  H3,
} from "@/components";
import { Payment } from "@/types/Payment";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/createQueryString";
import { PaymentFilterForm } from "./components/PaymentFilterForm";
import { z } from "zod";
import { paymentFilterSchema } from "./schema";
import { Rent } from "@/types/Rent";

type PaymentFilterProps = {
  rentId?: string | null;
  referedMonth?: number | null;
  referedYear?: number | null;
};

function Payments() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [rents, setRents] = useState<Rent[]>([]);
  const searchParams = useSearchParams();
  const rent_id = searchParams.get("rent_id");
  const refered_month = searchParams.get("refered_month");
  const refered_year = searchParams.get("refered_year");

  const fetchRents = useCallback(async () => {
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
      alert("Erro ao carregar Alugueis");
    }
  }, []);

  const fetchPayments = useCallback(async (props?: PaymentFilterProps) => {
    const token = localStorage.getItem("access_token");
    const query = createQueryString(props || {});

    const response = await fetch(`${API_BASE_URL}/payment${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
      setPayments(responseData);
    } else {
      alert("Erro ao carregar Pagamentos");
    }
  }, []);

  useEffect(() => {
    console.log("Payments useEffect");

    fetchRents();
    fetchPayments({
      rentId: rent_id,
      referedMonth: Number(refered_month),
      referedYear: Number(refered_year),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPayments, fetchRents]);

  const onDelete = async (payment: Payment) => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse template?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/payment/${payment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Pagamento deletado com sucesso!");
        setPayments((prevPayments) =>
          prevPayments.filter((t) => t.id !== payment.id),
        );
      } else {
        const responseData = await response.json();
        const { _error, message } = responseData;
        alert(message);
      }
    }
  };

  const onFilter = async (values: z.infer<typeof paymentFilterSchema>) => {
    const { rent, referedMonth, referedYear } = values;

    fetchPayments({ rentId: rent, referedMonth, referedYear });
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Seus Pagamentos</H1>

        <Button
          onClick={() => {
            router.push("/payments/new");
          }}
        >
          Adicionar novo pagamento
        </Button>

        <section className="w-full flex flex-col gap-2">
          <H3>Filtro</H3>
          <PaymentFilterForm
            onSubmit={onFilter}
            rents={rents}
            buttonText="Filtrar"
            defaultValues={{
              referedMonth: refered_month || 0,
              referedYear: refered_year || 0,
              rent: rent_id || "",
            }}
          />
        </section>

        {payments.length === 0 ? (
          <P>Nenhum pagamento encontrado</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imóvel</TableHead>
                <TableHead>Locatário</TableHead>
                <TableHead>Mês</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.rent?.location?.name}</TableCell>
                  <TableCell>{payment.rent?.renter?.firstName}</TableCell>
                  <TableCell>{payment.referedMonth}</TableCell>
                  <TableCell>{payment.referedYear}</TableCell>
                  <TableCell>{payment.value}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/payments/${payment.id}`);
                      }}
                    >
                      Editar pagamento
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onDelete(payment);
                      }}
                    >
                      Deletar pagamento
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(Payments);
