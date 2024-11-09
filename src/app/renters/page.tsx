"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Renter } from "@/types/Renter";
import {
  Button,
  H1,
  P,
  Dialog,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  PageWithHeaderAndSidebar,
} from "@/components";
import { useRouter } from "next/navigation";

function Renters() {
  const [renters, setRenters] = useState<Renter[]>([]);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/renters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
      setRenters(responseData);
    } else {
      alert("Erro ao carregar Locatários");
    }
  }, []);

  useEffect(() => {
    console.log("Renters useEffect");

    fetchData();
  }, [fetchData]);

  const onDelete = async (renter: string) => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse imóvel?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/renters/${renter}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Imóvel deletado com sucesso!");
        setRenters((prevRenters) => prevRenters.filter((t) => t.id !== renter));
      } else {
        const responseData = await response.json();
        const { _error, message } = responseData;
        console.error(message);
      }
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Seus Locatários</H1>

        <Button
          onClick={() => {
            router.push("/renters/new");
          }}
        >
          Adicionar novo locatário
        </Button>

        {renters.length === 0 ? (
          <P>Você ainda não possui locatários</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renters.map((renter) => (
                <TableRow key={renter.id}>
                  <TableCell>{`${renter.firstName} ${renter.lastName}`}</TableCell>
                  <TableCell>{renter.document_cpf}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/renters/${renter.id}`);
                      }}
                    >
                      Ver locatário
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onDelete(renter.id!);
                      }}
                    >
                      Deletar locatário
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

export default withAuth(Renters);
