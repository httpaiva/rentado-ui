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
  H3,
} from "@/components";
import { useRouter } from "next/navigation";
import { RentFilterForm } from "./components/RentFilterForm";

type RentFilterProps = {
  active?: boolean | null;
};

function Rents() {
  const router = useRouter();
  const [rents, setRents] = useState<Rent[]>([]);

  const fetchData = useCallback(async (props?: RentFilterProps) => {
    const token = localStorage.getItem("access_token");

    const query = typeof props?.active === 'boolean' ? `?active=${props?.active}` : '';

    try {
      const rentsResponse = await fetch(`${API_BASE_URL}/rents${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const rentsData = await rentsResponse.json();

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

  const onToggleActive = async (rent: Rent) => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja mudar o status desse aluguél?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/rents/${rent.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: !rent.active }),
      });

      if (response.ok) {
        alert("Aluguél editado com sucesso!");
        router.refresh();
      } else {
        const responseData = await response.json();
        const { _error, message } = responseData;
        console.error(message);
      }
    }
  };

  const onFilter = (values: { status: "active" | "inactive" | "all" }) => {
    switch (values.status) {
      case "active":
        fetchData({ active: true });
        break;
      case "inactive":
        fetchData({ active: false });
        break;
      case "all":
        fetchData();
        break;
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

        <section className="w-full flex flex-col gap-2">
          <H3>Filtro</H3>
          <RentFilterForm onSubmit={onFilter} buttonText="Filtrar" />
        </section>

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
                        onToggleActive(rent);
                      }}
                    >
                      {rent.active ? "Finalizar" : "Ativar"} aluguél
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
