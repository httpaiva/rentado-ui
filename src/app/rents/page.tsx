"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Rent } from "@/types/Rent";
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
import { useRouter } from "next/navigation";

function Rents() {
  const router = useRouter();
  const [rents, setRents] = useState<Rent[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    try {
      // Executa todas as chamadas em paralelo
      const rentsResponse =
        await fetch(`${API_BASE_URL}/rents`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

      // Extrai o JSON das respostas
      const rentsData = await rentsResponse.json();

      // Verifica se as respostas foram bem-sucedidas antes de definir o estado
      if (rentsResponse.ok) setRents(rentsData);
      else alert("Erro ao carregar Aluguéis");
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      alert("Erro ao carregar dados");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDelete = async (rentID: string) => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse aluguél?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/rents/${rentID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Aluguél deletado com sucesso!");
        setRents((prevRents) => prevRents.filter((t) => t.id !== rentID));
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
        <H1>Seus Aluguéis</H1>

        <Button
          onClick={() => {
            router.push("/rents/new");
          }}
        >
          Adicionar novo aluguél
        </Button>

        {rents.length === 0 ? (
          <P>Você ainda não possui aluguéis</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imóvel</TableHead>
                <TableHead>Locatário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rents.map((rent) => (
                <TableRow key={rent.id}>
                  <TableCell>{rent.location?.name}</TableCell>
                  <TableCell>{`${rent.renter?.firstName} ${rent.renter?.lastName}`}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/rents/${rent.id}`);
                      }}
                    >
                      Ver aluguél
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/payments?rent_id=${rent.id}`);
                      }}
                    >
                      Ver pagamentos
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/rents/${rent.id}/template`);
                      }}
                    >
                      Gerar documento
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onDelete(rent.id!);
                      }}
                    >
                      Deletar aluguél
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

export default withAuth(Rents);
