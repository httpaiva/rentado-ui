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
} from "@/components";
import { Payment } from "@/types/Payment";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/utils/createQueryString";

type PaymentFilterProps = {
  rent_id?: string;
  referedMonth?: number;
  referedYear?: number;
};

function Payments() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);

  const fetchData = useCallback(async (props?: PaymentFilterProps) => {
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
      console.log({ responseData });
      setPayments(responseData);
    } else {
      alert("Erro ao carregar Pagamentos");
    }
  }, []);

  useEffect(() => {
    if (!payments.length) {
      console.log("Payments useEffect");

      fetchData();
    }
  }, [fetchData, payments]);

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

        {payments.length === 0 ? (
          <P>Você ainda não possui Pagamentos</P>
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
